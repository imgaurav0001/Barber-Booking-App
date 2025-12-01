import React, { createContext, useContext, useState } from 'react';
import { useLocation } from "wouter";
import shopImage1 from "@assets/stock_images/modern_barber_shop_i_89b52aca.jpg";
import shopImage2 from "@assets/stock_images/barber_cutting_hair__2a8c334a.jpg";
import shopImage3 from "@assets/stock_images/modern_barber_shop_i_426d734a.jpg";
import barberImage from "@assets/stock_images/stylish_man_with_bea_415100fd.jpg";

// Types
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'customer' | 'barber' | 'admin';
  avatar?: string;
}

export interface Service {
  name: string;
  description: string;
  price: string;
  duration: string;
}

export interface Shop {
  id: string;
  name: string;
  image: string;
  rating: number;
  reviews: number;
  location: string;
  description?: string;
  tags: string[];
  isOpen: boolean;
  status: 'active' | 'pending'; // for admin
  ownerId: string; // Changed from owner string name to ownerId for relation
  ownerName: string;
  dateApplied: string; // for admin
  services?: Service[];
}

export interface Appointment {
  id: string;
  shopId: string;
  shopName: string;
  barberId: string; // Owner ID
  barberName: string;
  customerId: string; // New field to link to customer
  serviceName: string;
  serviceNames?: string[]; // Multiple services
  price: string;
  date: Date;
  time: string;
  customerName: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled' | 'rejected';
}

export interface BarberProfile {
  id: string;
  firstName: string;
  lastName: string;
  bio: string;
  specialties: string;
  availability: {
    [key: string]: { start: string; end: string; active: boolean };
  };
}

interface StoreContextType {
  user: User | null;
  shops: Shop[];
  appointments: Appointment[];
  barberProfile: BarberProfile;
  login: (email: string, password: string) => User | null;
  signup: (name: string, email: string, password: string, role: User['role']) => User | null;
  logout: () => void;
  addAppointment: (appointment: Omit<Appointment, 'id' | 'status'>) => void;
  updateAppointmentStatus: (id: string, status: Appointment['status']) => void;
  updateBarberProfile: (profile: Partial<BarberProfile>) => void;
  addShop: (shopData: Omit<Shop, 'id' | 'status' | 'dateApplied' | 'rating' | 'reviews' | 'image' | 'isOpen'>) => void;
  approveShop: (id: string) => void;
  rejectShop: (id: string) => void;
  searchShops: (query: string, location?: string) => Shop[];
  getCustomerBookings: (customerId: string) => Appointment[];
  getBarberShop: (ownerId: string) => Shop | undefined;
  getShopBookings: (shopId: string) => Appointment[];
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

const INITIAL_SHOPS: Shop[] = [
  {
    id: "1",
    name: "The Gentleman's Den",
    image: shopImage1,
    rating: 4.9,
    reviews: 128,
    location: "Downtown, Metro City",
    tags: ["Classic Shave", "Beard Trim", "Premium"],
    isOpen: true,
    status: 'active',
    ownerId: "barber_1",
    ownerName: "James Wilson",
    dateApplied: "2024-01-15",
    services: [
      { name: "Classic Haircut", price: "$35", duration: "45 min", description: "Traditional cut with scissors and clippers" },
      { name: "Beard Trim & Shape", price: "$25", duration: "30 min", description: "Professional beard grooming" },
      { name: "Full Service (Cut & Shave)", price: "$55", duration: "75 min", description: "Complete grooming experience" },
      { name: "Hot Towel Shave", price: "$30", duration: "30 min", description: "Luxurious hot towel treatment" }
    ]
  },
  {
    id: "2",
    name: "Urban Cuts & Co.",
    image: shopImage2,
    rating: 4.7,
    reviews: 85,
    location: "Westside Arts District",
    tags: ["Modern Styles", "Hair Tattoo"],
    isOpen: true,
    status: 'active',
    ownerId: "barber_2",
    ownerName: "Marcus Chen",
    dateApplied: "2024-02-20",
    services: [
      { name: "Fade Haircut", price: "$40", duration: "35 min", description: "Clean fade with precision" },
      { name: "Hair Design", price: "$60", duration: "45 min", description: "Custom hair design" },
      { name: "Buzz Cut", price: "$25", duration: "15 min", description: "Quick buzz cut" },
      { name: "Kids Haircut", price: "$30", duration: "25 min", description: "Kid-friendly haircut" }
    ]
  },
  {
    id: "3",
    name: "Blade & Bourbon",
    image: shopImage3,
    rating: 4.8,
    reviews: 210,
    location: "Uptown Plaza",
    tags: ["Luxury", "Drinks Included", "Hot Towel"],
    isOpen: false,
    status: 'active',
    ownerId: "barber_3",
    ownerName: "Sarah Jenkins",
    dateApplied: "2024-03-10",
    services: [
      { name: "Premium Haircut", price: "$50", duration: "50 min", description: "Luxury haircut service" },
      { name: "Bourbon Shave", price: "$45", duration: "40 min", description: "Shave with bourbon experience" },
      { name: "Full Luxury Package", price: "$85", duration: "90 min", description: "Complete luxury grooming" },
      { name: "Beard Grooming", price: "$35", duration: "30 min", description: "Premium beard care" }
    ]
  },
];

const INITIAL_APPOINTMENTS: Appointment[] = [
  {
    id: "101",
    shopId: "1",
    shopName: "The Gentleman's Den",
    barberId: "barber_1",
    barberName: "James Wilson",
    customerId: "customer_1",
    serviceName: "Classic Haircut",
    price: "$35",
    date: new Date(),
    time: "14:00", // 2:00 PM
    customerName: "Alex M.",
    status: 'confirmed'
  }
];

const INITIAL_BARBER_PROFILE: BarberProfile = {
  id: "1",
  firstName: "James",
  lastName: "Wilson",
  bio: "Master Barber with 10 years of experience.",
  specialties: "Fades, Beards, Hot Towel",
  availability: {
    'Monday': { start: "09:00", end: "17:00", active: true },
    'Tuesday': { start: "09:00", end: "17:00", active: true },
    'Wednesday': { start: "09:00", end: "17:00", active: true },
    'Thursday': { start: "09:00", end: "17:00", active: true },
    'Friday': { start: "09:00", end: "17:00", active: true },
  }
};

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [shops, setShops] = useState<Shop[]>(INITIAL_SHOPS);
  const [appointments, setAppointments] = useState<Appointment[]>(INITIAL_APPOINTMENTS);
  const [barberProfile, setBarberProfile] = useState<BarberProfile>(INITIAL_BARBER_PROFILE);
  // Registry to track registered users by email
  const [userRegistry, setUserRegistry] = useState<{ email: string; password: string; role: 'customer' | 'barber'; userId: string }[]>([]);

  const login = (email: string, password: string): User | null => {
    // Hardcoded Admin Check
    if (email === "admin123@gmail.com" && password === "admin123") {
        const adminUser: User = {
            id: "admin_1",
            name: "System Admin",
            email: "admin123@gmail.com",
            role: "admin"
        };
        setUser(adminUser);
        return adminUser;
    }

    // Check if user is registered and password matches
    const registeredUser = userRegistry.find(u => u.email === email && u.password === password);
    
    if (registeredUser) {
      const newUser: User = {
        id: registeredUser.userId,
        name: email.split('@')[0],
        email,
        role: registeredUser.role,
        avatar: registeredUser.role === 'barber' ? barberImage : undefined
      };
      setUser(newUser);
      return newUser;
    }

    return null;
  };

  const signup = (name: string, email: string, password: string, role: User['role']): User | null => {
    // Check if email already exists
    if (userRegistry.find(u => u.email === email)) {
      return null; // Email already registered
    }

    // Prevent creating admin via signup
    const safeRole = role === 'admin' ? 'customer' : role;

    const uniqueSuffix = email.split('@')[0].replace(/[^a-z0-9]/gi, '') + "_" + Math.random().toString(36).substr(2, 5);
    const userId = safeRole === 'customer' ? "customer_" + uniqueSuffix : "barber_" + uniqueSuffix;
    
    // Register user with password
    setUserRegistry(prev => [...prev, { email, password, role: safeRole, userId }]);

    const newUser: User = {
      id: userId,
      name,
      email,
      role: safeRole
    };
    setUser(newUser);
    return newUser;
  };

  const logout = () => {
    setUser(null);
  };

  const addAppointment = (appointment: Omit<Appointment, 'id' | 'status'>) => {
    const newAppt: Appointment = {
      ...appointment,
      id: Math.random().toString(36).substr(2, 9),
      status: 'pending' // Appointments start as pending now
    };
    setAppointments(prev => [...prev, newAppt]);
  };

  const updateAppointmentStatus = (id: string, status: Appointment['status']) => {
    setAppointments(prev => prev.map(appt => appt.id === id ? { ...appt, status } : appt));
  };

  const updateBarberProfile = (profile: Partial<BarberProfile>) => {
    setBarberProfile(prev => ({ ...prev, ...profile }));
  };

  const addShop = (shopData: Omit<Shop, 'id' | 'status' | 'dateApplied' | 'rating' | 'reviews' | 'image' | 'isOpen'>) => {
    const newShop: Shop = {
      ...shopData,
      id: Math.random().toString(36).substr(2, 9),
      status: 'pending',
      dateApplied: new Date().toLocaleDateString(),
      rating: 0,
      reviews: 0,
      image: shopImage2, // Default image for now
      isOpen: false, // Default closed
      tags: ["New"]
    };
    setShops(prev => [...prev, newShop]);
  };

  const approveShop = (id: string) => {
    setShops(prev => prev.map(shop => shop.id === id ? { ...shop, status: 'active', isOpen: true } : shop));
  };

  const rejectShop = (id: string) => {
    setShops(prev => prev.filter(shop => shop.id !== id));
  };

  const searchShops = (query: string, location?: string) => {
    return shops.filter(shop => {
      const matchesQuery = shop.name.toLowerCase().includes(query.toLowerCase()) || 
                           shop.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()));
      const matchesLocation = location && location !== 'all' ? shop.location.toLowerCase().includes(location.toLowerCase()) : true;
      return matchesQuery && matchesLocation && shop.status === 'active';
    });
  };

  const getCustomerBookings = (customerId: string) => {
    return appointments.filter(appt => appt.customerId === customerId);
  };

  const getBarberShop = (ownerId: string) => {
    return shops.find(shop => shop.ownerId === ownerId);
  };

  const getShopBookings = (shopId: string) => {
    return appointments.filter(appt => appt.shopId === shopId);
  };

  return (
    <StoreContext.Provider value={{ 
      user,
      shops, 
      appointments, 
      barberProfile, 
      login,
      signup,
      logout,
      addAppointment, 
      updateAppointmentStatus,
      updateBarberProfile, 
      addShop,
      approveShop, 
      rejectShop, 
      searchShops,
      getCustomerBookings,
      getBarberShop,
      getShopBookings
    }}>
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);
  if (context === undefined) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
}