'use client';

import { Home, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/atoms/Button';

export default function NotFound() {
  return (
    <section className="min-h-[60vh] flex items-center justify-center">
      <div className="container-custom text-center">
        <div className="max-w-md mx-auto">
          <h1 className="text-9xl font-bold text-primary-200 dark:text-primary-900">
            404
          </h1>
          <h2 className="text-2xl md:text-3xl font-bold text-neutral-800 dark:text-neutral-100 mb-4 -mt-4">
            Page Not Found
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400 mb-8">
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button href="/" leftIcon={<Home className="h-4 w-4" />}>
              Go Home
            </Button>
            <Button
              variant="outline"
              onClick={() => window.history.back()}
              leftIcon={<ArrowLeft className="h-4 w-4" />}
            >
              Go Back
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
