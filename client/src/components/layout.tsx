import { Link, useLocation } from "wouter";
import { Scissors, Menu, X, LogOut, User } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useStore } from "@/lib/store";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, logout } = useStore();
  const [, setLocation] = useLocation();

  const handleLogout = () => {
    logout();
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background font-sans text-foreground">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/">
            <a className="flex items-center gap-2 group cursor-pointer" onClick={(e) => { e.preventDefault(); setLocation('/'); }}>
              <div className="bg-primary text-primary-foreground p-1.5 rounded-md group-hover:bg-accent transition-colors">
                <Scissors className="h-5 w-5" />
              </div>
              <span className="text-xl font-serif font-bold tracking-tight">Trim & Tone</span>
            </a>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="/#shops" onClick={(e) => { e.preventDefault(); document.getElementById('shops')?.scrollIntoView({behavior: 'smooth'}); }} className="text-sm font-medium hover:text-primary transition-colors cursor-pointer">Discover</a>
            {user?.role === 'barber' && (
              <Link href="/barber-dashboard"><a className="text-sm font-medium hover:text-primary transition-colors">Dashboard</a></Link>
            )}
            {user?.role === 'admin' && (
              <Link href="/admin-dashboard"><a className="text-sm font-medium hover:text-primary transition-colors">Admin</a></Link>
            )}
            {user?.role === 'customer' && (
               <Link href="/customer-dashboard"><a className="text-sm font-medium hover:text-primary transition-colors">My Bookings</a></Link>
            )}
          </nav>

          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{user.name}</p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {user.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => {
                      if (user.role === 'barber') setLocation('/barber-dashboard');
                      else if (user.role === 'admin') setLocation('/admin-dashboard');
                      else setLocation('/customer-dashboard');
                  }}>
                    <User className="mr-2 h-4 w-4" />
                    <span>My Bookings</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={logout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Link href="/auth">
                  <Button variant="ghost" size="sm">Log In</Button>
                </Link>
                <Link href="/auth">
                  <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">Sign Up</Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Nav */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t p-4 space-y-4 bg-background absolute w-full shadow-lg animate-in slide-in-from-top-5">
            <nav className="flex flex-col gap-4">
              <Link href="/"><a className="text-sm font-medium hover:text-primary" onClick={() => setIsMobileMenuOpen(false)}>Discover</a></Link>
              {user?.role === 'barber' && (
                <Link href="/barber-dashboard"><a className="text-sm font-medium hover:text-primary" onClick={() => setIsMobileMenuOpen(false)}>Dashboard</a></Link>
              )}
              {user?.role === 'admin' && (
                <Link href="/admin-dashboard"><a className="text-sm font-medium hover:text-primary" onClick={() => setIsMobileMenuOpen(false)}>Admin</a></Link>
              )}
              {user?.role === 'customer' && (
                <Link href="/customer-dashboard"><a className="text-sm font-medium hover:text-primary" onClick={() => setIsMobileMenuOpen(false)}>My Bookings</a></Link>
              )}
            </nav>
            <div className="flex flex-col gap-2 pt-4 border-t">
              {user ? (
                <Button variant="outline" className="w-full" onClick={handleLogout}>Log Out</Button>
              ) : (
                <Link href="/auth">
                  <Button className="w-full" onClick={() => setIsMobileMenuOpen(false)}>Login / Sign Up</Button>
                </Link>
              )}
            </div>
          </div>
        )}
      </header>

      <main className="flex-1">
        {children}
      </main>

      <footer className="bg-secondary/30 border-t py-12 mt-12">
        <div className="container mx-auto px-4 grid md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Scissors className="h-5 w-5 text-primary" />
              <span className="text-lg font-serif font-bold">Trim & Tone</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Elevating the grooming experience. Discover, book, and experience the best barbers in town.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a onClick={(e) => { e.preventDefault(); setLocation('/about-us'); }} className="hover:text-primary transition-colors cursor-pointer">About Us</a></li>
              <li><a onClick={(e) => { e.preventDefault(); setLocation('/contact-us'); }} className="hover:text-primary transition-colors cursor-pointer">Contact Us</a></li>
              <li><a onClick={(e) => { e.preventDefault(); setLocation('/write-review'); }} className="hover:text-primary transition-colors cursor-pointer">Write a Review</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a onClick={(e) => { e.preventDefault(); setLocation('/privacy-policy'); }} className="hover:text-primary transition-colors cursor-pointer">Privacy Policy</a></li>
              <li><a onClick={(e) => { e.preventDefault(); setLocation('/terms-of-service'); }} className="hover:text-primary transition-colors cursor-pointer">Terms of Service</a></li>
            </ul>
          </div>
        </div>
        <div className="container mx-auto px-4 mt-12 pt-8 border-t text-center text-sm text-muted-foreground">
          © 2025 Trim & Tone. All rights reserved.
        </div>
      </footer>
    </div>
  );
}