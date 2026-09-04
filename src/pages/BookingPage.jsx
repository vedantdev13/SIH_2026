import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { WORKERS } from '../data/mockData';
import { createBookingApi } from '../api/apiClient';
import { getDisplayWorkerName, getDisplayWorkerPhoto } from '../utils/privacyUtils';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  ShieldCheck, 
  AlertCircle, 
  CheckCircle2, 
  Building2, 
  CreditCard,
  ArrowLeft,
  FileText,
  Smartphone,
  Banknote,
  QrCode,
  Lock,
  Sparkles,
  X
} from 'lucide-react';

export default function BookingPage({ onAddBooking, currentUser }) {
  const { workerId } = useParams();
  const navigate = useNavigate();

  const worker = WORKERS.find(w => w.id === workerId) || WORKERS[0];

  // Form State initialized with logged-in user details if available
  const [date, setDate] = useState('2026-09-04');
  const [timeSlot, setTimeSlot] = useState('10:00 AM - 12:00 PM');
  const [customerName, setCustomerName] = useState(currentUser?.name || '');
  const [customerPhone, setCustomerPhone] = useState(currentUser?.phone || '');
  const [address, setAddress] = useState('');
  const [problemDescription, setProblemDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // PAYMENT STATE
  const [paymentMethod, setPaymentMethod] = useState('upi'); // 'upi' | 'card' | 'cash'
  const [upiId, setUpiId] = useState('');
  const [showQr, setShowQr] = useState(false);
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [cardHolder, setCardHolder] = useState('');
  const [cashAgreed, setCashAgreed] = useState(false);

  // STRICT TRANSACTION GATEWAY MODAL STATE
  const [showPaymentGateway, setShowPaymentGateway] = useState(false);
  const [transactionState, setTransactionState] = useState('idle'); // 'idle' | 'verifying_details' | 'pin_prompt' | 'processing' | 'success' | 'failed'
  const [userPin, setUserPin] = useState('');
  const [formErrorMsg, setFormErrorMsg] = useState('');
  const [transactionErrorMsg, setTransactionErrorMsg] = useState('');

  useEffect(() => {
    if (currentUser?.name) setCustomerName(currentUser.name);
    if (currentUser?.phone) setCustomerPhone(currentUser.phone);
  }, [currentUser]);

  // Extract numeric price for breakdown display
  const numericPriceMatch = worker.approxPrice.match(/\d+/);
  const basePrice = numericPriceMatch ? parseInt(numericPriceMatch[0], 10) : 349;
  const welfareContribution = Math.round(basePrice * 0.05);

  // Initial Form Submit Handler - Validates Booking Details and Opens Gateway Modal
  const handleInitiateBooking = (e) => {
    e.preventDefault();
    setFormErrorMsg('');
    setTransactionErrorMsg('');

    // STRICT AUTHENTICATION GUARD
    if (!currentUser) {
      setFormErrorMsg('🔒 Login Required: Worker can be assigned only after you log in. Redirecting to login page...');
      setTimeout(() => {
        navigate('/login', { state: { from: `/book/${worker.id}`, message: 'Please log in to assign a worker to your booking.' } });
      }, 1200);
      return;
    }

    if (!address.trim()) {
      setFormErrorMsg('Please enter your full service location address.');
      return;
    }
    if (!customerName.trim() || !customerPhone.trim()) {
      setFormErrorMsg('Please provide your name and contact phone number.');
      return;
    }

    // Open Payment Gateway modal
    setTransactionState('idle');
    setShowPaymentGateway(true);
  };

  // Finalize Transaction & Register Booking ONLY upon Authorized Success
  const handleAuthorizeTransaction = async () => {
    setTransactionErrorMsg('');

    // Validate Payment Selection inside Modal
    if (paymentMethod === 'upi') {
      if (!upiId.trim() && !showQr) {
        setTransactionErrorMsg('Please enter your UPI ID or select QR Code payment.');
        return;
      }
    } else if (paymentMethod === 'card') {
      if (!cardNumber.trim() || !cardExpiry.trim() || !cardCvv.trim()) {
        setTransactionErrorMsg('Please complete all card details (Card Number, Expiry, CVV).');
        return;
      }
    } else if (paymentMethod === 'cash') {
      if (!cashAgreed) {
        setTransactionErrorMsg('Please accept the cash payment agreement checkbox to confirm service.');
        return;
      }
    }

    setTransactionState('processing');
    setIsSubmitting(true);

    // Simulate payment authorization delay (1.2 seconds)
    await new Promise(resolve => setTimeout(resolve, 1200));

    const bookingId = `SK-${Math.floor(10000 + Math.random() * 90000)}`;
    let finalPaymentMethodLabel = 'Cash after Service';
    let finalPaymentStatus = 'Pending';
    let txnId = 'N/A';

    if (paymentMethod === 'upi') {
      finalPaymentMethodLabel = `UPI (${upiId ? upiId : 'GPay / PhonePe'})`;
      finalPaymentStatus = 'Paid';
      txnId = `TXN-UPI-${Math.floor(100000 + Math.random() * 900000)}`;
    } else if (paymentMethod === 'card') {
      const lastFour = cardNumber ? cardNumber.slice(-4) : '4242';
      finalPaymentMethodLabel = `Credit/Debit Card (•••• ${lastFour})`;
      finalPaymentStatus = 'Paid';
      txnId = `TXN-CARD-${Math.floor(100000 + Math.random() * 900000)}`;
    } else {
      finalPaymentMethodLabel = 'Cash after Service (Pay on Completion)';
      finalPaymentStatus = 'Pending (Pay after service)';
      txnId = `AGREE-CASH-${Math.floor(10000 + Math.random() * 90000)}`;
    }

    const newBooking = {
      id: bookingId,
      workerId: worker.id,
      workerName: worker.name,
      workerSkill: worker.skill,
      cooperativeName: worker.cooperativeName,
      workerPhoto: worker.photo,
      serviceName: `${worker.skill} Service`,
      date,
      time: timeSlot,
      address,
      customerName,
      customerPhone,
      problem: problemDescription || 'Standard service inspection & repair.',
      amount: worker.approxPrice,
      paymentMethod: finalPaymentMethodLabel,
      paymentStatus: finalPaymentStatus,
      transactionId: txnId,
      status: 'New',
      createdAt: new Date().toISOString().slice(0, 16).replace('T', ' ')
    };

    setTransactionState('success');
    await new Promise(resolve => setTimeout(resolve, 800));

    const savedBooking = await createBookingApi(newBooking);
    const finalBooking = { ...newBooking, ...(savedBooking || {}) };

    if (onAddBooking) onAddBooking(finalBooking);
    setIsSubmitting(false);
    setShowPaymentGateway(false);
    navigate(`/confirmation/${finalBooking.id}`, { state: { booking: finalBooking } });
  };

  // Cancel / Reject Transaction Handler - STOPS BOOKING IMMEDIATELY
  const handleCancelTransaction = () => {
    setShowPaymentGateway(false);
    setTransactionState('idle');
    setIsSubmitting(false);
    setFormErrorMsg('❌ Transaction Cancelled. Booking was NOT created because payment was not completed.');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      <button
        onClick={() => navigate(-1)}
        className="inline-flex items-center gap-2 text-slate-600 hover:text-emerald-700 font-bold text-sm transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Back
      </button>

      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-8">
        
        {/* Header */}
        <div className="border-b border-slate-100 pb-6">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200 mb-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            Verified Labour Cooperative Booking
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900">Book Cooperative Service</h1>
          <p className="text-slate-600 text-sm mt-1">Schedule your appointment with verified co-op tradesperson</p>
        </div>

        {/* AUTHENTICATION GUARD NOTICE */}
        {!currentUser && (
          <div className="bg-amber-50 border-2 border-amber-300 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm animate-in fade-in">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-600 text-white flex items-center justify-center font-bold shrink-0">
                <Lock className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-extrabold text-amber-950 text-sm">Login Required for Worker Assignment</h4>
                <p className="text-xs text-amber-800 font-medium">A worker can only be assigned to a booking request once you are logged in to your account.</p>
              </div>
            </div>
            <Link
              to="/login"
              state={{ from: `/book/${worker.id}`, message: 'Please log in to assign a worker to your booking.' }}
              className="bg-amber-600 hover:bg-amber-700 text-white font-extrabold text-xs px-5 py-2.5 rounded-xl shadow shrink-0 flex items-center gap-1.5 transition-all"
            >
              Log In to Continue
            </Link>
          </div>
        )}

        {/* Selected Worker Overview Banner */}
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4 w-full sm:w-auto">
            <img 
              src={getDisplayWorkerPhoto(worker, false)} 
              alt={getDisplayWorkerName(worker, false)} 
              className="w-16 h-16 rounded-xl object-cover border-2 border-emerald-100 p-1 bg-emerald-50 shadow-sm" 
            />
            <div>
              <h3 className="font-extrabold text-slate-900 text-lg">{worker.skill}</h3>
              <p className="text-xs font-semibold text-emerald-700">{worker.experience} exp</p>
              <div className="mt-1 flex items-center gap-1.5 text-xs text-slate-600">
                <Building2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span className="truncate max-w-xs">{worker.cooperativeName}</span>
              </div>
              <p className="text-[11px] text-amber-700 font-medium mt-1 flex items-center gap-1">
                <Lock className="w-3 h-3 text-amber-600" /> Real name & photo dispatched upon booking confirmation
              </p>
            </div>
          </div>

          <div className="text-right w-full sm:w-auto border-t sm:border-t-0 pt-2 sm:pt-0 border-slate-200">
            <span className="text-xs text-slate-500 font-medium block">Estimated Fee</span>
            <span className="text-xl font-extrabold text-emerald-700">{worker.approxPrice}</span>
          </div>
        </div>

        {/* BOOKING FORM */}
        <form onSubmit={handleInitiateBooking} className="space-y-8">
          
          {formErrorMsg && (
            <div className="bg-rose-50 border border-rose-200 rounded-2xl p-4 text-xs font-bold text-rose-800 flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
              <span>{formErrorMsg}</span>
            </div>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Date Selection */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-emerald-600" /> Preferred Service Date
              </label>
              <input
                type="date"
                required
                value={date}
                onChange={(e) => setDate(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
              />
            </div>

            {/* Time Slot Selection */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-emerald-600" /> Preferred Time Slot
              </label>
              <select
                value={timeSlot}
                onChange={(e) => setTimeSlot(e.target.value)}
                className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
              >
                <option value="09:00 AM - 11:00 AM">Morning: 09:00 AM - 11:00 AM</option>
                <option value="11:00 AM - 01:00 PM">Morning: 11:00 AM - 01:00 PM</option>
                <option value="02:00 PM - 04:00 PM">Afternoon: 02:00 PM - 04:00 PM</option>
                <option value="04:00 PM - 06:00 PM">Evening: 04:00 PM - 06:00 PM</option>
              </select>
            </div>

          </div>

          {/* Customer Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Customer Name</label>
              <input
                type="text"
                required
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Contact Phone</label>
              <input
                type="tel"
                required
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
                className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
              />
            </div>
          </div>

          {/* Service Address */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-emerald-600" /> Full Service Address
            </label>
            <input
              type="text"
              required
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="House/Flat No., Building, Street Name, Area, City"
              className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
            />
          </div>

          {/* Problem Description */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
              <FileText className="w-4 h-4 text-emerald-600" /> Describe Your Requirement / Work Needed
            </label>
            <textarea
              rows={3}
              value={problemDescription}
              onChange={(e) => setProblemDescription(e.target.value)}
              placeholder="Describe the issue (e.g. Tap leaking in kitchen, need 3-phase wiring inspection, door lock replacement...)"
              className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500/20 resize-none"
            />
          </div>

          {/* TRANSPARENT COST BREAKDOWN */}
          <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-2.5 text-xs">
            <div className="flex items-center justify-between text-slate-600">
              <span>Tradesperson Service Visit Fee</span>
              <span className="font-bold text-slate-900">₹{basePrice}</span>
            </div>
            <div className="flex items-center justify-between text-slate-600">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> Cooperative Welfare Reserve (5% included)
              </span>
              <span className="font-bold text-emerald-700">₹{welfareContribution}</span>
            </div>
            <div className="flex items-center justify-between text-slate-600">
              <span>Platform Convenience Fee</span>
              <span className="font-bold text-emerald-700">₹0 (Co-op Subsidy)</span>
            </div>
            <div className="border-t border-slate-200 pt-2 flex items-center justify-between font-extrabold text-sm text-slate-900">
              <span>Total Amount Payable</span>
              <span className="text-emerald-700 text-base">{worker.approxPrice}</span>
            </div>
          </div>

          {/* PROCEED TO PAYMENT GATEWAY BUTTON */}
          <button
            type="submit"
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-base py-4 rounded-2xl shadow-lg shadow-emerald-600/25 transition-all flex items-center justify-center gap-2"
          >
            <CreditCard className="w-5 h-5" /> 
            Proceed to Payment Gateway ({worker.approxPrice})
          </button>

        </form>

      </div>

      {/* SECURE PAYMENT GATEWAY MODAL (SELECT METHOD & AUTHORIZE) */}
      {showPaymentGateway && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-lg w-full border border-slate-200 shadow-2xl overflow-hidden space-y-6 p-6">
            
            {/* Gateway Header */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold">
                  <Lock className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-extrabold text-slate-900 text-base">Sahakaar Secure Payment Gateway</h3>
                  <p className="text-[11px] text-slate-500 font-medium">Cooperative Bank & Payment Authorization</p>
                </div>
              </div>
              <button 
                onClick={handleCancelTransaction} 
                className="text-slate-400 hover:text-rose-600 transition-colors p-1"
                title="Cancel Transaction"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Merchant & Amount Box */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-2 text-center">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Total Amount to Pay</span>
              <span className="text-3xl font-extrabold text-emerald-700 block">{worker.approxPrice}</span>
              <p className="text-xs text-slate-600 font-medium">
                Beneficiary: <strong className="text-slate-900">{worker.cooperativeName}</strong>
              </p>
            </div>

            {/* ERROR MESSAGE IF ANY */}
            {transactionErrorMsg && (
              <div className="bg-rose-50 border border-rose-200 rounded-xl p-3 text-xs font-bold text-rose-800 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                <span>{transactionErrorMsg}</span>
              </div>
            )}

            {/* STEP 1: PAYMENT METHOD SELECTION & INPUTS (WHEN IDLE) */}
            {(transactionState === 'idle' || transactionState === 'select_method') && (
              <div className="space-y-5">
                
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                    Choose Payment Method
                  </label>

                  <div className="grid grid-cols-3 gap-2">
                    {/* UPI */}
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('upi')}
                      className={`p-3 rounded-xl border text-center transition-all ${
                        paymentMethod === 'upi'
                          ? 'border-emerald-600 bg-emerald-50 text-emerald-900 font-bold ring-2 ring-emerald-500/20'
                          : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      <Smartphone className="w-5 h-5 mx-auto mb-1 text-emerald-600" />
                      <span className="text-xs block">UPI</span>
                    </button>

                    {/* Card */}
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('card')}
                      className={`p-3 rounded-xl border text-center transition-all ${
                        paymentMethod === 'card'
                          ? 'border-emerald-600 bg-emerald-50 text-emerald-900 font-bold ring-2 ring-emerald-500/20'
                          : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      <CreditCard className="w-5 h-5 mx-auto mb-1 text-emerald-600" />
                      <span className="text-xs block">Card</span>
                    </button>

                    {/* Cash */}
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('cash')}
                      className={`p-3 rounded-xl border text-center transition-all ${
                        paymentMethod === 'cash'
                          ? 'border-emerald-600 bg-emerald-50 text-emerald-900 font-bold ring-2 ring-emerald-500/20'
                          : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      <Banknote className="w-5 h-5 mx-auto mb-1 text-emerald-600" />
                      <span className="text-xs block">Cash</span>
                    </button>
                  </div>
                </div>

                {/* 1. UPI FORM INSIDE GATEWAY */}
                {paymentMethod === 'upi' && (
                  <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block">
                        UPI VPA ID (GPay / PhonePe / Paytm)
                      </label>
                      <button
                        type="button"
                        onClick={() => setShowQr(!showQr)}
                        className="text-[11px] font-bold text-emerald-700 hover:underline flex items-center gap-1"
                      >
                        <QrCode className="w-3.5 h-3.5" /> {showQr ? 'Hide QR' : 'Show Co-op QR'}
                      </button>
                    </div>

                    <input
                      type="text"
                      value={upiId}
                      onChange={(e) => setUpiId(e.target.value)}
                      placeholder="e.g. 9876543210@upi or name@okicici"
                      className="w-full p-2.5 bg-white border border-slate-300 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                    />

                    {showQr && (
                      <div className="bg-white p-3 rounded-xl border border-slate-200 text-center space-y-1">
                        <div className="w-28 h-28 bg-slate-900 text-white rounded-lg mx-auto flex items-center justify-center p-1">
                          <QrCode className="w-16 h-16 text-emerald-400" />
                        </div>
                        <span className="text-[9px] font-mono text-slate-500 block">{worker.cooperativeId}@upi</span>
                      </div>
                    )}
                  </div>
                )}

                {/* 2. CARD FORM INSIDE GATEWAY */}
                {paymentMethod === 'card' && (
                  <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-3 text-xs">
                    <div>
                      <label className="text-[11px] font-bold text-slate-700 uppercase block mb-1">Card Number</label>
                      <input
                        type="text"
                        maxLength={19}
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        placeholder="4532 •••• •••• 8892"
                        className="w-full p-2.5 bg-white border border-slate-300 rounded-xl text-xs font-mono font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="text-[10px] font-bold text-slate-700 uppercase block mb-1">Expiry (MM/YY)</label>
                        <input
                          type="text"
                          maxLength={5}
                          value={cardExpiry}
                          onChange={(e) => setCardExpiry(e.target.value)}
                          placeholder="08/28"
                          className="w-full p-2.5 bg-white border border-slate-300 rounded-xl text-xs font-semibold focus:outline-none text-center"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-bold text-slate-700 uppercase block mb-1">CVV</label>
                        <input
                          type="password"
                          maxLength={3}
                          value={cardCvv}
                          onChange={(e) => setCardCvv(e.target.value)}
                          placeholder="•••"
                          className="w-full p-2.5 bg-white border border-slate-300 rounded-xl text-xs font-semibold focus:outline-none text-center"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* 3. CASH AGREEMENT INSIDE GATEWAY */}
                {paymentMethod === 'cash' && (
                  <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 space-y-2 text-xs text-emerald-950">
                    <p className="font-bold text-emerald-900">Cash Payment on Completion</p>
                    <p className="text-slate-600">Settle {worker.approxPrice} directly with tradesperson upon service delivery.</p>
                    <label className="flex items-center gap-2 pt-2 border-t border-emerald-200 font-bold text-emerald-900 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={cashAgreed}
                        onChange={(e) => setCashAgreed(e.target.checked)}
                        className="w-4 h-4 text-emerald-600 rounded cursor-pointer"
                      />
                      <span>I confirm cash payment upon service inspection</span>
                    </label>
                  </div>
                )}

                {/* MODAL ACTIONS */}
                <div className="flex items-center gap-3 pt-2">
                  <button
                    type="button"
                    onClick={handleCancelTransaction}
                    className="flex-1 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleAuthorizeTransaction}
                    className="flex-1 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-1.5"
                  >
                    <CheckCircle2 className="w-4 h-4" /> Pay & Authorize Booking
                  </button>
                </div>
              </div>
            )}

            {/* PROCESSING STEP */}
            {transactionState === 'processing' && (
              <div className="py-8 text-center space-y-4">
                <div className="w-14 h-14 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
                <div>
                  <h4 className="font-extrabold text-slate-900 text-base">Verifying Transaction with Bank...</h4>
                  <p className="text-xs text-slate-500 mt-1">Securing funds and dispatching booking order</p>
                </div>
              </div>
            )}

            {/* SUCCESS STEP */}
            {transactionState === 'success' && (
              <div className="py-6 text-center space-y-3">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-md">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h4 className="font-extrabold text-slate-900 text-lg">Transaction Approved & Paid!</h4>
                <p className="text-xs text-emerald-800 font-medium">Redirecting to verified booking receipt...</p>
              </div>
            )}

            <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100 text-[10px] text-slate-400 text-center flex items-center justify-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Strict Security: Booking is locked and dispatched only upon verified payment authorization.</span>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
