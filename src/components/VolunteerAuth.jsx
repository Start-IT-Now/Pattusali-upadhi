import { useState } from "react";
import { supabase } from "../lib/supabase";

export default function VolunteerAuth({ onSuccess, onCancel }) {
  const [mode, setMode] = useState("login"); // 'login' | 'signup'
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const resetForm = () => {
    setName("");
    setEmail("");
    setPassword("");
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (mode === "login") {
        const { data, error } = await supabase
          .from("volunteers")
          .select("id, name, email")
          .eq("email", email)
          .eq("password", password)
          .single();

        if (error || !data) {
          setError("Invalid email or password.");
        } else {
          resetForm();
          onSuccess(data);
        }
      } else {
        // SIGN UP
        const { data, error } = await supabase
          .from("volunteers")
          .insert([{ name, email, password }])
          .select("id, name, email")
          .single();

        if (error) {
          if (error.code === "23505") {
            // unique_violation
            setError("This email is already registered. Please login instead.");
          } else {
            setError("Could not sign up. Please try again.");
          }
        } else {
          resetForm();
          onSuccess(data); // auto-login after signup
        }
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md p-6 sm:p-8">
      {/* Toggle */}
      <div className="flex mb-6 border-b border-gray-200">
        <button
          type="button"
          onClick={() => {
            setMode("login");
            setError("");
          }}
          className={`flex-1 py-2 text-sm font-semibold ${
            mode === "login"
              ? "text-[#cc654d] border-b-2 border-[#cc654d]"
              : "text-gray-500"
          }`}
        >
          Login
        </button>
        <button
          type="button"
          onClick={() => {
            setMode("signup");
            setError("");
          }}
          className={`flex-1 py-2 text-sm font-semibold ${
            mode === "signup"
              ? "text-[#cc654d] border-b-2 border-[#cc654d]"
              : "text-gray-500"
          }`}
        >
          Sign Up
        </button>
      </div>

      <h2 className="text-xl sm:text-2xl font-bold text-brown mb-2">
        {mode === "login" ? "Volunteer Login" : "Volunteer Sign Up"}
      </h2>
      <p className="text-sm text-brown/70 mb-5">
        {mode === "login"
          ? "Login to post job opportunities for Pattusali community."
          : "Create a volunteer account to post job opportunities."}
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        {mode === "signup" && (
          <div>
            <label className="block text-sm font-medium text-brown mb-1">
              Name
            </label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-brown mb-1">
            Email
          </label>
          <input
            type="email"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-brown mb-1">
            Password
          </label>
          <input
            type="password"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {error && <p className="text-sm text-red-600">{error}</p>}

        <div className="flex items-center justify-between pt-2">
          <button
            type="button"
            onClick={onCancel}
            className="text-sm text-brown hover:underline"
          >
            ← Back to jobs
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-5 py-2 rounded-full bg-[#cc654d] text-white text-sm font-semibold hover:bg-sky-600 transition disabled:opacity-60"
          >
            {loading
              ? mode === "login"
                ? "Logging in..."
                : "Creating..."
              : mode === "login"
              ? "Login"
              : "Sign Up"}
          </button>
        </div>
      </form>
    </div>
  );
}
