import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { format } from "date-fns";
import { CheckCircle2 } from "lucide-react";
import { useStore, Service } from "@/lib/store";
import { useToast } from "@/hooks/use-toast";

interface BarberOption {
  id: string;
  name: string;
  rating?: number;
}

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  shopId: string;
  shopName: string;
  barberId?: string;
  barberName?: string;
  services?: Service[];
}

const BARBER_OPTIONS: BarberOption[] = [
  { id: "1", name: "James Wilson", rating: 4.9 },
  { id: "2", name: "Marcus Chen", rating: 4.9 },
  { id: "any", name: "Any Available Barber" }
];

export default function BookingModal({ isOpen, onClose, shopId, shopName, services = [] }: BookingModalProps) {
  const { addAppointment, user } = useStore();
  const { toast } = useToast();
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [selectedBarber, setSelectedBarber] = useState<BarberOption | null>(null);
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [time, setTime] = useState<string>("");
  const [step, setStep] = useState(1);

  const calculateTotalPrice = () => {
    if (selectedServices.length === 0) return "$0";
    const total = selectedServices.reduce((sum, serviceName) => {
      const service = services.find(s => s.name === serviceName);
      if (service) {
        const price = parseInt(service.price.replace("$", ""));
        return sum + price;
      }
      return sum;
    }, 0);
    return `$${total}`;
  };

  const getTotalDuration = () => {
    if (selectedServices.length === 0) return "0 min";
    const totalMin = selectedServices.reduce((sum, serviceName) => {
      const service = services.find(s => s.name === serviceName);
      if (service) {
        const min = parseInt(service.duration.replace(" min", ""));
        return sum + min;
      }
      return sum;
    }, 0);
    return `${totalMin} min`;
  };

  const toggleService = (serviceName: string) => {
    setSelectedServices(prev => 
      prev.includes(serviceName) 
        ? prev.filter(s => s !== serviceName)
        : [...prev, serviceName]
    );
  };

  const timeSlots = [
    "09:00 AM", "10:00 AM", "11:00 AM", 
    "01:00 PM", "02:00 PM", "03:30 PM", "05:00 PM"
  ];

  const handleNextStep = () => {
    if (step === 1 && selectedServices.length === 0) {
      toast({ variant: "destructive", title: "Error", description: "Please select at least one service" });
      return;
    }
    if (step === 2 && !selectedBarber) {
      toast({ variant: "destructive", title: "Error", description: "Please select a barber" });
      return;
    }
    if (step === 3 && !date) {
      toast({ variant: "destructive", title: "Error", description: "Please select a date" });
      return;
    }
    if (step === 4 && !time) {
      toast({ variant: "destructive", title: "Error", description: "Please select a time" });
      return;
    }
    setStep(step + 1);
  };

  const handleBooking = () => {
    if (!date || !time || selectedServices.length === 0 || !selectedBarber) return;

    setStep(5);
    
    // Simulate API call
    setTimeout(() => {
      addAppointment({
        shopId,
        shopName,
        barberId: selectedBarber.id,
        barberName: selectedBarber.name,
        serviceName: selectedServices.join(" + "),
        serviceNames: selectedServices,
        price: calculateTotalPrice(),
        date,
        time,
        customerId: user?.id || "guest",
        customerName: user?.name || "Guest User"
      });

      toast({
        title: "Booking Confirmed!",
        description: `Your appointment with ${selectedBarber.name} is set.`,
      });

      setStep(6);
    }, 1500);
  };

  const reset = () => {
    setStep(1);
    setTime("");
    setSelectedServices([]);
    setSelectedBarber(null);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && reset()}>
      <DialogContent className="sm:max-w-[500px]">
        {/* Step 1: Select Services */}
        {step === 1 && (
          <>
            <DialogHeader>
              <DialogTitle>Book Appointment at {shopName}</DialogTitle>
              <DialogDescription>Step 1 of 4: Select Services</DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4 py-4">
              <Label className="text-base font-semibold">Select Services</Label>
              <div className="space-y-3">
                {services.map((service) => (
                  <div key={service.name} className="flex items-start space-x-3 p-3 border rounded-lg hover:bg-accent/50 transition-colors cursor-pointer" onClick={() => toggleService(service.name)}>
                    <Checkbox 
                      id={service.name}
                      checked={selectedServices.includes(service.name)}
                      onCheckedChange={() => toggleService(service.name)}
                      className="mt-1"
                      data-testid={`checkbox-service-${service.name.replace(/\s+/g, '-').toLowerCase()}`}
                    />
                    <div className="flex-1">
                      <Label htmlFor={service.name} className="font-medium cursor-pointer">{service.name}</Label>
                      <p className="text-sm text-muted-foreground">{service.duration}</p>
                    </div>
                    <span className="font-semibold text-primary">{service.price}</span>
                  </div>
                ))}
              </div>
            </div>

            <DialogFooter className="flex-col-reverse sm:flex-row sm:justify-between sm:space-x-2 space-y-2 sm:space-y-0">
              <div className="text-lg font-bold">Total: <span className="text-primary">{calculateTotalPrice()}</span></div>
              <Button onClick={handleNextStep} disabled={selectedServices.length === 0} className="w-full sm:w-auto">
                Next: Choose Barber
              </Button>
            </DialogFooter>
          </>
        )}

        {/* Step 2: Select Barber */}
        {step === 2 && (
          <>
            <DialogHeader>
              <DialogTitle>Choose Your Barber</DialogTitle>
              <DialogDescription>Step 2 of 4: Select your preferred barber</DialogDescription>
            </DialogHeader>
            
            <div className="space-y-3 py-4">
              {BARBER_OPTIONS.map((barber) => (
                <div
                  key={barber.id}
                  className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                    selectedBarber?.id === barber.id
                      ? 'border-primary bg-primary/5'
                      : 'border-border hover:border-primary'
                  }`}
                  onClick={() => setSelectedBarber(barber)}
                  data-testid={`barber-option-${barber.id}`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold">{barber.name}</p>
                      {barber.rating && (
                        <p className="text-sm text-muted-foreground">Rating: {barber.rating} ⭐</p>
                      )}
                    </div>
                    {selectedBarber?.id === barber.id && (
                      <div className="h-5 w-5 rounded-full bg-primary flex items-center justify-center text-white text-xs">✓</div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setStep(1)}>Back</Button>
              <Button onClick={handleNextStep} disabled={!selectedBarber}>
                Next: Choose Date
              </Button>
            </DialogFooter>
          </>
        )}

        {/* Step 3: Select Date */}
        {step === 3 && (
          <>
            <DialogHeader>
              <DialogTitle>Select Date</DialogTitle>
              <DialogDescription>Step 3 of 4: Choose your preferred date</DialogDescription>
            </DialogHeader>
            
            <div className="grid gap-4 py-4">
              <div className="flex justify-center">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  className="rounded-md border"
                  disabled={(date) => date < new Date()}
                />
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setStep(2)}>Back</Button>
              <Button onClick={handleNextStep} disabled={!date}>
                Next: Choose Time
              </Button>
            </DialogFooter>
          </>
        )}

        {/* Step 4: Select Time */}
        {step === 4 && (
          <>
            <DialogHeader>
              <DialogTitle>Select Time</DialogTitle>
              <DialogDescription>Step 4 of 4: Choose your preferred time slot</DialogDescription>
            </DialogHeader>
            
            <div className="grid gap-4 py-4">
              <Label>Available Time Slots</Label>
              <RadioGroup onValueChange={setTime} value={time} className="grid grid-cols-3 gap-2">
                {timeSlots.map((slot) => (
                  <div key={slot}>
                    <RadioGroupItem value={slot} id={slot} className="peer sr-only" />
                    <Label
                      htmlFor={slot}
                      className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-transparent p-2 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary peer-data-[state=checked]:text-primary cursor-pointer transition-all text-xs"
                    >
                      {slot}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setStep(3)}>Back</Button>
              <Button onClick={handleBooking} disabled={!time} className="bg-orange-600 hover:bg-orange-700">
                Confirm Booking
              </Button>
            </DialogFooter>
          </>
        )}

        {/* Step 5: Processing */}
        {step === 5 && (
          <div className="flex flex-col items-center justify-center py-12 space-y-4">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
            <p className="text-muted-foreground">Processing your booking...</p>
          </div>
        )}

        {/* Step 6: Confirmation */}
        {step === 6 && (
          <div className="flex flex-col items-center justify-center py-8 space-y-4 text-center animate-in fade-in zoom-in">
            <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center text-green-600">
              <CheckCircle2 className="h-8 w-8" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-foreground">Booking Confirmed!</h3>
              <p className="text-muted-foreground mt-2">
                Your appointment with {selectedBarber?.name} is set for<br/>
                <span className="font-medium text-foreground">{date ? format(date, "MMMM d, yyyy") : ""} at {time}</span><br/>
                <span className="text-sm">{selectedServices.join(" + ")}</span>
              </p>
            </div>
            <Button onClick={reset} className="w-full mt-4">Done</Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}