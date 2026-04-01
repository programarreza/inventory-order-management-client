import { ReactNode } from "react";

import { Navbar } from "../(common-layout)/navbar/Navbar";

import DashboardSidebar from "@/components/DashboardSidebar";

const dashboardLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <div className="flex gap-2 min-h-[calc(100vh-70px)] pt-[70px]">
        {/* sidebar */}
        <div className="shadow-large min-w-64 hidden xl:block">
          <DashboardSidebar />
        </div>

        {/* dashboard children */}
        <div className="w-full bg-[#F9F9FC]">
          <Navbar />
          {children}
        </div>
      </div>
    </div>
  );
};

export default dashboardLayout;
