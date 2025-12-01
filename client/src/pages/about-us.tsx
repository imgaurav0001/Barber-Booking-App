import Layout from "@/components/layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";

export default function AboutUs() {
  const [, setLocation] = useLocation();

  return (
    <Layout>
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto space-y-8">
          {/* Header */}
          <div className="text-center space-y-4 mb-12">
            <h1 className="text-4xl md:text-5xl font-serif font-bold">About Trim & Tone</h1>
            <p className="text-lg text-muted-foreground">
              Connecting customers with the best barbers in the city since 2024
            </p>
          </div>

          {/* Mission Card */}
          <Card className="border shadow-sm">
            <CardHeader>
              <CardTitle className="font-serif">Our Mission</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
              <p>
                Trim & Tone is dedicated to elevating the grooming experience. We believe that finding the perfect barber 
                should be easy, convenient, and confidence-inspiring. Our platform connects customers with skilled barbers 
                who are passionate about their craft.
              </p>
            </CardContent>
          </Card>

          {/* What We Do Card */}
          <Card className="border shadow-sm">
            <CardHeader>
              <CardTitle className="font-serif">What We Do</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
              <p>
                <strong>For Customers:</strong> Discover top-rated barber shops, book appointments seamlessly, and share 
                your experience through honest reviews.
              </p>
              <p>
                <strong>For Barbers:</strong> Manage your shop, connect with customers, and grow your business with our 
                easy-to-use platform.
              </p>
            </CardContent>
          </Card>

          {/* Why Choose Us Card */}
          <Card className="border shadow-sm">
            <CardHeader>
              <CardTitle className="font-serif">Why Choose Trim & Tone?</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex gap-3">
                  <span className="text-primary font-bold">✓</span>
                  <span><strong>Easy Booking:</strong> 24/7 online appointment scheduling</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold">✓</span>
                  <span><strong>Trusted Reviews:</strong> Real feedback from real customers</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold">✓</span>
                  <span><strong>Quality Barbers:</strong> Verified and professional service providers</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold">✓</span>
                  <span><strong>Community:</strong> Support local barber shops and artisans</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* CTA */}
          <div className="text-center pt-8">
            <Button size="lg" onClick={() => setLocation("/")} className="bg-primary hover:bg-primary/90">
              Start Booking Now
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
