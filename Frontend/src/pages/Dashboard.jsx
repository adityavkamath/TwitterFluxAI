import { useEffect, useState } from "react";
import TweetGenerator from "../components/TweetGenerator";
import { API_BASE_URL } from "../config/api";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE_URL}/auth/me`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.username) setUser(data);
        else window.location.href = "/";
      })
      .finally(() => {
        setTimeout(() => setLoading(false), 800);
      });
  }, []);

  if (loading)
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="w-20 h-20 rounded-full border-4 border-t-transparent border-gray-700 animate-spin mb-6"></div>
          <p className="text-gray-500 text-lg">Loading your profile...</p>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-950 text-gray-200 flex flex-col md:flex-row items-center justify-center p-6 gap-10 overflow-hidden">
      <div className="bg-gray-900 rounded-xl shadow-xl p-8 max-w-md w-full relative overflow-hidden transition duration-700 ease-in-out transform hover:translate-y-1 hover:shadow-2xl animate-fadeIn">
        <div className="absolute -inset-2 bg-indigo-900/10 blur-3xl rounded-full z-0"></div>

        <div className="relative z-10">
          <div className="mb-8 flex justify-center">
            <div className="relative group">
              <div className="absolute inset-0 rounded-full bg-indigo-500/20 blur group-hover:blur-xl transition-all duration-700"></div>
              <img
                src={user.photo || "/default-avatar.png"}
                alt="Profile"
                className="relative w-28 h-28 rounded-full object-cover border-2 border-indigo-500/40 shadow-lg shadow-indigo-900/20 transition-all duration-500 group-hover:border-indigo-400 group-hover:shadow-indigo-800/30"
              />
            </div>
          </div>

          <h2 className="text-3xl font-bold mb-3 text-white text-center">
            Welcome, {user.displayName || "User"} 👋
          </h2>

          <p className="text-gray-400 mb-8 text-center">
            Twitter handle:{" "}
            <span className="text-indigo-400">
              @{user.username || "unknown"}
            </span>
          </p>

          <button
            onClick={() => {
              fetch(`${API_BASE_URL}/auth/logout`, {
                credentials: "include",
              }).then(() => {
                window.location.href = "/";
              });
            }}
            className="w-full px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white font-medium rounded-lg transition-all duration-300 relative overflow-hidden group"
          >
            <span className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
            <span className="relative">Logout</span>
          </button>
        </div>
      </div>

      <div className="w-full max-w-xl animate-slideInRight">
        <TweetGenerator />
      </div>
    </div>
  );
};

export default Dashboard;
