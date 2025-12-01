import { Star, MapPin, Clock } from "lucide-react";
import { Link } from "wouter";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Service } from "@/lib/store";

interface ShopProps {
  id: string;
  name: string;
  image: string;
  rating: number;
  reviews: number;
  location: string;
  tags: string[];
  isOpen?: boolean;
  services?: Service[];
  ownerId?: string;
  ownerName?: string;
}

export default function ShopCard({ shop }: { shop: ShopProps }) {
  return (
    <Card className="group overflow-hidden border-none shadow-md hover:shadow-xl transition-all duration-300">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={shop.image} 
          alt={shop.name} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute top-3 right-3">
          <Badge variant={shop.isOpen ? "default" : "secondary"} className={shop.isOpen ? "bg-green-600 hover:bg-green-700" : ""}>
            {shop.isOpen ? "Open Now" : "Closed"}
          </Badge>
        </div>
      </div>
      
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-xl font-bold font-serif text-foreground">{shop.name}</h3>
            <div className="flex items-center gap-1 text-muted-foreground text-sm mt-1">
              <MapPin className="h-3.5 w-3.5" />
              <span>{shop.location}</span>
            </div>
          </div>
          <div className="flex flex-col items-end">
            <div className="flex items-center gap-1 bg-secondary/50 px-2 py-1 rounded-md">
              <Star className="h-3.5 w-3.5 fill-accent text-accent" />
              <span className="font-medium text-sm">{shop.rating}</span>
            </div>
            <span className="text-xs text-muted-foreground mt-1">({shop.reviews})</span>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pb-4">
        <div className="flex flex-wrap gap-2">
          {shop.tags.map(tag => (
            <Badge key={tag} variant="outline" className="text-xs font-normal bg-secondary/20 border-secondary">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
      
      <CardFooter className="pt-0">
        <Link href={`/shop/${shop.id}`} className="w-full">
          <Button className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
            Book Appointment
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}