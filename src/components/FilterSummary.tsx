// components/FilterSummary.tsx

import React from "react";
import { type Donation, type DonationType } from "../types/donation";
import {
  getDonationTypeInfo,
  calculateFilteredSummary,
  formatCurrency,
} from "../utils/donationUtils";

interface FilterSummaryProps {
  donations: Donation[];
  filterType: DonationType | "all";
  filteredDonations: Donation[];
}

const FilterSummary: React.FC<FilterSummaryProps> = ({
  donations,
  filterType,
  filteredDonations,
}) => {
  if (filterType === "all" || filteredDonations.length === 0) {
    return null;
  }

  const typeInfo = getDonationTypeInfo(filterType);
  const summary = calculateFilteredSummary(donations, filterType);

  return (
    <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
      <h3 className="font-medium text-blue-900 mb-2">
        {typeInfo.icon} {typeInfo.label} Summary
      </h3>
      <div className="text-blue-800">
        <p>
          Total donations:{" "}
          <span className="font-semibold">{summary.count}</span>
        </p>
        {filterType === "money" ? (
          <p>
            Total amount:{" "}
            <span className="font-semibold">
              {formatCurrency(summary.total)}
            </span>
          </p>
        ) : (
          <p>
            Total quantity:{" "}
            <span className="font-semibold">{summary.total} items</span>
          </p>
        )}
      </div>
    </div>
  );
};

export default FilterSummary;
