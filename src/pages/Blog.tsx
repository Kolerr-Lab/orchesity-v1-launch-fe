import { useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { GoBackButton } from "@/components/ui/go-back-button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CalendarDays, Clock, User, ArrowRight, ArrowLeft } from "lucide-react";

// Import blog images
import orchestityIntroImage from "@/assets/blog/orchestity-ai-intro.jpg";
import aiCostsImage from "@/assets/blog/ai-infrastructure-costs.jpg";
import aiAgentsImage from "@/assets/blog/ai-agents-production.jpg";
import aiOrchestrationImage from "@/assets/blog/ai-orchestration-future.jpg";
import aiSecurityImage from "@/assets/blog/ai-security.jpg";
import developerExperienceImage from "@/assets/blog/developer-experience.jpg";
import founderJourneyImage from "@/assets/blog/founder-journey.jpg";
import multiModelImage from "@/assets/blog/multi-model-ai.jpg";
import aiState2024Image from "@/assets/blog/ai-state-2024.jpg";

const Blog = () => {
  const [selectedPost, setSelectedPost] = useState<any>(null);
  
  const blogPosts = [
    {
      title: "Introducing OrchesityAI: The Universal Cloud AI Backend",
      excerpt: "Today, we're excited to announce OrchesityAI, a revolutionary platform that makes AI accessible to every developer and business. Learn about our vision, architecture, and the problems we're solving.",
      author: "Ricky Anh Nguyen",
      date: "December 15, 2024",
      readTime: "5 min read",
      category: "Product",
      featured: true,
      image: orchestityIntroImage,
      content: "Full article content about OrchesityAI introduction..."
    },
    {
      title: "The Hidden Costs of AI Infrastructure: A Deep Dive",
      excerpt: "Explore the often overlooked costs of running AI at scale and how to optimize your infrastructure spending.",
      author: "Ricky Anh Nguyen",
      date: "December 12, 2024",
      readTime: "8 min read",
      category: "Engineering",
      image: aiCostsImage,
      content: "Deep dive into AI infrastructure costs..."
    },
    {
      title: "Building Reliable AI Agents: Production Best Practices",
      excerpt: "Learn how to design and deploy AI agents that scale reliably in production environments.",
      author: "Ricky Anh Nguyen",
      date: "December 10, 2024",
      readTime: "12 min read",
      category: "Tutorial",
      image: aiAgentsImage,
      content: "Production best practices for AI agents..."
    },
    {
      title: "The Future of AI Orchestration: What's Coming Next",
      excerpt: "Exploring the next generation of AI orchestration technologies and their impact on development workflows.",
      author: "Ricky Anh Nguyen",
      date: "December 8, 2024",
      readTime: "6 min read",
      category: "Research",
      image: aiOrchestrationImage,
      content: "Future of AI orchestration technologies..."
    },
    {
      title: "AI Security: Protecting Your Models and Data",
      excerpt: "Comprehensive guide to securing AI applications, from prompt injection prevention to data privacy.",
      author: "Ricky Anh Nguyen",
      date: "December 5, 2024",
      readTime: "10 min read",
      category: "Security",
      image: aiSecurityImage,
      content: "Complete guide to AI security..."
    },
    {
      title: "Developer Experience: Making AI Simple and Accessible",
      excerpt: "Our philosophy on developer experience and how we're making AI development more accessible.",
      author: "Ricky Anh Nguyen",
      date: "December 1, 2024",
      readTime: "7 min read",
      category: "Product",
      image: developerExperienceImage,
      content: "Deep dive into developer experience philosophy..."
    },
    {
      title: "From Solo Founder to AI Infrastructure: My Journey",
      excerpt: "A personal story about building OrchesityAI from the ground up, challenges faced, and lessons learned.",
      author: "Ricky Anh Nguyen",
      date: "November 28, 2024",
      readTime: "9 min read",
      category: "Founder Story",
      image: founderJourneyImage,
      content: "Personal journey of building OrchesityAI..."
    },
    {
      title: "Multi-Model AI: Orchestrating Different AI Providers",
      excerpt: "How to effectively manage and orchestrate multiple AI models from different providers.",
      author: "Ricky Anh Nguyen",
      date: "November 25, 2024",
      readTime: "11 min read",
      category: "Engineering",
      image: multiModelImage,
      content: "Technical guide to multi-model AI orchestration..."
    },
    {
      title: "The State of AI in 2024: What We've Learned",
      excerpt: "Reflecting on the major developments in AI throughout 2024, from breakthrough models to infrastructure innovations.",
      author: "Ricky Anh Nguyen",
      date: "November 20, 2024",
      readTime: "8 min read",
      category: "Research",
      image: aiState2024Image,
      content: "Year in review: AI developments and trends in 2024..."
    }
  ];

  const categories = ["All", "Product", "Engineering", "Tutorial", "Research", "Security", "Founder Story"];

  // If a post is selected, show the full article view
  if (selectedPost) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        
        <main className="pt-24 pb-12">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="mb-6">
              <Button 
                variant="ghost" 
                onClick={() => setSelectedPost(null)}
                className="gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Blog
              </Button>
            </div>

            {/* Article Header */}
            <header className="mb-8">
              <div className="aspect-video mb-6 overflow-hidden rounded-lg">
                <img 
                  src={selectedPost.image} 
                  alt={selectedPost.title}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="space-y-4">
                <Badge variant="outline">{selectedPost.category}</Badge>
                <h1 className="text-3xl md:text-5xl font-bold leading-tight">
                  {selectedPost.title}
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  {selectedPost.excerpt}
                </p>
                <div className="flex items-center space-x-6 text-muted-foreground">
                  <div className="flex items-center">
                    <User className="h-4 w-4 mr-2" />
                    {selectedPost.author}
                  </div>
                  <div className="flex items-center">
                    <CalendarDays className="h-4 w-4 mr-2" />
                    {selectedPost.date}
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-2" />
                    {selectedPost.readTime}
                  </div>
                </div>
              </div>
            </header>

            {/* Article Content */}
            <article className="prose prose-lg max-w-none dark:prose-invert">
              <div className="whitespace-pre-wrap leading-relaxed">
                {selectedPost.content}
              </div>
            </article>
          </div>
        </main>

        <Footer />
      </div>
    );
  }

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
            <Badge variant="secondary" className="mb-6">Blog</Badge>
            <h1 className="font-poppins text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Insights & Updates
              <span className="text-primary block">from OrchesityAI</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Stay updated with the latest insights, tutorials, and announcements from our team as we build the future of AI infrastructure.
            </p>
          </section>

          {/* Featured Post */}
          {blogPosts.filter(post => post.featured).map((post, index) => (
            <section key={index} className="mb-16">
              <Card className="glass overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group" onClick={() => setSelectedPost(post)}>
                <div className="grid md:grid-cols-2 gap-0">
                  <div className="aspect-video md:aspect-auto overflow-hidden">
                    <img 
                      src={post.image} 
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <CardContent className="p-8 flex flex-col justify-center">
                    <div className="space-y-4">
                      <Badge variant="outline">{post.category}</Badge>
                      <h2 className="text-2xl md:text-3xl font-bold leading-tight group-hover:text-primary transition-colors">
                        {post.title}
                      </h2>
                      <p className="text-muted-foreground leading-relaxed">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <div className="flex items-center">
                          <User className="h-4 w-4 mr-1" />
                          {post.author}
                        </div>
                        <div className="flex items-center">
                          <CalendarDays className="h-4 w-4 mr-1" />
                          {post.date}
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          {post.readTime}
                        </div>
                      </div>
                      <Button className="w-fit">
                        Read Full Article
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Button>
                    </div>
                  </CardContent>
                </div>
              </Card>
            </section>
          ))}

          {/* Category Filter */}
          <section className="mb-8">
            <div className="flex flex-wrap gap-2 justify-center">
              {categories.map((category) => (
                <Button 
                  key={category} 
                  variant={category === "All" ? "default" : "outline"}
                  size="sm"
                >
                  {category}
                </Button>
              ))}
            </div>
          </section>

          {/* Blog Posts Grid */}
          <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {blogPosts.filter(post => !post.featured).map((post, index) => (
              <Card key={index} className="glass hover:shadow-lg transition-shadow cursor-pointer group" onClick={() => setSelectedPost(post)}>
                <div className="aspect-video overflow-hidden">
                  <img 
                    src={post.image} 
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="outline" className="text-xs">{post.category}</Badge>
                    <span className="text-xs text-muted-foreground">{post.readTime}</span>
                  </div>
                  <CardTitle className="text-lg group-hover:text-primary transition-colors">
                    {post.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <div className="flex items-center">
                      <User className="h-3 w-3 mr-1" />
                      {post.author}
                    </div>
                    <div className="flex items-center">
                      <CalendarDays className="h-3 w-3 mr-1" />
                      {post.date}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Blog;