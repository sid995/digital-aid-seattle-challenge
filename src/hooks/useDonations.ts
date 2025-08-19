import { useState, useEffect, useMemo } from "react";
import {
  type Donation,
  type DonationType,
  type FormData,
  type SearchAndSortState,
} from "../types/donation";
import { SAMPLE_DONATIONS } from "../constants/donationTypes";
import { generateDonationId } from "../utils/donationUtils";

interface UseDonationsReturn {
  donations: Donation[];
  filteredDonations: Donation[];
  addDonation: (donationData: FormData) => void;
  updateDonation: (id: number, donationData: FormData) => void;
  deleteDonation: (id: number) => void;
  filterType: DonationType | "all";
  setFilterType: (type: DonationType | "all") => void;
  searchAndSort: SearchAndSortState;
  setSearchAndSort: (state: Partial<SearchAndSortState>) => void;
}

export const useDonations = (): UseDonationsReturn => {
  const [donations, setDonations] = useState<Donation[]>([]);
  const [filterType, setFilterType] = useState<DonationType | "all">("all");
  const [searchAndSort, setSearchAndSortState] = useState<SearchAndSortState>({
    searchTerm: "",
    sortBy: "date",
    sortOrder: "desc",
    dateFrom: "",
    dateTo: "",
    amountMin: "",
    amountMax: "",
  });

  // Initialize with sample data
  useEffect(() => {
    setDonations(SAMPLE_DONATIONS);
  }, []);

  const setSearchAndSort = (updates: Partial<SearchAndSortState>) => {
    setSearchAndSortState(prev => ({ ...prev, ...updates }));
  };

  // Memoized filtered and sorted donations
  const filteredDonations = useMemo(() => {
    let result = donations;

    // Apply type filter
    if (filterType !== "all") {
      result = result.filter(donation => donation.donationType === filterType);
    }

    // Apply search filter
    if (searchAndSort.searchTerm) {
      const searchTerm = searchAndSort.searchTerm.toLowerCase();
      result = result.filter(donation =>
        donation.donorName.toLowerCase().includes(searchTerm) ||
        donation.donationType.toLowerCase().includes(searchTerm)
      );
    }

    // Apply date range filter
    if (searchAndSort.dateFrom) {
      result = result.filter(donation => donation.date >= searchAndSort.dateFrom);
    }
    if (searchAndSort.dateTo) {
      result = result.filter(donation => donation.date <= searchAndSort.dateTo);
    }

    // Apply amount range filter
    if (searchAndSort.amountMin) {
      const minAmount = parseFloat(searchAndSort.amountMin);
      result = result.filter(donation => parseFloat(donation.amount) >= minAmount);
    }
    if (searchAndSort.amountMax) {
      const maxAmount = parseFloat(searchAndSort.amountMax);
      result = result.filter(donation => parseFloat(donation.amount) <= maxAmount);
    }

    // Apply sorting
    result.sort((a, b) => {
      let aValue: string | number;
      let bValue: string | number;

      switch (searchAndSort.sortBy) {
        case "amount":
          aValue = parseFloat(a.amount);
          bValue = parseFloat(b.amount);
          break;
        case "date":
          aValue = new Date(a.date).getTime();
          bValue = new Date(b.date).getTime();
          break;
        case "donorName":
          aValue = a.donorName.toLowerCase();
          bValue = b.donorName.toLowerCase();
          break;
        case "donationType":
          aValue = a.donationType;
          bValue = b.donationType;
          break;
        default:
          aValue = a.date;
          bValue = b.date;
      }

      if (aValue < bValue) return searchAndSort.sortOrder === "asc" ? -1 : 1;
      if (aValue > bValue) return searchAndSort.sortOrder === "asc" ? 1 : -1;
      return 0;
    });

    return result;
  }, [donations, filterType, searchAndSort]);

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
    filteredDonations,
    addDonation,
    updateDonation,
    deleteDonation,
    filterType,
    setFilterType,
    searchAndSort,
    setSearchAndSort,
  };
};