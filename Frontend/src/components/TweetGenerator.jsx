import React, { useState } from "react";
import { API_BASE_URL } from "../config/api";

const TweetGenerator = () => {
  const [mood, setMood] = useState("");
  const [topic, setTopic] = useState("");
  const [tweet, setTweet] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [posting, setPosting] = useState(false);
  const [success, setSuccess] = useState(false);

  const generateTweet = async () => {
    setLoading(true);
    setError("");
    setTweet("");
    setSuccess(false);

    try {
      const response = await fetch(
        `${API_BASE_URL}/tweets/generate-tweet`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ mood, topic }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setTweet(data.tweet);
      } else {
        setError(data.error || "Something went wrong");
      }
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const postTweet = async () => {
    setPosting(true);
    setError("");
    try {
      const res = await fetch(`${API_BASE_URL}/tweets/post-tweet`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ tweet }),
      });

      const data = await res.json();
      if (res.ok) {
        setSuccess(true);
        setTimeout(() => window.open(data.tweetUrl, "_blank"), 1000);
      } else {
        setError(data.error || "Failed to post tweet.");
      }
    } catch (err) {
      setError("Something went wrong posting the tweet.");
    } finally {
      setPosting(false);
    }
  };

  return (
    <div className="bg-gray-900 rounded-xl shadow-xl p-8 w-full animate-fadeIn">
      <div className="mb-8 flex items-center space-x-3">
        <div className="p-3 bg-indigo-900/30 rounded-lg">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-indigo-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
            />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-white">Generate a Tweet</h2>
      </div>

      <div className="space-y-6">
        <div className="group relative">
          <label className="block text-sm font-medium mb-2 text-gray-400 transition-colors duration-300 group-focus-within:text-indigo-400">
            Mood
          </label>
          <select
            className="block w-full bg-gray-800 border border-gray-700 text-white rounded-lg py-3 px-4 appearance-none focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300"
            value={mood}
            onChange={(e) => setMood(e.target.value)}
          >
            <option value="">-- Select Mood --</option>
            <option value="funny">Funny</option>
            <option value="motivational">Motivational</option>
            <option value="serious">Serious</option>
            <option value="inspirational">Inspirational</option>
            <option value="informative">Informative</option>
            <option value="sarcastic">Sarcastic</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 pt-6 text-gray-400">
            <svg
              className="h-5 w-5 transition-transform duration-300 group-focus-within:rotate-180"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>

        <div className="group relative">
          <label className="block text-sm font-medium mb-2 text-gray-400 transition-colors duration-300 group-focus-within:text-indigo-400">
            Topic (optional)
          </label>
          <input
            type="text"
            placeholder="e.g., AI, startups, productivity"
            className="block w-full bg-gray-800 border border-gray-700 text-white rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
          />
        </div>

        <button
          onClick={generateTweet}
          disabled={loading || !mood}
          className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-700 text-white font-medium py-3 px-4 rounded-lg transition-all duration-300 relative overflow-hidden disabled:opacity-60"
        >
          <span className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white to-transparent opacity-20 transform -skew-x-12 -translate-x-full hover:translate-x-full transition-transform duration-1500 ease-in-out"></span>

          <span className="relative flex items-center justify-center">
            {loading ? (
              <>
                <svg
                  className="animate-spin mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
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
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Generating...
              </>
            ) : (
              "Generate Tweet"
            )}
          </span>
        </button>

        {error && (
          <div className="mt-4 text-red-400 text-sm text-center p-3 bg-red-900/20 border border-red-800/30 rounded-lg animate-slideInDown">
            <svg
              className="inline-block w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            {error}
          </div>
        )}

        {tweet && (
          <div className="mt-6 animate-slideInUp">
            <div className="flex items-center mb-4">
              <div className="p-2 bg-indigo-900/30 rounded-md mr-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-indigo-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                  />
                </svg>
              </div>
              <h4 className="text-gray-300 font-medium">Generated Tweet</h4>
            </div>

            <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 mb-6 relative animate-pulse-subtle">
              <p className="text-white">{tweet}</p>
            </div>

            <button
              onClick={postTweet}
              disabled={posting}
              className={`w-full py-3 px-4 rounded-lg font-medium transition-all duration-300 relative overflow-hidden ${
                success
                  ? "bg-emerald-800 hover:bg-emerald-700 text-white"
                  : "bg-indigo-600 hover:bg-indigo-700 text-white"
              }`}
            >
              <span className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white to-transparent opacity-20 transform -skew-x-12 -translate-x-full hover:translate-x-full transition-transform duration-1500 ease-in-out"></span>

              <span className="relative flex items-center justify-center">
                {posting ? (
                  <>
                    <svg
                      className="animate-spin mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
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
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Posting...
                  </>
                ) : success ? (
                  <>
                    <svg
                      className="w-5 h-5 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Tweet Posted!
                  </>
                ) : (
                  <>
                    <svg
                      className="w-5 h-5 mr-2"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M23.643 4.937c-.835.37-1.732.62-2.675.733.962-.576 1.7-1.49 2.048-2.578-.9.534-1.897.922-2.958 1.13-.85-.904-2.06-1.47-3.4-1.47-2.572 0-4.658 2.086-4.658 4.66 0 .364.042.718.12 1.06-3.873-.195-7.304-2.05-9.602-4.868-.4.69-.63 1.49-.63 2.342 0 1.616.823 3.043 2.072 3.878-.764-.025-1.482-.234-2.11-.583v.06c0 2.257 1.605 4.14 3.737 4.568-.392.106-.803.162-1.227.162-.3 0-.593-.028-.877-.082.593 1.85 2.313 3.198 4.352 3.234-1.595 1.25-3.604 1.995-5.786 1.995-.376 0-.747-.022-1.112-.065 2.062 1.323 4.51 2.093 7.14 2.093 8.57 0 13.255-7.098 13.255-13.254 0-.2-.005-.402-.014-.602.91-.658 1.7-1.477 2.323-2.41z"></path>
                    </svg>
                    Post to Twitter
                  </>
                )}
              </span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TweetGenerator;
