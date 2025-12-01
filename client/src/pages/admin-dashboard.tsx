import Layout from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Check, X, Users, Store, Calendar, AlertCircle, Flag, Settings } from "lucide-react";
import { useStore } from "@/lib/store";
import { useLocation } from "wouter";
import { useEffect } from "react";

export default function AdminDashboard() {
  const { shops, appointments, approveShop, rejectShop, user } = useStore();
  const [, setLocation] = useLocation();

  useEffect(() => {
    // Strict check for the specific admin email
    if (!user || user.email !== 'admin123@gmail.com') {
      setLocation('/auth');
    }
  }, [user, setLocation]);

  if (!user || user.email !== 'admin123@gmail.com') return null;

  const pendingShops = shops.filter(s => s.status === 'pending');
  const activeShops = shops.filter(s => s.status === 'active');
  const totalBookings = appointments.length;

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-serif font-bold mb-2">Admin Dashboard</h1>
        <p className="text-muted-foreground mb-8">Manage users, shops, and content moderation</p>

        {/* Stats Grid - 3x2 Layout */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {/* Total Users */}
          <Card className="border-l-4 border-l-blue-500">
            <CardContent className="pt-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Users</p>
                  <div className="text-3xl font-bold mt-2">24</div>
                  <p className="text-xs text-muted-foreground mt-1">16 customers, 5 barbers</p>
                </div>
                <div className="bg-blue-100 p-3 rounded-lg">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Total Shops */}
          <Card className="border-l-4 border-l-green-500">
            <CardContent className="pt-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Shops</p>
                  <div className="text-3xl font-bold mt-2">{activeShops.length}</div>
                  <p className="text-xs text-muted-foreground mt-1">Approved barber shops</p>
                </div>
                <div className="bg-green-100 p-3 rounded-lg">
                  <Store className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Total Bookings */}
          <Card className="border-l-4 border-l-purple-500">
            <CardContent className="pt-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Bookings</p>
                  <div className="text-3xl font-bold mt-2">{totalBookings}</div>
                  <p className="text-xs text-muted-foreground mt-1">All time bookings</p>
                </div>
                <div className="bg-purple-100 p-3 rounded-lg">
                  <Calendar className="h-6 w-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Pending Approvals */}
          <Card className="border-l-4 border-l-orange-500">
            <CardContent className="pt-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Pending Approvals</p>
                  <div className="text-3xl font-bold mt-2">{pendingShops.length}</div>
                  <p className="text-xs text-muted-foreground mt-1">Shops awaiting review</p>
                </div>
                <div className="bg-orange-100 p-3 rounded-lg">
                  <AlertCircle className="h-6 w-6 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Flagged Reviews */}
          <Card className="border-l-4 border-l-red-500">
            <CardContent className="pt-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Flagged Reviews</p>
                  <div className="text-3xl font-bold mt-2">0</div>
                  <p className="text-xs text-muted-foreground mt-1">Reviews needing moderation</p>
                </div>
                <div className="bg-red-100 p-3 rounded-lg">
                  <Flag className="h-6 w-6 text-red-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Platform Settings */}
          <Card className="border-l-4 border-l-gray-500">
            <CardContent className="pt-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Platform Overview</p>
                  <div className="space-y-2 mt-2 text-sm">
                    <p className="text-xs"><span className="font-semibold">Active Shops:</span> {activeShops.length}</p>
                    <p className="text-xs"><span className="font-semibold">Total Bookings:</span> {totalBookings}</p>
                    <p className="text-xs"><span className="font-semibold">Barber Accounts:</span> 5</p>
                  </div>
                </div>
                <div className="bg-gray-100 p-3 rounded-lg">
                  <Settings className="h-6 w-6 text-gray-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Sections */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Shop Approvals */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Check className="h-5 w-5 text-green-600" />
                <div>
                  <CardTitle>Shop Approvals</CardTitle>
                  <CardDescription>Review and approve pending barber shop registrations</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {pendingShops.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <p className="mb-2">All caught up! No pending shops</p>
                </div>
              ) : (
                <>
                  <p className="text-sm font-medium mb-4">{pendingShops.length} pending shops</p>
                  <Button className="w-full bg-orange-600 hover:bg-orange-700">Review Shop</Button>
                </>
              )}
            </CardContent>
          </Card>

          {/* Review Moderation */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Flag className="h-5 w-5 text-red-600" />
                <div>
                  <CardTitle>Review Moderation</CardTitle>
                  <CardDescription>Manage flagged reviews and inappropriate content</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-muted-foreground">
                <p className="mb-2">0 flagged reviews</p>
                <p className="text-sm">Need moderation</p>
              </div>
              <Button variant="outline" className="w-full" disabled>View Flagged</Button>
            </CardContent>
          </Card>
        </div>

        {/* Pending Shops Table */}
        <Card>
          <CardHeader>
            <CardTitle>Pending Shop Approvals</CardTitle>
            <CardDescription>Review and approve new barber shop registrations.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Shop Name</TableHead>
                  <TableHead>Owner</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Date Applied</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pendingShops.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center text-muted-foreground py-8">
                      No pending approvals
                    </TableCell>
                  </TableRow>
                ) : (
                  pendingShops.map((shop) => (
                    <TableRow key={shop.id}>
                      <TableCell className="font-medium">{shop.name}</TableCell>
                      <TableCell>{shop.ownerName}</TableCell>
                      <TableCell>{shop.location}</TableCell>
                      <TableCell>{shop.dateApplied}</TableCell>
                      <TableCell>
                        <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 border-yellow-200">Pending</Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="h-8 w-8 p-0 text-green-600 border-green-200 hover:bg-green-50"
                            onClick={() => approveShop(shop.id)}
                            data-testid={`button-approve-${shop.id}`}
                          >
                            <Check className="h-4 w-4" />
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="h-8 w-8 p-0 text-red-600 border-red-200 hover:bg-red-50"
                            onClick={() => rejectShop(shop.id)}
                            data-testid={`button-reject-${shop.id}`}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}