import {
	AlertTriangle,
	CheckCircle,
	Clock,
	DollarSign,
	ShoppingBag
} from "lucide-react";
import StatCard from "./Dashboard/StatCard";

export const StatCards = ({ stats }: any) => {
  const statCardsData = [
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
  ]
    return(
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 grid-wrap">
      {statCardsData?.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>
    )
}