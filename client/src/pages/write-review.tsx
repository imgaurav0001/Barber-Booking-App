import Layout from "@/components/layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Star } from "lucide-react";
import { useStore } from "@/lib/store";
import { useLocation } from "wouter";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export default function WriteReview() {
  const { shops } = useStore();
  const { toast } = useToast();
  const [, setLocation] = useLocation();
  const [rating, setRating] = useState(5);
  const [selectedShop, setSelectedShop] = useState("");
  const [reviewText, setReviewText] = useState("");

  const activeShops = shops.filter(s => s.status === 'active');

  const handleSubmit = () => {
    if (!selectedShop || !reviewText.trim()) {
      toast({ variant: "destructive", title: "Please select a shop and write a review" });
      return;
    }

    toast({
      title: "Review Submitted!",
      description: "Thank you for sharing your experience. Your review helps others find great barbers.",
    });

    setSelectedShop("");
    setReviewText("");
    setRating(5);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-serif font-bold mb-2">Share Your Experience</h1>
            <p className="text-muted-foreground">Help other customers find amazing barbers by sharing your feedback</p>
          </div>

          {activeShops.length === 0 ? (
            <Card className="border shadow-sm">
              <CardContent className="py-16 text-center">
                <p className="text-muted-foreground mb-4">No shops available at the moment.</p>
                <Button onClick={() => setLocation("/")} variant="outline">
                  Back to Home
                </Button>
              </CardContent>
            </Card>
          ) : (
            <Card className="border shadow-sm">
              <CardHeader>
                <CardTitle className="font-serif">Write Your Review</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label className="mb-2 block">Select a Shop</Label>
                  <Select value={selectedShop} onValueChange={setSelectedShop}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose a shop to review..." />
                    </SelectTrigger>
                    <SelectContent>
                      {activeShops && activeShops.length > 0 ? (
                        activeShops.map((shop) => (
                          <SelectItem key={shop.id} value={shop.id} data-testid={`review-shop-${shop.id}`}>
                            {shop.name}
                          </SelectItem>
                        ))
                      ) : (
                        <SelectItem value="" disabled>No shops available</SelectItem>
                      )}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="mb-3 block">Rating</Label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        onClick={() => setRating(star)}
                        className="transition-all hover:scale-110"
                      >
                        <Star
                          className={`h-8 w-8 ${
                            star <= rating
                              ? "fill-accent text-accent"
                              : "text-muted"
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <Label className="mb-2 block">Your Review</Label>
                  <Textarea
                    placeholder="Share your experience... What did you like? How was the service?"
                    rows={6}
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                  />
                </div>

                <Button onClick={handleSubmit} className="w-full bg-primary hover:bg-primary/90">
                  Submit Review
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </Layout>
  );
}
