import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../components/AuthLayout";
import FormInput from "../components/FormInput";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login data:", form); // baad mein yahan API call aayegi
    navigate("/dashboard"); 
  };

  return (
    <AuthLayout title="Welcome Back!" subtitle="Login to continue your journey.">
      <form onSubmit={handleSubmit}>
        <FormInput label="Email address" type="email" name="email" value={form.email}
          onChange={handleChange} placeholder="Enter your email" required />
        <FormInput label="Password" type="password" name="password" value={form.password}
          onChange={handleChange} placeholder="Enter your password" required />

        <button className="w-full rounded-lg bg-primary py-2.5 text-sm font-medium text-white hover:opacity-90">
          Login
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-slate-500">
        Don't have an account?{" "}
        <Link to="/register" className="font-medium text-primary">Sign Up</Link>
      </p>
    </AuthLayout>
  );
}