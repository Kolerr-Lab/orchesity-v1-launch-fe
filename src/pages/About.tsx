import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { GoBackButton } from "@/components/ui/go-back-button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Target, Lightbulb, Globe } from "lucide-react";

const About = () => {
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
            <Badge variant="secondary" className="mb-6">About OrchesityAI</Badge>
            <h1 className="font-poppins text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Orchestrating the Future of
              <span className="text-primary block">AI Infrastructure</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              We're building the universal cloud AI backend that makes advanced AI accessible to every developer and business, regardless of scale or expertise.
            </p>
          </section>

          {/* Mission & Vision */}
          <section className="grid md:grid-cols-2 gap-8 mb-16">
            <Card className="glass">
              <CardContent className="p-8">
                <Target className="h-12 w-12 text-primary mb-4" />
                <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
                <p className="text-muted-foreground leading-relaxed">
                  To democratize AI by providing a plug-and-play infrastructure that eliminates the complexity of AI deployment, making it as simple as connecting to an API.
                </p>
              </CardContent>
            </Card>

            <Card className="glass">
              <CardContent className="p-8">
                <Lightbulb className="h-12 w-12 text-primary mb-4" />
                <h2 className="text-2xl font-bold mb-4">Our Vision</h2>
                <p className="text-muted-foreground leading-relaxed">
                  A world where every application is AI-powered, where developers can focus on building amazing experiences rather than managing AI infrastructure.
                </p>
              </CardContent>
            </Card>
          </section>

          {/* Values */}
          <section className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Our Values</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                The principles that guide everything we do
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <Card className="glass text-center">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Developer First</h3>
                  <p className="text-muted-foreground">
                    Every decision we make prioritizes developer experience and ease of use.
                  </p>
                </CardContent>
              </Card>

              <Card className="glass text-center">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Globe className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Universal Access</h3>
                  <p className="text-muted-foreground">
                    AI should be accessible to everyone, from startups to enterprises.
                  </p>
                </CardContent>
              </Card>

              <Card className="glass text-center">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Target className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Cost Optimization</h3>
                  <p className="text-muted-foreground">
                    We believe powerful AI shouldn't break the bank. Efficiency is key.
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Story */}
          <section className="mb-16">
            <Card className="glass">
              <CardContent className="p-8 md:p-12">
                <div className="max-w-4xl mx-auto">
                  <h2 className="text-3xl font-bold mb-8 text-center">Our Story</h2>
                  <div className="prose prose-lg max-w-none text-muted-foreground">
                    <p className="mb-6">
                      OrchesityAI was born from a simple observation: while AI capabilities were advancing rapidly, 
                      the infrastructure to deploy and manage AI applications remained frustratingly complex and expensive.
                    </p>
                    <p className="mb-6">
                      Our founding team, composed of engineers from leading tech companies and AI research institutions, 
                      experienced firsthand the challenges of scaling AI systems. We spent countless hours managing 
                      infrastructure, optimizing costs, and handling the operational overhead that comes with AI deployment.
                    </p>
                    <p className="mb-6">
                      We envisioned a world where developers could focus entirely on building innovative AI applications 
                      without worrying about the underlying complexity. That vision became OrchesityAI—a universal cloud 
                      AI backend that abstracts away the infrastructure challenges while providing enterprise-grade 
                      reliability and cost optimization.
                    </p>
                    <p>
                      Today, we're proud to serve developers and businesses worldwide, enabling them to deploy AI 
                      applications with confidence, scale with ease, and innovate without limits.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Leadership */}
          <section className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Leadership</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Meet the founder driving OrchesityAI's vision forward
              </p>
            </div>

            <Card className="glass max-w-4xl mx-auto">
              <CardContent className="p-8 md:p-12">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div>
                    <div className="w-32 h-32 bg-gradient-to-br from-primary/20 to-primary/5 rounded-full mx-auto md:mx-0 mb-6 flex items-center justify-center">
                      <span className="text-4xl font-bold text-primary">RN</span>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-2">Ricky Anh Nguyen</h3>
                    <p className="text-primary font-semibold mb-4">CEO & AI System Architect</p>
                    <div className="prose prose-sm max-w-none text-muted-foreground">
                      <p className="mb-4">
                        Ricky is a solo founder and AI system architect with over a decade of experience in 
                        distributed systems, machine learning, and developer infrastructure. His journey began 
                        in traditional software engineering before transitioning into AI and cloud architecture.
                      </p>
                      <p className="mb-4">
                        Having witnessed firsthand the complexity and cost barriers that prevent developers 
                        from adopting AI, Ricky founded OrchesityAI with a mission to democratize AI infrastructure. 
                        His vision is to create a universal backend that makes AI as accessible as connecting to a REST API.
                      </p>
                      <p>
                        When not architecting AI systems, Ricky enjoys mentoring early-stage startups, 
                        contributing to open source projects, and exploring the intersection of AI and developer experience.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Team Section */}
          <section className="text-center">
            <h2 className="text-3xl font-bold mb-4">Join Our Mission</h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              We're always looking for passionate individuals who share our vision of making AI accessible to everyone.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="/careers" 
                className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
              >
                View Open Positions
              </a>
              <a 
                href="/contact" 
                className="inline-flex items-center justify-center px-6 py-3 border border-border rounded-lg font-medium hover:bg-accent transition-colors"
              >
                Get in Touch
              </a>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default About;