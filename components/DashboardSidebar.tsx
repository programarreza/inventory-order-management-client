"use client";

import { Tab, Tabs } from "@heroui/tabs";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { ContentIcon, DashboardIcon } from "./icons";

import useLoggedUser from "@/hooks/auth.hook";

const DashboardSidebar = () => {
  const loggedUser = useLoggedUser();
  const pathname = usePathname();

  // Map tab keys to their corresponding icons
  const getIconForTab = (key: string) => {
    switch (key) {
      case "products":
        return <ContentIcon className="text-2xl" />;

      default:
        return <DashboardIcon className="text-2xl" />;
    }
  };

  // Define tabs based on user role
  const getTabsByRole = () => {
    if (!loggedUser) return [];

    switch (
      loggedUser.role?.toLowerCase() ||
      loggedUser.userRole?.toLowerCase()
    ) {
      case "admin":
        return [
          { key: "dashboard", path: "/dashboard", label: "dashboard" },
          {
            key: "products",
            path: "/dashboard/products",
            label: "products",
          },
          {
            key: "categories",
            path: "/dashboard/categories",
            label: "categories",
          },
        ];

      default:
        return [];
    }
  };

  const tabs = getTabsByRole();
  const sortedTabs = [...tabs].sort((a, b) => b.path.length - a.path.length);
  const selectedTab = sortedTabs.find((tab) => pathname.startsWith(tab.path));
  const selectedKey = selectedTab?.key || "dashboard";

  return (
    <div>
      <div className="w-full min-h-screen">
        <Tabs
          aria-label="Options"
          classNames={{
            tabList: "gap-2 w-full relative rounded-none p-0 border-divider",
            cursor: "w-full bg-primary",
            tab: "w-full px-0 h-10 justify-start",
            tabContent:
              "group-data-[selected=true]:text-primary w-full text-left justify-start",
            panel: "hidden",
          }}
          color="primary"
          fullWidth={true}
          isVertical={true}
          selectedKey={selectedKey}
          variant="underlined"
        >
          {tabs.map((tab) => (
            <>
              <Tab
                key={tab.key}
                title={
                  <Link className="w-full text-left" href={tab.path}>
                    <div className="flex items-center gap-3 justify-start w-full px-4 text-left">
                      {getIconForTab(tab.key)}
                      <span className="text-left text-lg font-medium">
                        {tab.label}
                      </span>
                    </div>
                  </Link>
                }
              />
            </>
          ))}
        </Tabs>
      </div>
    </div>
  );
};

export default DashboardSidebar;
