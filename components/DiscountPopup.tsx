"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

export default function DiscountPopup() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Check if popup was already shown in this session
    const popupShown = sessionStorage.getItem("discountPopupShown");

    if (!popupShown) {
      // Show popup after 3 seconds
      const timer = setTimeout(() => {
        setIsOpen(true);
        sessionStorage.setItem("discountPopupShown", "true");
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg p-6 max-w-md w-full relative">
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            Special Offer!
          </h3>
          <p className="text-gray-600 mb-4">
            Use code <span className="font-bold text-blue-600">WW10</span> at
            checkout for 10% off your first order!
          </p>

          <div className="bg-gray-100 p-4 rounded-lg mb-4">
            <p className="text-sm text-gray-500 mb-1">Your discount code:</p>
            <p className="text-xl font-mono font-bold text-blue-600">WW10</p>
          </div>

          <Button onClick={() => setIsOpen(false)} className="w-full">
            Shop Now
          </Button>
        </div>
      </div>
    </div>
  );
}
