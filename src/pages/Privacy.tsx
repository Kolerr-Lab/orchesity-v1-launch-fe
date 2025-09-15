import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { GoBackButton } from "@/components/ui/go-back-button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const Privacy = () => {
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
              Privacy Policy
            </h1>
            <p className="text-muted-foreground">
              Last updated: {lastUpdated}
            </p>
          </div>

          {/* Content */}
          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Introduction</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-gray max-w-none dark:prose-invert">
                <p>
                  At OrchesityAI ("we," "our," or "us"), we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our AI backend services and platform.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Information We Collect</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-gray max-w-none dark:prose-invert">
                <h4>Personal Information</h4>
                <ul>
                  <li>Account information (name, email address, phone number)</li>
                  <li>Billing and payment information</li>
                  <li>Company information (for business accounts)</li>
                  <li>Communication preferences</li>
                </ul>

                <h4>Technical Information</h4>
                <ul>
                  <li>API usage data and logs</li>
                  <li>Application performance metrics</li>
                  <li>Device and browser information</li>
                  <li>IP addresses and location data</li>
                </ul>

                <h4>AI Model Data</h4>
                <ul>
                  <li>Input data sent to our AI models</li>
                  <li>Model configuration and parameters</li>
                  <li>Training data (when applicable)</li>
                  <li>Output and response data</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>How We Use Your Information</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-gray max-w-none dark:prose-invert">
                <p>We use the collected information for the following purposes:</p>
                <ul>
                  <li><strong>Service Provision:</strong> To provide, maintain, and improve our AI backend services</li>
                  <li><strong>Account Management:</strong> To create and manage your account, process payments, and provide customer support</li>
                  <li><strong>Performance Optimization:</strong> To monitor and optimize the performance of our AI models and infrastructure</li>
                  <li><strong>Security:</strong> To detect, prevent, and address technical issues and security threats</li>
                  <li><strong>Communication:</strong> To send you service updates, technical notices, and promotional materials (with your consent)</li>
                  <li><strong>Legal Compliance:</strong> To comply with applicable laws and regulations</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Data Processing and AI Training</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-gray max-w-none dark:prose-invert">
                <p>
                  <strong>Customer Data:</strong> We do not use your proprietary data to train our general AI models unless explicitly agreed upon in writing. Your data remains yours, and we implement strict access controls to protect it.
                </p>
                <p>
                  <strong>Aggregated Analytics:</strong> We may use aggregated, anonymized data to improve our services and develop new features. This data cannot be traced back to individual users or accounts.
                </p>
                <p>
                  <strong>Model Improvement:</strong> With your explicit consent, we may use your feedback and interaction data to improve model performance and accuracy.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Data Sharing and Disclosure</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-gray max-w-none dark:prose-invert">
                <p>We may share your information in the following circumstances:</p>
                <ul>
                  <li><strong>Service Providers:</strong> With trusted third-party service providers who assist in operating our platform</li>
                  <li><strong>Legal Requirements:</strong> When required by law, court order, or government request</li>
                  <li><strong>Business Transfers:</strong> In connection with mergers, acquisitions, or sale of assets</li>
                  <li><strong>Consent:</strong> With your explicit consent for specific purposes</li>
                </ul>
                <p>
                  We never sell your personal information to third parties for marketing purposes.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Data Security</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-gray max-w-none dark:prose-invert">
                <p>We implement industry-standard security measures to protect your data:</p>
                <ul>
                  <li>End-to-end encryption for data in transit and at rest</li>
                  <li>Multi-factor authentication and access controls</li>
                  <li>Regular security audits and penetration testing</li>
                  <li>SOC 2 Type II compliance</li>
                  <li>ISO 27001 certification</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Your Rights</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-gray max-w-none dark:prose-invert">
                <p>Depending on your location, you may have the following rights:</p>
                <ul>
                  <li><strong>Access:</strong> Request access to your personal information</li>
                  <li><strong>Correction:</strong> Request correction of inaccurate data</li>
                  <li><strong>Deletion:</strong> Request deletion of your personal information</li>
                  <li><strong>Portability:</strong> Request a copy of your data in a portable format</li>
                  <li><strong>Restriction:</strong> Request restriction of processing</li>
                  <li><strong>Objection:</strong> Object to certain types of processing</li>
                </ul>
                <p>
                  To exercise these rights, please contact us at privacy@orchesityai.com.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Data Retention</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-gray max-w-none dark:prose-invert">
                <p>
                  We retain your information only as long as necessary to provide our services and comply with legal obligations. Specific retention periods vary based on the type of data and applicable legal requirements.
                </p>
                <p>
                  API logs and usage data are typically retained for 90 days unless longer retention is required for security or legal purposes.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>International Transfers</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-gray max-w-none dark:prose-invert">
                <p>
                  Your information may be transferred to and processed in countries other than your own. We ensure appropriate safeguards are in place, including Standard Contractual Clauses approved by relevant authorities.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Contact Us</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-gray max-w-none dark:prose-invert">
                <p>
                  If you have any questions about this Privacy Policy or our privacy practices, please contact us:
                </p>
                <ul>
                  <li><strong>Email:</strong> privacy@orchesityai.com</li>
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

export default Privacy;