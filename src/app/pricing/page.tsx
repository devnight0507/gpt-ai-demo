'use client';

import { useRouter } from 'next/navigation';
import { Check, ArrowLeft } from 'lucide-react';
import { mockStripeService, mockAuthService } from '@/lib/mock-services';

export default function PricingPage() {
  const router = useRouter();

  const handleUpgrade = async () => {
    const user = mockAuthService.getCurrentUser();
    if (!user) {
      router.push('/auth');
      return;
    }

    try {
      const checkoutUrl = await mockStripeService.createCheckoutSession('pro');
      
      // Simulate successful payment
      setTimeout(async () => {
        await mockAuthService.updateUserPlan('pro');
        alert('🎉 Upgraded to Pro! You now have access to GPT-4 and unlimited projects.');
        router.push('/');
      }, 2000);
      
      alert('Redirecting to Stripe Checkout... (Demo mode - auto-upgrading in 2 seconds)');
    } catch (error) {
      console.error('Error upgrading:', error);
      alert('Failed to start upgrade process');
    }
  };

  const features = {
    free: [
      '1 deployed project',
      'GPT-3.5 code generation',
      'Basic templates',
      'Live editor & preview',
      'Community support'
    ],
    pro: [
      'Unlimited projects',
      'GPT-4 & GPT-4o access',
      'Advanced templates',
      'Stripe monetization',
      'Priority support',
      'Export to GitHub',
      'Custom domains (coming soon)'
    ]
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700">
      {/* Demo Banner */}
      <div className="bg-yellow-400 text-black text-center py-2 px-4 text-sm font-medium">
        🚧 Demo Mode - Payments are simulated
      </div>

      {/* Header */}
      <header className="p-6">
        <nav className="flex items-center max-w-6xl mx-auto">
          <button
            onClick={() => router.push('/')}
            className="flex items-center space-x-2 text-white hover:text-gray-200"
          >
            <ArrowLeft size={20} />
            <span>Back to Home</span>
          </button>
        </nav>
      </header>

      {/* Main Content */}
      <main className="px-6 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Hero */}
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-white mb-4">
              Simple, Transparent Pricing
            </h1>
            <p className="text-xl text-white/90 mb-2">
              Built for indie creators, not venture capitalists
            </p>
            <p className="text-lg text-white/70">
              No surprise costs. No price hikes. Just fair pricing that scales with you.
            </p>
          </div>

          {/* Pricing Cards */}
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Free Plan */}
            <div className="bg-white rounded-2xl p-8 shadow-2xl">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Free</h2>
                <div className="text-4xl font-bold text-gray-800 mb-2">$0</div>
                <p className="text-gray-600">Perfect for trying out LaunchAI</p>
              </div>

              <ul className="space-y-4 mb-8">
                {features.free.map((feature, index) => (
                  <li key={index} className="flex items-center space-x-3">
                    <Check size={20} className="text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => router.push('/auth')}
                className="w-full py-3 px-6 border-2 border-purple-600 text-purple-600 rounded-lg font-semibold hover:bg-purple-50 transition-colors"
              >
                Get Started Free
              </button>
            </div>

            {/* Pro Plan */}
            <div className="bg-white rounded-2xl p-8 shadow-2xl relative overflow-hidden">
              {/* Popular Badge */}
              <div className="absolute top-0 right-6 bg-purple-600 text-white px-4 py-1 text-sm font-medium rounded-b-lg">
                Most Popular
              </div>

              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Pro</h2>
                <div className="flex items-baseline justify-center mb-2">
                  <span className="text-4xl font-bold text-gray-800">$25</span>
                  <span className="text-gray-600 ml-2">/month</span>
                </div>
                <p className="text-gray-600">For serious builders</p>
              </div>

              <ul className="space-y-4 mb-8">
                {features.pro.map((feature, index) => (
                  <li key={index} className="flex items-center space-x-3">
                    <Check size={20} className="text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={handleUpgrade}
                className="w-full py-3 px-6 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition-colors"
              >
                Upgrade to Pro
              </button>
            </div>
          </div>

          {/* FAQ */}
          <div className="mt-16 max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-white text-center mb-8">
              Frequently Asked Questions
            </h2>
            
            <div className="space-y-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                <h3 className="text-lg font-semibold text-white mb-2">
                  Can I cancel anytime?
                </h3>
                <p className="text-white/80">
                  Yes! Cancel anytime, no questions asked. Your projects remain accessible even after cancellation.
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                <h3 className="text-lg font-semibold text-white mb-2">
                  What's the difference between GPT-3.5 and GPT-4?
                </h3>
                <p className="text-white/80">
                  GPT-4 generates more sophisticated, production-ready code with better understanding of complex requirements. GPT-3.5 is great for simple apps and learning.
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                <h3 className="text-lg font-semibold text-white mb-2">
                  Do you take a cut of my app revenue?
                </h3>
                <p className="text-white/80">
                  Never! When you connect Stripe, 100% of payments go directly to your account. We only charge the monthly subscription fee.
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                <h3 className="text-lg font-semibold text-white mb-2">
                  Is this really anti-VC?
                </h3>
                <p className="text-white/80">
                  Yes! We're bootstrapped and plan to stay that way. No pressure for aggressive growth or price increases. Just sustainable, creator-friendly pricing.
                </p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-16 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Launch Your Next Idea?
            </h2>
            <p className="text-lg text-white/80 mb-8">
              Join 1,000+ indie creators building the future with LaunchAI
            </p>
            <button
              onClick={() => router.push('/')}
              className="bg-white text-purple-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors"
            >
              Start Building Now
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}