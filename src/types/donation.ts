// types/donation.ts

export interface Donation {
  id: number;
  donorName: string;
  donationType: DonationType;
  amount: string;
  date: string;
}

export type DonationType =
  | "money"
  | "food"
  | "clothing"
  | "toys"
  | "medical"
  | "other";

export interface DonationTypeInfo {
  value: DonationType;
  label: string;
  icon: string;
}

export interface FormData {
  donorName: string;
  donationType: DonationType;
  amount: string;
  date: string;
}

export interface FormErrors {
  donorName?: string;
  amount?: string;
  date?: string;
}

export interface DonationStats {
  totalMoneyDonated: number;
  totalDonations: number;
  monthlyDonations: number;
}

export interface DonationFormProps {
  isOpen: boolean;
  donation: Donation | null;
  onSubmit: (donation: Omit<Donation, "id">) => void;
  onCancel: () => void;
}

export interface DonationListProps {
  donations: Donation[];
  onEdit: (donation: Donation) => void;
  onDelete: (id: number) => void;
  filterType: DonationType | "all";
}

export interface StatsCardProps {
  title: string;
  value: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}

export interface FilterControlsProps {
  filterType: DonationType | "all";
  onFilterChange: (type: DonationType | "all") => void;
  onAddNew: () => void;
}
