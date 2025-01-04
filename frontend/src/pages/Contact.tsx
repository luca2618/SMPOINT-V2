import React from 'react';
import { Mail, Download, Bug, Lightbulb, Shield } from 'lucide-react';

const Contact = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Mail className="w-8 h-8 text-primary" />
        <h1 className="text-3xl font-bold">Contact</h1>
      </div>

      {/* Main Content */}
      <div className="grid gap-6">
        {/* Contact Info Card */}
        <div className="bg-card rounded-xl p-6">
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Bug className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Report Issues</h3>
                <p className="text-muted-foreground">
                  For bugs, technical issues, security concerns, or improvement suggestions, 
                  please contact{' '}
                  <a 
                    href="mailto:sylvester@smkid.dk" 
                    className="text-primary hover:underline"
                  >
                    sylvester@smkid.dk
                  </a>
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-2 bg-secondary/10 rounded-lg">
                <Download className="w-5 h-5 text-secondary" />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Bulk Point Addition</h3>
                <p className="text-muted-foreground mb-3">
                  If you need to add multiple points at once, please use our activity list template:
                </p>
                <a 
                  href="/aktivitetsliste_skabelon.csv" 
                  download
                  className="inline-flex items-center gap-2 px-4 py-2 bg-secondary/10 text-secondary rounded-lg hover:bg-secondary/20 transition-colors"
                >
                  <Download className="w-4 h-4" />
                  Download Template
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-2 bg-accent/10 rounded-lg">
                <Lightbulb className="w-5 h-5 text-accent" />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Feature Requests</h3>
                <p className="text-muted-foreground">
                  Have ideas for improving the platform? We'd love to hear them! Send your suggestions
                  to our development team.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-2 bg-red-500/10 rounded-lg">
                <Shield className="w-5 h-5 text-red-500" />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Security Concerns</h3>
                <p className="text-muted-foreground">
                  Found a security vulnerability? Please report it immediately to ensure the safety
                  of our platform and its users.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;