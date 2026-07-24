"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Building2, 
  Users, 
  Briefcase, 
  Globe, 
  Mail, 
  Phone, 
  Plus, 
  Trash2, 
  ArrowLeft, 
  CheckCircle2, 
  ShieldCheck, 
  Sparkles,
  ArrowRight,
  Award,
  Lock
} from "lucide-react";
import NotchNavbar from "@/components/ui/notch-navbar";
import AnimatedButton from "@/components/ui/animated-button";

interface SocialPlatform {
  platform: string;
  url: string;
}

export default function RequestDemoPage() {
  const [formData, setFormData] = useState({
    companyName: "",
    size: "",
    employees: "",
    country: "",
    industry: "",
    companyWebsite: "",
    referralSource: "",
    contactName: "",
    email: "",
    phone: "",
    useCase: "",
  });

  const [socialPlatforms, setSocialPlatforms] = useState<SocialPlatform[]>([
    { platform: "", url: "" },
  ]);

  const [consents, setConsents] = useState({
    dataCollection: false,
    termsAndPrivacy: false,
    principalRights: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSocialChange = (index: number, field: "platform" | "url", value: string) => {
    const updated = [...socialPlatforms];
    updated[index][field] = value;
    setSocialPlatforms(updated);
  };

  const addSocialPlatform = () => {
    setSocialPlatforms((prev) => [...prev, { platform: "", url: "" }]);
  };

  const removeSocialPlatform = (index: number) => {
    setSocialPlatforms((prev) => prev.filter((_, i) => i !== index));
  };

  const handleCheckboxChange = (key: keyof typeof consents) => {
    setConsents((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const isFormValid =
    formData.companyName.trim() !== "" &&
    formData.size !== "" &&
    formData.country !== "" &&
    formData.industry !== "" &&
    formData.contactName.trim() !== "" &&
    formData.email.trim() !== "" &&
    formData.phone.trim() !== "" &&
    consents.dataCollection &&
    consents.termsAndPrivacy &&
    consents.principalRights;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) return;

    setIsSubmitting(true);
    // Simulate submission delay
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1200);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-[#0b130e] text-neutral-900 dark:text-neutral-100 transition-colors duration-300">
      <NotchNavbar />

      <main className="flex-1 relative pt-24 pb-20 px-4 sm:px-6 lg:px-8">
        {/* Background Ambient Glows */}
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-accent-green/10 dark:bg-accent-green/15 rounded-full blur-[120px] pointer-events-none z-0" />
        <div className="absolute bottom-40 right-10 w-[400px] h-[300px] bg-emerald-500/10 dark:bg-emerald-500/15 rounded-full blur-[100px] pointer-events-none z-0" />

        <div className="max-w-4xl mx-auto relative z-10">
          {/* Top Breadcrumb Header */}
          <div className="flex items-center justify-between gap-4 mb-8">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-accent-green/20 bg-surface-mint/80 dark:bg-surface-container/60 backdrop-blur-md text-xs font-semibold text-accent-green hover:bg-surface-mint dark:hover:bg-surface-container transition-all shadow-sm group"
            >
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              <span>Back to home</span>
            </Link>

            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-accent-green/30 bg-accent-green/10 text-xs font-bold text-accent-green">
              <span className="h-2 w-2 rounded-full bg-accent-green animate-pulse" />
              Request Demo
            </div>
          </div>

          <AnimatePresence mode="wait">
            {!isSubmitted ? (
              <motion.div
                key="demo-form"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                {/* Hero Title Section */}
                <div className="text-center mb-10">
                  <div className="inline-flex items-center gap-2 rounded-full border border-accent-green/20 bg-surface-mint/80 dark:bg-surface-container/60 px-3.5 py-1 text-[11px] font-bold uppercase tracking-[0.2em] text-accent-green mb-4 shadow-xs">
                    <Sparkles className="w-3.5 h-3.5" />
                    ZeroCarbon Enterprise
                  </div>
                  <h1 className="font-display-lg text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-primary dark:text-white leading-tight mb-4">
                    Experience <span className="text-accent-green">ZeroCarbon</span> for Your Organization
                  </h1>
                  <p className="font-body-xl text-base sm:text-lg text-neutral-600 dark:text-neutral-300 max-w-2xl mx-auto">
                    Discover how ZeroCarbon can streamline your carbon accounting, BRSR compliance, and AI agent workflows with a personalized walkthrough.
                  </p>
                </div>

                {/* Form Card */}
                <div className="bg-white/80 dark:bg-surface-container/70 backdrop-blur-xl border border-neutral-200/80 dark:border-white/10 rounded-3xl p-6 sm:p-10 shadow-2xl">
                  <div className="mb-8 pb-6 border-b border-neutral-200 dark:border-white/10">
                    <h2 className="text-xl font-bold text-neutral-900 dark:text-white mb-2">Schedule a Custom Demo</h2>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">
                      Fill out the details below and our sustainability engineers will set up a tailored session for your enterprise.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Row 1: Company Name & Company Size */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="companyName" className="block text-xs font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300 mb-2">
                          Company Name <span className="text-emerald-500">*</span>
                        </label>
                        <div className="relative">
                          <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                          <input
                            type="text"
                            id="companyName"
                            required
                            value={formData.companyName}
                            onChange={handleInputChange}
                            placeholder="e.g. Acme Corporation"
                            className="w-full pl-12 pr-4 py-3.5 bg-slate-50 dark:bg-surface/60 border border-neutral-300 dark:border-white/15 rounded-xl text-sm font-medium text-neutral-900 dark:text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-accent-green focus:border-transparent transition-all"
                          />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="size" className="block text-xs font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300 mb-2">
                          Company Size <span className="text-emerald-500">*</span>
                        </label>
                        <div className="relative">
                          <Users className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                          <select
                            id="size"
                            required
                            value={formData.size}
                            onChange={handleInputChange}
                            className="w-full pl-12 pr-4 py-3.5 bg-slate-50 dark:bg-surface/60 border border-neutral-300 dark:border-white/15 rounded-xl text-sm font-medium text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-accent-green focus:border-transparent transition-all appearance-none cursor-pointer"
                          >
                            <option value="" disabled className="bg-white dark:bg-surface">Select company size</option>
                            <option value="1-10" className="bg-white dark:bg-surface">1–10 employees</option>
                            <option value="11-50" className="bg-white dark:bg-surface">11–50 employees</option>
                            <option value="51-200" className="bg-white dark:bg-surface">51–200 employees</option>
                            <option value="201-1000" className="bg-white dark:bg-surface">201–1,000 employees</option>
                            <option value="1000+" className="bg-white dark:bg-surface">1,000+ employees</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    {/* Row 2: Exact Employees & Country */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="employees" className="block text-xs font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300 mb-2">
                          Exact Employee Count <span className="text-neutral-400 font-normal capitalize">(Optional)</span>
                        </label>
                        <div className="relative">
                          <Users className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                          <input
                            type="text"
                            id="employees"
                            inputMode="numeric"
                            pattern="[0-9]*"
                            value={formData.employees}
                            onChange={handleInputChange}
                            placeholder="e.g. 150"
                            className="w-full pl-12 pr-4 py-3.5 bg-slate-50 dark:bg-surface/60 border border-neutral-300 dark:border-white/15 rounded-xl text-sm font-medium text-neutral-900 dark:text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-accent-green focus:border-transparent transition-all"
                          />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="country" className="block text-xs font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300 mb-2">
                          Country <span className="text-emerald-500">*</span>
                        </label>
                        <div className="relative">
                          <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                          <select
                            id="country"
                            required
                            value={formData.country}
                            onChange={handleInputChange}
                            className="w-full pl-12 pr-4 py-3.5 bg-slate-50 dark:bg-surface/60 border border-neutral-300 dark:border-white/15 rounded-xl text-sm font-medium text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-accent-green focus:border-transparent transition-all appearance-none cursor-pointer"
                          >
                            <option value="" disabled className="bg-white dark:bg-surface">Select country</option>
                            <option value="India" className="bg-white dark:bg-surface">India 🇮🇳</option>
                            <option value="United States" className="bg-white dark:bg-surface">United States 🇺🇸</option>
                            <option value="United Kingdom" className="bg-white dark:bg-surface">United Kingdom 🇬🇧</option>
                            <option value="Germany" className="bg-white dark:bg-surface">Germany 🇩🇪</option>
                            <option value="Singapore" className="bg-white dark:bg-surface">Singapore 🇸🇬</option>
                            <option value="Other" className="bg-white dark:bg-surface">Other</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    {/* Row 3: Industry & Company Website */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="industry" className="block text-xs font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300 mb-2">
                          Industry <span className="text-emerald-500">*</span>
                        </label>
                        <div className="relative">
                          <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                          <select
                            id="industry"
                            required
                            value={formData.industry}
                            onChange={handleInputChange}
                            className="w-full pl-12 pr-4 py-3.5 bg-slate-50 dark:bg-surface/60 border border-neutral-300 dark:border-white/15 rounded-xl text-sm font-medium text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-accent-green focus:border-transparent transition-all appearance-none cursor-pointer"
                          >
                            <option value="" disabled className="bg-white dark:bg-surface">Select industry</option>
                            <option value="Technology" className="bg-white dark:bg-surface">Technology & Software</option>
                            <option value="Manufacturing" className="bg-white dark:bg-surface">Manufacturing & Industrial</option>
                            <option value="Retail" className="bg-white dark:bg-surface">Retail & E-commerce</option>
                            <option value="Finance" className="bg-white dark:bg-surface">Finance & Banking</option>
                            <option value="Healthcare" className="bg-white dark:bg-surface">Healthcare & Life Sciences</option>
                            <option value="Energy" className="bg-white dark:bg-surface">Energy & Utilities</option>
                            <option value="Transportation" className="bg-white dark:bg-surface">Transportation & Logistics</option>
                            <option value="Other" className="bg-white dark:bg-surface">Other</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label htmlFor="companyWebsite" className="block text-xs font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300 mb-2">
                          Company Website <span className="text-neutral-400 font-normal capitalize">(Optional)</span>
                        </label>
                        <div className="relative">
                          <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                          <input
                            type="url"
                            id="companyWebsite"
                            value={formData.companyWebsite}
                            onChange={handleInputChange}
                            placeholder="https://example.com"
                            className="w-full pl-12 pr-4 py-3.5 bg-slate-50 dark:bg-surface/60 border border-neutral-300 dark:border-white/15 rounded-xl text-sm font-medium text-neutral-900 dark:text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-accent-green focus:border-transparent transition-all"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Social Media Platforms Section */}
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300 mb-2">
                        Social Media Handles / Profiles <span className="text-neutral-400 font-normal capitalize">(Optional)</span>
                      </label>
                      <div className="space-y-3">
                        {socialPlatforms.map((item, index) => (
                          <div key={index} className="flex gap-2 items-center">
                            <input
                              type="text"
                              placeholder="Platform (e.g. LinkedIn, Twitter)"
                              value={item.platform}
                              onChange={(e) => handleSocialChange(index, "platform", e.target.value)}
                              className="flex-1 px-4 py-3 bg-slate-50 dark:bg-surface/60 border border-neutral-300 dark:border-white/15 rounded-xl text-sm text-neutral-900 dark:text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-accent-green"
                            />
                            <input
                              type="url"
                              placeholder="Profile URL"
                              value={item.url}
                              onChange={(e) => handleSocialChange(index, "url", e.target.value)}
                              className="flex-1 px-4 py-3 bg-slate-50 dark:bg-surface/60 border border-neutral-300 dark:border-white/15 rounded-xl text-sm text-neutral-900 dark:text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-accent-green"
                            />
                            {socialPlatforms.length > 1 && (
                              <button
                                type="button"
                                onClick={() => removeSocialPlatform(index)}
                                className="p-3 text-red-500 hover:text-red-600 hover:bg-red-500/10 rounded-xl transition-colors"
                                title="Remove item"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            )}
                          </div>
                        ))}
                        <button
                          type="button"
                          onClick={addSocialPlatform}
                          className="inline-flex items-center gap-2 px-4 py-2 bg-surface-mint/80 dark:bg-surface-container hover:bg-surface-mint text-accent-green rounded-xl text-xs font-bold transition-all shadow-xs"
                        >
                          <Plus className="w-4 h-4" />
                          Add Another Platform
                        </button>
                      </div>
                    </div>

                    {/* How did you find us? */}
                    <div>
                      <label htmlFor="referralSource" className="block text-xs font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300 mb-2">
                        How Did You Hear About Us?
                      </label>
                      <select
                        id="referralSource"
                        value={formData.referralSource}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3.5 bg-slate-50 dark:bg-surface/60 border border-neutral-300 dark:border-white/15 rounded-xl text-sm font-medium text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-accent-green focus:border-transparent transition-all appearance-none cursor-pointer"
                      >
                        <option value="" className="bg-white dark:bg-surface">Select source</option>
                        <option value="LinkedIn" className="bg-white dark:bg-surface">LinkedIn</option>
                        <option value="Google Search" className="bg-white dark:bg-surface">Google Search</option>
                        <option value="Twitter/X" className="bg-white dark:bg-surface">Twitter (X)</option>
                        <option value="Peerlist" className="bg-white dark:bg-surface">Peerlist</option>
                        <option value="ProductHunt" className="bg-white dark:bg-surface">ProductHunt</option>
                        <option value="Other" className="bg-white dark:bg-surface">Other</option>
                      </select>
                    </div>

                    <div className="pt-4 border-t border-neutral-200 dark:border-white/10" />

                    {/* Contact Details Header */}
                    <h3 className="text-base font-bold text-neutral-900 dark:text-white pt-2">Primary Contact Information</h3>

                    {/* Row 4: Contact Name & Email */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="contactName" className="block text-xs font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300 mb-2">
                          Your Full Name <span className="text-emerald-500">*</span>
                        </label>
                        <div className="relative">
                          <Users className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                          <input
                            type="text"
                            id="contactName"
                            required
                            value={formData.contactName}
                            onChange={handleInputChange}
                            placeholder="John Doe"
                            className="w-full pl-12 pr-4 py-3.5 bg-slate-50 dark:bg-surface/60 border border-neutral-300 dark:border-white/15 rounded-xl text-sm font-medium text-neutral-900 dark:text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-accent-green focus:border-transparent transition-all"
                          />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="email" className="block text-xs font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300 mb-2">
                          Work Email Address <span className="text-emerald-500">*</span>
                        </label>
                        <div className="relative">
                          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                          <input
                            type="email"
                            id="email"
                            required
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="you@company.com"
                            className="w-full pl-12 pr-4 py-3.5 bg-slate-50 dark:bg-surface/60 border border-neutral-300 dark:border-white/15 rounded-xl text-sm font-medium text-neutral-900 dark:text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-accent-green focus:border-transparent transition-all"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Row 5: Phone Number */}
                    <div>
                      <label htmlFor="phone" className="block text-xs font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300 mb-2">
                        Phone Number <span className="text-emerald-500">*</span>
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                        <input
                          type="tel"
                          id="phone"
                          required
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="+1 (555) 000-0000 / +91 98765 43210"
                          className="w-full pl-12 pr-4 py-3.5 bg-slate-50 dark:bg-surface/60 border border-neutral-300 dark:border-white/15 rounded-xl text-sm font-medium text-neutral-900 dark:text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-accent-green focus:border-transparent transition-all"
                        />
                      </div>
                    </div>

                    {/* Row 6: Use Case / How can we help */}
                    <div>
                      <label htmlFor="useCase" className="block text-xs font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300 mb-2">
                        How Can We Help Your Organization? <span className="text-neutral-400 font-normal capitalize">(Optional)</span>
                      </label>
                      <textarea
                        id="useCase"
                        rows={4}
                        value={formData.useCase}
                        onChange={handleInputChange}
                        placeholder="Describe your current carbon accounting, Scope 3 tracking, or BRSR compliance goals..."
                        className="w-full px-4 py-3.5 bg-slate-50 dark:bg-surface/60 border border-neutral-300 dark:border-white/15 rounded-xl text-sm font-medium text-neutral-900 dark:text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-accent-green focus:border-transparent transition-all"
                      />
                    </div>

                    {/* Global Privacy & Compliance Notice Box */}
                    <div className="border border-emerald-500/20 dark:border-accent-green/30 rounded-2xl p-5 bg-surface-mint/50 dark:bg-surface-container/80 space-y-4 text-left my-6">
                      <div className="flex items-center gap-2 text-accent-green font-bold text-xs uppercase tracking-wider">
                        <ShieldCheck className="w-4 h-4 shrink-0" />
                        <span>Global Privacy & Data Governance Compliance</span>
                      </div>
                      <p className="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed">
                        In accordance with enterprise data protection standards (GDPR, CCPA, and DPDP Act India), please acknowledge our terms for data collection:
                      </p>

                      <ul className="text-xs text-neutral-500 dark:text-neutral-400 space-y-1.5 list-disc pl-4 leading-relaxed">
                        <li>
                          <strong className="text-neutral-700 dark:text-neutral-200">What we collect:</strong> Company profile, contact representative info, work email, and technical operational requirements.
                        </li>
                        <li>
                          <strong className="text-neutral-700 dark:text-neutral-200">Why we collect it:</strong> Exclusively for carbon accounting evaluation and custom demo setup. We strictly do not sell data or share it with unapproved third parties.
                        </li>
                        <li>
                          <strong className="text-neutral-700 dark:text-neutral-200">Data Retention:</strong> Information is encrypted with AES-256 and stored securely.
                        </li>
                      </ul>

                      <div className="space-y-3 pt-3 border-t border-emerald-500/20 dark:border-white/10">
                        <label className="flex items-start gap-3 cursor-pointer group">
                          <input
                            type="checkbox"
                            checked={consents.dataCollection}
                            onChange={() => handleCheckboxChange("dataCollection")}
                            className="mt-1 w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 border-neutral-300 cursor-pointer"
                          />
                          <span className="text-xs text-neutral-700 dark:text-neutral-300 leading-normal select-none group-hover:text-accent-green transition-colors">
                            I consent to the collection of my company and representative contact data for the sole purpose of carbon calculations and custom demo configuration. <span className="text-emerald-500">*</span>
                          </span>
                        </label>

                        <label className="flex items-start gap-3 cursor-pointer group">
                          <input
                            type="checkbox"
                            checked={consents.termsAndPrivacy}
                            onChange={() => handleCheckboxChange("termsAndPrivacy")}
                            className="mt-1 w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 border-neutral-300 cursor-pointer"
                          />
                          <span className="text-xs text-neutral-700 dark:text-neutral-300 leading-normal select-none group-hover:text-accent-green transition-colors">
                            I agree to the Terms of Service, Privacy Policy, and Data Security Framework. <span className="text-emerald-500">*</span>
                          </span>
                        </label>

                        <label className="flex items-start gap-3 cursor-pointer group">
                          <input
                            type="checkbox"
                            checked={consents.principalRights}
                            onChange={() => handleCheckboxChange("principalRights")}
                            className="mt-1 w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 border-neutral-300 cursor-pointer"
                          />
                          <span className="text-xs text-neutral-700 dark:text-neutral-300 leading-normal select-none group-hover:text-accent-green transition-colors">
                            I understand that I hold Data Principal rights to access, correct, or request deletion of my data by emailing support@zerocarbon.org.in. <span className="text-emerald-500">*</span>
                          </span>
                        </label>
                      </div>
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={!isFormValid || isSubmitting}
                      className="w-full py-4 px-8 bg-primary dark:bg-accent-green hover:bg-opacity-95 text-white dark:text-primary font-bold rounded-full transition-all duration-300 shadow-xl disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2 group cursor-pointer"
                    >
                      {isSubmitting ? (
                        <>
                          <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                          <span>Processing Demo Request...</span>
                        </>
                      ) : (
                        <>
                          <span>Request Enterprise Demo</span>
                          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                        </>
                      )}
                    </button>

                    <p className="text-xs text-neutral-500 dark:text-neutral-400 text-center pt-2">
                      🔒 Guaranteed zero spam. SOC2 Type II & AES-256 Encrypted Data Storage.
                    </p>
                  </form>
                </div>
              </motion.div>
            ) : (
              /* Success Confirmation View */
              <motion.div
                key="success-card"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="bg-white/90 dark:bg-surface-container/90 backdrop-blur-xl border border-accent-green/30 rounded-3xl p-8 sm:p-14 text-center shadow-2xl"
              >
                <div className="w-16 h-16 bg-accent-green/20 text-accent-green rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h2 className="font-display-lg text-2xl sm:text-4xl font-extrabold text-neutral-900 dark:text-white mb-3">
                  Demo Request Confirmed!
                </h2>
                <p className="text-base sm:text-lg text-neutral-600 dark:text-neutral-300 max-w-xl mx-auto mb-8">
                  Thank you, <span className="font-bold text-accent-green">{formData.contactName}</span>. Our sustainability engineering team has received your request for <span className="font-semibold text-neutral-900 dark:text-white">{formData.companyName}</span>.
                </p>

                <div className="bg-surface-mint/60 dark:bg-surface/80 rounded-2xl p-6 max-w-md mx-auto mb-8 text-left border border-accent-green/20 space-y-3">
                  <div className="flex items-center gap-3 text-sm text-neutral-700 dark:text-neutral-200">
                    <CheckCircle2 className="w-4 h-4 text-accent-green shrink-0" />
                    <span>Assigned Lead Engineer review</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-neutral-700 dark:text-neutral-200">
                    <CheckCircle2 className="w-4 h-4 text-accent-green shrink-0" />
                    <span>Calendar invite sent to <strong>{formData.email}</strong></span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-neutral-700 dark:text-neutral-200">
                    <CheckCircle2 className="w-4 h-4 text-accent-green shrink-0" />
                    <span>Custom sandbox access token included in invite</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Link
                    href="/"
                    className="px-8 py-3.5 rounded-full bg-primary text-white dark:bg-accent-green dark:text-primary font-bold text-sm hover:opacity-90 transition-opacity"
                  >
                    Return to Homepage
                  </Link>
                  <Link
                    href="/docs"
                    className="px-8 py-3.5 rounded-full border border-neutral-300 dark:border-white/20 text-neutral-800 dark:text-white font-bold text-sm hover:bg-neutral-100 dark:hover:bg-white/10 transition-colors"
                  >
                    Explore Documentation
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Enterprise & Institutional Partnerships Section */}
          <div className="mt-16 bg-gradient-to-br from-surface-mint/70 via-white to-slate-100 dark:from-surface-container/90 dark:via-surface-container/60 dark:to-surface/80 border border-accent-green/20 dark:border-white/10 rounded-3xl p-8 sm:p-10 shadow-lg">
            <div className="flex items-center gap-3 mb-3">
              <Award className="w-6 h-6 text-accent-green" />
              <h2 className="text-2xl font-bold text-neutral-900 dark:text-white">
                Enterprise & Institutional Partnerships
              </h2>
            </div>
            <p className="text-sm text-neutral-600 dark:text-neutral-300 mb-8">
              For large-scale implementations, custom MCP server integrations, or institutional carbon accounting deployments, reach our specialized teams directly.
            </p>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="bg-white dark:bg-surface/80 rounded-2xl p-6 border border-neutral-200 dark:border-white/10 shadow-xs">
                <div className="flex items-center gap-3 mb-2">
                  <Briefcase className="w-5 h-5 text-accent-green" />
                  <h3 className="font-bold text-neutral-900 dark:text-white">Enterprise Sales</h3>
                </div>
                <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-4">
                  Dedicated SLAs, custom data isolation, and multi-tenant telemetry pipelines.
                </p>
                <a
                  href="mailto:support@zerocarbon.org.in"
                  className="text-accent-green hover:underline font-bold text-xs inline-flex items-center gap-1"
                >
                  <Mail className="w-3.5 h-3.5" />
                  support@zerocarbon.org.in
                </a>
              </div>

              <div className="bg-white dark:bg-surface/80 rounded-2xl p-6 border border-neutral-200 dark:border-white/10 shadow-xs">
                <div className="flex items-center gap-3 mb-2">
                  <Building2 className="w-5 h-5 text-accent-green" />
                  <h3 className="font-bold text-neutral-900 dark:text-white">Technical & MCP Partnerships</h3>
                </div>
                <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-4">
                  For API integrations, carbon offset API integrations, and custom MCP tools.
                </p>
                <a
                  href="mailto:support@zerocarbon.org.in"
                  className="text-accent-green hover:underline font-bold text-xs inline-flex items-center gap-1"
                >
                  <Mail className="w-3.5 h-3.5" />
                  support@zerocarbon.org.in
                </a>
              </div>
            </div>

            {/* MSME Badge */}
            <div className="p-4 bg-white/80 dark:bg-surface/90 rounded-2xl border border-accent-green/30 flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-accent-green shrink-0 mt-0.5" />
              <p className="text-xs text-neutral-700 dark:text-neutral-300 leading-relaxed">
                <strong className="text-accent-green font-bold">MSME-Registered Entity:</strong> ZeroCarbon is an MSME (Udyam) registered entity under Government of India guidelines, eligible for enterprise contracts and institutional carbon compliance frameworks. <span className="font-mono font-semibold">Udyam Registration No: DL-11-0146882</span>
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-surface-mint dark:bg-surface-container py-16 px-6 lg:px-12 border-t border-accent-green/20">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-10">
          <div className="col-span-2 md:col-span-1 space-y-4">
            <div className="font-headline-lg text-xl font-bold text-primary dark:text-accent-green">ZeroCarbon MCP</div>
            <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
              The AI-native OS for sustainable engineering teams. Quantify and reduce carbon footprint directly inside your agentic workflows.
            </p>
          </div>
          <div>
            <p className="text-xs font-bold text-primary dark:text-white uppercase tracking-wider mb-4">Product</p>
            <ul className="space-y-2.5 text-xs text-neutral-600 dark:text-neutral-400">
              <li><Link href="/#features" className="hover:text-accent-green transition-colors">Solutions</Link></li>
              <li><Link href="/#architecture" className="hover:text-accent-green transition-colors">Architecture</Link></li>
              <li><Link href="/request-demo" className="hover:text-accent-green font-bold text-accent-green transition-colors">Request Demo</Link></li>
            </ul>
          </div>
          <div>
            <p className="text-xs font-bold text-primary dark:text-white uppercase tracking-wider mb-4">Resources</p>
            <ul className="space-y-2.5 text-xs text-neutral-600 dark:text-neutral-400">
              <li><Link href="/docs" className="hover:text-accent-green transition-colors">Documentation</Link></li>
              <li><Link href="/docs#authentication" className="hover:text-accent-green transition-colors">API Reference</Link></li>
            </ul>
          </div>
          <div>
            <p className="text-xs font-bold text-primary dark:text-white uppercase tracking-wider mb-4">Legal & Compliance</p>
            <ul className="space-y-2.5 text-xs text-neutral-600 dark:text-neutral-400">
              <li><a href="mailto:support@zerocarbon.org.in" className="hover:text-accent-green transition-colors">Privacy & Data Governance</a></li>
              <li><a href="mailto:support@zerocarbon.org.in" className="hover:text-accent-green transition-colors">Terms of Service</a></li>
              <li><Link href="/#faq" className="hover:text-accent-green transition-colors">FAQ</Link></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto pt-8 mt-8 border-t border-neutral-300 dark:border-white/10 flex flex-col sm:flex-row justify-between items-center text-xs text-neutral-500">
          <p>© 2026 ZeroCarbon Tech. All rights reserved.</p>
          <p className="mt-2 sm:mt-0 font-medium">🇮🇳 Proudly Built in India • MSME Udyam DL-11-0146882</p>
        </div>
      </footer>
    </div>
  );
}
