import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-50 border-t mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-sm text-gray-600">
              Powered by{' '}
              <a
                href="https://lenilani.com"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-primary hover:underline"
              >
                LeniLani Consulting
              </a>
            </p>
            <p className="text-xs text-gray-500 mt-1">
              Expert AI consulting and implementation services
            </p>
          </div>
          <div className="flex gap-6 text-sm text-gray-600">
            <a
              href="https://lenilani.com/contact"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary"
            >
              Contact Us
            </a>
            <a
              href="https://lenilani.com/services"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary"
            >
              Services
            </a>
            <a
              href="https://lenilani.com/about"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary"
            >
              About
            </a>
          </div>
        </div>
        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} LeniLani Consulting. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};