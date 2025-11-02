import React from "react";

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-6 mt-10">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-4">
        <p className="text-sm">© {new Date().getFullYear()} MyWebsite. All rights reserved.</p>
        
        <ul className="flex space-x-6 mt-4 md:mt-0">
          <li>
            <a href="#privacy" className="hover:text-gray-400">
              Privacy Policy
            </a>
          </li>
          <li>
            <a href="#terms" className="hover:text-gray-400">
              Terms of Service
            </a>
          </li>
          <li>
            <a href="#contact" className="hover:text-gray-400">
              Contact
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
