import { Card, CardContent as CardBody } from "@heroui/react";
import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import React from "react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  color: string;
  description?: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon: Icon, color, description }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="border-none bg-background/60 dark:bg-default-100/50 backdrop-blur-md shadow-lg hover:shadow-xl transition-shadow duration-300">
        <CardBody className="flex flex-row items-center gap-4 p-6">
          <div className={`${color} p-3 rounded-2xl bg-opacity-10 flex items-center justify-center`}>
            <Icon className={`w-8 h-8  text-white ${color.replace('bg-', 'text-')}`} />
          </div>
          <div className="flex flex-col">
            <p className="text-sm font-medium text-default-500 uppercase tracking-wider">{title}</p>
            <h3 className="text-2xl font-bold mt-1 tracking-tight">{value}</h3>
            {description && (
              <p className="text-xs text-default-400 mt-1">{description}</p>
            )}
          </div>
        </CardBody>
      </Card>
    </motion.div>
  );
};

export default StatCard;
