import Layout from "@/components/layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Calendar, Clock, MapPin, Scissors, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useStore } from "@/lib/store";
import { useLocation } from "wouter";
import { useEffect } from "react";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";

export default function CustomerDashboard() {
  const { user, getCustomerBookings, updateAppointmentStatus } = useStore();
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  useEffect(() => {
    if (!user) {
      setLocation('/auth');
      return;
    }
    if (user.role !== 'customer') {
      setLocation('/');
    }
  }, [user, setLocation]);

  if (!user) return null;

  const bookings = getCustomerBookings(user.id);

  const handleCancelBooking = (bookingId: string) => {
    updateAppointmentStatus(bookingId, 'cancelled');
    toast({
      title: "Booking Cancelled",
      description: "Your appointment has been cancelled.",
    });
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar Profile */}
          <div className="w-full md:w-1/3 lg:w-1/4">
            <Card>
              <CardContent className="pt-6 flex flex-col items-center text-center">
                <Avatar className="h-24 w-24 mb-4 border-4 border-background shadow-md">
                  <AvatarFallback className="text-2xl bg-primary text-primary-foreground">
                    {user.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <h2 className="text-2xl font-bold font-serif">{user.name}</h2>
                <p className="text-muted-foreground">{user.email}</p>
                <Badge variant="outline" className="mt-2">Customer</Badge>
              </CardContent>
            </Card>
          </div>

          {/* Main Content - Bookings */}
          <div className="flex-1">
            <h1 className="text-3xl font-serif font-bold mb-6">My Bookings</h1>

            {bookings.length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-16 text-center text-muted-foreground">
                  <Calendar className="h-12 w-12 mb-4 opacity-20" />
                  <h3 className="text-lg font-medium text-foreground">No bookings yet</h3>
                  <p>You haven't made any appointments. Time for a fresh cut?</p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {bookings.map((booking) => (
                  <Card key={booking.id} className="overflow-hidden">
                    <div className="flex flex-col md:flex-row">
                      <div className="bg-secondary/30 p-6 flex flex-col justify-center items-center min-w-[120px] text-center border-b md:border-b-0 md:border-r">
                        <span className="text-3xl font-bold font-serif text-primary">
                          {format(new Date(booking.date), "d")}
                        </span>
                        <span className="text-sm font-medium uppercase text-muted-foreground">
                          {format(new Date(booking.date), "MMM")}
                        </span>
                        <span className="text-sm font-medium mt-1">
                          {booking.time}
                        </span>
                      </div>
                      <div className="flex-1 p-6 flex flex-col justify-between">
                        <div className="space-y-1 mb-4">
                          <div className="flex items-center gap-2">
                            <h3 className="text-xl font-bold">{booking.shopName}</h3>
                            <Badge 
                              variant={
                                booking.status === 'confirmed' ? 'default' : 
                                booking.status === 'pending' ? 'secondary' : 
                                booking.status === 'cancelled' ? 'destructive' : 'outline'
                              }
                              className={booking.status === 'confirmed' ? 'bg-green-600' : ''}
                            >
                              {booking.status}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-2 text-muted-foreground text-sm">
                            <Scissors className="h-3.5 w-3.5" />
                            <span>{booking.serviceName}</span>
                            <span className="mx-1">•</span>
                            <span>{booking.price}</span>
                          </div>
                          <div className="flex items-center gap-2 text-muted-foreground text-sm">
                             <MapPin className="h-3.5 w-3.5" /> 
                             <span>with {booking.barberName}</span>
                          </div>
                        </div>
                        {booking.status !== 'cancelled' && booking.status !== 'completed' && (
                          <Button 
                            variant="destructive" 
                            size="sm"
                            onClick={() => handleCancelBooking(booking.id)}
                            className="w-fit"
                          >
                            <Trash2 className="h-3.5 w-3.5 mr-1" />
                            Cancel Booking
                          </Button>
                        )}
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}