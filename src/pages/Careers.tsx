import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { GoBackButton } from "@/components/ui/go-back-button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Clock, Users, Briefcase } from "lucide-react";

const Careers = () => {
  const openPositions = [
    {
      title: "Senior AI Engineer",
      department: "Engineering",
      location: "Florida / Ho Chi Minh City / Remote",
      type: "Full-time",
      description: "Build and optimize AI models and infrastructure at scale. Work with cutting-edge AI technologies and distributed systems."
    },
    {
      title: "DevOps Engineer",
      department: "Infrastructure",
      location: "Florida / Ho Chi Minh City / Remote",
      type: "Full-time", 
      description: "Manage cloud infrastructure and deployment pipelines. Experience with Kubernetes, AWS, and CI/CD systems preferred."
    },
    {
      title: "Product Manager",
      department: "Product",
      location: "Florida / Ho Chi Minh City / Remote",
      type: "Full-time",
      description: "Drive product strategy and roadmap for AI platform features. Define user experiences and work closely with engineering."
    },
    {
      title: "Technical Writer",
      department: "Documentation",
      location: "Remote",
      type: "Contract",
      description: "Create comprehensive documentation and developer guides. Help make AI accessible through clear, actionable content."
    },
    {
      title: "AI Research Engineer",
      department: "Research",
      location: "Florida / Ho Chi Minh City / Remote",
      type: "Full-time",
      description: "Research and implement next-generation AI orchestration techniques. PhD in AI/ML preferred."
    },
    {
      title: "Frontend Engineer",
      department: "Engineering",
      location: "Remote",
      type: "Full-time",
      description: "Build beautiful, intuitive interfaces for AI tools. React, TypeScript, and design system experience required."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-24 pb-12">
        <div className="container mx-auto px-4">
          <div className="mb-6">
            <GoBackButton />
          </div>

          {/* Hero Section */}
          <section className="text-center mb-16">
            <Badge variant="secondary" className="mb-6">Join Our Team</Badge>
            <h1 className="font-poppins text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Build the Future of
              <span className="text-primary block">AI Infrastructure</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Join a passionate team that's democratizing AI and making advanced AI capabilities accessible to developers worldwide.
            </p>
          </section>

          {/* Why Join Us */}
          <section className="grid md:grid-cols-3 gap-8 mb-16">
            <Card className="glass text-center">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Talented Team</h3>
                <p className="text-muted-foreground">
                  Work with exceptional engineers and researchers from leading tech companies and AI institutions.
                </p>
              </CardContent>
            </Card>

            <Card className="glass text-center">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Briefcase className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Cutting-Edge Work</h3>
                <p className="text-muted-foreground">
                  Tackle challenging problems in AI infrastructure, distributed systems, and developer experience.
                </p>
              </CardContent>
            </Card>

            <Card className="glass text-center">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Remote-First</h3>
                <p className="text-muted-foreground">
                  Work from anywhere with a flexible, remote-first culture that values work-life balance.
                </p>
              </CardContent>
            </Card>
          </section>

          {/* Open Positions */}
          <section className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Open Positions</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Join us in building the infrastructure that powers the next generation of AI applications
              </p>
            </div>

            <div className="space-y-6">
              {openPositions.map((position, index) => (
                <Card key={index} className="glass">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between">
                      <div className="space-y-3 flex-1">
                        <div>
                          <h3 className="text-xl font-semibold mb-2">{position.title}</h3>
                          <p className="text-muted-foreground">{position.description}</p>
                        </div>
                        
                        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center">
                            <Briefcase className="h-4 w-4 mr-1" />
                            {position.department}
                          </div>
                          <div className="flex items-center">
                            <MapPin className="h-4 w-4 mr-1" />
                            {position.location}
                          </div>
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-1" />
                            {position.type}
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-4 md:mt-0 md:ml-6">
                        <Button className="w-full md:w-auto" asChild>
                          <a href="mailto:ricky@orchesity.com?subject=Application for ${position.title}&body=Hi Ricky,%0A%0AI'm interested in applying for the ${position.title} position at OrchesityAI.%0A%0APlease find my resume attached.%0A%0AThank you for your consideration.">
                            Apply Now
                          </a>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Benefits */}
          <section className="mb-16">
            <Card className="glass">
              <CardHeader>
                <CardTitle className="text-center text-2xl">Benefits & Perks</CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="text-center">
                    <h4 className="font-semibold mb-2">🏥 Health & Wellness</h4>
                    <p className="text-sm text-muted-foreground">
                      Comprehensive health, dental, and vision insurance
                    </p>
                  </div>
                  
                  <div className="text-center">
                    <h4 className="font-semibold mb-2">💰 Competitive Salary</h4>
                    <p className="text-sm text-muted-foreground">
                      Market-leading compensation with equity participation
                    </p>
                  </div>
                  
                  <div className="text-center">
                    <h4 className="font-semibold mb-2">🏖️ Unlimited PTO</h4>
                    <p className="text-sm text-muted-foreground">
                      Take time off when you need it with unlimited vacation policy
                    </p>
                  </div>
                  
                  <div className="text-center">
                    <h4 className="font-semibold mb-2">📚 Learning Budget</h4>
                    <p className="text-sm text-muted-foreground">
                      Annual budget for courses, conferences, and professional development
                    </p>
                  </div>
                  
                  <div className="text-center">
                    <h4 className="font-semibold mb-2">🖥️ Equipment</h4>
                    <p className="text-sm text-muted-foreground">
                      Top-tier laptop and equipment for your home office setup
                    </p>
                  </div>
                  
                  <div className="text-center">
                    <h4 className="font-semibold mb-2">🌍 Remote-First</h4>
                    <p className="text-sm text-muted-foreground">
                      Work from anywhere with flexible hours and async collaboration
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Application Process */}
          <section className="text-center">
            <h2 className="text-3xl font-bold mb-8">Don't See Your Role?</h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              We're always looking for exceptional talent. If you're passionate about AI and building developer tools, 
              we'd love to hear from you even if we don't have an open position that matches your background.
            </p>
            <Button size="lg" asChild>
              <a href="mailto:ricky@orchesity.com?subject=Open Application - OrchesityAI&body=Hi Ricky,%0A%0AI'm interested in joining OrchesityAI and would love to discuss potential opportunities.%0A%0APlease find my resume attached.%0A%0AThank you for your time.">
                Send Us Your Resume
              </a>
            </Button>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Careers;