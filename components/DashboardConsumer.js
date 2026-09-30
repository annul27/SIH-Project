"use client";
import React, { useState } from "react";
import { Award, CheckCircle2, ShieldAlert, Volume2 } from "lucide-react";
import SmartAssistant from "./SmartAssistant";

const DashboardConsumer = ({ activeTab = "consumer", language = "English"}) => {
  // HUID Verification State
  const [huidInput, setHuidInput] = useState("");
  const [huidVerified, setHuidVerified] = useState(false);

  // Grievance Form State
  const [grievanceCategory, setGrievanceCategory] = useState("");
  const [grievanceDetails, setGrievanceDetails] = useState({
    brand: "",
    issue: "",
  });
  const [grievanceSubmitted, setGrievanceSubmitted] = useState(false);

  // Voice Helper State
  const [isVoiceActive, setIsVoiceActive] = useState(false);

  // Event Handlers
  const handleVerifyHUID = () => {
    if (huidInput.trim()) {
      setHuidVerified(true);
    }
  };

  const handleGrievanceSubmit = (e) => {
    e.preventDefault();
    if (grievanceDetails.brand || grievanceDetails.issue) {
      setGrievanceSubmitted(true);
    }
  };

  // Guard clause for tab switching
  if (activeTab !== "consumer") return null;

  return (
    <div className="space-y-6">
      {/* Hallmark HUID Verification Card */}
      <div className="bg-white p-6 rounded-xl border border-slate-300 shadow-sm space-y-4">
        <div>
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Award className="w-5 h-5 text-blue-700" /> Hallmark HUID
            Verification Tool
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            Verify 6-digit alphanumeric Hallmark Unique ID on Gold Jewellery
          </p>
        </div>

        <div className="flex gap-2 max-w-lg">
          <input
            type="text"
            value={huidInput}
            onChange={(e) => setHuidInput(e.target.value)}
            placeholder="E.G. AB1234 OR XY9876"
            className="flex-1 px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 text-xs font-mono uppercase focus:outline-none focus:border-blue-500"
          />
          <button
            onClick={handleVerifyHUID}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold px-5 py-2.5 rounded-lg text-xs transition-all shadow-sm"
          >
            Verify HUID
          </button>
        </div>

        {/* Verified Result Display */}
        {huidVerified && (
          <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-300 space-y-3 text-xs">
            <div className="flex items-center gap-2 text-emerald-800 font-bold border-b border-emerald-200 pb-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Authentic
              Hallmarked Gold Item
            </div>
            <div className="grid md:grid-cols-2 gap-3">
              <div>
                <p className="text-slate-500">Jeweller:</p>
                <p className="font-semibold text-slate-900">
                  Tanishq Jewellers, CP New Delhi
                </p>
              </div>
              <div>
                <p className="text-slate-500">Purity Grade:</p>
                <p className="font-semibold text-amber-700">
                  22K 916 (91.6% Pure)
                </p>
              </div>
              <div>
                <p className="text-slate-500">Article Type:</p>
                <p className="font-semibold text-slate-900">Gold Bangle Set</p>
              </div>
              <div>
                <p className="text-slate-500">Assay Center:</p>
                <p className="font-semibold text-slate-900">
                  Gem & Jewellery Testing Lab Delhi
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* BIS Care Grievance Redressal Card */}
      <div className="bg-white p-6 rounded-xl border border-slate-300 shadow-sm space-y-4">
        <div>
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-red-600" /> BIS Care Grievance
            Redressal
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            Report fake ISI mark, sub-standard quality, or uncertified products
          </p>
        </div>

        <div className="space-y-3">
          <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
            STEP 1: SELECT COMPLAINT CATEGORY
          </p>
          <div className="grid md:grid-cols-2 gap-3">
            {[
              "Misuse of ISI Mark",
              "Sub-standard Quality Product",
              "Hallmark Purity Defect",
              "False Advertisement",
            ].map((cat, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setGrievanceCategory(cat)}
                className={`p-3 rounded-lg border text-left text-xs transition-all ${
                  grievanceCategory === cat
                    ? "bg-red-50 border-red-500 text-red-950 font-bold"
                    : "bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-300"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* STEP 2 Form Expansion */}
          {grievanceCategory && !grievanceSubmitted && (
            <form
              onSubmit={handleGrievanceSubmit}
              className="pt-3 space-y-3 border-t border-slate-200"
            >
              <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                STEP 2: ENTER DETAILS & IS CODE
              </p>
              <input
                type="text"
                placeholder="Product Name / Brand / IS Code..."
                value={grievanceDetails.brand}
                onChange={(e) =>
                  setGrievanceDetails({
                    ...grievanceDetails,
                    brand: e.target.value,
                  })
                }
                className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs text-slate-900 focus:outline-none focus:border-red-500"
              />
              <textarea
                rows={2}
                placeholder="Describe product issue or location where non-ISI item was sold..."
                value={grievanceDetails.issue}
                onChange={(e) =>
                  setGrievanceDetails({
                    ...grievanceDetails,
                    issue: e.target.value,
                  })
                }
                className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs text-slate-900 focus:outline-none focus:border-red-500"
              />
              <button
                type="submit"
                className="bg-red-600 hover:bg-red-700 text-white text-xs font-bold px-5 py-2.5 rounded-lg transition-all shadow-sm"
              >
                Submit Official Grievance
              </button>
            </form>
          )}

          {/* Grievance Submission Confirmation */}
          {grievanceSubmitted && (
            <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-300 text-xs space-y-1">
              <p className="font-bold text-emerald-800 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Grievance
                Successfully Registered
              </p>
              <p className="text-slate-600">
                Complaint Docket ID:{" "}
                <span className="font-mono text-slate-900 font-bold">
                  BIS-ECV-2026-98741
                </span>
              </p>
              <p className="text-slate-500 text-[11px]">
                Track status anytime in BIS Care Mobile Application.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Multilingual Voice Helper Card */}
      {/* <div className="bg-blue-900 text-white p-6 rounded-xl border border-blue-800 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <span className="bg-blue-800 text-blue-200 border border-blue-700 text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">
              MULTILINGUAL VOICE HELPER
            </span>
            <h3 className="text-[14px] md:text-sm font-bold text-white mt-1">
              Speak in Hindi, Tamil, or English to find BIS Certified Brands
            </h3>
            <p className="text-[8px] md:text-xs text-blue-200 mt-0.5">
              Hands-free voice assistance for elderly & rural consumers.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setIsVoiceActive(!isVoiceActive)}
            className={` p-3 rounded-full flex items-center justify-center transition-all ${
              isVoiceActive
                ? "bg-red-400 text-slate-950 animate-pulse shadow-lg"
                : "bg-blue-700 hover:bg-blue-600 text-white"
            }`}
            title="Toggle Voice Input"
          >
            <Volume2 className="w-3 h-3 md:w-6 md:h-6" />
          </button>
        </div>
      </div> */}

      {/* Smart Assistant */}
      <SmartAssistant mode="consumer" language={language} />
    </div>
  );
};

export default DashboardConsumer;
