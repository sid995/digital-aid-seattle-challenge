// components/StatsDashboard.tsx

import React from "react";
import { DollarSign, Gift, TrendingUp } from "lucide-react";
import { type DonationStats, type StatsCardProps } from "../types/donation";
import { formatCurrency } from "../utils/donationUtils";

interface StatsDashboardProps {
  stats: DonationStats;
}

const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  icon: Icon,
  color,
}) => {
  return (
    <div
      className={`bg-white rounded-xl shadow-lg p-6 border-l-4 border-${color}-500`}
    >
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">
            {title}
          </h3>
          <p className={`text-3xl font-bold text-${color}-600`}>{value}</p>
        </div>
        <Icon className={`h-12 w-12 text-${color}-500`} />
      </div>
    </div>
  );
};

const StatsDashboard: React.FC<StatsDashboardProps> = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <StatsCard
        title="Total Money Donated"
        value={formatCurrency(stats.totalMoneyDonated)}
        icon={DollarSign}
        color="green"
      />

      <StatsCard
        title="Total Donations"
        value={stats.totalDonations.toString()}
        icon={Gift}
        color="blue"
      />

      <StatsCard
        title="This Month"
        value={stats.monthlyDonations.toString()}
        icon={TrendingUp}
        color="purple"
      />
    </div>
  );
};

export default StatsDashboard;
