import Layout from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { User, Check, X, Plus, Store, Calendar, TrendingUp, AlertCircle } from "lucide-react";
import { useStore } from "@/lib/store";
import { format } from "date-fns";
import { useLocation } from "wouter";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import barberImage from "@assets/stock_images/stylish_man_with_bea_415100fd.jpg";

const shopSchema = z.object({
  name: z.string().min(2, "Shop name is required"),
  barberName: z.string().min(2, "Your name is required"),
  location: z.string().min(5, "Location is required"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  serviceName: z.string().min(2, "Service name is required"),
  servicePrice: z.string().min(1, "Price is required"),
  serviceDuration: z.string().min(1, "Duration is required"),
});

export default function BarberDashboard() {
  const { user, getBarberShop, getShopBookings, updateAppointmentStatus, addShop, barberProfile, updateBarberProfile } = useStore();
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [isCreatingShop, setIsCreatingShop] = useState(false);

  useEffect(() => {
    if (!user) {
      setLocation('/auth');
      return;
    }
    if (user.role !== 'barber') {
      setLocation('/');
    }
  }, [user, setLocation]);

  const shopForm = useForm<z.infer<typeof shopSchema>>({
    resolver: zodResolver(shopSchema),
    defaultValues: {
      name: "",
      barberName: user?.name || "",
      location: "",
      description: "",
      serviceName: "Standard Cut",
      servicePrice: "$30",
      serviceDuration: "30 min",
    }
  });

  if (!user) return null;

  const myShop = getBarberShop(user.id);
  const bookings = myShop ? getShopBookings(myShop.id) : [];
  
  // Get today's bookings
  const today = new Date().toDateString();
  const todaysBookings = bookings.filter(b => new Date(b.date).toDateString() === today);
  const totalBookings = bookings.length;
  const shopRating = myShop?.rating || 0;

  function onCreateShop(values: z.infer<typeof shopSchema>) {
    addShop({
      name: values.name,
      location: values.location,
      description: values.description,
      ownerId: user!.id,
      ownerName: values.barberName,
      tags: ["New"],
      services: [{
        name: values.serviceName,
        price: values.servicePrice,
        duration: values.serviceDuration,
        description: "Standard service"
      }]
    });
    setIsCreatingShop(false);
    toast({
      title: "Shop Created!",
      description: "Your shop is now pending approval from the admin.",
    });
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-serif font-bold">Barber Dashboard</h1>
            <p className="text-muted-foreground">Manage your business, bookings, and profile.</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <Card className="h-fit lg:col-span-1">
            <CardContent className="pt-6 text-center">
              <div className="relative inline-block mb-4">
                <Avatar className="h-24 w-24 mx-auto border-4 border-background shadow-lg">
                  <AvatarImage src={barberImage} />
                  <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="absolute bottom-0 right-0 bg-green-500 h-4 w-4 rounded-full border-2 border-white"></div>
              </div>
              <h2 className="text-xl font-bold">{barberProfile.firstName} {barberProfile.lastName}</h2>
              <p className="text-muted-foreground text-sm">Master Barber</p>
              
              {myShop && (
                <div className="mt-4 p-3 bg-secondary/30 rounded-lg text-left">
                    <div className="flex items-center gap-2 mb-1">
                        <Store className="h-4 w-4 text-primary" />
                        <span className="font-bold text-sm">{myShop.name}</span>
                    </div>
                    <Badge variant={myShop.status === 'active' ? 'default' : 'secondary'} className="text-xs">
                        {myShop.status === 'active' ? 'Live' : 'Pending Approval'}
                    </Badge>
                </div>
              )}

              <div className="mt-6 space-y-2 text-left">
                <div className="flex items-center justify-between p-2 bg-secondary/50 rounded-md">
                  <span className="text-sm font-medium">Availability</span>
                  <Switch defaultChecked />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {!myShop && !isCreatingShop ? (
                <Card className="border-dashed border-2">
                    <CardContent className="flex flex-col items-center justify-center py-16 text-center">
                        <Store className="h-16 w-16 text-muted-foreground mb-4 opacity-50" />
                        <h2 className="text-2xl font-bold mb-2">You haven't listed a shop yet</h2>
                        <p className="text-muted-foreground max-w-md mb-6">
                            Create your shop profile to start accepting bookings from customers.
                        </p>
                        <Button onClick={() => setIsCreatingShop(true)} size="lg">
                            <Plus className="mr-2 h-4 w-4" />
                            Create Shop
                        </Button>
                    </CardContent>
                </Card>
            ) : isCreatingShop ? (
                <Card>
                    <CardHeader>
                        <CardTitle>Create Your Shop</CardTitle>
                        <CardDescription>Fill in the details to list your business on the marketplace.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Form {...shopForm}>
                            <form onSubmit={shopForm.handleSubmit(onCreateShop)} className="space-y-4">
                                <div className="grid md:grid-cols-2 gap-4">
                                    <FormField
                                        control={shopForm.control}
                                        name="name"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Shop Name</FormLabel>
                                                <FormControl><Input placeholder="e.g. The Fade Master" {...field} /></FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={shopForm.control}
                                        name="barberName"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Your Name (Barber)</FormLabel>
                                                <FormControl><Input placeholder="Your full name" {...field} /></FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <FormField
                                    control={shopForm.control}
                                    name="location"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Location</FormLabel>
                                            <FormControl><Input placeholder="e.g. Downtown, NY" {...field} /></FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={shopForm.control}
                                    name="description"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Description</FormLabel>
                                            <FormControl><Textarea placeholder="Tell us about your shop..." {...field} /></FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                
                                <div className="pt-4 border-t">
                                    <h4 className="font-bold mb-4">Add Your Main Service</h4>
                                    <div className="grid md:grid-cols-3 gap-4">
                                        <FormField
                                            control={shopForm.control}
                                            name="serviceName"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Service Name</FormLabel>
                                                    <FormControl><Input placeholder="e.g. Classic Cut" {...field} /></FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={shopForm.control}
                                            name="servicePrice"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Price</FormLabel>
                                                    <FormControl><Input placeholder="e.g. $30" {...field} /></FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={shopForm.control}
                                            name="serviceDuration"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Duration</FormLabel>
                                                    <FormControl><Input placeholder="e.g. 30 min" {...field} /></FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                </div>

                                <div className="flex justify-end gap-4 pt-4">
                                    <Button variant="outline" type="button" onClick={() => setIsCreatingShop(false)}>Cancel</Button>
                                    <Button type="submit">Submit Shop</Button>
                                </div>
                            </form>
                        </Form>
                    </CardContent>
                </Card>
            ) : (
                <>
                {/* Stats Overview */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                  <Card>
                    <CardContent className="pt-6">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-primary">{todaysBookings.length}</div>
                        <p className="text-sm text-muted-foreground mt-1">Today's Bookings</p>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-primary">{totalBookings}</div>
                        <p className="text-sm text-muted-foreground mt-1">Total Bookings</p>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6">
                      <div className="text-center">
                        <div className="text-sm font-semibold text-primary flex justify-center gap-1">
                          {myShop?.status === 'active' ? <span className="text-green-600">✓ Approved</span> : <span className="text-yellow-600">⏳ Pending</span>}
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">Shop Status</p>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-primary">{shopRating.toFixed(1)}</div>
                        <p className="text-sm text-muted-foreground mt-1">Rating</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Quick Actions */}
                <div className="mb-8">
                  <h3 className="font-bold text-lg mb-4">Quick Actions</h3>
                  <div className="grid grid-cols-3 gap-3">
                    <Button variant="outline" className="flex flex-col items-center justify-center h-20">
                      <Calendar className="h-5 w-5 mb-1" />
                      <span className="text-xs">View Schedule</span>
                    </Button>
                    <Button variant="outline" className="flex flex-col items-center justify-center h-20">
                      <TrendingUp className="h-5 w-5 mb-1" />
                      <span className="text-xs">Manage Services</span>
                    </Button>
                    <Button variant="outline" className="flex flex-col items-center justify-center h-20">
                      <User className="h-5 w-5 mb-1" />
                      <span className="text-xs">Profile Settings</span>
                    </Button>
                  </div>
                </div>

                {/* Today's Appointments */}
                <Tabs defaultValue="today">
                <TabsList className="mb-6">
                    <TabsTrigger value="today">Today's Appointments</TabsTrigger>
                    <TabsTrigger value="all">All Bookings</TabsTrigger>
                </TabsList>

                <TabsContent value="today" className="space-y-4">
                    <h3 className="font-bold text-lg mb-4">Today's Appointments</h3>
                    {todaysBookings.length === 0 ? (
                    <Card>
                      <CardContent className="py-8 text-center text-muted-foreground">
                        <Calendar className="h-12 w-12 mx-auto mb-2 opacity-30" />
                        <p>No appointments today</p>
                      </CardContent>
                    </Card>
                    ) : (
                    todaysBookings.map((appt) => (
                        <Card key={appt.id} className="hover:shadow-md transition-shadow">
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <h4 className="font-bold">{appt.customerName}</h4>
                                <Badge variant={appt.status === 'confirmed' ? 'default' : appt.status === 'pending' ? 'secondary' : 'destructive'}>
                                  {appt.status}
                                </Badge>
                              </div>
                              <p className="text-sm text-muted-foreground">{appt.serviceName} • {appt.price}</p>
                              <p className="text-sm font-medium mt-1">{format(new Date(appt.date), "h:mm a")}</p>
                            </div>
                            {appt.status === 'pending' && (
                              <div className="flex gap-2">
                                <Button size="sm" onClick={() => updateAppointmentStatus(appt.id, 'confirmed')} className="bg-green-600 hover:bg-green-700">
                                  <Check className="h-4 w-4" />
                                </Button>
                                <Button size="sm" variant="destructive" onClick={() => updateAppointmentStatus(appt.id, 'rejected')}>
                                  <X className="h-4 w-4" />
                                </Button>
                              </div>
                            )}
                          </div>
                        </CardContent>
                        </Card>
                    ))
                    )}
                </TabsContent>

                <TabsContent value="all" className="space-y-4">
                    <h3 className="font-bold text-lg mb-4">All Bookings</h3>
                    {bookings.length === 0 ? (
                    <p className="text-muted-foreground">No bookings yet.</p>
                    ) : (
                    bookings.map((appt) => (
                        <Card key={appt.id} className="hover:shadow-md transition-shadow">
                        <CardContent className="p-4 flex items-center justify-between">
                            <div className="flex items-center gap-4">
                            <div className="bg-primary/10 p-3 rounded-full text-primary">
                                <User className="h-5 w-5" />
                            </div>
                            <div>
                                <p className="font-bold">{appt.customerName}</p>
                                <p className="text-sm text-muted-foreground">{appt.serviceName} • {appt.price}</p>
                            </div>
                            </div>
                            <div className="flex items-center gap-6">
                                <div className="text-right mr-4">
                                    <p className="font-bold">
                                        {format(new Date(appt.date), "MMM d")}, {appt.time}
                                    </p>
                                    <Badge variant="outline" className={`mt-1 ${
                                        appt.status === 'confirmed' ? 'bg-green-50 text-green-700 border-green-200' : 
                                        appt.status === 'pending' ? 'bg-yellow-50 text-yellow-700 border-yellow-200' : ''
                                    }`}>
                                        {appt.status}
                                    </Badge>
                                </div>
                                {appt.status === 'pending' && (
                                    <div className="flex gap-2">
                                        <Button size="sm" onClick={() => updateAppointmentStatus(appt.id, 'confirmed')} className="bg-green-600 hover:bg-green-700">
                                            <Check className="h-4 w-4 mr-1" /> Approve
                                        </Button>
                                        <Button size="sm" variant="destructive" onClick={() => updateAppointmentStatus(appt.id, 'rejected')}>
                                            <X className="h-4 w-4 mr-1" /> Reject
                                        </Button>
                                    </div>
                                )}
                            </div>
                        </CardContent>
                        </Card>
                    ))
                    )}
                </TabsContent>

                <TabsContent value="shop">
                    <Card>
                    <CardHeader>
                        <CardTitle>Shop Details</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <Label>Shop Name</Label>
                                    <Input value={myShop?.name || ''} readOnly />
                                </div>
                                <div>
                                    <Label>Location</Label>
                                    <Input value={myShop?.location || ''} readOnly />
                                </div>
                            </div>
                            <div>
                                <Label>Description</Label>
                                <Textarea value={myShop?.description || ""} readOnly />
                            </div>
                            <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-md text-yellow-800 text-sm">
                                To edit shop details, please contact support.
                            </div>
                        </div>
                    </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="profile">
                    <Card>
                    <CardHeader>
                        <CardTitle>Edit Profile</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>First Name</Label>
                            <Input 
                            value={barberProfile.firstName} 
                            onChange={(e) => updateBarberProfile({ firstName: e.target.value })}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Last Name</Label>
                            <Input 
                            value={barberProfile.lastName} 
                            onChange={(e) => updateBarberProfile({ lastName: e.target.value })}
                            />
                        </div>
                        </div>
                        <div className="space-y-2">
                        <Label>Bio</Label>
                        <Input 
                            value={barberProfile.bio} 
                            onChange={(e) => updateBarberProfile({ bio: e.target.value })}
                        />
                        </div>
                        <div className="space-y-2">
                        <Label>Specialties (comma separated)</Label>
                        <Input 
                            value={barberProfile.specialties} 
                            onChange={(e) => updateBarberProfile({ specialties: e.target.value })}
                        />
                        </div>
                        <Button className="mt-4">Save Changes</Button>
                    </CardContent>
                    </Card>
                </TabsContent>
                </Tabs>
                </>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}