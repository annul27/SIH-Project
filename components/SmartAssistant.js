"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  Bot,
  Loader2,
  Send,
  Sparkles,
  BookOpen,
  AlertTriangle,
  RotateCcw,
} from "lucide-react";

const STARTERS = {
  industry: [
    "Which standard applies to a domestic pressure cooker and how do I get the ISI mark?",
    "We make phone chargers. Which BIS scheme applies?",
    "How do I choose a BIS-recognised lab for testing?",
    "What is a QCO and how do I know if my product is covered?",
  ],
  consumer: [
    "How do I check if a product really has a genuine ISI mark?",
    "What does 22K916 on my gold jewellery mean?",
    "How do I complain about a fake ISI mark?",
    "What is a HUID and how do I verify it?",
  ],
};

export default function SmartAssistant({
  mode = "industry",
  language = "English",
}) {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([]); // { role, content, sources?, grounded?, followUps?, error? }
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [messages, loading]);

  const ask = async (text) => {
    const question = text.trim();
    if (!question || loading) return;

    //testing purpose only
    console.group("[AI Assistant] Query Initiated");
    console.log("User Input:", question);
    console.log("Mode & Language:", { mode, language });

    const history = messages
      .filter((m) => !m.error)
      .map((m) => ({ role: m.role, content: m.content }));

    setMessages((prev) => [...prev, { role: "user", content: question }]);
    setInput("");
    setLoading(true);

    //testing purpose only
    console.time("AI Response Time");
    console.log("State: THINKING / Fetching response from /api/assistant...");

    try {
      const res = await fetch("/api/assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: question, history, mode, language }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Request failed");

      //testing purpose only
      console.timeEnd("AI Response Time");
      console.log("Response Received:", data);
      console.log("Answer Payload:", data.answer);
      console.log("Sources Cited:", data.sources);
      console.log("Grounded Status:", data.grounded);

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: data.answer,
          sources: data.sources,
          grounded: data.grounded,
          followUps: data.followUps,
        },
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: err.message, error: true },
      ]);
    } finally {
      setLoading(false);

      //testing purpose only
      console.log("State: IDLE / Ready for next input");
      console.groupEnd();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    ask(input);
  };

  const lastIndex = messages.length - 1;

  return (
    <div className="bg-white p-4 md:p-6 rounded-xl border border-slate-300 shadow-sm space-y-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Bot className="w-5 h-5 text-blue-600" />
            {mode === "consumer"
              ? "Ask BIS: Consumer Help"
              : "BIS Standards AI Assistant"}
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            Ask about Indian Standards, certification schemes, testing labs,
            hallmarking or consumer complaints. Answers come from the BIS
            knowledge base with sources. Replying in {language}.
          </p>
        </div>
        {messages.length > 0 && (
          <button
            type="button"
            onClick={() => setMessages([])}
            className="shrink-0 text-xs text-slate-500 hover:text-slate-800 flex items-center gap-1"
            title="Start a new conversation"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            New chat
          </button>
        )}
      </div>

      {/* Starter questions */}
      {messages.length === 0 && (
        <div className="space-y-2">
          <p className="text-xs font-semibold text-slate-600">Try asking:</p>
          <div className="grid md:grid-cols-2 gap-2">
            {STARTERS[mode].map((q) => (
              <button
                key={q}
                type="button"
                onClick={() => ask(q)}
                className="text-left text-xs p-3 rounded-lg border border-slate-200 bg-slate-50 text-slate-700 hover:border-blue-400 hover:bg-blue-50 transition-colors"
              >
                {q}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Conversation */}
      {messages.length > 0 && (
        <div className="space-y-3 max-h-112 overflow-y-auto pr-1">
          {messages.map((m, i) =>
            m.role === "user" ? (
              <div key={i} className="flex justify-end">
                <div className="bg-blue-600 text-white text-xs px-3.5 py-2.5 rounded-xl rounded-br-sm max-w-[85%] whitespace-pre-wrap">
                  {m.content}
                </div>
              </div>
            ) : m.error ? (
              <div
                key={i}
                className="bg-red-50 border border-red-300 text-red-800 text-xs p-3 rounded-xl flex gap-2"
              >
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>{m.content}</span>
              </div>
            ) : (
              <div
                key={i}
                className="bg-slate-50 border border-slate-300 rounded-xl p-4 space-y-3"
              >
                <div className="flex items-center gap-2 text-xs font-bold text-slate-900 border-b border-slate-200 pb-2">
                  <Sparkles className="w-4 h-4 text-amber-500" /> BIS Assistant
                  {m.grounded === false && (
                    <span className="ml-auto text-[10px] font-semibold bg-amber-100 text-amber-800 border border-amber-300 px-2 py-0.5 rounded">
                      Not fully covered: verify on bis.gov.in
                    </span>
                  )}
                </div>

                <p className="text-xs text-slate-700 leading-relaxed whitespace-pre-wrap">
                  {m.content}
                </p>

                {m.sources?.length > 0 && (
                  <div className="space-y-1.5 pt-1">
                    <p className="text-[11px] font-bold text-slate-500 flex items-center gap-1.5">
                      <BookOpen className="w-3.5 h-3.5" /> Sources
                    </p>
                    {m.sources.map((s) => (
                      <p
                        key={s.id}
                        className="text-xs text-slate-600 leading-normal pl-2 border-l-2 border-blue-500"
                      >
                        <span className="font-semibold text-slate-800">
                          {s.title}
                        </span>
                        <span className="block text-[11px] text-slate-500">
                          {s.ref}
                        </span>
                      </p>
                    ))}
                  </div>
                )}

                {i === lastIndex && m.followUps?.length > 0 && (
                  <div className="flex flex-wrap gap-2 pt-1">
                    {m.followUps.map((f) => (
                      <button
                        key={f}
                        type="button"
                        onClick={() => ask(f)}
                        disabled={loading}
                        className="text-[11px] px-2.5 py-1 rounded-full border border-blue-300 text-blue-700 bg-white hover:bg-blue-50 disabled:opacity-50"
                      >
                        {f}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ),
          )}

          {loading && (
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <Loader2 className="w-3.5 h-3.5 animate-spin" /> Searching the BIS
              knowledge base...
            </div>
          )}
          <div ref={bottomRef} />
        </div>
      )}

      {/* Input */}
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Describe your product or ask a question..."
          className="flex-1 bg-slate-50 border border-slate-300 rounded-lg px-4 py-3 text-xs text-slate-900 focus:outline-none focus:border-blue-600"
        />
        <button
          type="submit"
          disabled={loading || !input.trim()}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-4 rounded-lg text-xs transition-all flex items-center gap-2 shadow-sm disabled:opacity-50"
        >
          {loading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Send className="w-4 h-4" />
          )}
          <span className="hidden sm:inline">Ask</span>
        </button>
      </form>

      <p className="text-[11px] text-slate-400">
        Prototype: answers are limited to the sample knowledge base. Always
        confirm against the official Indian Standard and bis.gov.in.
      </p>
    </div>
  );
}
