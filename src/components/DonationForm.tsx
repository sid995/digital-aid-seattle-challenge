// components/DonationForm.tsx

import React, { useState, useEffect } from "react";
import {
  type DonationFormProps,
  type FormData,
  type FormErrors,
} from "../types/donation";
import { DONATION_TYPES } from "../constants/donationTypes";
import { validateDonationForm, getTodayDate } from "../utils/donationUtils";

const DonationForm: React.FC<DonationFormProps> = ({
  isOpen,
  donation,
  onSubmit,
  onCancel,
}) => {
  const [formData, setFormData] = useState<FormData>({
    donorName: "",
    donationType: "money",
    amount: "",
    date: getTodayDate(),
  });

  const [errors, setErrors] = useState<FormErrors>({});

  // Update form when editing a donation
  useEffect(() => {
    if (donation) {
      setFormData({
        donorName: donation.donorName,
        donationType: donation.donationType,
        amount: donation.amount,
        date: donation.date,
      });
    } else {
      setFormData({
        donorName: "",
        donationType: "money",
        amount: "",
        date: getTodayDate(),
      });
    }
    setErrors({});
  }, [donation, isOpen]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const validationErrors = validateDonationForm(formData);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    onSubmit(formData);
  };

  const handleCancel = () => {
    setFormData({
      donorName: "",
      donationType: "money",
      amount: "",
      date: getTodayDate(),
    });
    setErrors({});
    onCancel();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            {donation ? "Edit Donation" : "Add New Donation"}
          </h2>

          <div className="space-y-4">
            {/* Donor Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Donor Name *
              </label>
              <input
                type="text"
                name="donorName"
                value={formData.donorName}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.donorName ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Enter donor's full name"
              />
              {errors.donorName && (
                <p className="text-red-500 text-sm mt-1">{errors.donorName}</p>
              )}
            </div>

            {/* Donation Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Donation Type
              </label>
              <select
                name="donationType"
                value={formData.donationType}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {DONATION_TYPES.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.icon} {type.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Amount/Quantity */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {formData.donationType === "money" ? "Amount ($)" : "Quantity"}{" "}
                *
              </label>
              <input
                type="number"
                name="amount"
                value={formData.amount}
                onChange={handleInputChange}
                min="0"
                step={formData.donationType === "money" ? "0.01" : "1"}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.amount ? "border-red-500" : "border-gray-300"
                }`}
                placeholder={formData.donationType === "money" ? "0.00" : "0"}
              />
              {errors.amount && (
                <p className="text-red-500 text-sm mt-1">{errors.amount}</p>
              )}
            </div>

            {/* Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Date *
              </label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                max={getTodayDate()}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.date ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.date && (
                <p className="text-red-500 text-sm mt-1">{errors.date}</p>
              )}
            </div>

            {/* Form Buttons */}
            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={handleSubmit}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-medium transition-colors"
              >
                {donation ? "Update Donation" : "Add Donation"}
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 py-3 rounded-lg font-medium transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonationForm;
