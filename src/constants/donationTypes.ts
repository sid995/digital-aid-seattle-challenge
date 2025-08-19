import { type DonationTypeInfo } from "../types/donation";

export const DONATION_TYPES: DonationTypeInfo[] = [
  { value: "money", label: "Money", icon: "💰" },
  { value: "food", label: "Pet Food", icon: "🥫" },
  { value: "clothing", label: "Clothing/Bedding", icon: "👕" },
  { value: "toys", label: "Pet Toys", icon: "🎾" },
  { value: "medical", label: "Medical Supplies", icon: "💊" },
  { value: "other", label: "Other", icon: "📦" },
];

export const SAMPLE_DONATIONS = [
  {
    id: 1,
    donorName: "Sarah Johnson",
    donationType: "money" as const,
    amount: "500",
    date: "2024-08-15",
  },
  {
    id: 2,
    donorName: "Mike Chen",
    donationType: "food" as const,
    amount: "20",
    date: "2024-08-14",
  },
  {
    id: 3,
    donorName: "Emily Davis",
    donationType: "clothing" as const,
    amount: "5",
    date: "2024-08-13",
  },
];
