"use client";

import ActivityLogFeed from "@/components/Dashboard/ActivityLogFeed";
import { DashboardSkeleton } from "@/components/Dashboard/DashboardSkeleton";
import ProductSummaryTable from "@/components/Dashboard/ProductSummaryTable";
import { StatCards } from "@/components/StatCards";
import { useGetDashboardStatsQuery } from "@/lib/Redux/features/dashboard/dashboardApi";
import { motion } from "framer-motion";
import {
  AlertTriangle
} from "lucide-react";

const DashboardPage = () => {
  const { data, isLoading, isError } = useGetDashboardStatsQuery({});

  if (isLoading) {
    return (
      <DashboardSkeleton/>
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
      <StatCards stats={stats} />

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
