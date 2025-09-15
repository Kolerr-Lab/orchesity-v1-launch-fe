import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { GoBackButton } from "@/components/ui/go-back-button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CalendarDays, Clock, User, ArrowRight } from "lucide-react";

const Blog = () => {
  const blogPosts = [
    {
      title: "Introducing OrchesityAI: The Universal Cloud AI Backend",
      excerpt: "Today, we're excited to announce OrchesityAI, a revolutionary platform that makes AI accessible to every developer and business.",
      author: "Sarah Chen",
      date: "December 15, 2024",
      readTime: "5 min read",
      category: "Product",
      featured: true
    },
    {
      title: "The Hidden Costs of AI Infrastructure",
      excerpt: "Explore the often overlooked costs of running AI at scale and how to optimize your infrastructure spending.",
      author: "Michael Rodriguez",
      date: "December 10, 2024",
      readTime: "8 min read",
      category: "Engineering"
    },
    {
      title: "Building Reliable AI Agents: Best Practices",
      excerpt: "Learn how to design and deploy AI agents that scale reliably in production environments.",
      author: "Alex Kumar",
      date: "December 5, 2024",
      readTime: "12 min read",
      category: "Tutorial"
    },
    {
      title: "The Future of AI Orchestration",
      excerpt: "How AI orchestration is evolving and what it means for the future of intelligent applications.",
      author: "Dr. Emily Watson",
      date: "November 28, 2024",
      readTime: "6 min read",
      category: "Research"
    },
    {
      title: "Security in AI: Protecting Your Models and Data",
      excerpt: "Essential security practices for AI applications and how to protect your valuable AI assets.",
      author: "David Park",
      date: "November 20, 2024",
      readTime: "10 min read",
      category: "Security"
    },
    {
      title: "Developer Experience: Making AI Simple",
      excerpt: "Our philosophy on developer experience and how we're making AI development more accessible.",
      author: "Sarah Chen",
      date: "November 15, 2024",
      readTime: "7 min read",
      category: "Product"
    }
  ];

  const categories = ["All", "Product", "Engineering", "Tutorial", "Research", "Security"];

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
              <Card className="glass overflow-hidden">
                <div className="grid md:grid-cols-2 gap-0">
                  <div className="aspect-video md:aspect-auto bg-gradient-to-br from-primary/20 to-primary/5"></div>
                  <CardContent className="p-8 flex flex-col justify-center">
                    <div className="space-y-4">
                      <Badge variant="outline">{post.category}</Badge>
                      <h2 className="text-2xl md:text-3xl font-bold leading-tight">
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
              <Card key={index} className="glass hover:shadow-lg transition-shadow cursor-pointer group">
                <div className="aspect-video bg-gradient-to-br from-primary/10 to-primary/5"></div>
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

          {/* Newsletter Signup */}
          <section className="text-center">
            <Card className="glass max-w-2xl mx-auto">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-4">Stay Updated</h2>
                <p className="text-muted-foreground mb-6">
                  Subscribe to our newsletter to get the latest posts, product updates, and AI insights delivered to your inbox.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                  <input 
                    type="email" 
                    placeholder="Enter your email"
                    className="flex-1 px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <Button>Subscribe</Button>
                </div>
              </CardContent>
            </Card>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Blog;