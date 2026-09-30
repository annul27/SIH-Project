"use client";

import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footbar from "@/components/Footer";
import DashboardConsumer from "@/components/DashboardConsumer";
import DashboardIndustry from "@/components/DashboardIndustry";

export default function Home() {
  const [activeTab, setActiveTab] = useState("enterprise");
  const [selectedLanguage, setSelectedLanguage] = useState("English");

  return (
    <div className="min-h-screen flex flex-col bg-slate-100 text-slate-800 font-sans selection:bg-amber-100 selection:text-amber-900">

      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        selectedLanguage={selectedLanguage}
        setSelectedLanguage={setSelectedLanguage}
      />

      {/* Main */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-1 sm:px-2.5 md:px-4 py-6">
        {/* Conditional Dashboard*/}
        <div className="max-w-6xl mx-auto">
          {activeTab === "enterprise" ? (
            <DashboardIndustry activeTab={activeTab} language={selectedLanguage} />
          ) : (
            <DashboardConsumer activeTab={activeTab} language={selectedLanguage}/>
          )}
        </div>
      </main>

      <Footbar />
    </div>
  );
}
