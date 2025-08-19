import React from "react";
import { PlusCircle, Filter } from "lucide-react";
import { type FilterControlsProps, type DonationType } from "../types/donation";
import { DONATION_TYPES } from "../constants/donationTypes";
import SearchBar from "./SearchBar";

const FilterControls: React.FC<FilterControlsProps> = ({
  filterType,
  onFilterChange,
  onAddNew,
  searchTerm,
  onSearchChange,
}) => {
  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onFilterChange(e.target.value as DonationType | "all");
  };

  return (
    <div className="space-y-4 mb-6">
      {/* Main Controls Row */}
      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={onAddNew}
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium flex items-center gap-2 transition-colors sm:flex-shrink-0"
        >
          <PlusCircle className="h-5 w-5" />
          Add New Donation
        </button>

        {/* Search Bar */}
        <SearchBar 
          searchTerm={searchTerm}
          onSearchChange={onSearchChange}
        />

        {/* Type Filter */}
        <div className="flex items-center gap-2 sm:flex-shrink-0">
          <Filter className="h-5 w-5 text-gray-600" />
          <select
            value={filterType}
            onChange={handleFilterChange}
            className="border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent min-w-0"
          >
            <option value="all">All Types</option>
            {DONATION_TYPES.map((type) => (
              <option key={type.value} value={type.value}>
                {type.icon} {type.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Active Filters Summary */}
      {(searchTerm || filterType !== "all") && (
        <div className="flex flex-wrap items-center gap-2 text-sm text-gray-600">
          <span>Active filters:</span>
          {searchTerm && (
            <span className="inline-flex items-center px-2 py-1 rounded-full bg-blue-100 text-blue-800">
              Search: "{searchTerm}"
            </span>
          )}
          {filterType !== "all" && (
            <span className="inline-flex items-center px-2 py-1 rounded-full bg-green-100 text-green-800">
              Type: {DONATION_TYPES.find(t => t.value === filterType)?.label}
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default FilterControls;