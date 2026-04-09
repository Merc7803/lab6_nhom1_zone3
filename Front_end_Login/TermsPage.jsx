import React from 'react';

const TermsPage = () => {
  return (
    <div className="bg-surface min-h-screen font-body text-on-surface p-8 md:p-20">
      <div className="max-w-3xl mx-auto space-y-8">
        <h1 className="text-4xl font-headline font-extrabold tracking-tight">Terms of Service</h1>
        <p className="text-outline italic">Last Updated: April 2026</p>
        
        <section className="space-y-4">
          <h2 className="text-xl font-bold">1. Acceptance of Terms</h2>
          <p className="text-on-surface-variant leading-relaxed">
            By accessing the VinFast AI Smart Advisor, you agree to be bound by these terms. This is a mockup page for demonstration purposes.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-bold">2. Use of AI Advisor</h2>
          <p className="text-on-surface-variant leading-relaxed">
            The recommendations provided by our AI are for informational purposes only. Final vehicle specifications and pricing should be confirmed with authorized VinFast representatives.
          </p>
        </section>
      </div>
    </div>
  );
};

export default TermsPage;