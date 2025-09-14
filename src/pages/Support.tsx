import { Navigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import { HelpCenter } from "@/components/support/HelpCenter";
import { GoBackButton } from "@/components/ui/go-back-button";

const Support = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-24 pb-12">
        <div className="container mx-auto px-4">
          <div className="mb-6">
            <GoBackButton />
          </div>
          <HelpCenter />
        </div>
      </main>
    </div>
  );
};

export default Support;