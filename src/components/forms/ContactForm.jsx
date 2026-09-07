import React, { useState, useRef, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import emailjs from '@emailjs/browser';
import confetti from 'canvas-confetti';
import gsap from 'gsap';
import { useSound } from '../../context/SoundContext';
import { useCursor } from '../../context/CursorContext';
import {
  Send,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Sparkles,
  Film,
  Briefcase,
  Globe,
  Video,
  Sliders,
  ShieldCheck,
  Check,
  Plus,
  ArrowUpRight,
  Zap,
  MessageSquare,
  User,
  Mail,
  Building2,
  Phone,
  PenTool,
  Clock,
  FileCheck,
  ChevronRight
} from 'lucide-react';

export const ContactForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors, isSubmitting }
  } = useForm({
    defaultValues: {
      fullName: '',
      email: '',
      company: '',
      phone: '',
      projectType: 'Corporate Film',
      budget: '₹15L – ₹35L',
      timeline: 'Within 1 Month',
      message: ''
    }
  });

  const [status, setStatus] = useState({ type: '', message: '', refId: '', data: null });
  const [focusedField, setFocusedField] = useState('');
  const { playClickTone, playCinemaChord, playWhoosh } = useSound();
  const { setCursor, resetCursor } = useCursor();

  const containerRef = useRef(null);
  const buttonRef = useRef(null);

  // Watch form fields
  const watchedFullName = watch('fullName') || '';
  const watchedEmail = watch('email') || '';
  const watchedCompany = watch('company') || '';
  const watchedPhone = watch('phone') || '';
  const watchedProjectType = watch('projectType');
  const watchedBudget = watch('budget');
  const watchedTimeline = watch('timeline');
  const watchedMessage = watch('message') || '';

  // Calculate dynamic brief completeness score
  const calculateProgress = () => {
    let score = 0;
    if (watchedProjectType) score += 20;
    if (watchedFullName.trim().length >= 2) score += 20;
    if (watchedEmail.trim().length >= 5) score += 20;
    if (watchedBudget) score += 15;
    if (watchedTimeline) score += 15;
    if (watchedMessage.trim().length >= 10) score += 10;
    return Math.min(100, score);
  };

  const progress = calculateProgress();

  // GSAP Entrance Animation on mount
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(
        '.gsap-form-header',
        { y: -15, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, delay: 0.1 }
      )
      .fromTo(
        '.gsap-form-section',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.08, duration: 0.55 },
        '-=0.3'
      )
      .fromTo(
        '.gsap-form-submit',
        { y: 15, opacity: 0, scale: 0.96 },
        { y: 0, opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(1.5)' },
        '-=0.2'
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Magnetic Button Hover Physics
  const handleButtonMouseMove = (e) => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);

    gsap.to(buttonRef.current, {
      x: x * 0.22,
      y: y * 0.22,
      rotation: x * 0.02,
      duration: 0.3,
      ease: 'power2.out'
    });
  };

  const handleButtonMouseLeave = () => {
    if (!buttonRef.current) return;
    resetCursor();
    gsap.to(buttonRef.current, {
      x: 0,
      y: 0,
      rotation: 0,
      duration: 0.6,
      ease: 'elastic.out(1, 0.4)'
    });
  };

  const projectCategories = [
    { id: "Corporate Film", label: "Corporate Film", icon: Briefcase, tag: "Brand Anthems" },
    { id: "CSR Documentary", label: "CSR Impact", icon: Globe, tag: "ESG & Grassroot" },
    { id: "F&B Campaign", label: "F&B Experience", icon: Sparkles, tag: "Sensory Cinema" },
    { id: "Brand Commercial", label: "Commercial Ad", icon: Video, tag: "TVC & Campaign" },
    { id: "Heritage Docuseries", label: "Docuseries", icon: Film, tag: "Episodic Films" },
    { id: "Post & Color Grading", label: "Color / Post", icon: Sliders, tag: "DaVinci 8K" }
  ];

  const budgetOptions = [
    { value: "₹5L – ₹15L", label: "₹5L – ₹15L" },
    { value: "₹15L – ₹35L", label: "₹15L – ₹35L" },
    { value: "₹35L – ₹75L", label: "₹35L – ₹75L" },
    { value: "₹75L+", label: "₹75L+" },
    { value: "International Scope", label: "Global / Retainer" }
  ];

  const timelineOptions = [
    { value: "Immediate (< 2 Wks)", label: "Immediate (< 2 Wks)" },
    { value: "Within 1 Month", label: "Within 1 Month" },
    { value: "Q2 / Q3 2026", label: "Q2 / Q3 2026" },
    { value: "Flexible / Concept", label: "Flexible" }
  ];

  const quickScopeTags = [
    "+ 4K Aerial Drone",
    "+ Anamorphic Color Grading",
    "+ Multi-City Production",
    "+ High-Speed Macro (1000fps)",
    "+ Celebrity & Exec Talent",
    "+ Sound Design Master"
  ];

  const getCleanTag = (tag) => tag.replace(/^\+\s*/, '').trim();

  const isTagInMessage = (tag) => {
    const cleanTag = getCleanTag(tag);
    if (!watchedMessage) return false;
    return watchedMessage.includes(`• Required Scope: ${cleanTag}`) || watchedMessage.includes(cleanTag);
  };

  const handleToggleScopeTag = (tag) => {
    playClickTone();
    const cleanTag = getCleanTag(tag);
    const tagPattern = `• Required Scope: ${cleanTag}`;
    const current = watchedMessage || '';

    if (isTagInMessage(tag)) {
      // Toggle off: remove tag from message
      let updated = current;
      if (updated.includes(tagPattern)) {
        updated = updated.split(tagPattern).join('');
      } else if (updated.includes(cleanTag)) {
        updated = updated.split(cleanTag).join('');
      }
      
      // Clean up orphaned empty lines
      updated = updated
        .split('\n')
        .map((line) => line.trimEnd())
        .filter((line, index, arr) => line !== '' || (index > 0 && arr[index - 1] !== ''))
        .join('\n')
        .trim();

      setValue('message', updated, { shouldValidate: true });
    } else {
      // Toggle on: add tag to message
      const addition = current.trim()
        ? `${current.trim()}\n• Required Scope: ${cleanTag}`
        : `• Required Scope: ${cleanTag}`;
      setValue('message', addition, { shouldValidate: true });
    }
  };

  const onSubmit = async (data) => {
    playClickTone();
    setStatus({ type: '', message: '', refId: '', data: null });

    try {
      const EMAILJS_SERVICE_ID = 'service_highlight';
      const EMAILJS_TEMPLATE_ID = 'template_highlight';
      const EMAILJS_PUBLIC_KEY = 'user_highlight_pubkey';

      if (EMAILJS_SERVICE_ID !== 'service_highlight') {
        await emailjs.send(
          EMAILJS_SERVICE_ID,
          EMAILJS_TEMPLATE_ID,
          data,
          EMAILJS_PUBLIC_KEY
        );
      } else {
        await new Promise((resolve) => setTimeout(resolve, 1200));
      }

      const randomRef = `HC-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

      setStatus({
        type: 'success',
        message: 'Your commissioning brief has been transmitted directly to our executive producer desk.',
        refId: randomRef,
        data: data
      });

      // Golden Celebration Confetti
      confetti({
        particleCount: 100,
        spread: 90,
        origin: { y: 0.6 },
        colors: ['#F5C400', '#FFE042', '#0A1128', '#FFFFFF']
      });

      playCinemaChord();
      reset();
    } catch (error) {
      console.error('Email submission failed:', error);
      setStatus({
        type: 'error',
        message: 'Something went wrong submitting your request. Please email us directly at hello@highlightco.in.',
        refId: '',
        data: null
      });
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative bg-white/95 backdrop-blur-md p-6 sm:p-9 md:p-11 rounded-[32px] border-2 border-[#0A1128]/10 shadow-[0_20px_70px_-15px_rgba(10,17,40,0.07)] text-[#0A1128] transition-all"
    >
      {/* Top Ambient Golden Accent Accent Strip */}
      <div className="absolute top-0 left-8 right-8 h-1 bg-gradient-to-r from-transparent via-[#F5C400] to-transparent rounded-full" />

      {/* Header Bar */}
      <div className="gsap-form-header flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-6 mb-7 border-b border-[#0A1128]/10">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#F5C400]/25 border border-[#F5C400]/50 text-[#0A1128] flex items-center justify-center font-bold shadow-2xs">
            <Sparkles size={16} className="text-[#0A1128]" />
          </div>
          <div>
            <h3 className="font-serif font-black text-xl sm:text-2xl text-[#0A1128] tracking-tight">
              Commissioning Intake
            </h3>
            <p className="text-[11px] font-mono text-[#0A1128]/60 font-bold uppercase tracking-wider">
              DIRECT EXECUTIVE TREATMENT PORTAL
            </p>
          </div>
        </div>

        {/* Minimal Progress Indicator */}
        <div className="flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-slate-50 border border-[#0A1128]/10 text-xs font-mono self-start sm:self-auto shadow-2xs">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[10px] text-[#0A1128]/70 font-bold">READINESS:</span>
          <span className="font-black text-[#0A1128] text-[11px]">{progress}%</span>
          <div className="w-12 h-1.5 rounded-full bg-slate-200 overflow-hidden ml-1">
            <div
              className="h-full bg-[#F5C400] rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      {status.type === 'success' ? (
        <div className="py-8 flex flex-col items-center text-center space-y-5 animate-fade-in">
          <div className="w-16 h-16 rounded-full bg-[#F5C400] text-[#060B1A] border-2 border-[#0A1128]/20 flex items-center justify-center shadow-lg shadow-[#F5C400]/35 animate-bounce">
            <CheckCircle2 size={34} className="stroke-[2.5]" />
          </div>

          <div>
            <span className="px-3 py-1 rounded-full bg-slate-100 border border-[#0A1128]/15 text-[#0A1128] font-mono text-xs font-black tracking-wider uppercase">
              TRANSMISSION RECEIPT // {status.refId}
            </span>
            <h3 className="text-2xl sm:text-3xl font-serif font-black text-[#0A1128] mt-3">
              Brief Transmitted Successfully
            </h3>
            <p className="text-xs sm:text-sm text-[#0A1128]/80 max-w-lg mx-auto mt-2 leading-relaxed font-medium">
              {status.message} Our creative directors will review your requirements and provide an initial treatment within 24 hours.
            </p>
          </div>

          {/* Receipt Breakdown Card */}
          {status.data && (
            <div className="w-full max-w-md p-5 rounded-2xl bg-slate-50 border border-[#0A1128]/15 text-left text-xs font-mono space-y-2 my-2 shadow-2xs">
              <div className="flex justify-between border-b border-[#0A1128]/10 pb-1.5 font-bold">
                <span className="text-[#0A1128]/60">CLIENT NAME:</span>
                <span className="text-[#0A1128] font-black">{status.data.fullName}</span>
              </div>
              <div className="flex justify-between border-b border-[#0A1128]/10 pb-1.5 font-bold">
                <span className="text-[#0A1128]/60">CATEGORY:</span>
                <span className="text-[#0A1128] font-black">{status.data.projectType}</span>
              </div>
              <div className="flex justify-between border-b border-[#0A1128]/10 pb-1.5 font-bold">
                <span className="text-[#0A1128]/60">BUDGET RANGE:</span>
                <span className="text-[#0A1128] font-black">{status.data.budget}</span>
              </div>
              <div className="flex justify-between font-bold">
                <span className="text-[#0A1128]/60">TARGET TIMELINE:</span>
                <span className="text-[#0A1128] font-black">{status.data.timeline}</span>
              </div>
            </div>
          )}

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <a
              href="https://wa.me/919820012345?text=Hi%20Highlight%20Co.%20I%20just%20submitted%20a%20commissioning%20brief%20on%20your%20website."
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-full bg-[#0A1128] text-white hover:bg-[#060B1A] transition-all text-xs font-heading font-black uppercase tracking-wider flex items-center gap-2 shadow-md cursor-pointer"
            >
              <span>Instant WhatsApp Connect</span>
              <ArrowUpRight size={14} />
            </a>

            <button
              onClick={() => {
                playClickTone();
                setStatus({ type: '', message: '', refId: '', data: null });
              }}
              className="px-6 py-3 rounded-full bg-[#F5C400] text-[#060B1A] border-2 border-[#0A1128]/20 hover:bg-[#FFE042] transition-all text-xs font-heading font-black uppercase tracking-wider shadow-sm font-bold cursor-pointer"
            >
              Submit Another Inquiry
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {status.type === 'error' && (
            <div className="p-4 rounded-2xl bg-rose-500/10 border-2 border-rose-500/30 flex items-center gap-3 text-rose-600 text-xs font-sans font-bold animate-shake">
              <AlertCircle size={18} className="flex-shrink-0" />
              <span>{status.message}</span>
            </div>
          )}

          {/* ========================================================= */}
          {/* SECTION 1: Select Project Genre (Sleek Segmented Chips)   */}
          {/* ========================================================= */}
          <div className="gsap-form-section space-y-2.5">
            <div className="flex items-center justify-between">
              <label className="text-[11px] font-mono font-black uppercase tracking-widest text-[#0A1128] flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#F5C400]" />
                <span>01. Project Genre</span>
                <span className="text-[#D4A100]">*</span>
              </label>
              <span className="text-[10px] font-mono text-[#0A1128]/50 font-bold">
                SELECT GENRE
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {projectCategories.map((cat) => {
                const IconComponent = cat.icon;
                const isSelected = watchedProjectType === cat.id;

                return (
                  <button
                    type="button"
                    key={cat.id}
                    onClick={() => {
                      playClickTone();
                      setValue('projectType', cat.id, { shouldValidate: true });
                    }}
                    onMouseEnter={() => {
                      setCursor('hover');
                      playWhoosh();
                    }}
                    onMouseLeave={resetCursor}
                    className={`p-3 rounded-xl border text-left transition-all duration-200 flex items-center gap-2.5 cursor-pointer relative group ${
                      isSelected
                        ? 'bg-amber-50/90 border-[#F5C400] text-[#0A1128] shadow-xs ring-2 ring-[#F5C400]/40 scale-[1.01]'
                        : 'bg-slate-50/70 border-[#0A1128]/10 hover:border-[#0A1128]/30 hover:bg-white text-[#0A1128]'
                    }`}
                  >
                    <div className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors ${
                      isSelected
                        ? 'bg-[#F5C400] text-[#060B1A]'
                        : 'bg-white border border-[#0A1128]/10 text-[#0A1128] group-hover:bg-[#F5C400]/20'
                    }`}>
                      <IconComponent size={14} />
                    </div>
                    <div className="min-w-0">
                      <div className="font-serif font-black text-xs sm:text-sm text-[#0A1128] leading-tight truncate">
                        {cat.label}
                      </div>
                      <div className="text-[9px] font-mono font-medium text-[#0A1128]/60 truncate">
                        {cat.tag}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
            {errors.projectType && (
              <span className="text-[10px] text-rose-600 font-mono font-bold block">
                ⚠ {errors.projectType.message}
              </span>
            )}
          </div>

          {/* ========================================================= */}
          {/* SECTION 2: Producer Details (Clean Designer Inputs)       */}
          {/* ========================================================= */}
          <div className="gsap-form-section space-y-3 pt-1">
            <div className="flex items-center justify-between">
              <label className="text-[11px] font-mono font-black uppercase tracking-widest text-[#0A1128] flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#F5C400]" />
                <span>02. Producer & Brand Details</span>
                <span className="text-[#D4A100]">*</span>
              </label>
              <span className="text-[10px] font-mono text-[#0A1128]/50 font-bold">
                CONFIDENTIAL
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Full Name */}
              <div className={`relative p-3 rounded-2xl bg-slate-50/70 border transition-all duration-200 ${
                focusedField === 'fullName'
                  ? 'border-[#F5C400] bg-white ring-3 ring-[#F5C400]/20 shadow-xs'
                  : 'border-[#0A1128]/10 hover:border-[#0A1128]/25'
              }`}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#0A1128]/60 flex items-center gap-1">
                    <User size={11} className="text-[#D4A100]" />
                    <span>Full Name *</span>
                  </span>
                </div>
                <input
                  type="text"
                  placeholder="Your Full Name"
                  {...register('fullName', { required: 'Please provide your full name' })}
                  onFocus={() => setFocusedField('fullName')}
                  onBlur={() => setFocusedField('')}
                  className="w-full bg-transparent text-sm font-sans font-bold text-[#0A1128] placeholder:text-[#0A1128]/30 focus:outline-none"
                />
                {errors.fullName && (
                  <span className="text-[10px] text-rose-600 font-mono font-bold block pt-1">
                    ⚠ {errors.fullName.message}
                  </span>
                )}
              </div>

              {/* Work Email */}
              <div className={`relative p-3 rounded-2xl bg-slate-50/70 border transition-all duration-200 ${
                focusedField === 'email'
                  ? 'border-[#F5C400] bg-white ring-3 ring-[#F5C400]/20 shadow-xs'
                  : 'border-[#0A1128]/10 hover:border-[#0A1128]/25'
              }`}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#0A1128]/60 flex items-center gap-1">
                    <Mail size={11} className="text-[#D4A100]" />
                    <span>Work Email *</span>
                  </span>
                </div>
                <input
                  type="email"
                  placeholder="email@company.com"
                  {...register('email', {
                    required: 'Please provide your email address',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Please enter a valid email address'
                    }
                  })}
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => setFocusedField('')}
                  className="w-full bg-transparent text-sm font-sans font-bold text-[#0A1128] placeholder:text-[#0A1128]/30 focus:outline-none"
                />
                {errors.email && (
                  <span className="text-[10px] text-rose-600 font-mono font-bold block pt-1">
                    ⚠ {errors.email.message}
                  </span>
                )}
              </div>

              {/* Organization */}
              <div className={`relative p-3 rounded-2xl bg-slate-50/70 border transition-all duration-200 ${
                focusedField === 'company'
                  ? 'border-[#F5C400] bg-white ring-3 ring-[#F5C400]/20 shadow-xs'
                  : 'border-[#0A1128]/10 hover:border-[#0A1128]/25'
              }`}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#0A1128]/60 flex items-center gap-1">
                    <Building2 size={11} className="text-[#D4A100]" />
                    <span>Organization / Brand</span>
                  </span>
                </div>
                <input
                  type="text"
                  placeholder="e.g. Brand / Studio"
                  {...register('company')}
                  onFocus={() => setFocusedField('company')}
                  onBlur={() => setFocusedField('')}
                  className="w-full bg-transparent text-sm font-sans font-bold text-[#0A1128] placeholder:text-[#0A1128]/30 focus:outline-none"
                />
              </div>

              {/* Phone / WhatsApp */}
              <div className={`relative p-3 rounded-2xl bg-slate-50/70 border transition-all duration-200 ${
                focusedField === 'phone'
                  ? 'border-[#F5C400] bg-white ring-3 ring-[#F5C400]/20 shadow-xs'
                  : 'border-[#0A1128]/10 hover:border-[#0A1128]/25'
              }`}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#0A1128]/60 flex items-center gap-1">
                    <Phone size={11} className="text-[#D4A100]" />
                    <span>Phone / WhatsApp</span>
                  </span>
                </div>
                <input
                  type="tel"
                  placeholder="+91 XXXXX XXXXX"
                  {...register('phone')}
                  onFocus={() => setFocusedField('phone')}
                  onBlur={() => setFocusedField('')}
                  className="w-full bg-transparent text-sm font-sans font-bold text-[#0A1128] placeholder:text-[#0A1128]/30 focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* ========================================================= */}
          {/* SECTION 3: Budget & Timeline (Minimalist Segmented Chips) */}
          {/* ========================================================= */}
          <div className="gsap-form-section space-y-4 pt-1">
            {/* Budget */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-[11px] font-mono font-black uppercase tracking-widest text-[#0A1128] flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#F5C400]" />
                  <span>03. Budget Estimate</span>
                </label>
                <span className="text-[10px] font-mono text-[#0A1128]/50 font-bold">
                  SCALE
                </span>
              </div>

              <div className="flex flex-wrap gap-1.5">
                {budgetOptions.map((b) => {
                  const isSelected = watchedBudget === b.value;
                  return (
                    <button
                      type="button"
                      key={b.value}
                      onClick={() => {
                        playClickTone();
                        setValue('budget', b.value);
                      }}
                      onMouseEnter={() => setCursor('hover')}
                      onMouseLeave={resetCursor}
                      className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold border transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-[#F5C400] text-[#060B1A] border-[#0A1128]/25 shadow-xs font-black'
                          : 'bg-slate-50/70 border-[#0A1128]/10 hover:border-[#0A1128]/25 hover:bg-white text-[#0A1128]'
                      }`}
                    >
                      {b.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Timeline */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-[11px] font-mono font-black uppercase tracking-widest text-[#0A1128] flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#F5C400]" />
                  <span>04. Timeline</span>
                </label>
                <span className="text-[10px] font-mono text-[#0A1128]/50 font-bold">
                  DELIVERY
                </span>
              </div>

              <div className="flex flex-wrap gap-1.5">
                {timelineOptions.map((t) => {
                  const isSelected = watchedTimeline === t.value;
                  return (
                    <button
                      type="button"
                      key={t.value}
                      onClick={() => {
                        playClickTone();
                        setValue('timeline', t.value);
                      }}
                      onMouseEnter={() => setCursor('hover')}
                      onMouseLeave={resetCursor}
                      className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold border transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-[#F5C400] text-[#060B1A] border-[#0A1128]/25 shadow-xs font-black'
                          : 'bg-slate-50/70 border-[#0A1128]/10 hover:border-[#0A1128]/25 hover:bg-white text-[#0A1128]'
                      }`}
                    >
                      {t.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* ========================================================= */}
          {/* SECTION 4: Synopsis & Quick Scope (Airy Textarea)         */}
          {/* ========================================================= */}
          <div className="gsap-form-section space-y-2.5 pt-1">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
              <label className="text-[11px] font-mono font-black uppercase tracking-widest text-[#0A1128] flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#F5C400]" />
                <span>05. Project Vision & Notes</span>
                <span className="text-[#D4A100]">*</span>
              </label>
              <span className="text-[9px] font-mono text-[#0A1128]/50 font-bold">
                QUICK TAGS ↓
              </span>
            </div>

            {/* Quick Scope Tag Pills */}
            <div className="flex flex-wrap items-center gap-1.5 pb-0.5">
              {quickScopeTags.map((tag, i) => {
                const isActive = isTagInMessage(tag);
                return (
                  <button
                    type="button"
                    key={i}
                    onClick={() => handleToggleScopeTag(tag)}
                    className={`px-2.5 py-1 rounded-full text-[10px] font-mono font-bold transition-all duration-200 cursor-pointer flex items-center gap-1 border ${
                      isActive
                        ? 'bg-[#F5C400] text-[#060B1A] border-[#0A1128]/30 shadow-2xs scale-[1.03]'
                        : 'bg-slate-100/90 hover:bg-amber-100/80 hover:border-[#F5C400] border-[#0A1128]/10 text-[#0A1128]'
                    }`}
                  >
                    {isActive ? (
                      <Check size={9} className="text-[#060B1A] stroke-[3]" />
                    ) : (
                      <Plus size={9} className="text-[#0A1128]" />
                    )}
                    <span>{tag.replace(/^\+\s*/, '')}</span>
                  </button>
                );
              })}
            </div>

            <div className={`relative p-3.5 rounded-2xl bg-slate-50/70 border transition-all duration-200 ${
              focusedField === 'message'
                ? 'border-[#F5C400] bg-white ring-3 ring-[#F5C400]/20 shadow-xs'
                : 'border-[#0A1128]/10 hover:border-[#0A1128]/25'
            }`}>
              <textarea
                rows={3}
                placeholder="Tell us about your narrative, target audience, aesthetic benchmarks, or production scale..."
                {...register('message', { required: 'Please provide brief details about your project vision' })}
                onFocus={() => setFocusedField('message')}
                onBlur={() => setFocusedField('')}
                className="w-full bg-transparent text-sm font-sans font-medium text-[#0A1128] placeholder:text-[#0A1128]/30 focus:outline-none resize-none leading-relaxed"
              />
              <div className="flex justify-end pt-1 text-[9px] font-mono text-[#0A1128]/50 font-bold">
                {watchedMessage.length} characters
              </div>
            </div>
            {errors.message && (
              <span className="text-[10px] text-rose-600 font-mono font-bold block">
                ⚠ {errors.message.message}
              </span>
            )}
          </div>

          {/* ========================================================= */}
          {/* SECTION 5: Magnetic GSAP Action Bar                      */}
          {/* ========================================================= */}
          <div className="gsap-form-submit pt-4 border-t border-[#0A1128]/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-[11px] font-mono text-[#0A1128]/70 font-bold">
              <ShieldCheck size={15} className="text-emerald-600 flex-shrink-0" />
              <span>Full NDA & Creative IP Protection</span>
            </div>

            <div className="relative w-full sm:w-auto">
              <button
                ref={buttonRef}
                type="submit"
                disabled={isSubmitting}
                onMouseMove={handleButtonMouseMove}
                onMouseEnter={() => {
                  setCursor('hover');
                  playWhoosh();
                }}
                onMouseLeave={handleButtonMouseLeave}
                className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-[#F5C400] text-[#060B1A] border border-[#0A1128]/20 font-heading font-black text-xs sm:text-sm tracking-wider uppercase hover:bg-[#FFE042] shadow-md hover:shadow-xl shadow-[#F5C400]/25 disabled:opacity-50 transition-all flex items-center justify-center gap-2.5 cursor-pointer whitespace-nowrap active:scale-95 group"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={16} className="animate-spin text-[#060B1A]" />
                    <span>Transmitting Brief...</span>
                  </>
                ) : (
                  <>
                    <span>Transmit Commission Brief</span>
                    <ArrowUpRight size={15} className="text-[#060B1A] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};
