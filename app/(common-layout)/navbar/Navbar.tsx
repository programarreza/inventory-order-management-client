"use client";

import { Button } from "@heroui/button";
import {
  NavbarBrand,
  NavbarItem,
  Navbar as NextUINavbar,
} from "@heroui/navbar";
import { link as linkStyles } from "@heroui/theme";
import clsx from "clsx";
import Link, { default as NextLink } from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FiShoppingCart } from "react-icons/fi";
import { GoSidebarCollapse, GoSidebarExpand } from "react-icons/go";
import Cookies from "universal-cookie";

import NavbarDropdown from "./NavbarDropdown";

import DashboardSidebar from "@/components/DashboardSidebar";
import { siteConfig } from "@/config/site";
import { logout, selectCurrentUser } from "@/lib/Redux/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/lib/Redux/hooks";
import { persistor } from "@/lib/Redux/store/store";

export const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileDashboardMenuOpen, setIsMobileDashboardMenuOpen] =
    useState(false);
  const [scrollDirection, setScrollDirection] = useState("up");
  const [isScrolled, setIsScrolled] = useState(false);
  const dispatch = useAppDispatch();
  const pathName = usePathname();
  const router = useRouter();
  const cookies = new Cookies();

  const isLoading = false;

  // Get logged user from Redux store.
  // IMPORTANT NOTE: Not using useLoggedUser hook here. because navbar all time mounted and auth change to re-render navbar. RTK Query again call api and get data.
  const loggedUser = useAppSelector(selectCurrentUser);
  const selectedItems = useAppSelector((state: any) => state.cart?.selectedItems || 0);

  useEffect(() => {
    let lastScrollY = window.pageYOffset;

    const handleScroll = () => {
      const scrollY = window.pageYOffset;
      const direction = scrollY > lastScrollY ? "down" : "up";

      // Update scroll direction
      if (
        direction !== scrollDirection &&
        Math.abs(scrollY - lastScrollY) > 10
      ) {
        setScrollDirection(direction);
      }

      // Update scrolled state
      setIsScrolled(scrollY > 10);
      lastScrollY = scrollY > 0 ? scrollY : 0;
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrollDirection]);

  const handleLogout = async () => {
    try {
      // Clear all persisted state
      await persistor.purge();

      cookies.remove("accessToken", { path: "/" });
      dispatch(logout());
      router.push("/");
    } catch {
      router.push("/");
    }
  };

  return (
    <>
      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <button
          className="fixed inset-0 bg-transparent z-40 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      <div
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ease-in-out py-0 mx-0 ${
          scrollDirection === "down" && !isMobileMenuOpen
            ? "-translate-y-full"
            : "translate-y-0"
        } ${isScrolled ? "bg-transparent" : "bg-transparent"}`}
        style={{ backdropFilter: "blur(20px)" }}
      >
        <NextUINavbar
          className="bg-transparent border-b border-gray-200 dark:border-gray-700"
          maxWidth="full"
          position="sticky"
        >
          {/* Mobile dashboard menu button */}
          {pathName.startsWith("/dashboard") && (
            <div className="xl:hidden">
              <Button
                isIconOnly
                aria-label="Toggle menu"
                className="text-foreground"
                variant="light"
                onClick={() => {
                  setIsMobileDashboardMenuOpen(!isMobileDashboardMenuOpen);
                  setIsMobileMenuOpen(false);
                }}
              >
                {isMobileDashboardMenuOpen ? (
                  <GoSidebarExpand size={28} />
                ) : (
                  <GoSidebarCollapse size={28} />
                )}
              </Button>
            </div>
          )}
          <div className="flex w-full justify-between items-center px-4">
            {/* Logo */}
            <NavbarBrand as="li" className="gap-3 max-w-fit">
              <NextLink
                className="flex justify-start items-center gap-1"
                href="/"
              >
                <div className="flex items-center gap-2">
                  {isLoading ? (
                    <>
                      <div className="h-10 w-14 rounded bg-gray-200 dark:bg-gray-700 animate-pulse" />
                      <div className="hidden md:block h-7 w-24 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                    </>
                  ) : (
                    <>
                      {/* <img
                          alt={`${institute?.title} logo`}
                          className="h-10 w-auto rounded"
                          src={logoSrc}
                        /> */}
                      <span className="font-semibold hidden md:inline">
                        Inventory
                      </span>
                    </>
                  )}
                </div>
              </NextLink>
            </NavbarBrand>

            {/* Desktop Navigation */}
            <div className="flex items-center gap-8 font-medium text-lg">
              <ul className="flex gap-6">
                {siteConfig.navItems?.map((item) => (
                  <NavbarItem key={item.href}>
                    <NextLink
                      className={clsx(
                        "hover:text-primary transition-colors",
                        linkStyles({ color: "foreground" }),
                        "data-[active=true]:text-primary data-[active=true]:font-medium",
                      )}
                      color="foreground"
                      href={item.href}
                    >
                      {/* {item.label} */}
                    </NextLink>
                  </NavbarItem>
                ))}
                {isLoading ? (
                  <>
                    <div className="h-11 w-11 rounded-full bg-gray-200 dark:bg-gray-700 animate-pulse" />
                  </>
                ) : (
                  <div className="flex items-center gap-6">
                    <NextLink href="/cart" className="relative flex items-center text-gray-700 hover:text-primary transition-colors">
                      <FiShoppingCart size={24} />
                      {selectedItems > 0 && (
                        <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                          {selectedItems}
                        </span>
                      )}
                    </NextLink>

                    {loggedUser ? (
                      <div className="flex items-center">
                        <NavbarDropdown />
                      </div>
                    ) : (
                      <Link
                        className="hover:text-primary transition-colors font-semibold"
                        href="/login"
                      >
                        Login
                      </Link>
                    )}
                  </div>
                )}
              </ul>
            </div>
          </div>
        </NextUINavbar>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden fixed top-16 right-0 w-64 h-[calc(100vh-4rem)] bg-white dark:bg-gray-900 shadow-lg transform transition-transform duration-300 ease-in-out z-40 ${
            isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex flex-col p-4 space-y-4">
            {siteConfig.navItems?.map((item) => (
              <NextLink
                key={item.href}
                className="px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors"
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.label}
              </NextLink>
            ))}
            {loggedUser ? (
              <div className="px-4 flex flex-col space-y-4">
                <Link
                  href="/dashboard/update-institute"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <Link
                  href="/"
                  onClick={() => {
                    handleLogout();
                    setIsMobileMenuOpen(false);
                  }}
                >
                  Logout
                </Link>
              </div>
            ) : (
              <Link
                className="px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors"
                href="/login"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Login
              </Link>
            )}
          </div>
        </div>

        {/* Mobile Dashboard Menu */}
        <div
          className={`xl:hidden fixed top-16 left-0 w-64 h-[calc(100vh-4rem)] bg-white dark:bg-gray-900 shadow-lg transform transition-transform duration-300 ease-in-out z-40 ${
            isMobileDashboardMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div>
            <DashboardSidebar />
          </div>
        </div>
      </div>
    </>
  );
};
