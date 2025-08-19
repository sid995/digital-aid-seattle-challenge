import React, { useState } from "react";
import { 
  Filter, 
  ChevronDown, 
  ChevronUp, 
  Download,
  SortAsc,
  SortDesc,
  Calendar,
  DollarSign
} from "lucide-react";
import { type AdvancedFiltersProps, type SortOption } from "../types/donation";

const FILTER_OPTIONS = [
  { key: "date", label: "Date", icon: Calendar },
  { key: "amount", label: "Amount", icon: DollarSign },
  { key: "donorName", label: "Donor Name", icon: null },
  { key: "donationType", label: "Type", icon: Filter },
]

const AdvancedFilters: React.FC<AdvancedFiltersProps> = ({
  filters,
  onFiltersChange,
  onExportCSV,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSortChange = (field: SortOption) => {
    const newOrder =
      filters.sortBy === field && filters.sortOrder === "asc" ? "desc" : "asc";
    onFiltersChange({ sortBy: field, sortOrder: newOrder });
  };

  const clearAdvancedFilters = () => {
    onFiltersChange({
      dateFrom: "",
      dateTo: "",
      amountMin: "",
      amountMax: "",
    });
  };

  const hasActiveFilters = 
    filters.dateFrom || 
    filters.dateTo || 
    filters.amountMin || 
    filters.amountMax;

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
      <div className="p-4">
        <div className="flex items-center justify-between">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-2 text-left hover:text-blue-600 transition-colors"
          >
            <Filter className="h-5 w-5 text-gray-600" />
            <span className="font-medium text-gray-900">Advanced Filters</span>
            {hasActiveFilters && (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                Active
              </span>
            )}
            {isExpanded ? (
              <ChevronUp className="h-4 w-4 text-gray-400" />
            ) : (
              <ChevronDown className="h-4 w-4 text-gray-400" />
            )}
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={onExportCSV}
              className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-50 rounded-md transition-colors"
              title="Export to CSV"
            >
              <Download className="h-4 w-4" />
              Export CSV
            </button>
          </div>
        </div>

        {isExpanded && (
          <div className="mt-6 space-y-6">
            {/* Sort Options */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Sort By
              </label>
              <div className="flex flex-wrap gap-2">
                {FILTER_OPTIONS.map(({ key, label, icon: Icon }) => (
                  <button
                    key={key}
                    onClick={() => handleSortChange(key as SortOption)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      filters.sortBy === key
                        ? "bg-blue-100 text-blue-800 border border-blue-200"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {Icon && <Icon className="h-4 w-4" />}
                    {label}
                    {filters.sortBy === key && (
                      <span className="ml-1">
                        {filters.sortOrder === "asc" ? (
                          <SortAsc className="h-3 w-3" />
                        ) : (
                          <SortDesc className="h-3 w-3" />
                        )}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Date Range Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Date Range
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-gray-500 mb-1">From</label>
                  <input
                    type="date"
                    value={filters.dateFrom}
                    onChange={(e) => onFiltersChange({ dateFrom: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">To</label>
                  <input
                    type="date"
                    value={filters.dateTo}
                    onChange={(e) => onFiltersChange({ dateTo: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  />
                </div>
              </div>
            </div>

            {/* Amount Range Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Amount Range
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Min Amount</label>
                  <input
                    type="number"
                    value={filters.amountMin}
                    onChange={(e) => onFiltersChange({ amountMin: e.target.value })}
                    placeholder="0"
                    min="0"
                    step="0.01"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Max Amount</label>
                  <input
                    type="number"
                    value={filters.amountMax}
                    onChange={(e) => onFiltersChange({ amountMax: e.target.value })}
                    placeholder="10000"
                    min="0"
                    step="0.01"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  />
                </div>
              </div>
            </div>

            {/* Clear Filters */}
            {hasActiveFilters && (
              <div className="flex justify-end pt-4 border-t border-gray-200">
                <button
                  onClick={clearAdvancedFilters}
                  className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 transition-colors"
                >
                  Clear Advanced Filters
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdvancedFilters;