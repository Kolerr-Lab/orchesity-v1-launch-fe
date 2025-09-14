import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import Navigation from "@/components/Navigation";
import { GoBackButton } from "@/components/ui/go-back-button";
import { Phone, Mail, MapPin, Clock, Send } from "lucide-react";

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));

    toast({
      title: "Message sent successfully!",
      description: "We'll get back to you within 24 hours.",
    });

    setFormData({ name: "", email: "", subject: "", message: "" });
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-24 pb-12">
        <div className="container mx-auto px-4">
          <div className="mb-6">
            <GoBackButton />
          </div>
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-foreground mb-4">Contact Us</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Get in touch with our team. We're here to help you with any questions or support you need.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Information */}
            <div className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Phone className="h-5 w-5 text-primary" />
                    Phone Support
                  </CardTitle>
                  <CardDescription>Call us for immediate assistance</CardDescription>
                </CardHeader>
                <CardContent>
                  <a 
                    href="tel:+1-555-123-4567" 
                    className="text-2xl font-semibold text-primary hover:text-primary/80 transition-colors"
                  >
                    +1 (555) 123-4567
                  </a>
                  <div className="flex items-center gap-2 mt-2 text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>Mon-Fri: 9AM-6PM EST</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Mail className="h-5 w-5 text-primary" />
                    Email Support
                  </CardTitle>
                  <CardDescription>Send us an email and we'll respond quickly</CardDescription>
                </CardHeader>
                <CardContent>
                  <a 
                    href="mailto:support@orchesity.com" 
                    className="text-xl font-semibold text-primary hover:text-primary/80 transition-colors"
                  >
                    support@orchesity.com
                  </a>
                  <p className="text-muted-foreground mt-2">
                    We typically respond within 2-4 hours
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-primary" />
                    Office Location
                  </CardTitle>
                  <CardDescription>Visit us at our headquarters</CardDescription>
                </CardHeader>
                <CardContent>
                  <address className="not-italic text-foreground">
                    <div className="font-semibold">Orchesity Technologies</div>
                    <div>123 Innovation Drive</div>
                    <div>Suite 500</div>
                    <div>San Francisco, CA 94105</div>
                    <div>United States</div>
                  </address>
                </CardContent>
              </Card>

              {/* Emergency Contact */}
              <Card className="border-destructive/20 bg-destructive/5">
                <CardHeader>
                  <CardTitle className="text-destructive">Emergency Support</CardTitle>
                  <CardDescription>For critical system issues requiring immediate attention</CardDescription>
                </CardHeader>
                <CardContent>
                  <a 
                    href="tel:+1-555-EMERGENCY" 
                    className="text-lg font-semibold text-destructive hover:text-destructive/80 transition-colors"
                  >
                    +1 (555) 363-7436
                  </a>
                  <p className="text-sm text-muted-foreground mt-1">
                    Available 24/7 for critical issues
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Contact Form */}
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Send us a Message</CardTitle>
                  <CardDescription>
                    Fill out the form below and we'll get back to you as soon as possible
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name *</Label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="Your full name"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address *</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="your.email@example.com"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject *</Label>
                      <Input
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        placeholder="What is this regarding?"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">Message *</Label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="Please describe your inquiry in detail..."
                        className="min-h-[120px]"
                        required
                      />
                    </div>

                    <Button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="w-full"
                      size="lg"
                    >
                      {isSubmitting ? (
                        "Sending..."
                      ) : (
                        <>
                          <Send className="h-4 w-4 mr-2" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>

              {/* Quick Links */}
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Quick Links</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <a href="/support" className="block text-primary hover:text-primary/80 transition-colors">
                    → Help Center & FAQ
                  </a>
                  <a href="/docs" className="block text-primary hover:text-primary/80 transition-colors">
                    → Documentation
                  </a>
                  <a href="/subscription" className="block text-primary hover:text-primary/80 transition-colors">
                    → Pricing & Plans
                  </a>
                  <a href="mailto:sales@orchesity.com" className="block text-primary hover:text-primary/80 transition-colors">
                    → Sales Inquiries
                  </a>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Contact;