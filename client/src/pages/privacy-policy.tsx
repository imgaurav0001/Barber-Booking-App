import Layout from "@/components/layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";

export default function PrivacyPolicy() {
  const [, setLocation] = useLocation();

  return (
    <Layout>
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-serif font-bold">Privacy Policy</h1>
            <p className="text-muted-foreground mt-2">Effective Date: November 1, 2024 | Last Updated: November 28, 2024</p>
          </div>

          <Card className="border shadow-sm mb-6">
            <CardHeader>
              <CardTitle className="font-serif">1. Introduction & Data Controller</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
              <p>
                Trim & Tone Inc. ("Company," "we," "us," or "our") located at 547 Market Street, Metro City, NY 10001, operates the Trim & Tone platform 
                (the "Service"). We are committed to protecting your privacy and maintaining transparency about how we collect, use, and protect your personal data.
              </p>
              <p>
                This Privacy Policy explains our policies and practices regarding the collection, use, disclosure, and protection of your information 
                when you access and use our Service, including our website, mobile applications, and related services.
              </p>
            </CardContent>
          </Card>

          <Card className="border shadow-sm mb-6">
            <CardHeader>
              <CardTitle className="font-serif">2. Information We Collect</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
              <div>
                <h4 className="font-bold mb-2">A. Information You Provide Directly</h4>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  <li><strong>Account Information:</strong> Full name, email address, phone number, password, profile picture, date of birth</li>
                  <li><strong>Booking Information:</strong> Service preferences, selected date/time, barber choice, services selected, appointment history</li>
                  <li><strong>Payment Information:</strong> Credit card details (processed securely through Stripe; we do not store card numbers)</li>
                  <li><strong>Profile Information (Barber Accounts):</strong> Shop name, business license, certifications, bio, photos, availability schedules</li>
                  <li><strong>Communication Data:</strong> Messages, reviews, ratings, feedback, support tickets</li>
                  <li><strong>Location Data:</strong> City/neighborhood for shop discovery (optional)</li>
                </ul>
              </div>
              <div className="mt-4">
                <h4 className="font-bold mb-2">B. Information Automatically Collected</h4>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  <li><strong>Device Information:</strong> Device type, OS, browser type, unique device identifiers</li>
                  <li><strong>Usage Analytics:</strong> Pages visited, features accessed, time spent, click patterns, search queries</li>
                  <li><strong>Technical Data:</strong> IP address, cookies, log files, session identifiers</li>
                  <li><strong>Location Data:</strong> Approximate location based on IP address (not precise GPS)</li>
                  <li><strong>Referral Source:</strong> How you found our Service (direct, search engine, advertisement, etc.)</li>
                </ul>
              </div>
              <div className="mt-4">
                <h4 className="font-bold mb-2">C. Information from Third Parties</h4>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  <li>Payment processors (Stripe, Square)</li>
                  <li>Analytics providers (Google Analytics, Mixpanel)</li>
                  <li>Social media platforms (if you choose to sign up via social login)</li>
                  <li>Other users (e.g., when they leave reviews mentioning you)</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card className="border shadow-sm mb-6">
            <CardHeader>
              <CardTitle className="font-serif">3. How We Use Your Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
              <p>We use collected information for the following purposes:</p>
              <div className="space-y-3 text-sm">
                <div>
                  <strong className="text-foreground">Service Delivery:</strong>
                  <p>Processing bookings, managing appointments, connecting customers with barbers, providing customer support</p>
                </div>
                <div>
                  <strong className="text-foreground">Personalization:</strong>
                  <p>Customizing your experience, remembering preferences, displaying relevant shops/barbers</p>
                </div>
                <div>
                  <strong className="text-foreground">Communication:</strong>
                  <p>Sending appointment reminders, booking confirmations, promotional offers (with your consent), service updates</p>
                </div>
                <div>
                  <strong className="text-foreground">Safety & Security:</strong>
                  <p>Detecting and preventing fraud, identifying suspicious activity, protecting against security breaches</p>
                </div>
                <div>
                  <strong className="text-foreground">Analytics & Improvement:</strong>
                  <p>Analyzing usage patterns, improving platform features, conducting research, generating insights</p>
                </div>
                <div>
                  <strong className="text-foreground">Compliance:</strong>
                  <p>Meeting legal obligations, responding to lawful requests from authorities, enforcing our terms</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border shadow-sm mb-6">
            <CardHeader>
              <CardTitle className="font-serif">4. How We Share Your Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
              <p className="font-bold text-foreground">We do NOT sell or rent your personal information to third parties.</p>
              <p className="text-sm">We may share information in these limited circumstances:</p>
              <ul className="list-disc pl-5 mt-3 space-y-2 text-sm">
                <li><strong>Barber Partners:</strong> Your name, phone, email, and appointment details are shared with your selected barber to complete your booking</li>
                <li><strong>Service Providers:</strong> Payment processors, email services, hosting providers, analytics tools (all under strict data processing agreements)</li>
                <li><strong>Legal Requirements:</strong> When required by law, court order, or government request</li>
                <li><strong>Business Transfers:</strong> In case of merger, acquisition, or sale of assets (with privacy protections in place)</li>
                <li><strong>Your Consent:</strong> When you explicitly authorize us to share information with third parties</li>
                <li><strong>Aggregate Data:</strong> We may share anonymized, aggregated statistics that cannot identify individuals</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border shadow-sm mb-6">
            <CardHeader>
              <CardTitle className="font-serif">5. Data Security & Protection</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
              <p>
                We implement comprehensive technical, administrative, and physical safeguards to protect your personal information:
              </p>
              <ul className="list-disc pl-5 mt-3 space-y-2 text-sm">
                <li><strong>Encryption:</strong> SSL/TLS encryption for data in transit; AES-256 encryption for data at rest</li>
                <li><strong>Secure Infrastructure:</strong> Cloud hosting with SOC 2 Type II compliance and regular security audits</li>
                <li><strong>Access Controls:</strong> Role-based access, authentication protocols, employee training</li>
                <li><strong>Password Security:</strong> Passwords are hashed with bcrypt; we never store plain-text passwords</li>
                <li><strong>Payment Security:</strong> PCI DSS Level 1 compliance; payment data processed by certified third parties</li>
                <li><strong>Incident Response:</strong> 24/7 monitoring with immediate breach notification procedures</li>
              </ul>
              <p className="mt-4 text-sm">
                <strong>Note:</strong> While we implement strong security measures, no system is completely secure. We cannot guarantee absolute security of your information.
              </p>
            </CardContent>
          </Card>

          <Card className="border shadow-sm mb-6">
            <CardHeader>
              <CardTitle className="font-serif">6. Cookies & Tracking Technologies</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
              <p className="text-sm">
                We use cookies, web beacons, and similar tracking technologies to enhance your experience:
              </p>
              <ul className="list-disc pl-5 mt-2 space-y-1 text-sm">
                <li><strong>Essential Cookies:</strong> Required for login, security, and basic functionality</li>
                <li><strong>Analytics Cookies:</strong> Google Analytics (anonymized) to understand user behavior</li>
                <li><strong>Preference Cookies:</strong> Remember your settings and preferences</li>
              </ul>
              <p className="mt-3 text-sm">
                You can disable cookies in your browser settings, but this may affect Service functionality.
              </p>
            </CardContent>
          </Card>

          <Card className="border shadow-sm mb-6">
            <CardHeader>
              <CardTitle className="font-serif">7. Your Privacy Rights</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
              <p className="text-sm">Depending on your location, you may have the following rights:</p>
              <ul className="list-disc pl-5 mt-3 space-y-2 text-sm">
                <li><strong>Right to Access:</strong> Request a copy of your personal data we hold</li>
                <li><strong>Right to Correction:</strong> Correct inaccurate or incomplete information</li>
                <li><strong>Right to Deletion:</strong> Request deletion of your data (subject to legal obligations)</li>
                <li><strong>Right to Portability:</strong> Receive your data in a portable, machine-readable format</li>
                <li><strong>Right to Opt-Out:</strong> Unsubscribe from marketing communications anytime</li>
                <li><strong>Right to Object:</strong> Oppose certain uses of your data</li>
              </ul>
              <p className="mt-4 text-sm">
                To exercise these rights, email <strong>privacy@trimandtone.com</strong> with your request. We will respond within 30 days.
              </p>
            </CardContent>
          </Card>

          <Card className="border shadow-sm mb-6">
            <CardHeader>
              <CardTitle className="font-serif">8. Retention of Data</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
              <p className="text-sm">
                <strong>Account Data:</strong> Retained for the duration of your account + 1 year after deletion<br/>
                <strong>Booking History:</strong> Retained for 7 years for tax and accounting purposes<br/>
                <strong>Analytics Data:</strong> Retained for 24 months<br/>
                <strong>Payment Records:</strong> Retained for 7 years per financial regulations
              </p>
            </CardContent>
          </Card>

          <Card className="border shadow-sm mb-6">
            <CardHeader>
              <CardTitle className="font-serif">9. Children's Privacy</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
              <p className="text-sm">
                Our Service is not intended for children under 13. We do not knowingly collect information from children. 
                If we discover we have collected data from a child, we will delete it immediately.
              </p>
            </CardContent>
          </Card>

          <Card className="border shadow-sm mb-8">
            <CardHeader>
              <CardTitle className="font-serif">10. Contact & Questions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
              <p className="text-sm">
                <strong>Data Protection Officer:</strong> Sarah Mitchell<br/>
                <strong>Email:</strong> privacy@trimandtone.com<br/>
                <strong>Mailing Address:</strong> Trim & Tone Inc., 547 Market Street, Metro City, NY 10001, USA<br/>
                <strong>Phone:</strong> (555) 123-4567<br/>
                <strong>Support Form:</strong> Visit trimandtone.com/privacy-request
              </p>
              <p className="text-sm mt-4">
                We typically respond to privacy inquiries within 5 business days. For GDPR-related requests, we respond within 30 days.
              </p>
            </CardContent>
          </Card>

          <div className="text-center">
            <Button onClick={() => setLocation("/")} variant="outline" className="mb-4">
              Back to Home
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
