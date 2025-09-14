import Navigation from "@/components/Navigation";
import { GoBackButton } from "@/components/ui/go-back-button";
import { Settings as SettingsIcon, User, Key, Bell, Shield, Database } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

const Settings = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-24 pb-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="mb-6">
            <GoBackButton />
          </div>
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              <span className="gradient-text-primary">Settings</span>
            </h1>
            <p className="text-muted-foreground text-lg">
              Manage your account, security, and preferences
            </p>
          </div>

          <div className="space-y-6">
            {/* Profile Settings */}
            <Card className="glass border-border/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5 text-primary" />
                  Profile Information
                </CardTitle>
                <CardDescription>
                  Update your personal information and preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" placeholder="First name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" placeholder="Last name" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="your@email.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company">Company</Label>
                  <Input id="company" placeholder="Company name" />
                </div>
                <Button variant="hero">Save Changes</Button>
              </CardContent>
            </Card>

            {/* API Keys */}
            <Card className="glass border-border/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Key className="h-5 w-5 text-accent" />
                  API Keys & Integrations
                </CardTitle>
                <CardDescription>
                  Manage your API keys and external service integrations
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 rounded-lg bg-secondary/20 border border-border/10">
                    <div>
                      <h4 className="font-medium">OpenAI API Key</h4>
                      <p className="text-sm text-muted-foreground">Connected to GPT-4 services</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full" />
                      <span className="text-sm">Active</span>
                      <Button variant="ghost" size="sm">Edit</Button>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 rounded-lg bg-secondary/20 border border-border/10">
                    <div>
                      <h4 className="font-medium">Anthropic API Key</h4>
                      <p className="text-sm text-muted-foreground">Claude integration for RAG</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full" />
                      <span className="text-sm">Active</span>
                      <Button variant="ghost" size="sm">Edit</Button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-lg bg-secondary/20 border border-border/10">
                    <div>
                      <h4 className="font-medium">Vector Database</h4>
                      <p className="text-sm text-muted-foreground">Pinecone connection for embeddings</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-muted-foreground rounded-full" />
                      <span className="text-sm">Not Connected</span>
                      <Button variant="outline" size="sm">Connect</Button>
                    </div>
                  </div>
                </div>
                <Button variant="outline">Add New Integration</Button>
              </CardContent>
            </Card>

            {/* Notifications */}
            <Card className="glass border-border/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5 text-orange-400" />
                  Notifications
                </CardTitle>
                <CardDescription>
                  Configure how you receive updates and alerts
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  {[
                    { label: "Agent Status Updates", description: "Get notified when agents go online/offline" },
                    { label: "API Limit Warnings", description: "Alerts when approaching usage limits" },
                    { label: "Security Alerts", description: "Important security notifications" },
                    { label: "Performance Reports", description: "Weekly performance summaries" },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center justify-between">
                      <div className="space-y-1">
                        <p className="font-medium">{item.label}</p>
                        <p className="text-sm text-muted-foreground">{item.description}</p>
                      </div>
                      <Switch />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Security */}
            <Card className="glass border-border/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-red-400" />
                  Security & Access
                </CardTitle>
                <CardDescription>
                  Manage your account security and access controls
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Two-Factor Authentication</p>
                      <p className="text-sm text-muted-foreground">Add an extra layer of security</p>
                    </div>
                    <Button variant="outline" size="sm">Enable</Button>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Session Management</p>
                      <p className="text-sm text-muted-foreground">View and manage active sessions</p>
                    </div>
                    <Button variant="ghost" size="sm">Manage</Button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Activity Log</p>
                      <p className="text-sm text-muted-foreground">View your account activity history</p>
                    </div>
                    <Button variant="ghost" size="sm">View Log</Button>
                  </div>
                </div>
                
                <div className="pt-4 border-t border-border/20">
                  <Button variant="destructive" size="sm">
                    Delete Account
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Settings;