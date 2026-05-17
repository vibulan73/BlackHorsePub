"use client";

import { FormEvent, useState } from "react";
import { API_BASE } from "../lib/api";

const modules = ["Events", "Open Mic", "Menu", "Orders", "Reservations", "Media", "News"];

export function AdminDashboard() {
  const [token, setToken] = useState("");
  const [message, setMessage] = useState("");

  async function login(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const response = await fetch(`${API_BASE}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: form.get("username"), password: form.get("password") })
    });
    if (!response.ok) {
      setMessage("Login failed.");
      return;
    }
    const data = await response.json();
    setToken(data.token);
    setMessage("Admin session ready.");
  }

  return (
    <div className="grid">
      <form className="card" onSubmit={login}>
        <h3>Admin Login</h3>
        <div className="form-row">
          <label className="field">Username<input name="username" defaultValue="admin" required /></label>
          <label className="field">Password<input name="password" type="password" required /></label>
        </div>
        <button className="button" type="submit">Log In</button>
        {message && <p>{message}</p>}
      </form>
      <div className="card">
        <h3>Manage</h3>
        <div className="admin-grid">
          {modules.map((module) => <button className="button secondary" key={module} disabled={!token}>{module}</button>)}
        </div>
        <p>{token ? "Use the protected /admin APIs with this session token." : "Log in to enable protected admin actions."}</p>
      </div>
    </div>
  );
}
