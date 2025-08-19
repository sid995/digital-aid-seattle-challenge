import {
  type Donation,
  type DonationStats,
  type DonationType,
  type DonationTypeInfo,
  type FormData,
  type FormErrors,
} from "../types/donation";
import { DONATION_TYPES } from "../constants/donationTypes";

/**
 * Get donation type information by type value
 */
export const getDonationTypeInfo = (type: DonationType): DonationTypeInfo => {
  return (
    DONATION_TYPES.find((dt) => dt.value === type) || {
      value: type,
      label: type,
      icon: "📦",
    }
  );
};

/**
 * Format currency amount
 */
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
};

/**
 * Calculate donation statistics
 */
export const calculateStats = (donations: Donation[]): DonationStats => {
  const totalMoneyDonated = donations
    .filter((d) => d.donationType === "money")
    .reduce((sum, d) => sum + parseFloat(d.amount), 0);

  const currentDate = new Date();
  const monthlyDonations = donations.filter((d) => {
    const donationDate = new Date(d.date);
    return (
      donationDate.getMonth() === currentDate.getMonth() &&
      donationDate.getFullYear() === currentDate.getFullYear()
    );
  }).length;

  return {
    totalMoneyDonated,
    totalDonations: donations.length,
    monthlyDonations,
  };
};

/**
 * Filter donations by type
 */
export const filterDonations = (
  donations: Donation[],
  filterType: DonationType | "all"
): Donation[] => {
  return filterType === "all"
    ? donations
    : donations.filter((donation) => donation.donationType === filterType);
};

/**
 * Calculate filtered donation summary
 */
export const calculateFilteredSummary = (
  donations: Donation[],
  filterType: DonationType
): { count: number; total: number } => {
  const filtered = donations.filter((d) => d.donationType === filterType);
  const total = filtered.reduce((sum, d) => sum + parseFloat(d.amount), 0);

  return {
    count: filtered.length,
    total,
  };
};

/**
 * Validate donation form data
 */
export const validateDonationForm = (formData: FormData): FormErrors => {
  const errors: FormErrors = {};

  if (!formData.donorName.trim()) {
    errors.donorName = "Donor name is required";
  }

  if (!formData.amount || parseFloat(formData.amount) <= 0) {
    errors.amount = "Please enter a valid amount/quantity greater than 0";
  }

  if (!formData.date) {
    errors.date = "Date is required";
  }

  return errors;
};

/**
 * Generate unique ID for new donations
 */
export const generateDonationId = (): number => {
  return Date.now();
};

/**
 * Get today's date in YYYY-MM-DD format
 */
export const getTodayDate = (): string => {
  return new Date().toISOString().split("T")[0];
};
