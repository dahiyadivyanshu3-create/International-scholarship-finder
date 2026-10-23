import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../components/AuthLayout";
import FormInput from "../components/FormInput";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.password.length < 6) return setError("Minimum Six letters");
    if (form.password !== form.confirm) return setError("Please Enter Same Password");

    setError("");
    console.log("Register data:", form); // baad mein yahan API call aayegi
    navigate("/login");
  };

  return (
    <AuthLayout title="Create Your Account" subtitle="Get personalized scholarship recommendations.">
      <form onSubmit={handleSubmit}>
        <FormInput label="Full Name" name="name" value={form.name}
          onChange={handleChange} placeholder="Enter your full name" required />
        <FormInput label="Email Address" type="email" name="email" value={form.email}
          onChange={handleChange} placeholder="Enter your email" required />
        <FormInput label="Password" type="password" name="password" value={form.password}
          onChange={handleChange} placeholder="Create a strong password" required />
        <FormInput label="Re-enter Password" type="password" name="confirm" value={form.confirm}
          onChange={handleChange} placeholder="Confirm your password" required />

        {error && <p className="mb-4 text-sm text-red-500">{error}</p>}

        <button className="w-full rounded-lg bg-primary py-2.5 text-sm font-medium text-white hover:opacity-90">
          Sign Up
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-slate-500">
        Already have an account?{" "}
        <Link to="/login" className="font-medium text-primary">Login</Link>
      </p>
    </AuthLayout>
  );
}