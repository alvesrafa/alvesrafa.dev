'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/atoms/Button';
import { cn } from '@/lib/utils/cn';
import type { ContactFormData } from '@/types';

interface ContactFormProps {
  dictionary: {
    name: string;
    namePlaceholder: string;
    email: string;
    emailPlaceholder: string;
    subject: string;
    subjectPlaceholder: string;
    message: string;
    messagePlaceholder: string;
    submit: string;
    sending: string;
    success: string;
    error: string;
  };
}

type FormStatus = 'idle' | 'loading' | 'success' | 'error';

export function ContactForm({ dictionary }: ContactFormProps) {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
    honeypot: '',
  });
  const [status, setStatus] = useState<FormStatus>('idle');
  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormData, string>>>({});

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof ContactFormData, string>> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Honeypot check
    if (formData.honeypot) {
      return;
    }

    if (!validateForm()) {
      return;
    }

    setStatus('loading');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      setStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '', honeypot: '' });

      // Reset status after 5 seconds
      setTimeout(() => setStatus('idle'), 5000);
    } catch {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error when user starts typing
    if (errors[name as keyof ContactFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const inputBaseStyles = cn(
    'w-full px-4 py-3 rounded-lg',
    'bg-white dark:bg-neutral-800',
    'border border-neutral-200 dark:border-neutral-700',
    'text-neutral-800 dark:text-neutral-100',
    'placeholder:text-neutral-400 dark:placeholder:text-neutral-500',
    'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent',
    'transition-colors duration-200'
  );

  const inputErrorStyles = 'border-accent-500 dark:border-accent-500 focus:ring-accent-500';

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      {/* Honeypot field */}
      <input
        type="text"
        name="honeypot"
        value={formData.honeypot}
        onChange={handleChange}
        className="hidden"
        tabIndex={-1}
        autoComplete="off"
      />

      {/* Name */}
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2"
        >
          {dictionary.name}
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder={dictionary.namePlaceholder}
          className={cn(inputBaseStyles, errors.name && inputErrorStyles)}
          disabled={status === 'loading'}
        />
        {errors.name && (
          <p className="mt-1 text-sm text-accent-600 dark:text-accent-400">
            {errors.name}
          </p>
        )}
      </div>

      {/* Email */}
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2"
        >
          {dictionary.email}
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder={dictionary.emailPlaceholder}
          className={cn(inputBaseStyles, errors.email && inputErrorStyles)}
          disabled={status === 'loading'}
        />
        {errors.email && (
          <p className="mt-1 text-sm text-accent-600 dark:text-accent-400">
            {errors.email}
          </p>
        )}
      </div>

      {/* Subject */}
      <div>
        <label
          htmlFor="subject"
          className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2"
        >
          {dictionary.subject}
        </label>
        <input
          type="text"
          id="subject"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          placeholder={dictionary.subjectPlaceholder}
          className={cn(inputBaseStyles, errors.subject && inputErrorStyles)}
          disabled={status === 'loading'}
        />
        {errors.subject && (
          <p className="mt-1 text-sm text-accent-600 dark:text-accent-400">
            {errors.subject}
          </p>
        )}
      </div>

      {/* Message */}
      <div>
        <label
          htmlFor="message"
          className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2"
        >
          {dictionary.message}
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder={dictionary.messagePlaceholder}
          rows={5}
          className={cn(
            inputBaseStyles,
            'resize-none',
            errors.message && inputErrorStyles
          )}
          disabled={status === 'loading'}
        />
        {errors.message && (
          <p className="mt-1 text-sm text-accent-600 dark:text-accent-400">
            {errors.message}
          </p>
        )}
      </div>

      {/* Submit button */}
      <Button
        type="submit"
        size="lg"
        className="w-full"
        loading={status === 'loading'}
        disabled={status === 'loading' || status === 'success'}
        leftIcon={
          status === 'success' ? (
            <CheckCircle className="h-5 w-5" />
          ) : status === 'error' ? (
            <AlertCircle className="h-5 w-5" />
          ) : (
            <Send className="h-5 w-5" />
          )
        }
      >
        {status === 'loading'
          ? dictionary.sending
          : status === 'success'
          ? dictionary.success
          : status === 'error'
          ? dictionary.error
          : dictionary.submit}
      </Button>

      {/* Status messages */}
      {status === 'success' && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center text-sm text-green-600 dark:text-green-400"
        >
          {dictionary.success}
        </motion.p>
      )}

      {status === 'error' && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center text-sm text-accent-600 dark:text-accent-400"
        >
          {dictionary.error}
        </motion.p>
      )}
    </motion.form>
  );
}
