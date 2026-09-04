import React from 'react';
import { Link } from 'react-router-dom';
import { Users, ShieldCheck, Heart, Phone, Mail, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#111827] text-slate-300 pt-16 pb-10 border-t-2 border-slate-800 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-slate-800">
          
          {/* Brand Info */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#3378BC] text-white flex items-center justify-center shadow-md">
                <Users className="w-5 h-5" />
              </div>
              <span className="text-2xl font-black text-white tracking-tight">SAHAKAAR</span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed font-normal">
              Empowering Labour Cooperative Societies by connecting verified local skilled artisans directly with households and businesses.
            </p>
            <div className="inline-flex items-center gap-2 bg-[#3378BC]/10 border border-[#3378BC]/30 px-3.5 py-1.5 rounded-xl text-slate-200 text-xs font-semibold">
              <ShieldCheck className="w-4 h-4 text-[#3378BC]" />
              Cooperative Welfare First
            </div>
          </div>

          {/* Marketplace Services */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-bold text-white tracking-wider uppercase">Marketplace Services</h4>
            <ul className="space-y-2.5 text-sm font-medium text-slate-400">
              <li><Link to="/services?category=Plumber" className="hover:text-[#3378BC] transition-colors">Plumbing & Waterworks</Link></li>
              <li><Link to="/services?category=Electrician" className="hover:text-[#3378BC] transition-colors">Electrical & Wiring</Link></li>
              <li><Link to="/services?category=Carpenter" className="hover:text-[#3378BC] transition-colors">Carpentry & Woodwork</Link></li>
              <li><Link to="/services?category=Painter" className="hover:text-[#3378BC] transition-colors">House Painting</Link></li>
              <li><Link to="/services?category=Cleaner" className="hover:text-[#3378BC] transition-colors">Deep House Cleaning</Link></li>
              <li><Link to="/services?category=Technician" className="hover:text-[#3378BC] transition-colors">Appliance Technician</Link></li>
            </ul>
          </div>

          {/* Cooperative Model */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-bold text-white tracking-wider uppercase">Cooperative Model</h4>
            <ul className="space-y-2.5 text-sm font-medium text-slate-400">
              <li><Link to="/worker-dashboard" className="hover:text-[#3378BC] transition-colors font-bold text-slate-200">Worker Member Dashboard</Link></li>
              <li><Link to="/cooperative" className="hover:text-[#3378BC] transition-colors">Cooperative Admin Portal</Link></li>
              <li><a href="#coop-benefits" className="hover:text-[#3378BC] transition-colors">Worker Welfare & Insurance</a></li>
              <li><a href="#verification" className="hover:text-[#3378BC] transition-colors">Skill Certification Protocol</a></li>
              <li><a href="#federations" className="hover:text-[#3378BC] transition-colors">Labour Cooperative Guilds</a></li>
              <li><Link to="/register" className="hover:text-[#3378BC] transition-colors">Register a Cooperative</Link></li>
            </ul>
          </div>

          {/* Contact & Support */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-bold text-white tracking-wider uppercase">Helpline & Support</h4>
            <div className="space-y-3 text-sm text-slate-400">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#3378BC] shrink-0 mt-0.5" />
                <span>Nagpur Cooperative Federation HQ, MH, India</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#3378BC] shrink-0" />
                <span>Toll-Free: 1800-425-SAHAKAAR</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#3378BC] shrink-0" />
                <span>support@sahakaar.coop</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4 font-medium">
          <p>© {new Date().getFullYear()} Sahakaar Platform. Smart India Hackathon Project.</p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-slate-400">
              Built with <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" /> for Indian Labour Cooperatives
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
