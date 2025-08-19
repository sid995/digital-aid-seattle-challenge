import { type Donation } from "../types/donation";
import { getDonationTypeInfo, formatCurrency } from "./donationUtils";

/**
 * Export donations to CSV format
 */
export const exportToCSV = (donations: Donation[], filename?: string): void => {
  const headers = [
    "Date",
    "Donor Name", 
    "Donation Type",
    "Amount/Quantity"
  ];

  const csvContent = [
    headers.join(","),
    ...donations.map((donation) => {
      const typeInfo = getDonationTypeInfo(donation.donationType);
      const amount = donation.donationType === "money" 
        ? formatCurrency(parseFloat(donation.amount))
        : `${donation.amount} items`;
      
      return [
        donation.date,
        `"${donation.donorName}"`,
        `"${typeInfo.label}"`,
        `"${amount}"`
      ].join(",");
    })
  ].join("\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute(
      "download", 
      filename || `donations-${new Date().toISOString().split("T")[0]}.csv`
    );
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }
};