import Layout from "@/components/layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";

export default function TermsOfService() {
  const [, setLocation] = useLocation();

  return (
    <Layout>
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-serif font-bold">Terms of Service</h1>
            <p className="text-muted-foreground mt-2">Effective Date: November 1, 2024 | Last Updated: November 28, 2024</p>
          </div>

          <Card className="border shadow-sm mb-6">
            <CardHeader>
              <CardTitle className="font-serif">1. Agreement to Terms & Service Provider</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
              <p>
                These Terms of Service ("Terms") constitute a legal agreement between Trim & Tone Inc. ("Company," "we," "us," "our"), 
                located at 547 Market Street, Metro City, NY 10001, and you ("User," "you," "your"). By accessing, browsing, or using 
                the Trim & Tone platform (the "Service"), you acknowledge that you have read, understood, and agree to be bound by these Terms.
              </p>
              <p>
                If you do not agree to these Terms in their entirety, you must immediately discontinue use of the Service. Your continued 
                use constitutes your acceptance of all Terms as modified from time to time.
              </p>
            </CardContent>
          </Card>

          <Card className="border shadow-sm mb-6">
            <CardHeader>
              <CardTitle className="font-serif">2. User Accounts & Responsibilities</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
              <div className="text-sm space-y-3">
                <div>
                  <p className="font-bold text-foreground mb-1">Account Creation:</p>
                  <p>
                    You are responsible for creating and maintaining your account credentials. You must be at least 18 years old 
                    to use this Service. You agree to provide accurate, current, and complete information during registration.
                  </p>
                </div>
                <div>
                  <p className="font-bold text-foreground mb-1">Security:</p>
                  <p>
                    You are responsible for maintaining the confidentiality of your password and are fully responsible for all activities 
                    that occur under your account. You agree to notify us immediately of any unauthorized use of your account.
                  </p>
                </div>
                <div>
                  <p className="font-bold text-foreground mb-1">Prohibited Conduct:</p>
                  <p>You agree not to:</p>
                  <ul className="list-disc pl-5 mt-1 space-y-1 text-sm">
                    <li>Use the Service for unlawful purposes or violating any applicable laws</li>
                    <li>Harass, abuse, threaten, or intimidate other users or barbers</li>
                    <li>Post false, misleading, or defamatory information</li>
                    <li>Attempt unauthorized access to our systems or networks</li>
                    <li>Interfere with or disrupt the Service's operation</li>
                    <li>Upload malware, viruses, or harmful code</li>
                    <li>Engage in phishing, fraud, or deceptive practices</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border shadow-sm mb-6">
            <CardHeader>
              <CardTitle className="font-serif">3. Booking & Appointment Policies</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
              <div className="text-sm space-y-3">
                <div>
                  <p className="font-bold text-foreground mb-1">Booking Confirmation:</p>
                  <p>
                    When you book an appointment, you enter into a contractual agreement with the barber shop. The booking is confirmed 
                    once you receive a confirmation email and SMS from the shop. The barber shop reserves the right to accept or decline 
                    any booking.
                  </p>
                </div>
                <div>
                  <p className="font-bold text-foreground mb-1">Cancellation & Refunds:</p>
                  <ul className="list-disc pl-5 mt-1 space-y-1">
                    <li><strong>24+ Hours Before:</strong> Free cancellation with full refund to original payment method</li>
                    <li><strong>12-24 Hours Before:</strong> 50% cancellation fee retained by the shop</li>
                    <li><strong>Less than 12 Hours:</strong> 100% cancellation fee; no refund issued</li>
                    <li><strong>No-Show:</strong> Full charge applied; no refund</li>
                  </ul>
                </div>
                <div>
                  <p className="font-bold text-foreground mb-1">Rescheduling:</p>
                  <p>
                    You may reschedule appointments up to 24 hours before your appointment time. Rescheduled appointments are subject to 
                    availability and barber approval.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border shadow-sm mb-6">
            <CardHeader>
              <CardTitle className="font-serif">4. Payment & Pricing</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
              <div className="text-sm space-y-3">
                <div>
                  <p className="font-bold text-foreground mb-1">Pricing:</p>
                  <p>
                    All prices displayed on the Service are in USD and include applicable taxes. Barber shops reserve the right to 
                    adjust pricing with 7 days' notice.
                  </p>
                </div>
                <div>
                  <p className="font-bold text-foreground mb-1">Payment Processing:</p>
                  <p>
                    Payments are processed securely through third-party payment processors (Stripe, Square). We do not store your 
                    credit card information. By providing payment information, you authorize the processor to charge your account.
                  </p>
                </div>
                <div>
                  <p className="font-bold text-foreground mb-1">Failed Payments:</p>
                  <p>
                    If a payment fails, we will notify you. Repeated failed payments may result in account suspension.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border shadow-sm mb-6">
            <CardHeader>
              <CardTitle className="font-serif">5. Reviews & Ratings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
              <div className="text-sm space-y-3">
                <div>
                  <p className="font-bold text-foreground mb-1">Review Submissions:</p>
                  <p>
                    You may only submit reviews for services you have personally experienced. Reviews must be truthful, respectful, 
                    and based on genuine experiences.
                  </p>
                </div>
                <div>
                  <p className="font-bold text-foreground mb-1">Prohibited Review Content:</p>
                  <p>
                    Reviews containing profanity, hate speech, false information, spam, or personal attacks may be removed at our discretion.
                  </p>
                </div>
                <div>
                  <p className="font-bold text-foreground mb-1">Rights to Reviews:</p>
                  <p>
                    By submitting a review, you grant Trim & Tone a perpetual, royalty-free license to publish, reproduce, and 
                    distribute your review.
                  </p>
                </div>
                <div>
                  <p className="font-bold text-foreground mb-1">Review Disputes:</p>
                  <p>
                    If a barber disputes a review, we will investigate within 5 business days. False reviews may result in account suspension.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border shadow-sm mb-6">
            <CardHeader>
              <CardTitle className="font-serif">6. Barber Partner Terms</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
              <div className="text-sm space-y-3">
                <div>
                  <p className="font-bold text-foreground mb-1">Shop Verification:</p>
                  <p>
                    All barber shops must undergo verification and admin approval before accepting bookings. We verify licenses, 
                    certifications, and business legitimacy.
                  </p>
                </div>
                <div>
                  <p className="font-bold text-foreground mb-1">Commission & Fees:</p>
                  <p>
                    Trim & Tone retains a 15% commission on each booking. Payment is transferred to registered business accounts within 5-7 business days.
                  </p>
                </div>
                <div>
                  <p className="font-bold text-foreground mb-1">Service Standards:</p>
                  <p>
                    Barbers agree to provide the described services at agreed-upon prices and times. Failure to deliver may result in negative reviews and penalties.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border shadow-sm mb-6">
            <CardHeader>
              <CardTitle className="font-serif">7. Disclaimer of Warranties & Limitation of Liability</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
              <div className="text-sm space-y-3">
                <p className="font-bold text-foreground">AS-IS BASIS:</p>
                <p>
                  The Service is provided on an "AS IS" and "AS AVAILABLE" basis without warranties of any kind, either express or implied.
                </p>
                <p className="font-bold text-foreground">DISCLAIMER:</p>
                <p>
                  Trim & Tone disclaims all warranties including merchantability, fitness for a particular purpose, non-infringement, 
                  and title.
                </p>
                <p className="font-bold text-foreground">LIABILITY LIMITATION:</p>
                <p>
                  In no event shall Trim & Tone be liable for indirect, incidental, special, or consequential damages arising from your 
                  use of the Service, even if advised of the possibility of such damages. Our total liability shall not exceed the amount 
                  you paid in the last 12 months.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="border shadow-sm mb-6">
            <CardHeader>
              <CardTitle className="font-serif">8. Intellectual Property Rights</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
              <div className="text-sm space-y-3">
                <p>
                  All content on the Service, including text, graphics, logos, images, and software, is the property of Trim & Tone or 
                  its content suppliers and is protected by U.S. and international copyright laws.
                </p>
                <p>
                  You may not reproduce, distribute, modify, or transmit any content without express written permission. "Trim & Tone" 
                  and associated logos are registered trademarks.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="border shadow-sm mb-6">
            <CardHeader>
              <CardTitle className="font-serif">9. Modifications & Updates</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
              <div className="text-sm space-y-3">
                <p>
                  Trim & Tone reserves the right to modify these Terms at any time. We will notify users of significant changes via email 
                  or in-app notification. Your continued use of the Service after modifications constitutes acceptance of the updated Terms.
                </p>
                <p>
                  We may also update, suspend, or discontinue the Service or any features with or without notice. We are not liable for 
                  any loss resulting from such changes.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="border shadow-sm mb-6">
            <CardHeader>
              <CardTitle className="font-serif">10. Governing Law & Dispute Resolution</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
              <div className="text-sm space-y-3">
                <p>
                  <strong>Governing Law:</strong> These Terms are governed by the laws of the State of New York, without regard to 
                  conflict of law principles.
                </p>
                <p>
                  <strong>Jurisdiction:</strong> Both parties consent to the exclusive jurisdiction of the courts located in New York County, 
                  New York.
                </p>
                <p>
                  <strong>Dispute Resolution:</strong> Before pursuing legal action, both parties agree to attempt resolution through 
                  good-faith negotiation. If unresolved within 30 days, either party may pursue binding arbitration.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="border shadow-sm mb-6">
            <CardHeader>
              <CardTitle className="font-serif">11. Account Termination</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
              <div className="text-sm space-y-3">
                <p className="font-bold text-foreground">Trim & Tone may terminate or suspend your account if you:</p>
                <ul className="list-disc pl-5 mt-2 space-y-1">
                  <li>Violate these Terms</li>
                  <li>Engage in fraudulent, illegal, or harmful activity</li>
                  <li>Post abusive, defamatory, or inappropriate content</li>
                  <li>Have multiple failed payments</li>
                  <li>Violate local laws or regulations</li>
                </ul>
                <p className="mt-3">
                  Upon termination, your right to use the Service immediately ceases. We will not refund fees for prepaid services 
                  unless required by law.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="border shadow-sm mb-8">
            <CardHeader>
              <CardTitle className="font-serif">12. Contact & Support</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
              <p className="text-sm">
                For questions about these Terms of Service or to report violations, please contact:
              </p>
              <p className="text-sm mt-4">
                <strong>Legal Department:</strong> legal@trimandtone.com<br/>
                <strong>Customer Support:</strong> support@trimandtone.com<br/>
                <strong>Mailing Address:</strong> Trim & Tone Inc., 547 Market Street, Metro City, NY 10001<br/>
                <strong>Phone:</strong> (555) 123-4567<br/>
                <strong>Support Hours:</strong> Monday - Friday, 9:00 AM - 6:00 PM EST
              </p>
              <p className="text-sm mt-4">
                We aim to respond to all inquiries within 2 business days.
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
