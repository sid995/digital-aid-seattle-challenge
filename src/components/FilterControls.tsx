import React from "react";
import { PlusCircle, Filter } from "lucide-react";
import { type FilterControlsProps, type DonationType } from "../types/donation";
import { DONATION_TYPES } from "../constants/donationTypes";

const FilterControls: React.FC<FilterControlsProps> = ({
  filterType,
  onFilterChange,
  onAddNew,
}) => {
  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onFilterChange(e.target.value as DonationType | "all");
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-6">
      <button
        onClick={onAddNew}
        className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium flex items-center gap-2 transition-colors"
      >
        <PlusCircle className="h-5 w-5" />
        Add New Donation
      </button>

      <div className="flex items-center gap-2">
        <Filter className="h-5 w-5 text-gray-600" />
        <select
          value={filterType}
          onChange={handleFilterChange}
          className="border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="all">All Donations</option>
          {DONATION_TYPES.map((type) => (
            <option key={type.value} value={type.value}>
              {type.icon} {type.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default FilterControls;
