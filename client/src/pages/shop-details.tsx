import { useState } from "react";
import { useParams } from "wouter";
import { Star, MapPin, Clock, Phone, Share2, Heart } from "lucide-react";
import Layout from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import BarberCard from "@/components/barber-card";
import BookingModal from "@/components/booking-modal";
import { useStore } from "@/lib/store";
import barberImage from "@assets/stock_images/stylish_man_with_bea_415100fd.jpg";
import barberImage2 from "@assets/stock_images/modern_barber_shop_i_89b52aca.jpg";

const SERVICES = [
  { id: 1, name: "Classic Haircut", price: "$35", duration: "45 min" },
  { id: 2, name: "Beard Trim & Shape", price: "$25", duration: "30 min" },
  { id: 3, name: "Full Service (Cut & Shave)", price: "$55", duration: "75 min" },
  { id: 4, name: "Hot Towel Shave", price: "$30", duration: "30 min" },
];

const REVIEWS = [
  { id: 1, user: "Alex M.", rating: 5, date: "2 days ago", text: "Best cut I've had in years. The attention to detail is unmatched." },
  { id: 2, user: "Jordan K.", rating: 4, date: "1 week ago", text: "Great vibe and professional service. Highly recommend!" },
];

export default function ShopDetails() {
  const params = useParams();
  const { shops } = useStore();
  const shop = shops.find(s => s.id === params.id);

  const [activeTab, setActiveTab] = useState("services");
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  const handleBook = () => {
    setIsBookingOpen(true);
  };

  if (!shop) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-4xl font-serif mb-4">Shop Not Found</h1>
          <p className="text-muted-foreground">The shop you are looking for does not exist or has been removed.</p>
          <Button className="mt-8" onClick={() => window.history.back()}>Go Back</Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Header Image */}
      <div className="h-[300px] md:h-[400px] relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent z-10" />
        <img src={shop.image} alt="Shop Interior" className="w-full h-full object-cover" />
        
        <div className="absolute bottom-0 left-0 right-0 z-20 container mx-auto px-4 pb-8">
          <div className="flex flex-col md:flex-row justify-between items-end gap-4">
            <div className="space-y-2">
              <Badge className="bg-accent text-accent-foreground hover:bg-accent/90">
                {shop.isOpen ? "Open Now" : "Closed"}
              </Badge>
              <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground">{shop.name}</h1>
              <div className="flex items-center gap-4 text-muted-foreground text-sm md:text-base">
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  <span>{shop.location}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-accent text-accent" />
                  <span className="font-medium text-foreground">{shop.rating}</span>
                  <span>({shop.reviews} reviews)</span>
                </div>
              </div>
            </div>
            
            <div className="flex gap-2">
              <Button variant="secondary" size="icon" className="rounded-full">
                <Share2 className="h-4 w-4" />
              </Button>
              <Button variant="secondary" size="icon" className="rounded-full">
                <Heart className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Left Content */}
          <div className="lg:col-span-2 space-y-8">
            

            {/* Tabs for Services/Reviews */}
            <Tabs defaultValue="services" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-8">
                <TabsTrigger value="services">Services</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
              </TabsList>
              
              <TabsContent value="services" className="space-y-4 animate-in slide-in-from-bottom-2">
                {SERVICES.map(service => (
                  <div key={service.id} className="flex items-center justify-between p-4 bg-card border rounded-lg hover:shadow-md transition-shadow group">
                    <div>
                      <h3 className="font-bold text-lg">{service.name}</h3>
                      <p className="text-sm text-muted-foreground">{service.duration}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="font-bold text-lg">{service.price}</span>
                      <Button 
                        onClick={handleBook}
                      >
                        Book
                      </Button>
                    </div>
                  </div>
                ))}
              </TabsContent>
              
              <TabsContent value="reviews" className="space-y-4">
                {REVIEWS.map(review => (
                  <div key={review.id} className="p-6 bg-card border rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback>{review.user.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <span className="font-semibold">{review.user}</span>
                      </div>
                      <span className="text-xs text-muted-foreground">{review.date}</span>
                    </div>
                    <div className="flex gap-0.5 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`h-3 w-3 ${i < review.rating ? "fill-accent text-accent" : "text-muted"}`} />
                      ))}
                    </div>
                    <p className="text-sm text-muted-foreground">{review.text}</p>
                  </div>
                ))}
              </TabsContent>
            </Tabs>
          </div>

          {/* Right Sidebar - Info */}
          <div className="space-y-6">
            <div className="p-6 bg-card border rounded-xl shadow-sm sticky top-24">
              <h3 className="font-bold font-serif text-xl mb-4">Shop Info</h3>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Clock className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="font-medium">Opening Hours</p>
                    <p className="text-sm text-muted-foreground">Mon-Fri: 9:00 AM - 8:00 PM</p>
                    <p className="text-sm text-muted-foreground">Sat: 10:00 AM - 6:00 PM</p>
                    <p className="text-sm text-muted-foreground">Sun: Closed</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Phone className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="font-medium">Contact</p>
                    <p className="text-sm text-muted-foreground">(555) 123-4567</p>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <p className="text-xs text-muted-foreground mb-4">
                    Cancellation policy: Please cancel at least 24 hours in advance to avoid a fee.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <BookingModal 
        isOpen={isBookingOpen} 
        onClose={() => setIsBookingOpen(false)}
        shopId={shop.id}
        shopName={shop.name}
        services={shop.services || SERVICES.map(s => ({ name: s.name, price: s.price, duration: s.duration, description: s.name }))}
      />
    </Layout>
  );
}