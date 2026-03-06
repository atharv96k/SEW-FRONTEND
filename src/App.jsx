import { useState } from "react";
import axios from "axios";

function App() {
  const [emailContent, setEmailContent] = useState("");
  const [tone, setTone] = useState("");
  const [generatedReply, setGeneratedReply] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const API_URL =
    import.meta.env.VITE_API_URL;
  console.log(API_URL);
  
  const handleSubmit = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.post(
        `${API_URL}/api/email/generate`,
        { emailContent, tone },
      );
      setGeneratedReply(
        typeof response.data === "string"
          ? response.data
          : JSON.stringify(response.data),
      );
    } catch (error) {
      setError("Failed to generate email reply. Please try again");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedReply);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 lg:mb-16">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center shadow-md">
              <svg
                className="w-5 h-5 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8"
                />
              </svg>
            </div>
            <span className="text-xs font-semibold tracking-widest text-indigo-600 uppercase">
              AI Powered
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900">
            Email Reply Generator
          </h1>

          <p className="mt-3 text-sm sm:text-base text-slate-500">
            Paste an email and generate a smart, contextual reply instantly.
          </p>
        </div>

        {/* Main Grid */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* LEFT: Input Card */}
          <div className="bg-white rounded-3xl shadow-lg border border-slate-200 p-6 sm:p-8 space-y-6">
            {/* Email Input */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Original Email
              </label>
              <textarea
                rows={8}
                value={emailContent}
                onChange={(e) => setEmailContent(e.target.value)}
                placeholder="Paste the email you'd like to reply to..."
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm sm:text-base text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none transition"
              />
            </div>

            {/* Tone Selector */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Tone <span className="text-slate-400">(Optional)</span>
              </label>

              <select
                value={tone}
                onChange={(e) => setTone(e.target.value)}
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm sm:text-base text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
              >
                <option value="">Default (Smart Tone)</option>

                <optgroup label="Professional">
                  <option value="Professional">Professional</option>
                  <option value="Formal">Formal</option>
                  <option value="Concise">Concise</option>
                  <option value="Executive">Executive</option>
                  <option value="Diplomatic">Diplomatic</option>
                  <option value="Assertive">Assertive</option>
                </optgroup>

                <optgroup label="Friendly & Casual">
                  <option value="Friendly">Friendly</option>
                  <option value="Casual">Casual</option>
                  <option value="Warm">Warm</option>
                  <option value="Conversational">Conversational</option>
                  <option value="Light">Light & Polite</option>
                </optgroup>

                <optgroup label="Intent-Based">
                  <option value="Apologetic">Apologetic</option>
                  <option value="Grateful">Grateful</option>
                  <option value="Encouraging">Encouraging</option>
                  <option value="Follow-up">Follow-up Reminder</option>
                  <option value="Decline">Decline Politely</option>
                  <option value="Clarification">Request Clarification</option>
                </optgroup>
              </select>
            </div>

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              disabled={!emailContent || loading}
              className="w-full flex items-center justify-center gap-2 rounded-2xl bg-indigo-600 px-5 py-4 text-sm sm:text-base font-semibold text-white hover:bg-indigo-700 active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-md"
            >
              {loading ? (
                <>
                  <svg
                    className="animate-spin w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8H4z"
                    />
                  </svg>
                  Generating...
                </>
              ) : (
                "Generate Reply"
              )}
            </button>

            {error && (
              <div className="rounded-xl bg-red-50 border border-red-100 px-4 py-3 text-sm text-red-600">
                {error}
              </div>
            )}
          </div>

          {/* RIGHT: Output Card */}
          <div className="bg-white rounded-3xl shadow-lg border border-slate-200 p-6 sm:p-8 flex flex-col">
            <h2 className="text-sm font-semibold text-slate-700 mb-4">
              Generated Reply
            </h2>

            <textarea
              rows={14}
              readOnly
              value={generatedReply}
              placeholder="Your generated reply will appear here..."
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm sm:text-base text-slate-800 resize-none focus:outline-none"
            />

            {generatedReply && (
              <button
                onClick={handleCopy}
                className="mt-4 w-full sm:w-auto sm:self-start flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white hover:bg-indigo-700 active:scale-[0.98] transition-all duration-200 shadow-sm"
              >
                {copied ? (
                  <>
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Copied!
                  </>
                ) : (
                  <>
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                      />
                    </svg>
                    Copy to Clipboard
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
      <footer className="mt-16 border-t border-slate-200 bg-gradient-to-r from-white to-slate-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center">
          <p className="text-xs sm:text-sm text-slate-500 tracking-wide">
            © {new Date().getFullYear()} Email Reply Generator. All rights
            reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
