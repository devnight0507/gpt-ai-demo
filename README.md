# LaunchAI MVP - Demo Version

A mock version of LaunchAI.org - the GPT-powered site builder for indie creators.

## 🚧 Demo Mode Features

This MVP demonstrates the full user experience without requiring real API keys:

- **Mock AI Generation**: Pre-built templates for common app types (todo list, calculator, contact form, blog summarizer)
- **Live Code Editor**: Real Monaco editor with HTML/CSS/JS support
- **Real-time Preview**: Live preview pane with iframe sandboxing
- **Mock Authentication**: localStorage-based auth with demo users
- **Mock Deployment**: Simulated deployment with fake URLs
- **Mock Payments**: Simulated Stripe integration

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## 🎮 How to Demo

### 1. Homepage Experience
- Visit the homepage with Pip the astronaut
- Try example prompts: "Build a todo list app", "Create a calculator", etc.
- Click "🚀 Launch My App" to generate code

### 2. Editor Experience  
- Edit HTML, CSS, and JavaScript in real-time
- See live preview update as you type
- Use the "Refresh" button to reload preview

### 3. Authentication Flow
- Click "Sign In" to see auth page
- Try demo users:
  - `demo@free.com` (Free plan)
  - `demo@pro.com` (Pro plan)
- Any email/password combination works

### 4. Save & Deploy
- Save projects (requires login)
- Deploy to mock URLs
- Free users limited to 1 deployment

### 5. Pricing Page
- View transparent pricing model
- Simulate Pro upgrade flow

## 📱 App Templates

The mock AI responds to these prompts with pre-built templates:

- **"todo list"** → Interactive todo list with localStorage
- **"calculator"** → Full-featured calculator with grid layout
- **"blog post summarizer"** → Text analysis tool with statistics
- **"contact form"** → Validated contact form with success states
- **Default** → "Hello World" template for unmatched prompts

## 🛠 Technical Stack

- **Frontend**: Next.js 15 + TypeScript + Tailwind CSS
- **Editor**: Monaco Editor (VS Code editor in browser)
- **Mock Services**: localStorage for persistence
- **Authentication**: Client-side auth simulation
- **Deployment**: Mock Vercel-style deployment URLs

## 🔧 Converting to Production

To convert this demo to a real application:

1. **Replace Mock Services**:
   ```typescript
   // Replace mockAIService with OpenAI API
   // Replace mockAuthService with Supabase Auth  
   // Replace mockStorageService with Supabase Database
   // Replace mockStripeService with real Stripe
   ```

2. **Environment Variables**:
   ```bash
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   OPENAI_API_KEY=your_openai_api_key
   STRIPE_SECRET_KEY=your_stripe_secret_key
   STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
   ```

## 📞 Support

This is a demo version built for client demonstration.
Built with ❤️ for indie creators, by indie creators.
