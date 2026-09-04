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

  // Initial Form Submit Handler - Validates Form and Opens Gateway Modal
  const handleInitiateBooking = (e) => {
    e.preventDefault();
    setFormErrorMsg('');
    setTransactionErrorMsg('');

    if (!address.trim()) {
      setFormErrorMsg('Please enter your full service location address.');
      return;
    }
    if (!customerName.trim() || !customerPhone.trim()) {
      setFormErrorMsg('Please provide your name and contact phone number.');
      return;
    }

    if (paymentMethod === 'upi') {
      if (!upiId.trim() && !showQr) {
        setFormErrorMsg('Please enter your UPI ID or select QR Code payment.');
        return;
      }
    } else if (paymentMethod === 'card') {
      if (!cardNumber.trim() || !cardExpiry.trim() || !cardCvv.trim()) {
        setFormErrorMsg('Please complete all card details (Card Number, Expiry, CVV).');
        return;
      }
    } else if (paymentMethod === 'cash') {
      if (!cashAgreed) {
        setFormErrorMsg('Please accept the cash payment agreement checkbox to confirm service.');
        return;
      }
    }

    // Open strict payment gateway verification modal
    setUserPin('');
    setTransactionState(paymentMethod === 'cash' ? 'cash_confirm' : 'pin_prompt');
    setShowPaymentGateway(true);
  };

  // Finalize Transaction & Register Booking ONLY upon Authorized Success
  const handleAuthorizeTransaction = async () => {
    if (paymentMethod !== 'cash' && userPin.length < 4) {
      setTransactionErrorMsg('Please enter a valid 4-digit UPI / Security PIN.');
      return;
    }

    setTransactionErrorMsg('');
    setTransactionState('processing');
    setIsSubmitting(true);

    // Simulate strict bank authorization delay (1.5 seconds)
    await new Promise(resolve => setTimeout(resolve, 1500));

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

        {/* Selected Worker Overview Banner */}
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4 w-full sm:w-auto">
            <img 
              src={getDisplayWorkerPhoto(worker, false)} 
              alt={getDisplayWorkerName(worker, false)} 
              className="w-16 h-16 rounded-xl object-cover border-2 border-emerald-100 p-1 bg-emerald-50 shadow-sm" 
            />
            <div>
              <h3 className="font-extrabold text-slate-900 text-lg">{worker.skill} Tradesperson</h3>
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

          {/* PAYMENT METHOD SELECTION SECTION */}
          <div className="border-t border-slate-200 pt-6 space-y-6">
            
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-emerald-600" /> Select Payment Method
                </h3>
                <p className="text-xs text-slate-500">Choose your preferred mode of payment for this service</p>
              </div>
              <div className="inline-flex items-center gap-1 text-[11px] font-extrabold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                <Lock className="w-3 h-3 text-emerald-600" /> 256-bit Encrypted Gateway
              </div>
            </div>

            {/* Payment Method Selector Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              
              {/* UPI Option */}
              <button
                type="button"
                onClick={() => setPaymentMethod('upi')}
                className={`p-4 rounded-2xl border-2 text-left transition-all flex flex-col justify-between space-y-3 ${
                  paymentMethod === 'upi'
                    ? 'border-emerald-600 bg-emerald-50/50 shadow-md ring-2 ring-emerald-500/20'
                    : 'border-slate-200 hover:border-slate-300 bg-slate-50/50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <Smartphone className={`w-6 h-6 ${paymentMethod === 'upi' ? 'text-emerald-600' : 'text-slate-500'}`} />
                  <span className={`w-4 h-4 rounded-full border flex items-center justify-center ${paymentMethod === 'upi' ? 'border-emerald-600 bg-emerald-600' : 'border-slate-300'}`}>
                    {paymentMethod === 'upi' && <span className="w-1.5 h-1.5 rounded-full bg-white"></span>}
                  </span>
                </div>
                <div>
                  <span className="font-extrabold text-sm text-slate-900 block">UPI Payment</span>
                  <span className="text-[11px] text-slate-500 font-medium">GPay, PhonePe, Paytm, BHIM</span>
                </div>
              </button>

              {/* Card Option */}
              <button
                type="button"
                onClick={() => setPaymentMethod('card')}
                className={`p-4 rounded-2xl border-2 text-left transition-all flex flex-col justify-between space-y-3 ${
                  paymentMethod === 'card'
                    ? 'border-emerald-600 bg-emerald-50/50 shadow-md ring-2 ring-emerald-500/20'
                    : 'border-slate-200 hover:border-slate-300 bg-slate-50/50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <CreditCard className={`w-6 h-6 ${paymentMethod === 'card' ? 'text-emerald-600' : 'text-slate-500'}`} />
                  <span className={`w-4 h-4 rounded-full border flex items-center justify-center ${paymentMethod === 'card' ? 'border-emerald-600 bg-emerald-600' : 'border-slate-300'}`}>
                    {paymentMethod === 'card' && <span className="w-1.5 h-1.5 rounded-full bg-white"></span>}
                  </span>
                </div>
                <div>
                  <span className="font-extrabold text-sm text-slate-900 block">Credit / Debit Card</span>
                  <span className="text-[11px] text-slate-500 font-medium">Visa, MasterCard, RuPay</span>
                </div>
              </button>

              {/* Cash Option */}
              <button
                type="button"
                onClick={() => setPaymentMethod('cash')}
                className={`p-4 rounded-2xl border-2 text-left transition-all flex flex-col justify-between space-y-3 ${
                  paymentMethod === 'cash'
                    ? 'border-emerald-600 bg-emerald-50/50 shadow-md ring-2 ring-emerald-500/20'
                    : 'border-slate-200 hover:border-slate-300 bg-slate-50/50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <Banknote className={`w-6 h-6 ${paymentMethod === 'cash' ? 'text-emerald-600' : 'text-slate-500'}`} />
                  <span className={`w-4 h-4 rounded-full border flex items-center justify-center ${paymentMethod === 'cash' ? 'border-emerald-600 bg-emerald-600' : 'border-slate-300'}`}>
                    {paymentMethod === 'cash' && <span className="w-1.5 h-1.5 rounded-full bg-white"></span>}
                  </span>
                </div>
                <div>
                  <span className="font-extrabold text-sm text-slate-900 block">Cash after Service</span>
                  <span className="text-[11px] text-slate-500 font-medium">Pay directly to tradesperson</span>
                </div>
              </button>

            </div>

            {/* CONDITIONAL PAYMENT INPUT FORMS */}
            
            {/* 1. UPI FORM */}
            {paymentMethod === 'upi' && (
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                    Enter VPA / UPI ID
                  </label>
                  <button
                    type="button"
                    onClick={() => setShowQr(!showQr)}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:text-emerald-800"
                  >
                    <QrCode className="w-4 h-4" /> {showQr ? 'Hide QR Code' : 'Scan Co-op QR Code'}
                  </button>
                </div>

                <div className="flex gap-2">
                  <input
                    type="text"
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                    placeholder="e.g. 9876543210@upi or yourname@okicici"
                    className="flex-1 p-3 bg-white border border-slate-300 rounded-xl text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                  />
                  <div className="bg-emerald-100 border border-emerald-300 text-emerald-800 text-xs font-bold px-3 py-3 rounded-xl flex items-center shrink-0">
                    Instant Auto-Verify
                  </div>
                </div>

                {showQr && (
                  <div className="bg-white p-4 rounded-xl border border-slate-200 text-center space-y-2 max-w-xs mx-auto">
                    <span className="text-[11px] font-bold text-slate-500 uppercase block">Cooperative Society QR</span>
                    <div className="w-36 h-36 bg-slate-900 text-white rounded-xl mx-auto flex items-center justify-center p-2">
                      <div className="w-full h-full border-2 border-emerald-400 border-dashed rounded-lg flex flex-col items-center justify-center p-1 space-y-1">
                        <QrCode className="w-12 h-12 text-emerald-400" />
                        <span className="text-[9px] font-mono text-emerald-300">{worker.cooperativeId}@upi</span>
                      </div>
                    </div>
                    <p className="text-[10px] text-slate-500 font-medium">Scan using GPay, PhonePe, or Paytm</p>
                  </div>
                )}
              </div>
            )}

            {/* 2. CARD FORM */}
            {paymentMethod === 'card' && (
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">Card Number</label>
                  <input
                    type="text"
                    maxLength={19}
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    placeholder="4532 •••• •••• 8892"
                    className="w-full p-3 bg-white border border-slate-300 rounded-xl text-sm font-mono font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                  />
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div className="space-y-1 col-span-1">
                    <label className="text-[11px] font-bold text-slate-700 uppercase block">Expiry</label>
                    <input
                      type="text"
                      maxLength={5}
                      value={cardExpiry}
                      onChange={(e) => setCardExpiry(e.target.value)}
                      placeholder="MM/YY"
                      className="w-full p-3 bg-white border border-slate-300 rounded-xl text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500/20 text-center"
                    />
                  </div>

                  <div className="space-y-1 col-span-1">
                    <label className="text-[11px] font-bold text-slate-700 uppercase block">CVV</label>
                    <input
                      type="password"
                      maxLength={3}
                      value={cardCvv}
                      onChange={(e) => setCardCvv(e.target.value)}
                      placeholder="•••"
                      className="w-full p-3 bg-white border border-slate-300 rounded-xl text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500/20 text-center"
                    />
                  </div>

                  <div className="space-y-1 col-span-1">
                    <label className="text-[11px] font-bold text-slate-700 uppercase block">Name on Card</label>
                    <input
                      type="text"
                      value={cardHolder}
                      onChange={(e) => setCardHolder(e.target.value)}
                      placeholder="Cardholder Name"
                      className="w-full p-3 bg-white border border-slate-300 rounded-xl text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* 3. CASH NOTICE & CONTRACT AGREEMENT */}
            {paymentMethod === 'cash' && (
              <div className="bg-emerald-50/80 border border-emerald-200 rounded-2xl p-5 space-y-3 text-emerald-950">
                <div className="flex items-start gap-3">
                  <Banknote className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
                  <div className="text-xs space-y-1">
                    <p className="font-extrabold text-emerald-900">Pay directly after service delivery</p>
                    <p className="text-emerald-800">
                      No advance payment required. Settle {worker.approxPrice} directly with tradesperson via cash or personal QR code once the job is inspected & completed.
                    </p>
                  </div>
                </div>

                <label className="flex items-center gap-2 pt-2 border-t border-emerald-200 text-xs font-bold text-emerald-900 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={cashAgreed}
                    onChange={(e) => setCashAgreed(e.target.checked)}
                    className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500 cursor-pointer"
                  />
                  <span>I agree to pay {worker.approxPrice} in cash upon service completion</span>
                </label>
              </div>
            )}

            {/* TRANSPARENT COST BREAKDOWN */}
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2 text-xs">
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

          </div>

          {/* PROCEED TO PAYMENT AUTHORIZATION BUTTON */}
          <button
            type="submit"
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-base py-4 rounded-2xl shadow-lg shadow-emerald-600/25 transition-all flex items-center justify-center gap-2"
          >
            <CreditCard className="w-5 h-5" /> 
            {paymentMethod !== 'cash' ? `Proceed to Payment Gateway (${worker.approxPrice})` : `Authorize & Confirm Cash Booking (${worker.approxPrice})`}
          </button>

        </form>

      </div>

      {/* STRICT TRANSACTION GATEWAY AUTHORIZATION MODAL */}
      {showPaymentGateway && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-md w-full border border-slate-200 shadow-2xl overflow-hidden space-y-6 p-6">
            
            {/* Gateway Header */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold">
                  <Lock className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-extrabold text-slate-900 text-base">Sahakaar Secure Payment Gateway</h3>
                  <p className="text-[11px] text-slate-500 font-medium">Bank & Co-op Transaction Authorization</p>
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
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Total Amount to Authorize</span>
              <span className="text-3xl font-extrabold text-emerald-700 block">{worker.approxPrice}</span>
              <p className="text-xs text-slate-600 font-medium">
                Recipient: <strong className="text-slate-900">{worker.cooperativeName}</strong>
              </p>
            </div>

            {/* ERROR MESSAGE IF ANY */}
            {transactionErrorMsg && (
              <div className="bg-rose-50 border border-rose-200 rounded-xl p-3 text-xs font-bold text-rose-800 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                <span>{transactionErrorMsg}</span>
              </div>
            )}

            {/* PIN ENTRY & AUTHORIZATION STEP */}
            {transactionState === 'pin_prompt' && (
              <div className="space-y-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block text-center">
                    Enter 4-Digit UPI / Security PIN
                  </label>
                  <input
                    type="password"
                    maxLength={4}
                    value={userPin}
                    onChange={(e) => setUserPin(e.target.value.replace(/\D/g, ''))}
                    placeholder="••••"
                    autoFocus
                    className="w-full text-center tracking-[1em] text-2xl font-extrabold p-3 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
                  />
                  <span className="text-[11px] text-slate-400 block text-center mt-1">
                    Channel: {paymentMethod === 'upi' ? (upiId || 'GPay / PhonePe UPI') : `Card ending in ${cardNumber.slice(-4) || '4242'}`}
                  </span>
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <button
                    type="button"
                    onClick={handleCancelTransaction}
                    className="flex-1 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm rounded-xl transition-colors"
                  >
                    Cancel Transaction
                  </button>
                  <button
                    type="button"
                    onClick={handleAuthorizeTransaction}
                    className="flex-1 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-1.5"
                  >
                    <CheckCircle2 className="w-4 h-4" /> Authorize & Pay
                  </button>
                </div>
              </div>
            )}

            {/* CASH CONFIRMATION STEP */}
            {transactionState === 'cash_confirm' && (
              <div className="space-y-4">
                <p className="text-xs text-slate-600 leading-relaxed text-center">
                  You are agreeing to pay <strong className="text-slate-900">{worker.approxPrice}</strong> directly in cash to the tradesperson upon job completion.
                </p>
                <div className="flex items-center gap-3 pt-2">
                  <button
                    type="button"
                    onClick={handleCancelTransaction}
                    className="flex-1 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm rounded-xl transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleAuthorizeTransaction}
                    className="flex-1 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-1.5"
                  >
                    <CheckCircle2 className="w-4 h-4" /> Confirm Cash Booking
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
              <span>Strict Security: Bookings are strictly blocked if transaction fails or is cancelled.</span>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
