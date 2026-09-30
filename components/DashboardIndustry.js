'use client';

import React, { useState } from 'react';
import { 
  Search, 
  FileCheck, 
  Bot, 
  ChevronRight, 
  Shield, 
  CheckCircle2, 
  CheckSquare, 
  Upload, 
  Loader2, 
  Sparkles,
  ChevronDown
} from 'lucide-react';
import SmartAssistant from './SmartAssistant';

export default function DashboardIndustry({language = 'English'}) {
  const [activeTab, setActiveTab] = useState('enterprise');
  const [subView, setSubView] = useState('search');
  const [query, setQuery] = useState('');
  const [selectedShortcut, setSelectedShortcut] = useState('sc-1');

  // Audit state
  const [isAuditing, setIsAuditing] = useState(false);
  const [auditResult, setAuditResult] = useState(null);

  // Sample Shortcuts Data
  const shortcuts = [
    { id: 'sc-1', isCode: 'IS 2347', title: 'Domestic Pressure Cookers' },
    { id: 'sc-2', isCode: 'IS 302-2-3', title: 'Electric Iron Safety Standards' },
    { id: 'sc-3', isCode: 'IS 1293', title: 'Plugs and Socket Outlets' }
  ];

  // Sub-view options array for rendering dropdown and tabs
  const subViewOptions = [
    { id: 'search', label: 'IS/HS Code Search & Roadmap', icon: Search },
    { id: 'audit', label: 'Doc Audit & Lab Pre-Screening', icon: FileCheck },
    { id: 'live', label: 'Live Gemini AI Technical Copilot', icon: Bot },
  ];

  // Sample current database records mapped by IS code
  const standardsDataMap = {
    'IS 2347': {
      isCode: 'IS 2347',
      hsCode: '7323.93.00',
      title: 'Domestic Pressure Cookers - Specification',
      scheme: 'Scheme-I (ISI Mark)',
      fee: {
        application: '₹1,000 + GST',
        markingRate: '₹5.00 per unit'
      },
      testingParams: [
        'Bursting Pressure Test (Min 3x working pressure)',
        'Operating Pressure & Safety Valve Release',
        'Thermal Shock & Over-pressure Leakage',
        'Material Chemical Composition (Food Grade SS/Aluminium)'
      ],
      docDossier: [
        'Factory Layout & Machinery Details',
        'In-house Quality Control (IQC) Test Equipment Calibration Logs',
        'Raw Material Test Certificates (Mill Test Reports)',
        'Proof of Manufacturing Unit Premises (GST/Lease/MSME)'
      ],
      auditInfo:
        'A BIS Inspection Officer conducts an on-site factory verification. They check the manufacturing process, verify quality control infrastructure, calibrate testing devices, and draw official verification samples for independent NABL testing.'
    }
  };

  // Fallback to avoid runtime crashes if query/shortcut doesn't match
  const currentData = standardsDataMap[query] || standardsDataMap['IS 2347'];

  const handleRunAudit = () => {
    setIsAuditing(true);
    setTimeout(() => {
      setIsAuditing(false);
      setAuditResult(true);
    }, 1500);
  };

  return (
    <div className="w-full max-w-5xl mx-auto">
      {activeTab === 'enterprise' && (
        <div className="space-y-6">
          {/* Sub View Navigation */}
          <div>
            {/* MOBILE DROPDOWN SELECT (< 768px) */}
            <div className="block md:hidden relative bg-white rounded-xl border border-slate-300 shadow-sm p-1.5">
              <div className="relative flex items-center">
                {(() => {
                  const CurrentIcon = subViewOptions.find((opt) => opt.id === subView)?.icon || Search;
                  return <CurrentIcon className="w-4 h-4 text-blue-600 absolute left-3 pointer-events-none" />;
                })()}
                <select
                  value={subView}
                  onChange={(e) => setSubView(e.target.value)}
                  className="w-full pl-9 pr-8 py-2 bg-transparent text-xs font-bold text-slate-800 focus:outline-none appearance-none cursor-pointer"
                >
                  {subViewOptions.map((opt) => (
                    <option key={opt.id} value={opt.id}>
                      {opt.label}
                    </option>
                  ))}
                </select>
                <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 pointer-events-none" />
              </div>
            </div>

            {/* DESKTOP TOGGLE BAR (>= 768px) */}
            <div className="hidden md:flex bg-white p-1.5 rounded-xl border border-slate-300 shadow-sm gap-2">
              {subViewOptions.map((opt) => {
                const IconComponent = opt.icon;
                return (
                  <button
                    key={opt.id}
                    onClick={() => setSubView(opt.id)}
                    className={`flex-1 py-2 rounded-lg text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                      subView === opt.id
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    <IconComponent className="w-4 h-4" /> {opt.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* SUBVIEW 1: SEARCH & ROADMAP */}
          {subView === 'search' && (
            <div className="space-y-6">
              <div className="bg-white p-5 rounded-xl border border-slate-300 shadow-sm space-y-4">
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  SEARCH BY IS CODE OR HS CODE
                </p>
                <div className="relative">
                  <Search className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="e.g. IS 2347, Pressure Cooker, HS 7323..."
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 text-sm focus:outline-none focus:border-blue-500 font-mono"
                  />
                </div>

                <div className="space-y-2">
                  <p className="text-xs font-semibold text-slate-600">Quick Standards Shortcuts:</p>
                  <div className="space-y-2">
                    {shortcuts.map((s) => (
                      <button
                        key={s.id}
                        onClick={() => {
                          setSelectedShortcut(s.id);
                          setQuery(s.isCode);
                        }}
                        className={`w-full text-left p-3 rounded-lg border text-xs transition-all flex items-center justify-between ${
                          selectedShortcut === s.id
                            ? 'bg-blue-50/80 border-blue-500 text-blue-950 font-medium'
                            : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50'
                        }`}
                      >
                        <div>
                          <span className="font-bold text-blue-700 mr-2">{s.isCode}</span>
                          <span>{s.title}</span>
                        </div>
                        <ChevronRight className="w-4 h-4 text-slate-400" />
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Fee Estimator */}
              <div className="bg-white p-5 rounded-xl border border-slate-300 shadow-sm space-y-3">
                <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
                  <Shield className="w-5 h-5 text-amber-600" />
                  <h3 className="font-bold text-sm text-slate-900">BIS Scheme Fee Estimator</h3>
                </div>
                <div className="grid md:grid-cols-2 gap-4 text-xs">
                  <div className="bg-slate-50 p-3.5 rounded-lg border border-slate-200 flex justify-between items-center">
                    <span className="text-slate-600">Application & Audit Base Fee:</span>
                    <span className="font-bold bg-amber-500 text-black px-2 py-0.5 rounded text-xs">
                      {currentData?.fee?.application ?? 'N/A'}
                    </span>
                  </div>
                  <div className="bg-slate-50 p-3.5 rounded-lg border border-slate-200 flex justify-between items-center">
                    <span className="text-slate-600">Marking Fee Rate:</span>
                    <span className="font-bold text-slate-900">{currentData?.fee?.markingRate ?? 'N/A'}</span>
                  </div>
                </div>
                <p className="text-[11px] text-slate-500 italic">
                  * Estimated for SME unit. Includes 1st year license validity & factory audit allocation.
                </p>
              </div>

              {/* Detailed Standards Card */}
              <div className="bg-white p-6 rounded-xl border border-slate-300 shadow-sm space-y-5">
                <div className="flex items-start justify-between border-b border-slate-200 pb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="bg-blue-100 text-blue-800 border border-blue-300 text-xs font-mono font-bold px-2 py-0.5 rounded">
                        {currentData?.isCode}
                      </span>
                      <span className="text-xs text-slate-500 font-mono">
                        HS Code: {currentData?.hsCode}
                      </span>
                    </div>
                    <h2 className="text-lg font-bold text-slate-900">{currentData?.title}</h2>
                  </div>
                  <span className="bg-amber-100 text-amber-800 border border-amber-300 text-xs px-2.5 py-1 rounded-md font-semibold">
                    {currentData?.scheme}
                  </span>
                </div>

                <div className="space-y-4">
                  <h4 className="text-xs font-bold text-slate-600 uppercase tracking-wider flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" /> End-to-End Compliance Certification Roadmap
                  </h4>

                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center">1</span>
                      <h5 className="text-xs font-bold text-slate-900">Mandatory Laboratory Testing Parameters</h5>
                    </div>
                    <p className="text-[11px] text-slate-500">Must be tested at NABL accredited / BIS-recognized laboratory:</p>
                    <div className="grid md:grid-cols-2 gap-2 pt-1">
                      {currentData?.testingParams?.map((param, idx) => (
                        <div key={idx} className="bg-white p-2.5 rounded border border-slate-200 text-xs text-slate-700 flex items-center gap-2">
                          <CheckSquare className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          {param}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center">2</span>
                      <h5 className="text-xs font-bold text-slate-900">Document Dossier Checklist</h5>
                    </div>
                    <p className="text-[11px] text-slate-500">Upload these through BIS ManakOnline portal:</p>
                    <ul className="space-y-1.5 pt-1">
                      {currentData?.docDossier?.map((doc, idx) => (
                        <li key={idx} className="text-xs text-slate-700 flex items-center gap-2">
                          <span className="w-1.5 h-1.5 bg-amber-500 rounded-full"></span>
                          {doc}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center">3</span>
                      <h5 className="text-xs font-bold text-slate-900">Factory Audit & Inspection</h5>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">{currentData?.auditInfo}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* SUBVIEW 2: DOC AUDIT */}
          {subView === 'audit' && (
            <div className="bg-white p-6 rounded-xl border border-slate-300 shadow-sm space-y-5">
              <div>
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <FileCheck className="w-5 h-5 text-blue-600" /> AI Document Pre-Screening & Test Report Audit
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Upload factory test reports or calibration certificates to automatically screen against Target IS Code limits before official submission.
                </p>
              </div>

              {!auditResult ? (
                <div className="border-2 border-dashed border-slate-300 hover:border-blue-500 rounded-xl p-8 text-center space-y-4 bg-slate-50 transition-colors">
                  <Upload className="w-10 h-10 text-slate-400 mx-auto" />
                  <div>
                    <p className="text-xs font-semibold text-slate-700">Drag & Drop Test Report PDF or Image here</p>
                    <p className="text-[11px] text-slate-400 mt-1">Supports PDF, PNG, JPG (Max 15MB)</p>
                  </div>
                  <button
                    onClick={handleRunAudit}
                    disabled={isAuditing}
                    className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-5 py-2.5 rounded-lg transition-all inline-flex items-center gap-2 shadow-sm disabled:opacity-50"
                  >
                    {isAuditing ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" /> Screening Report Clauses...
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4 text-amber-300" /> Run Sample Pre-Screening Audit
                      </>
                    )}
                  </button>
                </div>
              ) : (
                <div className="bg-emerald-50 p-5 rounded-xl border border-emerald-300 space-y-4">
                  <div className="flex items-center justify-between text-xs border-b border-emerald-200 pb-3">
                    <span className="font-bold text-emerald-800 flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Pre-Screening Passed: 100% Clause Coverage
                    </span>
                    <span className="text-slate-600 font-mono">Report_IS2347_Audit.pdf</span>
                  </div>
                  <div className="grid md:grid-cols-3 gap-3 text-xs">
                    <div className="bg-white p-3 rounded border border-emerald-200">
                      <p className="text-slate-500">Parameters Tested</p>
                      <p className="text-sm font-bold text-slate-900 mt-1">4 / 4 Mandatory</p>
                    </div>
                    <div className="bg-white p-3 rounded border border-emerald-200">
                      <p className="text-slate-500">Calibrated Instruments</p>
                      <p className="text-sm font-bold text-emerald-700 mt-1">NABL Certified</p>
                    </div>
                    <div className="bg-white p-3 rounded border border-emerald-200">
                      <p className="text-slate-500">ManakOnline Status</p>
                      <p className="text-sm font-bold text-amber-700 mt-1">Ready to Submit</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* SUBVIEW 3: LIVE GEMINI COPILOT */}
          {subView === 'live' && <SmartAssistant mode="industry" language={language}/>}
        </div>
      )}
    </div>
  );
}