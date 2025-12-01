import Layout from "@/components/layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Phone, Mail, MapPin } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export default function ContactUs() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      toast({ variant: "destructive", title: "Please fill all fields" });
      return;
    }
    toast({
      title: "Message Sent!",
      description: "Thank you for contacting us. We'll get back to you soon.",
    });
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto space-y-12">
          {/* Header */}
          <div className="text-center space-y-4 mb-12">
            <h1 className="text-4xl md:text-5xl font-serif font-bold">Contact Us</h1>
            <p className="text-lg text-muted-foreground">
              Have questions? We'd love to hear from you. Get in touch with our team.
            </p>
          </div>

          {/* Contact Info Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <Card className="border shadow-sm text-center">
              <CardContent className="pt-6">
                <Mail className="h-8 w-8 text-primary mx-auto mb-3" />
                <h3 className="font-bold mb-2">Email</h3>
                <p className="text-sm text-muted-foreground">support@trimandtone.com</p>
              </CardContent>
            </Card>
            <Card className="border shadow-sm text-center">
              <CardContent className="pt-6">
                <Phone className="h-8 w-8 text-primary mx-auto mb-3" />
                <h3 className="font-bold mb-2">Phone</h3>
                <p className="text-sm text-muted-foreground">(555) 123-4567</p>
              </CardContent>
            </Card>
            <Card className="border shadow-sm text-center">
              <CardContent className="pt-6">
                <MapPin className="h-8 w-8 text-primary mx-auto mb-3" />
                <h3 className="font-bold mb-2">Location</h3>
                <p className="text-sm text-muted-foreground">Metro City, USA</p>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <Card className="border shadow-sm">
            <CardHeader>
              <CardTitle className="font-serif">Send us a Message</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label>Name</Label>
                  <Input 
                    placeholder="Your name" 
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>
                <div>
                  <Label>Email</Label>
                  <Input 
                    type="email"
                    placeholder="your@email.com" 
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                </div>
                <div>
                  <Label>Message</Label>
                  <Textarea 
                    placeholder="Tell us how we can help..." 
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                  />
                </div>
                <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* FAQ Section */}
          <div className="space-y-4">
            <h2 className="text-2xl font-serif font-bold">Frequently Asked Questions</h2>
            <Card className="border shadow-sm">
              <CardContent className="pt-6 space-y-4">
                <div>
                  <h4 className="font-bold mb-1">How do I book an appointment?</h4>
                  <p className="text-sm text-muted-foreground">Browse shops, select a barber, choose your service, and book your preferred time slot.</p>
                </div>
                <hr />
                <div>
                  <h4 className="font-bold mb-1">Can I cancel my appointment?</h4>
                  <p className="text-sm text-muted-foreground">Yes, you can cancel up to 24 hours before your appointment without any fees.</p>
                </div>
                <hr />
                <div>
                  <h4 className="font-bold mb-1">How do I become a barber partner?</h4>
                  <p className="text-sm text-muted-foreground">Sign up as a barber, create your shop profile, and wait for admin approval to start accepting bookings.</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
}
