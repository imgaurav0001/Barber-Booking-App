import { useState } from "react";
import { Search, Filter, Scissors, Star } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Layout from "@/components/layout";
import ShopCard from "@/components/shop-card";
import bannerImage from "@assets/stock_images/modern_barber_shop_i_426d734a.jpg";
import { useStore } from "@/lib/store";

export default function Home() {
  const { searchShops } = useStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [locationFilter, setLocationFilter] = useState("all");

  const filteredShops = searchShops(searchQuery, locationFilter);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-black/50 z-10" />
        <img 
          src={bannerImage} 
          alt="Barber Shop Interior" 
          className="absolute inset-0 w-full h-full object-cover z-0"
        />
        
        <div className="relative z-20 container mx-auto px-4 text-center text-white space-y-6 animate-in fade-in slide-in-from-bottom-10 duration-700">
          <h1 className="text-5xl md:text-7xl font-serif font-bold tracking-tight mb-4">
            Trim <span className="text-accent">&</span> Tone
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto text-white/90 font-light">
            Discover the finest barbers in your city. Book your next cut with confidence and style.
          </p>
          
          {/* Search Bar */}
          <div className="max-w-3xl mx-auto mt-8 p-2 bg-background/10 backdrop-blur-md rounded-xl border border-white/20 flex flex-col md:flex-row gap-2">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-white/70" />
              <Input 
                placeholder="Find a shop or service..." 
                className="pl-10 bg-white/10 border-transparent text-white placeholder:text-white/70 focus-visible:ring-accent h-12"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="w-full md:w-48">
              <Select value={locationFilter} onValueChange={setLocationFilter}>
                <SelectTrigger className="bg-white/10 border-transparent text-white h-12 focus:ring-accent">
                  <SelectValue placeholder="Location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Locations</SelectItem>
                  <SelectItem value="downtown">Downtown</SelectItem>
                  <SelectItem value="uptown">Uptown</SelectItem>
                  <SelectItem value="westside">Westside</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button size="lg" className="h-12 px-8 bg-accent hover:bg-accent/90 text-white font-semibold">
              Search
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Shops */}
      <section id="shops" className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-2 font-serif text-foreground">
                {searchQuery || locationFilter !== 'all' ? 'Search Results' : 'Featured Shops'}
              </h2>
              <p className="text-muted-foreground">
                {filteredShops.length} shops found near you
              </p>
            </div>
            <Button variant="outline" className="hidden md:flex items-center gap-2">
              View All <Filter className="h-4 w-4" />
            </Button>
          </div>

          {filteredShops.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredShops.map(shop => (
                <ShopCard key={shop.id} shop={shop} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-xl font-bold mb-2">No shops found</h3>
              <p className="text-muted-foreground">Try adjusting your search or filters.</p>
            </div>
          )}
          
          <div className="mt-8 text-center md:hidden">
            <Button variant="outline" className="w-full">View All Shops</Button>
          </div>
        </div>
      </section>

      {/* Value Props */}
      <section className="py-20 bg-secondary/30 border-y border-border">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-12 text-center">
            <div className="flex flex-col items-center space-y-4 p-6 rounded-2xl hover:bg-background transition-colors duration-300">
              <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-2">
                <Search className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold font-serif">Discover</h3>
              <p className="text-muted-foreground">Find the perfect barber for your style. Browse portfolios and read real reviews.</p>
            </div>
            <div className="flex flex-col items-center space-y-4 p-6 rounded-2xl hover:bg-background transition-colors duration-300">
              <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-2">
                <Scissors className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold font-serif">Book</h3>
              <p className="text-muted-foreground">Seamlessly book appointments 24/7. Choose your preferred barber and time.</p>
            </div>
            <div className="flex flex-col items-center space-y-4 p-6 rounded-2xl hover:bg-background transition-colors duration-300">
              <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-2">
                <Star className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold font-serif">Review</h3>
              <p className="text-muted-foreground">Share your experience and help others find top-quality grooming services.</p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}