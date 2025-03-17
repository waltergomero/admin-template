"use client";

import React, { useState, ReactNode } from "react";
import Sidebar from "@/components/sidebar";
import Header from "@/components/header";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { SessionProvider } from "next-auth/react";


export default function DashboardLayout({ children,}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
<>
  <div className="dark:bg-boxdark-2 dark:text-bodydark">
    <SessionProvider>
      <div className="flex h-screen overflow-hidden">
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
          <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          <main>
            <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
              {children}
            </div>
          </main>
        </div>
      </div>
      </SessionProvider>
      </div>
      <ToastContainer 
                  theme="colored"
                  position="top-center"
                  autoClose={6000}
                  hideProgressBar={false}
                  newestOnTop={false}
                  closeOnClick
                  rtl={false}
                  toastClassName={"text-sm"}
                  pauseOnFocusLoss
                  pauseOnHover/>
</>

  );
}
