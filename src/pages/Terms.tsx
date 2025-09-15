import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { GoBackButton } from "@/components/ui/go-back-button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const Terms = () => {
  const lastUpdated = "December 15, 2024";

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-24 pb-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="mb-6">
            <GoBackButton />
          </div>

          {/* Header */}
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-4">Legal</Badge>
            <h1 className="font-poppins text-4xl md:text-5xl font-bold mb-4">
              Terms of Service
            </h1>
            <p className="text-muted-foreground">
              Last updated: {lastUpdated}
            </p>
          </div>

          {/* Content */}
          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Agreement to Terms</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-gray max-w-none dark:prose-invert">
                <p>
                  These Terms of Service ("Terms") govern your use of OrchesityAI's AI backend platform and services ("Services"). By accessing or using our Services, you agree to be bound by these Terms. If you do not agree to these Terms, please do not use our Services.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Description of Services</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-gray max-w-none dark:prose-invert">
                <p>
                  OrchesityAI provides a universal cloud AI backend platform that enables developers and businesses to:
                </p>
                <ul>
                  <li>Deploy and manage AI models and agents</li>
                  <li>Access AI orchestration and workflow automation</li>
                  <li>Integrate AI capabilities through APIs</li>
                  <li>Monitor and optimize AI application performance</li>
                  <li>Scale AI infrastructure automatically</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Account Registration and Security</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-gray max-w-none dark:prose-invert">
                <h4>Account Creation</h4>
                <p>
                  To use our Services, you must create an account and provide accurate, current, and complete information. You are responsible for maintaining the confidentiality of your account credentials.
                </p>
                
                <h4>Account Security</h4>
                <ul>
                  <li>You are responsible for all activities that occur under your account</li>
                  <li>You must notify us immediately of any unauthorized use</li>
                  <li>We reserve the right to suspend accounts that violate these Terms</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Acceptable Use Policy</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-gray max-w-none dark:prose-invert">
                <p>You agree not to use our Services to:</p>
                <ul>
                  <li>Violate any applicable laws or regulations</li>
                  <li>Infringe on intellectual property rights</li>
                  <li>Generate harmful, abusive, or illegal content</li>
                  <li>Attempt to reverse engineer our AI models</li>
                  <li>Overwhelm our systems with excessive requests</li>
                  <li>Use our Services for competitive intelligence</li>
                  <li>Distribute malware or conduct cyberattacks</li>
                  <li>Violate privacy rights of individuals</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Data Ownership and License</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-gray max-w-none dark:prose-invert">
                <h4>Your Data</h4>
                <p>
                  You retain ownership of all data, content, and intellectual property that you provide to our Services ("Customer Data"). You grant us a limited license to process your Customer Data solely to provide the Services.
                </p>
                
                <h4>Our Services</h4>
                <p>
                  We retain all rights to our platform, AI models, algorithms, and related intellectual property. You receive a limited, non-exclusive license to use our Services according to these Terms.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Billing and Payment</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-gray max-w-none dark:prose-invert">
                <h4>Fees</h4>
                <p>
                  Our Services are provided on a subscription and usage-based model. Current pricing is available on our pricing page and may be updated from time to time.
                </p>
                
                <h4>Payment Terms</h4>
                <ul>
                  <li>Subscription fees are billed in advance</li>
                  <li>Usage fees are billed monthly in arrears</li>
                  <li>All fees are non-refundable unless otherwise specified</li>
                  <li>Overdue accounts may result in service suspension</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Service Level Agreement</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-gray max-w-none dark:prose-invert">
                <h4>Uptime Commitment</h4>
                <p>
                  We strive to maintain 99.9% uptime for our core Services. Detailed SLA terms are available in your service agreement.
                </p>
                
                <h4>Maintenance</h4>
                <p>
                  We may perform scheduled maintenance that could temporarily interrupt service. We will provide reasonable notice for planned maintenance.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Limitation of Liability</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-gray max-w-none dark:prose-invert">
                <p>
                  TO THE MAXIMUM EXTENT PERMITTED BY LAW, ORCHESITYAI SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING WITHOUT LIMITATION LOSS OF PROFITS, DATA, OR USE, ARISING OUT OF OR RELATING TO THESE TERMS OR THE SERVICES.
                </p>
                <p>
                  OUR TOTAL LIABILITY FOR ANY CLAIMS RELATED TO THE SERVICES SHALL NOT EXCEED THE AMOUNT PAID BY YOU FOR THE SERVICES IN THE TWELVE MONTHS PRECEDING THE CLAIM.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Indemnification</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-gray max-w-none dark:prose-invert">
                <p>
                  You agree to indemnify and hold harmless OrchesityAI from any claims, damages, or expenses arising from your use of the Services, violation of these Terms, or infringement of any third-party rights.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Termination</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-gray max-w-none dark:prose-invert">
                <h4>Termination by You</h4>
                <p>
                  You may terminate your account at any time by following the cancellation process in your account settings.
                </p>
                
                <h4>Termination by Us</h4>
                <p>
                  We may terminate your account immediately if you violate these Terms or engage in harmful activities. We may also terminate with notice for convenience.
                </p>
                
                <h4>Effect of Termination</h4>
                <p>
                  Upon termination, your access to the Services will cease, and we may delete your data according to our data retention policy.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Changes to Terms</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-gray max-w-none dark:prose-invert">
                <p>
                  We may update these Terms from time to time. We will notify you of material changes by email or through our platform. Your continued use of the Services after such changes constitutes acceptance of the new Terms.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Governing Law</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-gray max-w-none dark:prose-invert">
                <p>
                  These Terms are governed by the laws of the State of Florida, United States, without regard to conflict of law principles. Any disputes will be resolved in the courts of Escambia County, Florida.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-gray max-w-none dark:prose-invert">
                <p>
                  If you have questions about these Terms, please contact us:
                </p>
                <ul>
                  <li><strong>Email:</strong> legal@orchesityai.com</li>
                  <li><strong>Address:</strong> OrchesityAI, Inc., 1349 Sea Grove Ct., Gulf Breeze, FL 32563</li>
                  <li><strong>Phone:</strong> +1 (810) 351-7299</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Terms;