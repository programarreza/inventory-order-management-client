"use client";

import ActivityLogFeed from "@/components/Dashboard/ActivityLogFeed";
import ProductSummaryTable from "@/components/Dashboard/ProductSummaryTable";
import StatCard from "@/components/Dashboard/StatCard";
import useLoggedUser from "@/hooks/auth.hook";
import { useGetDashboardStatsQuery } from "@/lib/Redux/features/dashboard/dashboardApi";
import { Spinner } from "@heroui/react";
import { motion } from "framer-motion";
import {
  AlertTriangle,
  CheckCircle,
  Clock,
  DollarSign,
  ShoppingBag
} from "lucide-react";

const DashboardPage = () => {
  const { data, isLoading, isError } = useGetDashboardStatsQuery({});
  const user = useLoggedUser();

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <Spinner size="lg" color="accent" />
        <p className="text-default-500 animate-pulse">Loading dashboard data...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-danger">
        <AlertTriangle className="w-12 h-12 mb-4" />
        <h2 className="text-2xl font-bold">Error loading dashboard</h2>
        <p className="mt-2 text-default-500">Please check your connection and try again.</p>
      </div>
    );
  }

  const stats = data?.data;

  const statCards = [
    {
      title: "Total Orders Today",
      value: stats?.totalOrdersToday || 0,
      icon: ShoppingBag,
      color: "bg-blue-500",
    },
    {
      title: "Revenue Today",
      value: `$${stats?.revenueToday?.toLocaleString() || 0}`,
      icon: DollarSign,
      color: "bg-emerald-500",
    },
    {
      title: "Pending Orders",
      value: stats?.pendingOrdersCount || 0,
      icon: Clock,
      color: "bg-amber-500",
    },
    {
      title: "Completed Orders",
      value: stats?.completedOrdersCount || 0,
      icon: CheckCircle,
      color: "bg-indigo-500",
    },
    {
      title: "Low Stock Items",
      value: stats?.lowStockItemsCount || 0,
      icon: AlertTriangle,
      color: "bg-rose-500",
    },
  ];

  return (
    <div className="p-4 sm:p-8 max-w-[1600px] mx-auto space-y-10 mb-20 md:mb-10">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
      >
        <div>
          <h1 className="text-4xl font-black tracking-tight bg-gradient-to-br from-default-800 to-default-400 bg-clip-text text-transparent">
            Dashboard Overview
          </h1>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {statCards.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="xl:col-span-2"
        >
          <ProductSummaryTable products={stats?.productSummary || []} />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <ActivityLogFeed activities={stats?.recentActivities || []} />
        </motion.div>
      </div>
    </div>
  );
};

export default DashboardPage;
