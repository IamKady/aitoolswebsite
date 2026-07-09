"use client";

import { useUser } from "@clerk/nextjs";
import { useState, useEffect } from "react";
import { User, Bell, Shield, Keyboard, Save, CheckCircle } from "lucide-react";

export default function DashboardSettingsPage() {
  const { user, isLoaded } = useUser();
  const [mounted, setMounted] = useState(false);
  const [success, setSuccess] = useState(false);
  const [newsletter, setNewsletter] = useState(true);
  const [alerts, setAlerts] = useState(true);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);
  };

  if (!mounted || !isLoaded) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Settings</h1>
          <p className="text-muted-foreground text-sm">Manage your profile, alerts, and personalization preferences.</p>
        </div>
        <div className="h-64 rounded-2xl bg-muted/20 animate-pulse border border-border" />
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Settings</h1>
        <p className="text-muted-foreground text-sm">Manage your profile, alerts, and personalization preferences.</p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Profile Card */}
        <div className="p-6 rounded-2xl border border-border bg-card shadow-sm space-y-4">
          <h2 className="text-base font-bold text-foreground flex items-center gap-2">
            <User className="w-4 h-4 text-primary" />
            Profile Information
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-muted-foreground mb-1.5">First Name</label>
              <input
                type="text"
                disabled
                value={user?.firstName || "Anonymous"}
                className="w-full px-3.5 py-2 border border-border rounded-xl bg-muted text-muted-foreground text-sm cursor-not-allowed"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-muted-foreground mb-1.5">Last Name</label>
              <input
                type="text"
                disabled
                value={user?.lastName || ""}
                className="w-full px-3.5 py-2 border border-border rounded-xl bg-muted text-muted-foreground text-sm cursor-not-allowed"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-muted-foreground mb-1.5">Email Address</label>
            <input
              type="email"
              disabled
              value={user?.primaryEmailAddress?.emailAddress || ""}
              className="w-full px-3.5 py-2 border border-border rounded-xl bg-muted text-muted-foreground text-sm cursor-not-allowed"
            />
          </div>
          <p className="text-xs text-muted-foreground italic">
            Profile details are managed securely via your Clerk accounts center.
          </p>
        </div>

        {/* Notifications */}
        <div className="p-6 rounded-2xl border border-border bg-card shadow-sm space-y-4">
          <h2 className="text-base font-bold text-foreground flex items-center gap-2">
            <Bell className="w-4 h-4 text-primary" />
            Notification Settings
          </h2>
          <div className="space-y-4">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={newsletter}
                onChange={(e) => setNewsletter(e.target.checked)}
                className="mt-1 rounded border-border text-primary focus:ring-primary"
              />
              <div>
                <p className="text-sm font-semibold text-foreground">Weekly Curated Newsletter</p>
                <p className="text-xs text-muted-foreground">Receive weekly roundups of trending tools and collections.</p>
              </div>
            </label>

            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={alerts}
                onChange={(e) => setAlerts(e.target.checked)}
                className="mt-1 rounded border-border text-primary focus:ring-primary"
              />
              <div>
                <p className="text-sm font-semibold text-foreground">Product Updates & Alerts</p>
                <p className="text-xs text-muted-foreground">Get notified when tools you review receive major updates.</p>
              </div>
            </label>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between gap-4">
          <button
            type="submit"
            className="flex items-center gap-1.5 px-5 py-2.5 gradient-bg text-white rounded-xl text-sm font-semibold hover:opacity-90 transition-opacity shadow-lg shadow-primary/10"
          >
            <Save className="w-4 h-4" />
            Save Changes
          </button>

          {success && (
            <p className="text-sm text-green-500 font-semibold flex items-center gap-1.5 animate-fade-in">
              <CheckCircle className="w-4 h-4" />
              Settings updated successfully!
            </p>
          )}
        </div>
      </form>
    </div>
  );
}
