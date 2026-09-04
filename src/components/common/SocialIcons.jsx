import React from 'react';

export const InstagramIcon = ({ size = 16, className = "" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

export const LinkedinIcon = ({ size = 16, className = "" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export const YoutubeIcon = ({ size = 16, className = "" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
    <polygon points="10 15 15 12 10 9 10 15" fill="currentColor" stroke="none" />
  </svg>
);

export const VimeoIcon = ({ size = 16, className = "" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path d="M22.84 8.22c-.1 2.22-1.64 5.25-4.63 9.1-3.1 3.99-5.72 5.98-7.87 5.98-1.33 0-2.45-1.23-3.37-3.69-.62-2.27-1.24-4.54-1.85-6.81-.68-2.52-1.42-3.78-2.2-3.78-.17 0-.78.36-1.83 1.08L0 8.78c1.17-1.02 2.33-2.05 3.49-3.07 1.6-1.39 2.8-2.12 3.6-2.2 1.9-.17 3.07 1.13 3.51 3.91.47 2.97.8 4.82.99 5.56.57 2.52 1.2 3.78 1.88 3.78.53 0 1.34-.84 2.43-2.52 1.09-1.68 1.68-2.96 1.76-3.83.15-1.42-.42-2.13-1.72-2.13-.62 0-1.26.14-1.92.42 1.28-4.18 3.72-6.19 7.33-6.03 2.68.12 3.95 1.74 3.82 4.85z"/>
  </svg>
);
