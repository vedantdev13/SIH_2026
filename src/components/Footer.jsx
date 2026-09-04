import React from 'react';
import { Link } from 'react-router-dom';
import { Users, ShieldCheck, Heart, Award, Phone, Mail, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-12 pb-8 border-t border-slate-800 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-slate-800">
          
          {/* Brand Info */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-emerald-600 flex items-center justify-center text-white">
                <Users className="w-5 h-5" />
              </div>
              <span className="text-xl font-bold text-white tracking-tight">SAHAKAAR</span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              Empowering Labour Cooperative Societies by connecting verified local skilled workers with households and businesses directly.
            </p>
            <div className="inline-flex items-center gap-2 bg-emerald-950/80 border border-emerald-800/60 px-3 py-1.5 rounded-lg text-emerald-300 text-xs font-semibold">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              Cooperative Welfare First
            </div>
          </div>

          {/* Customer Services */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-white tracking-wider uppercase">Marketplace Services</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/services?category=Plumber" className="hover:text-emerald-400 transition-colors">Plumbing & Waterworks</Link></li>
              <li><Link to="/services?category=Electrician" className="hover:text-emerald-400 transition-colors">Electrical & Wiring</Link></li>
              <li><Link to="/services?category=Carpenter" className="hover:text-emerald-400 transition-colors">Carpentry & Woodwork</Link></li>
              <li><Link to="/services?category=Painter" className="hover:text-emerald-400 transition-colors">House Painting</Link></li>
              <li><Link to="/services?category=Cleaner" className="hover:text-emerald-400 transition-colors">Deep House Cleaning</Link></li>
              <li><Link to="/services?category=Technician" className="hover:text-emerald-400 transition-colors">Appliance Technician</Link></li>
            </ul>
          </div>

          {/* Cooperative Ecosystem */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-white tracking-wider uppercase">Cooperative Model</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/worker-dashboard" className="hover:text-emerald-400 transition-colors font-bold text-emerald-300">Worker Member Dashboard</Link></li>
              <li><Link to="/cooperative" className="hover:text-emerald-400 transition-colors">Cooperative Admin Portal</Link></li>
              <li><a href="#coop-benefits" className="hover:text-emerald-400 transition-colors">Worker Welfare & Insurance</a></li>
              <li><a href="#verification" className="hover:text-emerald-400 transition-colors">Skill Certification Protocol</a></li>
              <li><a href="#federations" className="hover:text-emerald-400 transition-colors">Labour Cooperative Guilds</a></li>
              <li><Link to="/register" className="hover:text-emerald-400 transition-colors">Register a Cooperative</Link></li>
            </ul>
          </div>

          {/* Contact & Support */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-white tracking-wider uppercase">Coop Helpline & Support</h4>
            <div className="space-y-2 text-sm text-slate-400">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Nagpur Cooperative Federation HQ, MH, India</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Toll-Free: 1800-425-SAHAKAAR (7242)</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>support@sahakaar.coop</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} Sahakaar Platform. Smart India Hackathon Project.</p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-slate-400">
              Built with <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" /> for Indian Labour Cooperatives
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
