"use client";

import { useUser } from "@/hooks/useUser";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";

export default function UserMenu() {
  const router = useRouter();
  const { data: user, isLoading } = useUser();

  const handleLogout = () => {
    Cookies.remove("token");
    router.push("/login");
  };

  const roleColor = (role: string) =>
    role === "admin"
      ? "bg-green-100 text-green-800"
      : "bg-yellow-100 text-yellow-800";

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName?.[0] ?? ""}${lastName?.[0] ?? ""}`.toUpperCase();
  };

  if (isLoading) {
    return <div className="text-gray-500">Loading…</div>;
  }

  if (!user) {
    return (
      <button
        onClick={handleLogout}
        className="inline-flex items-center px-4 py-2 bg-red-600 text-white text-sm font-medium rounded hover:bg-red-700 transition"
      >
        Logout
      </button>
    );
  }

  return (
    <Menu as="div" className="relative">
      <div>
        <Menu.Button
          data-testid="profile-dropdown"
          className="flex items-center justify-center w-10 h-10 bg-gradient-to-tr from-blue-200 to-blue-400 text-blue-900 font-bold rounded-full shadow hover:scale-105 transition-transform"
        >
          {getInitials(user.firstName, user.lastName)}
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-200"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-150"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items
          className="
    absolute right-0 mt-3 w-64 origin-top-right rounded-xl shadow-xl z-50
    bg-gradient-to-br from-white via-blue-50 to-white transition-all duration-300
    hover:from-white hover:via-blue-100 hover:to-white"
        >
          <div className="p-4 border-b border-blue-100">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-tr from-blue-300 to-blue-500 text-white text-lg font-bold shadow-inner">
                {getInitials(user.firstName, user.lastName)}
              </div>
              <div className="flex flex-col">
                <p className="text-sm font-semibold text-gray-900">
                  {user.firstName} {user.lastName}
                </p>
                <p className="text-sm bg-gray-100 text-gray-800 px-2 py-0.5 rounded mt-1 break-all">
                  {user.email}
                </p>
                <span
                  className={`mt-1 inline-block text-xs font-medium px-2 py-0.5 rounded ${roleColor(
                    user.role
                  )}`}
                >
                  {user.role}
                </span>
              </div>
            </div>
          </div>

          <div className="py-4 flex justify-center">
            <Menu.Item>
              {() => (
                <button
                  data-testid="logout-btn"
                  onClick={handleLogout}
                  className="bg-gradient-to-r from-red-500 via-red-600 to-red-700 hover:from-red-600 hover:via-red-700 hover:to-red-800 text-white text-sm font-medium px-4 py-2 rounded-full shadow-lg transition-all duration-300 ease-in-out"
                >
                  Logout
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
