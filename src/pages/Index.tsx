import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import { FeedbackWidget } from "@/components/support/FeedbackWidget";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <Hero />
      <Features />
      <FeedbackWidget />
    </div>
  );
};

export default Index;
