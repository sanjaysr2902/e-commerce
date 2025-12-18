import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-black text-white border-t border-gray-800">
  
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
         
          <div className="md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <img src="/logo.png" alt="Sarax" className="h-10 w-10" />
              <span className="text-2xl font-serif font-bold text-[#8B0000]">Sarax</span>
            </div>
            <p className="text-gray-400 mb-4 text-sm">
              Premium car accessories for the modern driver. Quality, style, and performance.
            </p>
            <div className="flex space-x-3">
              {['Facebook', 'Instagram', 'Twitter', 'YouTube'].map((social) => (
                <a key={social} href="#" className="w-8 h-8 bg-gray-800 rounded flex items-center justify-center hover:bg-[#8B0000] transition">
                  <span className="text-xs text-gray-400 hover:text-white">{social[0]}</span>
                </a>
              ))}
            </div>
          </div>

        
          <div>
            <h3 className="font-bold mb-4">Shop</h3>
            <ul className="space-y-2 text-sm">
              {['Interior', 'Exterior', 'Performance', 'Lighting', 'Audio'].map((cat) => (
                <li key={cat}>
                  <Link to={`/products?category=${cat}`} className="text-gray-400 hover:text-[#8B0000] transition">
                    {cat} Accessories
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-bold mb-4">Support</h3>
            <ul className="space-y-2 text-sm">
              {['Contact', 'Shipping', 'Returns', 'FAQ', 'Track Order'].map((item) => (
                <li key={item}>
                  <Link to={`/${item.toLowerCase()}`} className="text-gray-400 hover:text-[#8B0000] transition">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Trust Section */}
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="flex space-x-6 text-sm text-gray-400">
            <span>🔒 Secure Payments</span>
            <span>🚚 Free Shipping</span>
            <span>⭐ 2-Year Warranty</span>
          </div>
          
          <div className="flex space-x-3">
            {['Visa', 'MC', 'PayPal'].map((pay) => (
              <div key={pay} className="text-xs bg-gray-800 px-2 py-1 rounded">
                {pay}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800 py-4">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} Sarax. All rights reserved.
            <span className="mx-2">•</span>
            <Link to="/privacy" className="hover:text-[#8B0000] transition">Privacy</Link>
            <span className="mx-2">•</span>
            <Link to="/terms" className="hover:text-[#8B0000] transition">Terms</Link>
          </p>
        </div>
      </div>
    </footer>
  );
}