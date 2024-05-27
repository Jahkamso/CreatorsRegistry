"use client";

import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Popover,
  PopoverButton,
  PopoverOverlay,
  PopoverPanel,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { signIn, signOut } from "next-auth/react";

import { classNames } from "@/utils/classNames";

const navigation = [
  { name: "Home", href: "#", current: true },
  { name: "Profile", href: "#", current: false },
  { name: "Resources", href: "#", current: false },
  { name: "Company Directory", href: "#", current: false },
  { name: "Openings", href: "#", current: false },
];

const userNavigationGuest = [{ name: "Sign in", href: "#" }];
const userNavigationMember = [
  { name: "Your Profile", href: "#" },
  { name: "Settings", href: "#" },
  { name: "Sign out", href: "#" },
];

export default function Header({ session }) {
  const user = {
    name: session ? session.user.name : "Guest",
    email: session ? session.user.email : "unknown",
    imageUrl: session
      ? session.user.image
      : "https://images.unsplash.com/photo-1589254066213-a0c9dc853511?q=80&w=200&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  };

  return (
    <Popover as="header" className="bg-indigo-600 pb-24">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
            <div className="relative flex items-center justify-center py-5 lg:justify-between">
              {/* Logo */}
              <div className="absolute left-0 flex-shrink-0 lg:static">
                <a href="#">
                  <span className="sr-only">Your Company</span>
                  <img
                    className="h-8 w-auto"
                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=300"
                    alt="Your Company"
                  />
                </a>
              </div>

              {/* Right section on desktop */}
              <div className="hidden lg:ml-4 lg:flex lg:items-center lg:pr-0.5">
                {!session && (
                  <button onClick={async () => await signIn()}>Sign In</button>
                )}
                {session && (
                  <button onClick={async () => await signOut()}>
                    Sign Out
                  </button>
                )}

                <button
                  type="button"
                  className="relative flex-shrink-0 rounded-full p-1 text-indigo-200 hover:bg-white hover:bg-opacity-10 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                >
                  <span className="absolute -inset-1.5" />
                  <span className="sr-only">View notifications</span>
                  <BellIcon className="h-6 w-6" aria-hidden="true" />
                </button>

                {/* Profile dropdown */}
                <Menu as="div" className="relative ml-4 flex-shrink-0">
                  <div>
                    <MenuButton className="relative flex rounded-full bg-white text-sm ring-2 ring-white ring-opacity-20 focus:outline-none focus:ring-opacity-100">
                      <span className="absolute -inset-1.5" />
                      <span className="sr-only">Open user menu</span>
                      <img
                        className="h-8 w-8 rounded-full"
                        src={user.imageUrl}
                        alt=""
                      />
                    </MenuButton>
                  </div>
                  <Transition
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <MenuItems className="absolute -right-2 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      {userNavigationGuest.map((item) => (
                        <MenuItem key={item.name}>
                          {({ focus }) => (
                            <a
                              href={item.href}
                              className={classNames(
                                focus ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700"
                              )}
                            >
                              {item.name}
                            </a>
                          )}
                        </MenuItem>
                      ))}
                    </MenuItems>
                  </Transition>
                </Menu>
              </div>

              {/* Search */}
              <div className="min-w-0 flex-1 px-12 lg:hidden">
                <div className="mx-auto w-full max-w-xs">
                  <label htmlFor="desktop-search" className="sr-only">
                    Search
                  </label>
                  <div className="relative text-white focus-within:text-gray-600">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      <MagnifyingGlassIcon
                        className="h-5 w-5"
                        aria-hidden="true"
                      />
                    </div>
                    <input
                      id="desktop-search"
                      className="block w-full rounded-md border-0 bg-white/20 py-1.5 pl-10 pr-3 text-white placeholder:text-white focus:bg-white focus:text-gray-900 focus:ring-0 focus:placeholder:text-gray-500 sm:text-sm sm:leading-6"
                      placeholder="Search"
                      type="search"
                      name="search"
                    />
                  </div>
                </div>
              </div>

              {/* Menu button */}
              <div className="absolute right-0 flex-shrink-0 lg:hidden">
                {/* Mobile menu button */}
                <PopoverButton className="relative inline-flex items-center justify-center rounded-md bg-transparent p-2 text-indigo-200 hover:bg-white hover:bg-opacity-10 hover:text-white focus:outline-none focus:ring-2 focus:ring-white">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </PopoverButton>
              </div>
            </div>
            <div className="hidden border-t border-white border-opacity-20 py-5 lg:block">
              <div className="grid grid-cols-3 items-center gap-8">
                <div className="col-span-2">
                  <nav className="flex space-x-4">
                    {navigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className={classNames(
                          item.current ? "text-white" : "text-indigo-100",
                          "rounded-md bg-white bg-opacity-0 px-3 py-2 text-sm font-medium hover:bg-opacity-10"
                        )}
                        aria-current={item.current ? "page" : undefined}
                      >
                        {item.name}
                      </a>
                    ))}
                  </nav>
                </div>
                <div>
                  <div className="mx-auto w-full max-w-md">
                    <label htmlFor="mobile-search" className="sr-only">
                      Search
                    </label>
                    <div className="relative text-white focus-within:text-gray-600">
                      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <MagnifyingGlassIcon
                          className="h-5 w-5"
                          aria-hidden="true"
                        />
                      </div>
                      <input
                        id="mobile-search"
                        className="block w-full rounded-md border-0 bg-white/20 py-1.5 pl-10 pr-3 text-white placeholder:text-white focus:bg-white focus:text-gray-900 focus:ring-0 focus:placeholder:text-gray-500 sm:text-sm sm:leading-6"
                        placeholder="Search"
                        type="search"
                        name="search"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Transition>
            <div className="lg:hidden">
              <TransitionChild
                enter="duration-150 ease-out"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="duration-150 ease-in"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <PopoverOverlay className="fixed inset-0 z-20 bg-black bg-opacity-25" />
              </TransitionChild>

              <TransitionChild
                enter="duration-150 ease-out"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="duration-150 ease-in"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <PopoverPanel
                  focus
                  className="absolute inset-x-0 top-0 z-30 mx-auto w-full max-w-3xl origin-top transform p-2 transition"
                >
                  <div className="divide-y divide-gray-200 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
                    <div className="pb-2 pt-3">
                      <div className="flex items-center justify-between px-4">
                        <div>
                          <img
                            className="h-8 w-auto"
                            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                            alt="Your Company"
                          />
                        </div>
                        <div className="-mr-2">
                          <PopoverButton className="relative inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                            <span className="absolute -inset-0.5" />
                            <span className="sr-only">Close menu</span>
                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                          </PopoverButton>
                        </div>
                      </div>
                      <div className="mt-3 space-y-1 px-2">
                        <a
                          href="#"
                          className="block rounded-md px-3 py-2 text-base font-medium text-gray-900 hover:bg-gray-100 hover:text-gray-800"
                        >
                          Home
                        </a>
                        <a
                          href="#"
                          className="block rounded-md px-3 py-2 text-base font-medium text-gray-900 hover:bg-gray-100 hover:text-gray-800"
                        >
                          Profile
                        </a>
                        <a
                          href="#"
                          className="block rounded-md px-3 py-2 text-base font-medium text-gray-900 hover:bg-gray-100 hover:text-gray-800"
                        >
                          Resources
                        </a>
                        <a
                          href="#"
                          className="block rounded-md px-3 py-2 text-base font-medium text-gray-900 hover:bg-gray-100 hover:text-gray-800"
                        >
                          Company Directory
                        </a>
                        <a
                          href="#"
                          className="block rounded-md px-3 py-2 text-base font-medium text-gray-900 hover:bg-gray-100 hover:text-gray-800"
                        >
                          Openings
                        </a>
                      </div>
                    </div>
                    <div className="pb-2 pt-4">
                      <div className="flex items-center px-5">
                        <div className="flex-shrink-0">
                          <img
                            className="h-10 w-10 rounded-full"
                            src={user.imageUrl}
                            alt=""
                          />
                        </div>
                        <div className="ml-3 min-w-0 flex-1">
                          <div className="truncate text-base font-medium text-gray-800">
                            {user.name}
                          </div>
                          <div className="truncate text-sm font-medium text-gray-500">
                            {user.email}
                          </div>
                        </div>
                        <button
                          type="button"
                          className="relative ml-auto flex-shrink-0 rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                          <span className="absolute -inset-1.5" />
                          <span className="sr-only">View notifications</span>
                          <BellIcon className="h-6 w-6" aria-hidden="true" />
                        </button>
                      </div>
                      <div className="mt-3 space-y-1 px-2">
                        {userNavigationGuest.map((item) => (
                          <a
                            key={item.name}
                            href={item.href}
                            className="block rounded-md px-3 py-2 text-base font-medium text-gray-900 hover:bg-gray-100 hover:text-gray-800"
                          >
                            {item.name}
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                </PopoverPanel>
              </TransitionChild>
            </div>
          </Transition>
        </>
      )}
    </Popover>
  );
}