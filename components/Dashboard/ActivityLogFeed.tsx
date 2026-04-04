import { ScrollShadow } from "@heroui/react";
import { formatDistanceToNow } from "date-fns";
import { Clock } from "lucide-react";
import React from "react";

interface ActivityLog {
  message: string;
  timestamp: string | Date;
  user?: string;
}

interface ActivityLogFeedProps {
  activities: ActivityLog[];
}

const ActivityLogFeed: React.FC<ActivityLogFeedProps> = ({ activities }) => {
  return (
    <div className="bg-background/60 dark:bg-default-50/50 backdrop-blur-md rounded-2xl p-6 shadow-sm border border-divider">
      <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
        <Clock className="w-5 h-5 text-primary" />
        Activity Log
      </h3>
      <ScrollShadow className="h-[400px] pr-2">
        {activities.length === 0 ? (
          <p className="text-default-400 text-center py-10 italic">No recent activities</p>
        ) : (
          <div className="space-y-6 relative before:absolute before:left-3 before:top-2 before:bottom-2 before:w-px before:bg-divider">
            {activities.map((activity, index) => (
              <div key={index} className="relative pl-8 group">
                <div className="absolute left-1.5 top-1.5 w-3 h-3 rounded-full bg-primary border-4 border-background group-hover:scale-125 transition-transform duration-300 shadow-sm" />
                <div className="flex flex-col gap-1">
                  <p className="text-sm font-medium text-default-700 leading-snug tracking-tight">
                    {activity.message}
                  </p>
                  <div className="flex items-center gap-2 text-xs text-default-400 font-mono">
                    <span>{formatDistanceToNow(new Date(activity.timestamp), { addSuffix: true })}</span>
                    {activity.user && (
                      <>
                        <span className="w-1 h-1 rounded-full bg-default-300" />
                        <span className="bg-default-100 px-1.5 py-0.5 rounded uppercase tracking-wider text-[10px] font-semibold text-default-500">
                          {activity.user}
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </ScrollShadow>
    </div>
  );
};

export default ActivityLogFeed;
