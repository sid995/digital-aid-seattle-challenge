import React from "react";
import { Edit2, Trash2, Gift } from "lucide-react";
import { type DonationListProps } from "../types/donation";
import { getDonationTypeInfo, formatCurrency } from "../utils/donationUtils";

const DonationList: React.FC<DonationListProps> = ({
  donations,
  onEdit,
  onDelete,
  filterType,
}) => {
  const handleDelete = (id: number, donorName: string) => {
    if (
      window.confirm(`Are you sure you want to delete ${donorName}'s donation?`)
    ) {
      onDelete(id);
    }
  };

  const getFilteredDisplayText = () => {
    if (filterType === "all") return "";
    const typeInfo = getDonationTypeInfo(filterType);
    return ` (Filtered by ${typeInfo.label})`;
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800">
          Donation Records{getFilteredDisplayText()}
        </h2>
        <p className="text-gray-600 text-sm">
          Showing {donations.length} donation{donations.length !== 1 ? "s" : ""}
        </p>
      </div>

      <div className="overflow-x-auto">
        {donations.length === 0 ? (
          <div className="text-center py-12">
            <Gift className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">
              {filterType === "all"
                ? "No donations recorded yet"
                : `No ${getDonationTypeInfo(
                    filterType
                  ).label.toLowerCase()} donations found`}
            </p>
            <p className="text-gray-400">
              Start by adding your first donation above!
            </p>
          </div>
        ) : (
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Donor
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount/Quantity
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {donations.map((donation) => {
                const typeInfo = getDonationTypeInfo(donation.donationType);
                return (
                  <tr key={donation.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium text-gray-900">
                        {donation.donorName}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                        {typeInfo.icon} {typeInfo.label}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-900">
                      {donation.donationType === "money"
                        ? formatCurrency(parseFloat(donation.amount))
                        : `${donation.amount} items`}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                      {new Date(donation.date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => onEdit(donation)}
                          className="text-blue-600 hover:text-blue-800 p-1"
                          title="Edit donation"
                          aria-label={`Edit ${donation.donorName}'s donation`}
                        >
                          <Edit2 className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() =>
                            handleDelete(donation.id, donation.donorName)
                          }
                          className="text-red-600 hover:text-red-800 p-1"
                          title="Delete donation"
                          aria-label={`Delete ${donation.donorName}'s donation`}
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default DonationList;
