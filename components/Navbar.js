"use client";

import React, { useState, useRef, useEffect } from "react";
import { Building2, UserCheck, Globe, User } from "lucide-react";

export default function Navbar({
  activeTab,
  setActiveTab,
  selectedLanguage,
  setSelectedLanguage,
}) {
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isTabOpen, setIsTabOpen] = useState(false);

  const langDropdownRef = useRef(null);
  const tabDropdownRef = useRef(null);

  const languages = [
    { code: "English", label: "English" },
    { code: "Hindi", label: "Hindi (हिंदी)" },
    { code: "Tamil", label: "Tamil (தமிழ்)" },
    { code: "Telugu", label: "Telugu (తెలుగు)" },
  ];

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        langDropdownRef.current &&
        !langDropdownRef.current.contains(event.target)
      ) {
        setIsLangOpen(false);
      }
      if (
        tabDropdownRef.current &&
        !tabDropdownRef.current.contains(event.target)
      ) {
        setIsTabOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="w-full bg-slate-900 text-white shadow-md">
      {/* Main Navbar */}
      <div className="max-w-260 mx-auto px-2 py-3 flex flex-wrap justify-between items-center gap-4">
        {/* Brand Logo & Title */}
        <div className="flex items-center gap-3">
          <div className="bg-white p-1 rounded shadow-sm">
            <img
              src="logo.svg"
              alt="Bureau of Indian Standards Logo"
              width="20"
              height="auto"
            />
          </div>
          <div>
            <h1 className="text-base font-bold leading-tight text-white">
              BIS Standards Hub
            </h1>
          </div>
        </div>

        {/* Navigation & Language Selectors */}
        <div className="flex items-center gap-3">
          {/* Globe Icon Toggle with Language Dropdown */}
          <div className="relative" ref={langDropdownRef}>
            <button
              type="button"
              onClick={() => {
                setIsLangOpen(!isLangOpen);
                setIsTabOpen(false);
              }}
              className="p-2 bg-slate-800 hover:bg-slate-700 rounded-xl border border-slate-700 text-slate-300 transition-colors flex items-center justify-center focus:outline-none"
              title="Select Language"
              aria-label="Select Language"
            >
              <Globe className="w-5 h-5 text-slate-300 hover:text-white" />
            </button>

            {/* Language Dropdown Menu */}
            {isLangOpen && (
              <div className="absolute right-0 mt-2 w-44 bg-slate-800 border border-slate-700 rounded-xl shadow-xl z-50 py-1 overflow-hidden">
                <div className="px-3 py-1.5 text-[10px] uppercase tracking-wider text-slate-400 border-b border-slate-700 font-semibold">
                  Select Language
                </div>
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    type="button"
                    onClick={() => {
                      setSelectedLanguage(lang.code);
                      setIsLangOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 text-xs transition-colors flex items-center justify-between ${
                      selectedLanguage === lang.code
                        ? "bg-blue-600/30 text-blue-400 font-bold"
                        : "text-slate-300 hover:bg-slate-700 hover:text-white"
                    }`}
                  >
                    <span>{lang.label}</span>
                    {selectedLanguage === lang.code && (
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* MOBILE ONLY (< 768px): Human Icon with Tab Dropdown */}
          <div className="relative md:hidden" ref={tabDropdownRef}>
            <button
              type="button"
              onClick={() => {
                setIsTabOpen(!isTabOpen);
                setIsLangOpen(false);
              }}
              className="p-2 bg-slate-800 hover:bg-slate-700 rounded-xl border border-slate-700 text-slate-300 transition-colors flex items-center justify-center focus:outline-none"
              title="Switch View"
              aria-label="Switch View"
            >
              <User className="w-5 h-5 text-slate-300 hover:text-white" />
            </button>

            {/* Mobile Tab Selection Dropdown */}
            {isTabOpen && (
              <div className="absolute right-0 mt-2 w-52 bg-slate-800 border border-slate-700 rounded-xl shadow-xl z-50 py-1 overflow-hidden">
                <div className="px-3 py-1.5 text-[10px] uppercase tracking-wider text-slate-400 border-b border-slate-700 font-semibold">
                  Select Portal View
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setActiveTab("enterprise");
                    setIsTabOpen(false);
                  }}
                  className={`w-full text-left px-3 py-2.5 text-xs transition-colors flex items-center gap-2.5 ${
                    activeTab === "enterprise"
                      ? "bg-blue-600/30 text-blue-400 font-bold"
                      : "text-slate-300 hover:bg-slate-700 hover:text-white"
                  }`}
                >
                  <Building2 className="w-4 h-4" />
                  <span>Industry</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setActiveTab("consumer");
                    setIsTabOpen(false);
                  }}
                  className={`w-full text-left px-3 py-2.5 text-xs transition-colors flex items-center gap-2.5 ${
                    activeTab === "consumer"
                      ? "bg-blue-600/30 text-blue-400 font-bold"
                      : "text-slate-300 hover:bg-slate-700 hover:text-white"
                  }`}
                >
                  <UserCheck className="w-4 h-4" />
                  <span>Consumer</span>
                </button>
              </div>
            )}
          </div>

          {/* DESKTOP ONLY (>= 768px): Inline Tab Switcher */}
          <div className="hidden md:flex bg-slate-800 p-1 rounded-xl border border-slate-700">
            <button
              type="button"
              onClick={() => setActiveTab("enterprise")}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === "enterprise"
                  ? "bg-blue-600 text-white shadow-md"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              <Building2 className="w-4 h-4" />
              Industry
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("consumer")}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === "consumer"
                  ? "bg-blue-600 text-white shadow-md"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              <UserCheck className="w-4 h-4" />
              Consumer
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
