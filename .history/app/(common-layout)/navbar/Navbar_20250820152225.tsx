"use client";

import {
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Navbar as NextUINavbar,
} from "@heroui/navbar";
import { link as linkStyles } from "@heroui/theme";
import clsx from "clsx";
import Link, { default as NextLink } from "next/link";
import { useEffect, useState } from "react";

import { siteConfig } from "@/config/site";
import useLoggedUser from "@/hooks/auth.hook";
// import logo from "../../../../assets/images/logo.png";
import NavbarDropdown from "./NavbarDropdown";

export const Navbar = () => {
  const loggedUser = useLoggedUser();
  const [isOpen, setIsOpen] = useState(false);
  const [scrollDirection, setScrollDirection] = useState("up");

  useEffect(() => {
    let lastScrollY = window.pageYOffset;

    const updateScrollDirection = () => {
      const scrollY = window.pageYOffset;
      const direction = scrollY > lastScrollY ? "down" : "up";

      if (
        direction !== scrollDirection &&
        Math.abs(scrollY - lastScrollY) > 10
      ) {
        setScrollDirection(direction);
      }
      lastScrollY = scrollY > 0 ? scrollY : 0;
    };

    window.addEventListener("scroll", updateScrollDirection);

    return () => {
      window.removeEventListener("scroll", updateScrollDirection);
    };
  }, [scrollDirection]);

  // const getDashboardLink = () => {
  //   switch (loggedUser?.role as unknown as "ADMIN" | "MANAGER" | "USER") {
  //     case "USER":
  //       return "/dashboard";
  //     default:
  //       return "/login"; // Redirect to login if no role matches
  //   }
  // };

  return (
    <div
      className={` fixed top-0 left-0 w-full z-50 transition-transform duration-300 ease-in-out py-2 mx-0 ${
        scrollDirection === "down" ? "-translate-y-full" : "translate-y-0"
      }`}
      style={{ backdropFilter: "blur(50px)" }}
    >
      <NextUINavbar
        className="bg-transparent border-b border-gray-200"
        maxWidth="xl"
        position="sticky"
      >
        <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
          <NavbarBrand as="li" className="gap-3 max-w-fit">
            <NextLink
              className="flex justify-start items-center gap-1"
              href="/"
            >
              {/* <Image
                src={logo}
                height={1200}
                width={1200}
                alt="logo"
                className="w-8 h-8"
              /> */}
              <span className=""> UMSS</span>
            </NextLink>
          </NavbarBrand>
        </NavbarContent>
        <NavbarBrand as="li" className=" max-w-fit">
          {/* content-2 */}
          <div className="navbar-end  flex items-center gap-8 font-medium text-lg ">
            <ul className="hidden lg:flex gap-4 justify-start ml-2">
              {siteConfig.navItems?.map((item) => (
                <NavbarItem key={item.href}>
                  <NextLink
                    className={clsx(
                      " mt-2", // Default text color set to white
                      linkStyles({ color: "foreground" }),
                      "data-[active=true]:text-primary data-[active=true]:font-medium"
                    )}
                    color="foreground"
                    href={item.href}
                  >
                    {item.label}
                  </NextLink>
                </NavbarItem>
              ))}
              {loggedUser ? (
                <div className="flex justify-center items-center gap-2">
                  <NavbarDropdown />{" "}
                </div>
              ) : (
                <Link href={`/login`} className="mt-2">
                  login
                </Link>
              )}
            </ul>
          </div>
        </NavbarBrand>
      </NextUINavbar>
    </div>
  );
};
