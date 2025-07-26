'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { mockAIService } from '@/lib/mock-services';

export default function Home() {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setIsGenerating(true);
    
    try {
      const result = await mockAIService.generateCode(prompt);
      
      const generatedData = {
        prompt,
        ...result
      };
      
      console.log('Homepage: setting generated data', generatedData);
      sessionStorage.setItem('generated_app', JSON.stringify(generatedData));
      console.log('Homepage: data saved, navigating to editor');
      
      router.push('/editor');
    } catch (error) {
      console.error('Error generating code:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const examplePrompts = [
    "Build a todo list app",
    "Create a calculator",
    "Make a blog post summarizer",
    "Design a contact form"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700">
      <div className="bg-yellow-400 text-black text-center py-2 px-4 text-sm font-medium">
        🚧 Demo Mode - Using Mock Data (No API Keys Required)
      </div>

      <header className="p-6">
        <nav className="flex justify-between items-center max-w-6xl mx-auto">
          <div className="flex items-center space-x-2">
            <span className="text-2xl">🚀</span>
            <span className="text-white font-bold text-xl">LaunchAI</span>
          </div>
          <div className="flex space-x-4">
            <button 
              onClick={() => router.push('/pricing')}
              className="text-white hover:text-gray-200 transition-colors"
            >
              Pricing
            </button>
            <button 
              onClick={() => router.push('/auth')}
              className="bg-white text-purple-600 px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors"
            >
              Sign In
            </button>
          </div>
        </nav>
      </header>

      <main className="flex flex-col items-center justify-center px-6 py-12">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <div className="text-6xl mb-4">👨‍🚀</div>
            <h1 className="text-5xl font-bold text-white mb-4">
              Hi, I'm Pip!
            </h1>
            <p className="text-xl text-white/90 mb-2">
              What would you like to build today?
            </p>
            <p className="text-lg text-white/70">
              1,000+ indie hackers building the future - one prompt at a time.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="mb-8">
            <div className="bg-white rounded-2xl p-6 shadow-2xl max-w-2xl mx-auto">
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Describe the app you want to build... (e.g., 'Build a todo list app with dark mode')"
                className="w-full h-32 p-4 border-2 border-gray-200 rounded-xl resize-none focus:border-purple-500 focus:outline-none text-gray-800 placeholder-gray-500"
                disabled={isGenerating}
              />
              <button
                type="submit"
                disabled={!prompt.trim() || isGenerating}
                className="w-full mt-4 bg-purple-600 text-white py-4 px-6 rounded-xl font-semibold text-lg hover:bg-purple-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
              >
                {isGenerating ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Generating your app...</span>
                  </div>
                ) : (
                  '🚀 Launch My App'
                )}
              </button>
            </div>
          </form>

          <div className="mb-12">
            <p className="text-white/80 mb-4">Try these examples:</p>
            <div className="flex flex-wrap justify-center gap-2">
              {examplePrompts.map((example, index) => (
                <button
                  key={index}
                  onClick={() => setPrompt(example)}
                  className="bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm hover:bg-white/30 transition-colors"
                  disabled={isGenerating}
                >
                  {example}
                </button>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6 text-white">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <div className="text-3xl mb-3">⚡</div>
              <h3 className="font-semibold mb-2">Instant Generation</h3>
              <p className="text-sm text-white/80">
                From prompt to working app in seconds. No coding required.
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <div className="text-3xl mb-3">🎨</div>
              <h3 className="font-semibold mb-2">Live Editor</h3>
              <p className="text-sm text-white/80">
                Edit your app's code in real-time with instant preview.
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <div className="text-3xl mb-3">🌐</div>
              <h3 className="font-semibold mb-2">One-Click Deploy</h3>
              <p className="text-sm text-white/80">
                Deploy your app instantly and share it with the world.
              </p>
            </div>
          </div>
        </div>
      </main>

      <footer className="text-center text-white/60 py-8">
        <p>&copy; 2024 LaunchAI. Built for indie creators, by indie creators.</p>
      </footer>
    </div>
  );
}
