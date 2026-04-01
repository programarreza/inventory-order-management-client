import { ReactNode } from "react";

import { Navbar } from "./navbar/Navbar";

const dashboardLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <div className="flex gap-2">
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
