import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { GoBackButton } from "@/components/ui/go-back-button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, Lock, Eye, Users, FileCheck, Globe } from "lucide-react";

const Security = () => {
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
            <Badge variant="secondary" className="mb-6">Security & Compliance</Badge>
            <h1 className="font-poppins text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Enterprise-Grade Security
              <span className="text-primary block">Built for Trust</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Your data security is our top priority. We implement comprehensive security measures and maintain the highest compliance standards to protect your AI applications and data.
            </p>
          </section>

          {/* Security Pillars */}
          <section className="grid md:grid-cols-3 gap-8 mb-16">
            <Card className="glass text-center">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Data Protection</h3>
                <p className="text-muted-foreground">
                  End-to-end encryption, secure data centers, and comprehensive data protection protocols.
                </p>
              </CardContent>
            </Card>

            <Card className="glass text-center">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Lock className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Access Control</h3>
                <p className="text-muted-foreground">
                  Multi-factor authentication, role-based permissions, and zero-trust architecture.
                </p>
              </CardContent>
            </Card>

            <Card className="glass text-center">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Eye className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Monitoring</h3>
                <p className="text-muted-foreground">
                  24/7 security monitoring, threat detection, and incident response capabilities.
                </p>
              </CardContent>
            </Card>
          </section>

          {/* Compliance Certifications */}
          <section className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Compliance & Certifications</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                We maintain the highest industry standards and certifications
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="glass">
                <CardContent className="p-6 text-center">
                  <FileCheck className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">SOC 2 Type II</h3>
                  <p className="text-sm text-muted-foreground">
                    Audited security, availability, and confidentiality controls
                  </p>
                </CardContent>
              </Card>

              <Card className="glass">
                <CardContent className="p-6 text-center">
                  <Shield className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">ISO 27001</h3>
                  <p className="text-sm text-muted-foreground">
                    International standard for information security management
                  </p>
                </CardContent>
              </Card>

              <Card className="glass">
                <CardContent className="p-6 text-center">
                  <Globe className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">GDPR Compliant</h3>
                  <p className="text-sm text-muted-foreground">
                    Full compliance with European data protection regulations
                  </p>
                </CardContent>
              </Card>

              <Card className="glass">
                <CardContent className="p-6 text-center">
                  <Users className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">HIPAA Ready</h3>
                  <p className="text-sm text-muted-foreground">
                    Healthcare data protection compliance available
                  </p>
                </CardContent>
              </Card>

              <Card className="glass">
                <CardContent className="p-6 text-center">
                  <Lock className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">PCI DSS</h3>
                  <p className="text-sm text-muted-foreground">
                    Payment card industry security standards
                  </p>
                </CardContent>
              </Card>

              <Card className="glass">
                <CardContent className="p-6 text-center">
                  <Shield className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">FedRAMP</h3>
                  <p className="text-sm text-muted-foreground">
                    Federal government cloud security assessment
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Security Features */}
          <section className="space-y-8 mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Security Features</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Comprehensive security measures protect your data at every layer
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <Card className="glass">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Lock className="h-5 w-5 mr-2 text-primary" />
                    Encryption
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• AES-256 encryption for data at rest</li>
                    <li>• TLS 1.3 for data in transit</li>
                    <li>• Hardware security modules (HSMs)</li>
                    <li>• Key rotation and management</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="glass">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Users className="h-5 w-5 mr-2 text-primary" />
                    Identity & Access
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Multi-factor authentication (MFA)</li>
                    <li>• Single sign-on (SSO) integration</li>
                    <li>• Role-based access control (RBAC)</li>
                    <li>• API key management and rotation</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="glass">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Eye className="h-5 w-5 mr-2 text-primary" />
                    Monitoring & Logging
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Real-time security monitoring</li>
                    <li>• Comprehensive audit logs</li>
                    <li>• Anomaly detection and alerting</li>
                    <li>• Security incident response</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="glass">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Shield className="h-5 w-5 mr-2 text-primary" />
                    Infrastructure Security
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Network segmentation and firewalls</li>
                    <li>• DDoS protection and mitigation</li>
                    <li>• Secure cloud infrastructure</li>
                    <li>• Regular security assessments</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Data Privacy */}
          <section className="mb-16">
            <Card className="glass">
              <CardHeader>
                <CardTitle className="text-center text-2xl">Data Privacy & Protection</CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="font-semibold mb-3">Data Ownership</h4>
                    <p className="text-muted-foreground mb-4">
                      You retain full ownership of your data. We never use your proprietary data to train our models without explicit consent.
                    </p>
                    
                    <h4 className="font-semibold mb-3">Data Isolation</h4>
                    <p className="text-muted-foreground">
                      Each customer's data is logically isolated with strict access controls and tenant separation.
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-3">Data Retention</h4>
                    <p className="text-muted-foreground mb-4">
                      Configurable data retention policies with automatic deletion and secure data destruction.
                    </p>
                    
                    <h4 className="font-semibold mb-3">Data Portability</h4>
                    <p className="text-muted-foreground">
                      Export your data at any time in standard formats with no vendor lock-in.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Security Contact */}
          <section className="text-center">
            <Card className="glass max-w-2xl mx-auto">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-4">Security Questions?</h2>
                <p className="text-muted-foreground mb-6">
                  Our security team is here to help with any questions about our security practices, compliance, or to report security issues.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a 
                    href="mailto:security@orchesity.com" 
                    className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
                  >
                    Contact Security Team
                  </a>
                  <a 
                    href="/docs/security" 
                    className="inline-flex items-center justify-center px-6 py-3 border border-border rounded-lg font-medium hover:bg-accent transition-colors"
                  >
                    Security Documentation
                  </a>
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

export default Security;