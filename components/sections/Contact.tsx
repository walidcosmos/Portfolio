// components/sections/Contact.tsx
'use client';

import { useState, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import * as z from 'zod';
import { Button } from '@/components/ui/Button';

type ContactForm = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

export function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const t = useTranslations('contact');
  const tForm = useTranslations('contact.form');
  const tValidation = useTranslations('contact.validation');

  // Create schema with translated validation messages
  const contactSchema = useMemo(
    () =>
      z.object({
        name: z.string().min(2, tValidation('nameMin')),
        email: z.string().email(tValidation('emailInvalid')),
        subject: z.string().min(1, tValidation('subjectRequired')),
        message: z.string().min(10, tValidation('messageMin')),
      }),
    [tValidation]
  );

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
          {t('title')}
        </h2>
        <p className="text-gray-400 text-center mb-12">
          {t('subtitle')}
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <input
              {...register('name')}
              placeholder={tForm('namePlaceholder')}
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
              placeholder={tForm('emailPlaceholder')}
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
              <option value="">{tForm('subjectPlaceholder')}</option>
              <option value="job">{tForm('subjects.job')}</option>
              <option value="collaboration">{tForm('subjects.collaboration')}</option>
              <option value="hello">{tForm('subjects.hello')}</option>
            </select>
            {errors.subject && (
              <p className="text-red-400 text-sm mt-1">{errors.subject.message}</p>
            )}
          </div>

          <div>
            <textarea
              {...register('message')}
              placeholder={tForm('messagePlaceholder')}
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
            {isSubmitting ? tForm('sending') : tForm('submit')}
          </Button>

          {isSuccess && (
            <p className="text-green-400 text-center">
              {tForm('success')}
            </p>
          )}
        </form>
      </div>
    </section>
  );
}