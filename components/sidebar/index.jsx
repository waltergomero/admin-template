"use client"

import React, { useEffect, useRef, useState, Fragment } from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import SidebarLinkGroup from "./sidebarLinkGroup";
import { Squares2X2Icon, UserIcon, TableCellsIcon, FolderIcon, 
  CogIcon, ChartBarIcon, QueueListIcon, ArrowRightEndOnRectangleIcon, ArrowLeftIcon,
  ChevronDownIcon, UsersIcon, ChartBarSquareIcon, SquaresPlusIcon, PhotoIcon } from '@heroicons/react/24/outline';

const Sidebar =  ({ sidebarOpen, setSidebarOpen }) => {

  const pathname = usePathname();
  const trigger = useRef(null);
  const sidebar = useRef(null);

  const [data, setData] = useState(null)

  let storedSidebarExpanded = "true"

  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === "true"
  )


  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!sidebar.current || !trigger.current) return
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      )
        return
      setSidebarOpen(false)
    }
    document.addEventListener("click", clickHandler)
    return () => document.removeEventListener("click", clickHandler)
  })

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ key }) => {
      if (!sidebarOpen || key !== "Escape") return
      setSidebarOpen(false)
    }
    document.addEventListener("keydown", keyHandler)
    return () => document.removeEventListener("keydown", keyHandler)
  })

  useEffect(() => {
    localStorage.setItem("sidebar-expanded", sidebarExpanded.toString())
    if (sidebarExpanded) {
      document.querySelector("body")?.classList.add("sidebar-expanded")
    } else {
      document.querySelector("body")?.classList.remove("sidebar-expanded")
    }
  }, [sidebarExpanded])

  return (
    <aside
      ref={sidebar}
      className={`absolute left-0 top-0 z-9999 flex h-screen w-72.5 flex-col overflow-y-hidden bg-black duration-300 ease-linear dark:bg-boxdark lg:static lg:translate-x-0 ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="flex items-center justify-between gap-2 px-6 py-5.5 lg:py-6.5">
        <Link href="/">
          <Image
            width={176}
            height={32}
            src={"/images/logo/logo.svg"}
            alt="Logo"
            priority
          />
        </Link>

        <button
          ref={trigger}
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-controls="sidebar"
          aria-expanded={sidebarOpen}
          className="block lg:hidden text-gray-300"
        >
          <ArrowLeftIcon width="28" height="24"/>
        </button>
      </div>
      <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
        <nav className="mt-5 px-4 py-4 lg:mt-9 lg:px-6">
          <div>
            <h3 className="mb-4 ml-4 text-sm font-semibold text-white">
              MENU
            </h3>
            <ul className="mb-6 flex flex-col gap-1.5">
            <SidebarLinkGroup activeCondition={pathname === "/gallery" || pathname.includes("gallery")}  >
                {(handleClick, open) => {
                  return (
                    <Fragment>
                      <Link
                        href="#"
                        className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-xs text-gray-200 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${(pathname ===
                          "/gallery" ||  pathname.includes("gallery")) &&
                          "bg-graydark dark:bg-meta-4"}`}
                        onClick={e => {
                          e.preventDefault()
                          sidebarExpanded
                            ? handleClick()
                            : setSidebarExpanded(true)
                        }}
                      >
                        <QueueListIcon width="20" height="20"/>
                        Gallery
                        <ChevronDownIcon width="20" height="20" className={`absolute right-4 top-1/2 -translate-y-1/2 ${open && "rotate-180"}`}/>
                      </Link>
                      <div
                        className={`translate transform overflow-hidden ${!open && "hidden"}`}
                      >
                        <ul className="mb-5.5 mt-4 flex flex-col gap-2 pl-4">
                        <li>
                            <Link
                              href={`/admin/gallery/category/${0}`}
                              className={`group relative flex items-center gap-2.5 rounded-md px-4 font-xs text-gray-200 duration-300 ease-in-out hover:text-white ${pathname ===
                                "/admin/gallery/category/0" && "text-white"}`}>
                               Show all
                            </Link>
                          </li>
                        {data && data?.map((item) =>(
                          <li key={item.category_id}>
                            <Link
                              href={`/admin/gallery/category/${item.category_name}`}
                              className={`group relative flex items-center gap-2.5 rounded-md px-4 font-xs text-gray-200 duration-300 ease-in-out hover:text-white ${pathname ===
                                `/admin/gallery/category/${encodeURIComponent(item.category_name)}` && "text-white"}`}
                            >
                              {item.category_name}
                            </Link>
                          </li>
                        ))}
                        </ul>
                      </div>
                    </Fragment>
                  )
                }}
              </SidebarLinkGroup>
              <li>
                <Link
                  href="/admin/products"
                  className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-xs text-gray-200 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${pathname.includes(
                    "products"
                  ) && "bg-graydark dark:bg-meta-4"}`}
                >
                  <SquaresPlusIcon width="20" height="20"/>
                  Products
                </Link>
              </li>
              <li>
                <Link
                  href="/admin/categories"
                  className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-xs text-gray-200 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${pathname.includes(
                    "categories"
                  ) && "bg-graydark dark:bg-meta-4"}`}
                >
                  <SquaresPlusIcon width="20" height="20"/>
                  Categories
                </Link>
              </li>
              <li>
                <Link
                  href="/admin/status"
                  className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-xs text-gray-200 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${pathname.includes(
                    "status"
                  ) && "bg-graydark dark:bg-meta-4"}`}
                >
                  <ChartBarSquareIcon width="20" height="20"/>
                  Status
                </Link>
              </li>
              <li>
                <Link
                  href="/admin/users"
                  className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-xs text-gray-200 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${pathname.includes(
                    "users"
                  ) && "bg-graydark dark:bg-meta-4"}`}
                >
                  <UsersIcon width="20" height="20"/>
                  Users
                </Link>
              </li>
              <li>
                <Link
                  href="/admin/settings"
                  className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-xs text-gray-200 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${pathname.includes(
                    "settings"
                  ) && "bg-graydark dark:bg-meta-4"}`}
                >
                  <CogIcon width="20" height="20"/>
                  Settings
                </Link>
              </li>
            </ul>
          </div>

        </nav>
      </div>
    </aside>
  )
}

export default Sidebar
