import { useState } from "react";
import "./App.css";

import { useDonations } from "./hooks/useDonations";

import DonationForm from "./components/DonationForm";
import DonationList from "./components/DonationList";
import StatsDashboard from "./components/StatsDashboard";
import FilterControls from "./components/FilterControls";
import FilterSummary from "./components/FilterSummary";

import { calculateStats, filterDonations } from "./utils/donationUtils";

import { type Donation, type FormData } from "./types/donation";

export default function App() {
  const [showForm, setShowForm] = useState(false);
  const [editingDonation, setEditingDonation] = useState<Donation | null>(null);

  // Use custom hook for donation management
  const {
    donations,
    addDonation,
    updateDonation,
    deleteDonation,
    filterType,
    setFilterType,
  } = useDonations();

  // Calculate filtered donations
  const filteredDonations = filterDonations(donations, filterType);

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 p-4">
      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            🐾 Paws & Hearts Animal Shelter
          </h1>
          <p className="text-gray-600 text-lg">Donation Management System</p>
        </header>

        {/* Statistics Dashboard */}
        <StatsDashboard stats={stats} />

        {/* Filter Controls */}
        <FilterControls
          filterType={filterType}
          onFilterChange={setFilterType}
          onAddNew={handleAddNew}
        />

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
