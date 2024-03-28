import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white text-center p-4">
      <div className="flex flex-col items-center justify-center space-y-3">
        <div>
          <a href="/about" className="px-4 py-2 hover:text-gray-300">About Us</a>
          <a href="/support" className="px-4 py-2 hover:text-gray-300">Support</a>
          <a href="/terms" className="px-4 py-2 hover:text-gray-300">Terms of Service</a>
          <a href="/privacy" className="px-4 py-2 hover:text-gray-300">Privacy Policy</a>
        </div>
        <div>
          Follow us on:
          <a href="http://facebook.com" className="px-4 py-2 hover:text-gray-300">Facebook</a>
          <a href="http://twitter.com" className="px-4 py-2 hover:text-gray-300">Twitter</a>
          <a href="http://instagram.com" className="px-4 py-2 hover:text-gray-300">Instagram</a>
        </div>
        <div>
          © {new Date().getFullYear()} SportXchange. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
