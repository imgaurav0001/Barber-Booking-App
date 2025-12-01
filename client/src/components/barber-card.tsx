import { Star, Scissors } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface BarberProps {
  id: string;
  name: string;
  role: string;
  image?: string;
  rating: number;
  specialties: string[];
  onSelect: () => void;
}

export default function BarberCard({ barber }: { barber: BarberProps }) {
  return (
    <Card className="border-none shadow-sm hover:shadow-md transition-shadow cursor-pointer" onClick={barber.onSelect}>
      <CardContent className="p-4 flex items-center gap-4">
        <Avatar className="h-16 w-16 border-2 border-background shadow-sm">
          <AvatarImage src={barber.image} />
          <AvatarFallback>{barber.name.charAt(0)}</AvatarFallback>
        </Avatar>
        
        <div className="flex-1">
          <h4 className="font-bold text-foreground">{barber.name}</h4>
          <p className="text-sm text-muted-foreground">{barber.role}</p>
          <div className="flex items-center gap-1 mt-1">
            <Star className="h-3 w-3 fill-accent text-accent" />
            <span className="text-xs font-medium">{barber.rating}</span>
          </div>
        </div>

        <Button size="sm" variant="outline" className="shrink-0 rounded-full h-8 w-8 p-0">
          <Scissors className="h-4 w-4" />
        </Button>
      </CardContent>
    </Card>
  );
}