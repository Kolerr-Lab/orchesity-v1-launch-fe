import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Footer from "@/components/Footer";
import { FeedbackWidget } from "@/components/support/FeedbackWidget";
import WelcomeSection from "@/components/welcome/WelcomeSection";
import AgentChatInterface from "@/components/chat/AgentChatInterface";
import { useAuth } from "@/contexts/AuthContext";

const Index = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {isAuthenticated ? (
        <>
          {/* Welcome Section for Logged-in Users */}
          <WelcomeSection />
          
          {/* AI Agent Chat Interface */}
          <section className="py-16 px-4">
            <div className="container mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Chat with Your <span className="gradient-text-primary">AI Agent</span>
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Generate backends, optimize workflows, or get instant help with your projects. 
                  Start a conversation with our intelligent AI assistant.
                </p>
              </div>
              <AgentChatInterface />
            </div>
          </section>
        </>
      ) : (
        <>
          {/* Hero Section for Non-Authenticated Users */}
          <Hero />
        </>
      )}
      
      <Features />
      <FeedbackWidget />
      <Footer />
    </div>
  );
};

export default Index;
