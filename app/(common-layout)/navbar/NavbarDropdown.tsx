"use client";

import { Avatar } from "@heroui/avatar";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@heroui/dropdown";
import { useRouter } from "next/navigation";
import Cookies from "universal-cookie";

import useLoggedUser from "@/hooks/auth.hook";
import { logout } from "@/lib/Redux/features/auth/authSlice";
import { useAppDispatch } from "@/lib/Redux/hooks";
import { persistor } from "@/lib/Redux/store/store";

const NavbarDropdown = () => {
  const router = useRouter();
  const user = useLoggedUser();
  const dispatch = useAppDispatch();
  const cookies = new Cookies();

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
    <div>
      <Dropdown>
        <DropdownTrigger onClick={(e: React.MouseEvent) => e.preventDefault()}>
          <Avatar className="cursor-pointer" src={user?.image} />
        </DropdownTrigger>
        <DropdownMenu aria-label="Static Actions">
          <DropdownItem
            key={"1"}
            onClick={() => router.push("/dashboard/profile")}
          >
            <div className="flex gap-2 items-center">
              <Avatar src={user?.image} />
              <div>
                <p>{user?.name}</p>
                <p>{user?.email}</p>
              </div>
            </div>
          </DropdownItem>

          <DropdownItem
            key={"2"}
            color="default"
            onClick={() =>
              router.push(
                `${user?.role === "user" ? "/dashboard/user-orders" : "/dashboard"}`,
              )
            }
          >
            Dashboard
          </DropdownItem>
          <DropdownItem
            key={"3"}
            className="text-danger"
            color="danger"
            onClick={() => handleLogout()}
          >
            Log out
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
};

export default NavbarDropdown;
