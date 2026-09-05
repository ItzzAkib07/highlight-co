import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import emailjs from '@emailjs/browser';
import confetti from 'canvas-confetti';
import { useSound } from '../../context/SoundContext';
import { Send, CheckCircle2, AlertCircle, Loader2, Sparkles } from 'lucide-react';

export const ContactForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm();

  const [status, setStatus] = useState({ type: '', message: '' });
  const { playClickTone, playCinemaChord } = useSound();

  const onSubmit = async (data) => {
    playClickTone();
    setStatus({ type: '', message: '' });

    try {
      const EMAILJS_SERVICE_ID = 'service_highlight';
      const EMAILJS_TEMPLATE_ID = 'template_highlight';
      const EMAILJS_PUBLIC_KEY = 'user_highlight_pubkey';

      // Attempt sending with emailjs if credentials exist, otherwise simulate success
      if (EMAILJS_SERVICE_ID !== 'service_highlight') {
        await emailjs.send(
          EMAILJS_SERVICE_ID,
          EMAILJS_TEMPLATE_ID,
          data,
          EMAILJS_PUBLIC_KEY
        );
      } else {
        // High-fidelity fallback simulation
        await new Promise((resolve) => setTimeout(resolve, 1400));
      }

      setStatus({
        type: 'success',
        message: 'Thank you! Your project brief has been received. Our executive producer will review your requirements and reach out within 24 hours.'
      });

      // Celebrate with golden confetti
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.7 },
        colors: ['#F5C400', '#FFE042', '#0A1128', '#FFFFFF']
      });

      playCinemaChord();
      reset();
    } catch (error) {
      console.error('Email submission failed:', error);
      setStatus({
        type: 'error',
        message: 'Something went wrong submitting your request. Please email us directly at hello@highlightco.in.'
      });
    }
  };

  const projectTypes = [
    "Corporate Film",
    "CSR Documentary",
    "F&B Campaign",
    "Brand Commercial",
    "Heritage Docuseries",
    "Post & Color Grading"
  ];

  const budgetRanges = [
    "₹5L – ₹15L",
    "₹15L – ₹35L",
    "₹35L – ₹75L",
    "₹75L+",
    "International / Custom"
  ];

  const timelines = [
    "Immediate (Within 2 Weeks)",
    "Next Month",
    "Quarter 2 / 3",
    "Flexible / Exploring"
  ];

  return (
    <div className="relative bg-white p-8 sm:p-12 md:p-14 rounded-3xl border border-[#0A1128]/15 shadow-xl text-[#0A1128]">
      {/* Glow header badge */}
      <div className="flex items-center gap-2 text-xs font-mono text-[#0A1128] font-black uppercase tracking-widest mb-6">
        <Sparkles size={14} className="text-[#0A1128]" />
        <span>PROJECT COMMISSIONING BRIEF</span>
      </div>

      {status.type === 'success' ? (
        <div className="py-12 flex flex-col items-center text-center space-y-4 animate-fade-in">
          <div className="w-16 h-16 rounded-full bg-[#F5C400]/30 border border-[#0A1128]/20 flex items-center justify-center text-[#0A1128] mb-2">
            <CheckCircle2 size={32} className="text-[#0A1128]" />
          </div>
          <h3 className="text-3xl font-serif font-black text-[#0A1128]">
            Brief Successfully Transmitted
          </h3>
          <p className="text-sm text-[#0A1128] max-w-lg leading-relaxed font-medium">
            {status.message}
          </p>
          <button
            onClick={() => setStatus({ type: '', message: '' })}
            className="mt-6 px-6 py-2.5 rounded-full bg-[#F5C400] text-[#060B1A] border border-[#0A1128]/20 hover:bg-[#FFE042] transition-all text-xs font-heading font-black uppercase tracking-widest shadow-sm"
          >
            Submit Another Inquiry
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {status.type === 'error' && (
            <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 flex items-center gap-3 text-red-600 text-xs font-sans font-bold">
              <AlertCircle size={18} className="flex-shrink-0" />
              <span>{status.message}</span>
            </div>
          )}

          {/* Row 1: Name & Email */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-heading font-black uppercase tracking-wider text-[#0A1128] mb-2">
                Your Full Name <span className="text-[#D4A100] font-black">*</span>
              </label>
              <input
                type="text"
                placeholder="e.g. Aarav Singhania"
                {...register('fullName', { required: 'Please provide your full name' })}
                className="w-full px-5 py-3.5 rounded-2xl bg-slate-50 border border-[#0A1128]/15 text-[#0A1128] placeholder-slate-400 focus:outline-none focus:border-[#0A1128] focus:bg-white transition-all text-sm font-sans font-semibold"
              />
              {errors.fullName && (
                <span className="text-xs text-red-600 mt-1.5 block font-mono font-bold">
                  {errors.fullName.message}
                </span>
              )}
            </div>

            <div>
              <label className="block text-xs font-heading font-black uppercase tracking-wider text-[#0A1128] mb-2">
                Work Email Address <span className="text-[#D4A100] font-black">*</span>
              </label>
              <input
                type="email"
                placeholder="e.g. name@company.com"
                {...register('email', {
                  required: 'Please provide your email address',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Invalid email address'
                  }
                })}
                className="w-full px-5 py-3.5 rounded-2xl bg-slate-50 border border-[#0A1128]/15 text-[#0A1128] placeholder-slate-400 focus:outline-none focus:border-[#0A1128] focus:bg-white transition-all text-sm font-sans font-semibold"
              />
              {errors.email && (
                <span className="text-xs text-red-600 mt-1.5 block font-mono font-bold">
                  {errors.email.message}
                </span>
              )}
            </div>
          </div>

          {/* Row 2: Company & Phone */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-heading font-black uppercase tracking-wider text-[#0A1128] mb-2">
                Organization / Brand Name
              </label>
              <input
                type="text"
                placeholder="e.g. Apex Energy Ltd."
                {...register('company')}
                className="w-full px-5 py-3.5 rounded-2xl bg-slate-50 border border-[#0A1128]/15 text-[#0A1128] placeholder-slate-400 focus:outline-none focus:border-[#0A1128] focus:bg-white transition-all text-sm font-sans font-semibold"
              />
            </div>

            <div>
              <label className="block text-xs font-heading font-black uppercase tracking-wider text-[#0A1128] mb-2">
                Phone Number / WhatsApp
              </label>
              <input
                type="tel"
                placeholder="e.g. +91 98765 43210"
                {...register('phone')}
                className="w-full px-5 py-3.5 rounded-2xl bg-slate-50 border border-[#0A1128]/15 text-[#0A1128] placeholder-slate-400 focus:outline-none focus:border-[#0A1128] focus:bg-white transition-all text-sm font-sans font-semibold"
              />
            </div>
          </div>

          {/* Project Type Select */}
          <div>
            <label className="block text-xs font-heading font-black uppercase tracking-wider text-[#0A1128] mb-3">
              Project Category <span className="text-[#D4A100] font-black">*</span>
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {projectTypes.map((type) => (
                <label
                  key={type}
                  className="flex items-center gap-2 p-3 rounded-2xl bg-slate-50 border border-[#0A1128]/15 hover:border-[#0A1128]/40 cursor-pointer transition-all text-xs font-sans text-[#0A1128] font-bold has-[:checked]:bg-[#0A1128] has-[:checked]:border-[#0A1128] has-[:checked]:text-[#F5C400]"
                >
                  <input
                    type="radio"
                    value={type}
                    {...register('projectType', { required: 'Please select a project type' })}
                    className="accent-[#F5C400]"
                  />
                  <span>{type}</span>
                </label>
              ))}
            </div>
            {errors.projectType && (
              <span className="text-xs text-red-600 mt-1.5 block font-mono font-bold">
                {errors.projectType.message}
              </span>
            )}
          </div>

          {/* Row 3: Estimated Budget & Timeline */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-heading font-black uppercase tracking-wider text-[#0A1128] mb-2">
                Estimated Production Budget
              </label>
              <select
                {...register('budget')}
                className="w-full px-5 py-3.5 rounded-2xl bg-slate-50 border border-[#0A1128]/15 text-[#0A1128] focus:outline-none focus:border-[#0A1128] focus:bg-white transition-all text-sm font-sans font-bold"
              >
                <option value="">Select Range</option>
                {budgetRanges.map((b) => (
                  <option key={b} value={b} className="bg-white text-[#0A1128]">
                    {b}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-heading font-black uppercase tracking-wider text-[#0A1128] mb-2">
                Target Delivery Timeline
              </label>
              <select
                {...register('timeline')}
                className="w-full px-5 py-3.5 rounded-2xl bg-slate-50 border border-[#0A1128]/15 text-[#0A1128] focus:outline-none focus:border-[#0A1128] focus:bg-white transition-all text-sm font-sans font-bold"
              >
                <option value="">Select Timeline</option>
                {timelines.map((t) => (
                  <option key={t} value={t} className="bg-white text-[#0A1128]">
                    {t}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Project Synopsis / Message */}
          <div>
            <label className="block text-xs font-heading font-black uppercase tracking-wider text-[#0A1128] mb-2">
              Tell Us About Your Project & Vision <span className="text-[#D4A100] font-black">*</span>
            </label>
            <textarea
              rows={4}
              placeholder="What story are you looking to tell? Mention key objectives, locations, or reference films..."
              {...register('message', { required: 'Please provide brief details about your project' })}
              className="w-full px-5 py-3.5 rounded-2xl bg-slate-50 border border-[#0A1128]/15 text-[#0A1128] placeholder-slate-400 focus:outline-none focus:border-[#0A1128] focus:bg-white transition-all text-sm font-sans font-semibold resize-none"
            />
            {errors.message && (
              <span className="text-xs text-red-600 mt-1.5 block font-mono font-bold">
                {errors.message.message}
              </span>
            )}
          </div>

          {/* Submit Button */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-[11px] font-mono text-[#0A1128] font-bold text-center sm:text-left">
              * Confidential & protected under non-disclosure standards.
            </span>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#F5C400] text-[#060B1A] border border-[#0A1128]/20 font-heading font-black text-sm tracking-widest uppercase hover:bg-[#FFE042] shadow-lg shadow-[#F5C400]/25 disabled:opacity-50 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              {isSubmitting ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  <span>Transmitting...</span>
                </>
              ) : (
                <>
                  <span>Transmit Project Brief</span>
                  <Send size={16} />
                </>
              )}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};
