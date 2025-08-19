import { useState } from "react";
import "./App.css";

import { useDonations } from "./hooks/useDonations";

import DonationForm from "./components/DonationForm";
import DonationList from "./components/DonationList";
import StatsDashboard from "./components/StatsDashboard";
import FilterControls from "./components/FilterControls";
import FilterSummary from "./components/FilterSummary";
import AdvancedFilters from "./components/AdvancedFilters";

import { calculateStats } from "./utils/donationUtils";
import { exportToCSV } from "./utils/exportUtils";

import { type Donation, type FormData } from "./types/donation";

export default function App() {
  const [showForm, setShowForm] = useState(false);
  const [editingDonation, setEditingDonation] = useState<Donation | null>(null);

  const {
    donations,
    filteredDonations,
    addDonation,
    updateDonation,
    deleteDonation,
    filterType,
    setFilterType,
    searchAndSort,
    setSearchAndSort,
  } = useDonations();

  // Calculate statistics
  const stats = calculateStats(donations);

  /**
   * Handle form submission for adding or updating donations
   */
  const handleFormSubmit = (donationData: FormData) => {
    if (editingDonation) {
      updateDonation(editingDonation.id, donationData);
      setEditingDonation(null);
    } else {
      addDonation(donationData);
    }
    setShowForm(false);
  };

  /**
   * Handle editing a donation
   */
  const handleEdit = (donation: Donation) => {
    setEditingDonation(donation);
    setShowForm(true);
  };

  /**
   * Handle form cancellation
   */
  const handleCancel = () => {
    setShowForm(false);
    setEditingDonation(null);
  };

  /**
   * Handle opening the add new donation form
   */
  const handleAddNew = () => {
    setEditingDonation(null);
    setShowForm(true);
  };

  /**
   * Handle CSV export
   */
  const handleExportCSV = () => {
    exportToCSV(filteredDonations);
  };

  /**
   * Handle search term change
   */
  const handleSearchChange = (searchTerm: string) => {
    setSearchAndSort({ searchTerm });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            🐾 Paws & Hearts Animal Shelter
          </h1>
          <p className="text-gray-600 text-lg">Donation Management System</p>
        </header>

        {/* Statistics Dashboard */}
        <StatsDashboard stats={stats} />

        {/* Filter Controls with Search */}
        <FilterControls
          filterType={filterType}
          onFilterChange={setFilterType}
          onAddNew={handleAddNew}
          searchTerm={searchAndSort.searchTerm}
          onSearchChange={handleSearchChange}
        />

        {/* Advanced Filters */}
        <div className="mb-6">
          <AdvancedFilters
            filters={searchAndSort}
            onFiltersChange={setSearchAndSort}
            onExportCSV={handleExportCSV}
          />
        </div>

        {/* Donation Form Modal */}
        <DonationForm
          isOpen={showForm}
          donation={editingDonation}
          onSubmit={handleFormSubmit}
          onCancel={handleCancel}
        />

        {/* Donations List */}
        <DonationList
          donations={filteredDonations}
          onEdit={handleEdit}
          onDelete={deleteDonation}
          filterType={filterType}
        />

        {/* Filter Summary */}
        <FilterSummary
          donations={donations}
          filterType={filterType}
          filteredDonations={filteredDonations}
        />

        {/* Results Summary */}
        {(searchAndSort.searchTerm || 
          searchAndSort.dateFrom || 
          searchAndSort.dateTo || 
          searchAndSort.amountMin || 
          searchAndSort.amountMax ||
          filterType !== "all") && (
          <div className="mt-4 text-center text-sm text-gray-600">
            Showing {filteredDonations.length} of {donations.length} donations
            {searchAndSort.searchTerm && (
              <span> matching "{searchAndSort.searchTerm}"</span>
            )}
          </div>
        )}

        {/* Footer */}
        <footer className="text-center mt-8 text-gray-500 text-sm">
          <p>
            💝 Thank you for supporting our furry friends! Every donation makes
            a difference. 🐾
          </p>
        </footer>
      </div>
    </div>
  );
}