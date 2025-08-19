import { useState, useEffect } from "react";
import {
  type Donation,
  type DonationType,
  type FormData,
} from "../types/donation";
import { SAMPLE_DONATIONS } from "../constants/donationTypes";
import { generateDonationId } from "../utils/donationUtils";

interface UseDonationsReturn {
  donations: Donation[];
  addDonation: (donationData: FormData) => void;
  updateDonation: (id: number, donationData: FormData) => void;
  deleteDonation: (id: number) => void;
  filterType: DonationType | "all";
  setFilterType: (type: DonationType | "all") => void;
}

export const useDonations = (): UseDonationsReturn => {
  const [donations, setDonations] = useState<Donation[]>([]);
  const [filterType, setFilterType] = useState<DonationType | "all">("all");

  // Initialize with sample data
  useEffect(() => {
    setDonations(SAMPLE_DONATIONS);
  }, []);

  const addDonation = (donationData: FormData) => {
    const newDonation: Donation = {
      ...donationData,
      id: generateDonationId(),
    };
    setDonations((prev) => [newDonation, ...prev]);
  };

  const updateDonation = (id: number, donationData: FormData) => {
    setDonations((prev) =>
      prev.map((donation) =>
        donation.id === id ? { ...donationData, id } : donation
      )
    );
  };

  const deleteDonation = (id: number) => {
    setDonations((prev) => prev.filter((donation) => donation.id !== id));
  };

  return {
    donations,
    addDonation,
    updateDonation,
    deleteDonation,
    filterType,
    setFilterType,
  };
};
