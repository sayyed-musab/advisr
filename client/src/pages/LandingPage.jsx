import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore.js';
import { Brain, Target, ArrowRight, Zap, Store, Sparkles, CheckCircle2 } from 'lucide-react';
import { Logo } from '../components/layout/Logo.jsx';
import { Button } from '../components/ui/Button.jsx';

const FeatureCard = ({ icon: Icon, title, description, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay }}
    className="relative group p-8 rounded-3xl bg-white border border-gray-200 hover:border-[#76b900]/50 transition-all shadow-sm hover:shadow-md overflow-hidden"
  >
    <div className="absolute inset-0 bg-gradient-to-br from-[#76b900]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
    <div className="h-12 w-12 rounded-2xl bg-[#76b900]/10 flex items-center justify-center mb-6 text-[#76b900]">
      <Icon className="h-6 w-6" />
    </div>
    <h3 className="text-xl font-semibold mb-3 text-gray-900">{title}</h3>
    <p className="text-gray-600 leading-relaxed">{description}</p>
  </motion.div>
);

const StepCard = ({ number, title, description, delay }) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay }}
    className="flex gap-6 items-start"
  >
    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-[#76b900] to-green-600 flex items-center justify-center text-xl font-bold text-white shadow-lg shadow-[#76b900]/20">
      {number}
    </div>
    <div>
      <h3 className="text-xl font-bold mb-2 text-gray-900">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  </motion.div>
);

export const LandingPage = () => {
  const { user } = useAuthStore();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans selection:bg-[#76b900]/30 overflow-x-hidden">
      {/* Dynamic Background Glow - Lightened */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-green-100/50 blur-[120px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-emerald-100/50 blur-[120px]" />
      </div>

      {/* Navigation */}
      <nav className="relative z-50 flex items-center justify-between px-6 md:px-12 py-6 max-w-7xl mx-auto">
        <Logo />
        <div className="flex items-center gap-4">
          {user ? (
            <Button onClick={() => navigate('/dashboard')} variant="primary" className="rounded-full px-6 bg-[#76b900] hover:bg-green-600 text-white">
              Go to Dashboard
            </Button>
          ) : (
            <>
              <Link to="/login" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
                Log In
              </Link>
              <Button onClick={() => navigate('/signup')} variant="primary" className="rounded-full px-6 shadow-lg shadow-[#76b900]/20 bg-[#76b900] hover:bg-green-600 text-white">
                Get Started
              </Button>
            </>
          )}
        </div>
      </nav>

      <main className="relative z-10">
        {/* Hero Section */}
        <section className="pt-24 pb-32 px-6 md:px-12 max-w-7xl mx-auto flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-green-200 shadow-sm mb-8 text-sm font-medium text-[#76b900]"
          >
            <Sparkles className="h-4 w-4" />
            <span>Powered by NVIDIA Nemotron-3</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 text-gray-900"
          >
            Your AI Business Consultant.<br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#FF9933] via-green-600 to-[#138808]">
              Built for India.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed"
          >
            Type your business problem. Let our advanced AI analyze your shop's unique profile to instantly generate a tailored diagnosis, strategic action plan, and realistic priority steps, in ₹ INR.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Button 
              onClick={() => navigate(user ? '/dashboard' : '/signup')} 
              className="rounded-full px-8 py-6 text-lg shadow-xl shadow-[#76b900]/20 bg-[#76b900] text-white hover:bg-green-600 border-none group"
            >
              Analyze My Business
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button 
              onClick={() => document.getElementById('features').scrollIntoView({ behavior: 'smooth' })} 
              variant="outline" 
              className="rounded-full px-8 py-6 text-lg border-gray-200 text-gray-700 hover:bg-gray-50"
            >
              See How It Works
            </Button>
          </motion.div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-24 bg-gray-50 border-y border-gray-200">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold mb-4 text-gray-900">Why Advisr works</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">We abandoned generic "chatbots" to build an AI that possesses the context and reasoning capability of a tier-one consulting firm.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <FeatureCard 
                delay={0}
                icon={Brain}
                title="Deep Context Reasoning"
                description="Powered by NVIDIA Nemotron's massive context window, Advisr thinks deeply through your exact scenario before answering."
              />
              <FeatureCard 
                delay={0.2}
                icon={Store}
                title="Hyper-Localized for India"
                description="Our AI understands UPI, WhatsApp Business, Swiggy/Zomato integrations, and local tier-2 market dynamics."
              />
              <FeatureCard 
                delay={0.4}
                icon={Target}
                title="Actionable Blueprints"
                description="No vague advice. You get exact steps to execute today, with projected budgets in INR (₹) and ROI timelines."
              />
            </div>
          </div>
        </section>

        {/* How it Works Section */}
        <section className="py-32 px-6 md:px-12 max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-12 text-gray-900">From problem to strategy in 60 seconds.</h2>
              <div className="space-y-12">
                <StepCard 
                  number="1"
                  delay={0}
                  title="Tell us about your business"
                  description="Share your city, revenue scale, business age, and the exact bottleneck you're facing today."
                />
                <StepCard 
                  number="2"
                  delay={0.2}
                  title="AI Diagnosis & Action Plan"
                  description="Our system instantly generates a comprehensive report diagnosing the root cause and providing a structured playbook."
                />
                <StepCard 
                  number="3"
                  delay={0.4}
                  title="Interactive Follow-up"
                  description="Don't understand a step? Want to refine the budget? Enter the fullscreen chat and talk directly to your AI consultant."
                />
              </div>
            </div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative rounded-3xl border border-gray-200 bg-white overflow-hidden shadow-2xl shadow-[#76b900]/10 aspect-square md:aspect-auto md:h-[600px] flex items-center justify-center p-8"
            >
              {/* Abstract decorative UI representation */}
              <div className="w-full h-full rounded-2xl border border-gray-100 bg-gray-50 p-6 flex flex-col gap-4">
                <div className="w-32 h-6 bg-gray-200 rounded-full mb-4 animate-pulse" />
                <div className="w-full h-24 bg-[#76b900]/10 rounded-xl border border-[#76b900]/20" />
                <div className="w-3/4 h-24 bg-green-50 rounded-xl border border-green-100" />
                <div className="flex-1" />
                <div className="w-full h-12 bg-white rounded-xl border border-gray-200 shadow-sm" />
              </div>
              
              {/* Overlay elements */}
              <div className="absolute top-1/4 right-[-2rem] bg-white border border-gray-100 rounded-xl p-4 shadow-xl rotate-3">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="text-[#76b900] h-5 w-5" />
                  <span className="text-sm font-medium text-gray-900">Priority Steps Generated</span>
                </div>
              </div>
              <div className="absolute bottom-1/4 left-[-2rem] bg-white border border-gray-100 rounded-xl p-4 shadow-xl -rotate-3">
                <div className="flex items-center gap-3">
                  <Zap className="text-[#FF9933] h-5 w-5" />
                  <span className="text-sm font-medium text-gray-900">Budget: ₹5,000 / month</span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-24 px-6 relative overflow-hidden bg-[#76b900]/5 border-t border-[#76b900]/10">
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <h2 className="text-4xl md:text-6xl font-bold mb-6 text-gray-900">Stop guessing. Start growing.</h2>
            <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">Join the small business owners in India using AI to make enterprise-grade strategic decisions.</p>
            <Button 
              onClick={() => navigate(user ? '/dashboard' : '/signup')} 
              className="rounded-full px-10 py-8 text-xl shadow-2xl shadow-[#76b900]/30 bg-gradient-to-r from-[#76b900] to-green-600 text-white hover:from-green-500 hover:to-[#76b900] border-none transition-all hover:scale-105"
            >
              Start Your Free Consultation
            </Button>
          </div>
        </section>
      </main>

      <footer className="border-t border-gray-200 py-12 text-center text-gray-500 text-sm bg-gray-50">
        <p>© {new Date().getFullYear()} Advisr. Built for Indian Businesses.</p>
      </footer>
    </div>
  );
};
