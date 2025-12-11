import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { supabase } from "../lib/supabase";

export default function VolunteerAuth({ onSuccess, onCancel }) {
  const [mode, setMode] = useState("login"); // 'login' | 'signup'
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const resetForm = () => {
    setName("");
    setEmail("");
    setPassword("");
    setError("");
  };

  const validateEmail = (e) => {
    const val = (e || email || "").trim().toLowerCase();
    // basic email check
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val) ? val : null;
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    setError("");
    setLoading(true);

    const trimmedEmail = (email || "").trim().toLowerCase();
    const trimmedPassword = (password || "").trim();
    const trimmedName = (name || "").trim();

    // basic validation
    if (!trimmedEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      setError("Please enter a valid email address.");
      setLoading(false);
      return;
    }
    if (!trimmedPassword || trimmedPassword.length < 4) {
      setError("Password must be at least 4 characters.");
      setLoading(false);
      return;
    }
    if (mode === "signup" && !trimmedName) {
      setError("Please enter your name to sign up.");
      setLoading(false);
      return;
    }

    try {
      if (mode === "login") {
        // Query volunteers table for matching email & password (existing behavior)
        const { data, error: queryError } = await supabase
          .from("volunteers")
          .select("id, name, email")
          .eq("email", trimmedEmail)
          .eq("password", trimmedPassword)
          .maybeSingle();

        if (queryError) {
          console.error("Volunteer login error:", queryError);
          setError("An error occurred during login. Try again.");
        } else if (!data) {
          setError("Invalid email or password.");
        } else {
          resetForm();
          if (typeof onSuccess === "function") onSuccess(data);
        }
      } else {
        // SIGN UP: create volunteer row (keeps plain password column for compatibility)
        // try insert and return inserted row
        const { data, error: insertError } = await supabase
          .from("volunteers")
          .insert([{ name: trimmedName, email: trimmedEmail, password: trimmedPassword }])
          .select("id, name, email")
          .maybeSingle();

        if (insertError) {
          // Unique violation or other DB error
          // Supabase error object shape varies; check message/code
          console.error("Volunteer signup error:", insertError);
          if (insertError.code === "23505" || (insertError.details && insertError.details.includes("already exists"))) {
            setError("This email is already registered. Please login instead.");
          } else {
            setError("Could not sign up. Please try again.");
          }
        } else if (!data) {
          setError("Could not sign up. Please try again.");
        } else {
          resetForm();
          if (typeof onSuccess === "function") onSuccess(data);
        }
      }
    } catch (err) {
      console.error("Unexpected VolunteerAuth error:", err);
      setError("Unexpected error. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-2xl shadow-md p-6 sm:p-8">
      {/* Toggle */}
      <div className="flex mb-6 border-b border-gray-200">
        <button
          type="button"
          onClick={() => {
            setMode("login");
            setError("");
          }}
          className={`flex-1 py-2 text-sm font-semibold ${mode === "login" ? "text-purple-600 border-b-2 border-purple-300" : "text-gray-500"}`}
        >
          Login
        </button>

        <button
          type="button"
          onClick={() => {
            setMode("signup");
            setError("");
          }}
          className={`flex-1 py-2 text-sm font-semibold ${mode === "signup" ? "text-purple-600 border-b-2 border-purple-300" : "text-gray-500"}`}
        >
          Sign Up
        </button>
      </div>

      <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
        {mode === "login" ? "Volunteer Login" : "Volunteer Sign Up"}
      </h2>
      <p className="text-sm text-gray-600 mb-5">
        {mode === "login"
          ? "Login to post job opportunities for Pattusali community."
          : "Create a volunteer account to post job opportunities."}
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        {mode === "signup" && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-300"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input
            type="email"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-300"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
          <input
            type={showPassword ? "text" : "password"}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-300 pr-10"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            aria-label="Password"
          />
          <button
            type="button"
            onClick={() => setShowPassword((s) => !s)}
            className="absolute right-2 top-8 p-1.5 rounded text-gray-600 hover:text-gray-800"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        </div>

        {error && <p className="text-sm text-red-600">{error}</p>}

        <div className="flex items-center justify-between pt-2">
          <button
            type="button"
            onClick={onCancel}
            className="text-sm text-gray-600 hover:underline"
          >
            ← Back to jobs
          </button>

          <button
            type="submit"
            disabled={loading}
            className="px-5 py-2 rounded-full bg-purple-600 text-white text-sm font-semibold hover:bg-purple-700 transition disabled:opacity-60"
          >
            {loading ? (mode === "login" ? "Logging in..." : "Creating...") : mode === "login" ? "Login" : "Sign Up"}
          </button>
        </div>
      </form>
    </div>
  );
}
