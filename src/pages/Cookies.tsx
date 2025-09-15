import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { GoBackButton } from "@/components/ui/go-back-button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const Cookies = () => {
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
              Cookie Policy
            </h1>
            <p className="text-muted-foreground">
              Last updated: {lastUpdated}
            </p>
          </div>

          {/* Content */}
          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>What Are Cookies</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-gray max-w-none dark:prose-invert">
                <p>
                  Cookies are small text files that are stored on your device (computer, smartphone, tablet) when you visit our website. They help us provide you with a better experience by remembering your preferences and enabling certain functionality.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>How We Use Cookies</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-gray max-w-none dark:prose-invert">
                <p>We use cookies for the following purposes:</p>
                <ul>
                  <li><strong>Essential Cookies:</strong> Required for the website to function properly</li>
                  <li><strong>Performance Cookies:</strong> Help us understand how visitors interact with our website</li>
                  <li><strong>Functionality Cookies:</strong> Remember your preferences and settings</li>
                  <li><strong>Analytics Cookies:</strong> Provide insights about website usage and performance</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Types of Cookies We Use</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-gray max-w-none dark:prose-invert">
                <h4>Essential Cookies</h4>
                <p>These cookies are necessary for the website to function and cannot be switched off:</p>
                <ul>
                  <li>Authentication cookies (to keep you logged in)</li>
                  <li>Security cookies (to prevent fraudulent activity)</li>
                  <li>Load balancing cookies (to distribute traffic)</li>
                </ul>

                <h4>Analytics Cookies</h4>
                <p>These cookies help us understand how our website is being used:</p>
                <ul>
                  <li>Google Analytics (to track website usage)</li>
                  <li>Performance monitoring (to identify issues)</li>
                  <li>User behavior tracking (to improve user experience)</li>
                </ul>

                <h4>Functionality Cookies</h4>
                <p>These cookies enhance your experience on our website:</p>
                <ul>
                  <li>Language preferences</li>
                  <li>Theme settings (dark/light mode)</li>
                  <li>Form data retention</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Third-Party Cookies</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-gray max-w-none dark:prose-invert">
                <p>We may use third-party services that set their own cookies:</p>
                <ul>
                  <li><strong>Google Analytics:</strong> For website analytics and performance monitoring</li>
                  <li><strong>Stripe:</strong> For payment processing (when applicable)</li>
                  <li><strong>Intercom:</strong> For customer support chat functionality</li>
                  <li><strong>GitHub:</strong> For authentication and repository integration</li>
                </ul>
                <p>
                  These third parties have their own privacy policies and cookie policies that govern their use of cookies.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Managing Your Cookie Preferences</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-gray max-w-none dark:prose-invert">
                <h4>Browser Settings</h4>
                <p>You can control cookies through your browser settings:</p>
                <ul>
                  <li><strong>Chrome:</strong> Settings → Privacy and security → Cookies and other site data</li>
                  <li><strong>Firefox:</strong> Settings → Privacy & Security → Cookies and Site Data</li>
                  <li><strong>Safari:</strong> Preferences → Privacy → Manage Website Data</li>
                  <li><strong>Edge:</strong> Settings → Cookies and site permissions → Cookies and site data</li>
                </ul>

                <h4>Cookie Consent</h4>
                <p>
                  When you first visit our website, you'll see a cookie consent banner. You can choose to accept all cookies, accept only essential cookies, or customize your preferences.
                </p>

                <h4>Opt-Out Links</h4>
                <ul>
                  <li><a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer">Google Analytics Opt-out</a></li>
                  <li><a href="https://optout.aboutads.info/" target="_blank" rel="noopener noreferrer">Digital Advertising Alliance Opt-out</a></li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Impact of Disabling Cookies</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-gray max-w-none dark:prose-invert">
                <p>If you disable cookies, some features of our website may not work properly:</p>
                <ul>
                  <li>You may need to log in repeatedly</li>
                  <li>Your preferences may not be saved</li>
                  <li>Some interactive features may not function</li>
                  <li>We won't be able to provide personalized experiences</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Data Retention</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-gray max-w-none dark:prose-invert">
                <p>Different cookies have different lifespans:</p>
                <ul>
                  <li><strong>Session Cookies:</strong> Deleted when you close your browser</li>
                  <li><strong>Persistent Cookies:</strong> Remain until their expiration date or until you delete them</li>
                  <li><strong>Authentication Cookies:</strong> Typically expire after 30 days of inactivity</li>
                  <li><strong>Analytics Cookies:</strong> Usually expire after 2 years</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Changes to This Policy</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-gray max-w-none dark:prose-invert">
                <p>
                  We may update this Cookie Policy from time to time to reflect changes in our practices or for legal compliance. We will notify you of any material changes by posting the updated policy on our website.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Contact Us</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-gray max-w-none dark:prose-invert">
                <p>
                  If you have any questions about our use of cookies, please contact us:
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

export default Cookies;