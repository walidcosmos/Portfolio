// components/sections/Contact.tsx
'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/Button';

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email'),
  subject: z.string().min(1, 'Please select a subject'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type ContactForm = z.infer<typeof contactSchema>;

export function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactForm>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactForm) => {
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setIsSuccess(true);
        reset();
        setTimeout(() => setIsSuccess(false), 5000);
      }
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 px-4">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-4xl font-bold mb-4 text-center">
          Let&apos;s Build Something Together
        </h2>
        <p className="text-gray-400 text-center mb-12">
          Whether you&apos;re looking for a developer, a collaborator, or just want
          to chat about tech and biotech over coffee ☕ — I&apos;d love to hear from you.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <input
              {...register('name')}
              placeholder="Your Name"
              className="w-full px-4 py-3 bg-gray-900 border border-gray-800 rounded-lg focus:border-blue-500 focus:outline-none"
            />
            {errors.name && (
              <p className="text-red-400 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          <div>
            <input
              {...register('email')}
              type="email"
              placeholder="your.email@example.com"
              className="w-full px-4 py-3 bg-gray-900 border border-gray-800 rounded-lg focus:border-blue-500 focus:outline-none"
            />
            {errors.email && (
              <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          <div>
            <select
              {...register('subject')}
              className="w-full px-4 py-3 bg-gray-900 border border-gray-800 rounded-lg focus:border-blue-500 focus:outline-none"
            >
              <option value="">Select a subject</option>
              <option value="job">Job Opportunity</option>
              <option value="collaboration">Collaboration</option>
              <option value="hello">Just Saying Hi</option>
            </select>
            {errors.subject && (
              <p className="text-red-400 text-sm mt-1">{errors.subject.message}</p>
            )}
          </div>

          <div>
            <textarea
              {...register('message')}
              placeholder="Your message..."
              rows={6}
              className="w-full px-4 py-3 bg-gray-900 border border-gray-800 rounded-lg focus:border-blue-500 focus:outline-none resize-none"
            />
            {errors.message && (
              <p className="text-red-400 text-sm mt-1">{errors.message.message}</p>
            )}
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full"
          >
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </Button>

          {isSuccess && (
            <p className="text-green-400 text-center">
              ✓ Message sent! I&apos;ll get back to you soon.
            </p>
          )}
        </form>
      </div>
    </section>
  );
}