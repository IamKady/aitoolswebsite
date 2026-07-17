import { Metadata } from "next";
import { MessageSquare, Mail, Globe, MapPin } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact ToolWire AI | Support Team",
  description: "Get in touch with the ToolWire AI support, feedback, and sponsorship team. Send inquiries or submit tickets directly.",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto flex flex-col lg:flex-row gap-12 items-center justify-center">
      {/* Contact info */}
      <div className="lg:w-1/2 space-y-6">
        <div className="w-12 h-12 rounded-xl gradient-bg flex items-center justify-center shadow-lg shadow-primary/20">
          <MessageSquare className="w-6 h-6 text-white" />
        </div>
        <h1 className="text-4xl font-extrabold tracking-tight text-foreground">
          Get in Touch with <span className="gradient-text">Us</span>
        </h1>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Have an inquiry, feedback about our directory, or sponsorship proposal? Fill out the form, and our support team will reply within 24 hours.
        </p>

        <div className="space-y-4 pt-6">
          <div className="flex gap-3 text-xs">
            <Mail className="w-4 h-4 text-primary" />
            <div>
              <h4 className="font-bold text-foreground">Support & Inquiries</h4>
              <p className="text-muted-foreground mt-0.5">support@toolwire.ai</p>
            </div>
          </div>
          <div className="flex gap-3 text-xs">
            <MapPin className="w-4 h-4 text-primary" />
            <div>
              <h4 className="font-bold text-foreground">Global Office</h4>
              <p className="text-muted-foreground mt-0.5">San Francisco, CA</p>
            </div>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="lg:w-1/2 w-full p-8 rounded-2xl border border-border bg-card">
        <form className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-foreground">Full Name</label>
            <input
              type="text"
              placeholder="Your Name"
              required
              className="w-full px-3 py-2 rounded-xl border border-border bg-background text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-foreground">Email Address</label>
            <input
              type="email"
              placeholder="you@email.com"
              required
              className="w-full px-3 py-2 rounded-xl border border-border bg-background text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-foreground">Message</label>
            <textarea
              rows={4}
              placeholder="Write your message here..."
              required
              className="w-full px-3 py-2 rounded-xl border border-border bg-background text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary resize-none"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2.5 rounded-xl gradient-bg text-white font-semibold text-sm hover:opacity-90 transition-opacity shadow-lg"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
}
