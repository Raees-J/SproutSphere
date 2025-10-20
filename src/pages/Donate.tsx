import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Phone, MapPin } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const Donate = () => {
  const { toast } = useToast();
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState("");
  const [frequency, setFrequency] = useState<"one-time" | "monthly">("one-time");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const donationOptions = [
    { amount: 100, label: "School Supplies" },
    { amount: 250, label: "Mental Health Workshops" },
    { amount: 500, label: "Career Guidance" },
    { amount: 250, label: "Tutoring Sessions" },
    { amount: 500, label: "Year of Tutoring" },
    { amount: 1000, label: "Field Trip" }
  ];

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const { error } = await supabase
      .from("contact_submissions")
      .insert([
        {
          name: formData.name,
          email: formData.email,
          message: formData.message
        }
      ]);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Message Sent!",
      description: "We'll get back to you soon."
    });
    setFormData({ name: "", email: "", message: "" });
  };

  const handleDonateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const amount = selectedAmount || parseFloat(customAmount);

    if (!amount || amount <= 0) {
      toast({
        title: "Invalid Amount",
        description: "Please select or enter a valid donation amount.",
        variant: "destructive"
      });
      return;
    }

    const { error } = await supabase
      .from("donations")
      .insert([
        {
          amount: amount,
          frequency: frequency
        }
      ]);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to process donation. Please try again.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Thank You!",
      description: `Your ${frequency === "monthly" ? "monthly" : "one-time"} donation of R${amount} will make a difference.`
    });

    // Reset form
    setSelectedAmount(null);
    setCustomAmount("");
    setFrequency("one-time");
  };

  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="bg-background py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact & Donate</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Connect with SproutSphere to learn more or make a meaningful contribution to empower students.
          </p>
        </div>
      </section>

      {/* Main Content - Contact & Donate Forms */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            
            {/* Contact Form */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl font-bold">Get in Touch</CardTitle>
                <p className="text-muted-foreground text-sm">
                  We'd love to hear from you! Whether you have questions, need support, or want to get involved, please reach out.
                </p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="w-4 h-4 text-primary" />
                    <span>+27 (738) 527 567</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="w-4 h-4 text-primary" />
                    <span>1206 Albert St, Germiston, Gauteng, 1412</span>
                  </div>
                </div>

                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      placeholder="Your name"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your.email@example.com"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Your Message</Label>
                    <Textarea
                      id="message"
                      placeholder="Type your message here..."
                      rows={4}
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      required
                    />
                  </div>

                  <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Donation Form */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl font-bold">Support a Student Today</CardTitle>
                <p className="text-muted-foreground text-sm">
                  Your contributions empower high school students through education, mentorship, and wellness programs. Every donation makes a difference!
                </p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleDonateSubmit} className="space-y-6">
                  
                  {/* Preset Amounts */}
                  <div className="grid grid-cols-3 gap-3">
                    {donationOptions.map((option, index) => (
                      <button
                        key={index}
                        type="button"
                        onClick={() => {
                          setSelectedAmount(option.amount);
                          setCustomAmount(option.amount.toString()); // auto-fill input
                        }}
                        className={`p-4 rounded-lg border-2 transition-all text-center ${
                          selectedAmount === option.amount
                            ? "border-primary bg-primary/5"
                            : "border-border hover:border-primary/50"
                        }`}
                      >
                        <div className="font-bold text-xl">R{option.amount}</div>
                        <div className="text-xs text-muted-foreground mt-1">{option.label}</div>
                      </button>
                    ))}
                  </div>

                  {/* Custom Amount */}
                  <div className="space-y-2">
                    <Label htmlFor="custom-amount">Custom Amount</Label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">R</span>
                      <Input
                        id="custom-amount"
                        type="number"
                        placeholder="0"
                        className="pl-7"
                        value={customAmount}
                        onChange={(e) => {
                          setCustomAmount(e.target.value);
                          setSelectedAmount(null);
                        }}
                        min="1"
                      />
                    </div>
                  </div>

                  {/* Donation Frequency */}
                  <div className="space-y-2">
                    <Label>Donation Frequency</Label>
                    <div className="flex gap-3">
                      <button
                        type="button"
                        onClick={() => setFrequency("one-time")}
                        className={`flex-1 py-2 px-4 rounded-lg border-2 transition-all ${
                          frequency === "one-time"
                            ? "border-primary bg-primary/5 font-medium"
                            : "border-border hover:border-primary/50"
                        }`}
                      >
                        One-time
                      </button>
                      <button
                        type="button"
                        onClick={() => setFrequency("monthly")}
                        className={`flex-1 py-2 px-4 rounded-lg border-2 transition-all ${
                          frequency === "monthly"
                            ? "border-primary bg-primary/5 font-medium"
                            : "border-border hover:border-primary/50"
                        }`}
                      >
                        Monthly
                      </button>
                    </div>
                  </div>

                  <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
                    Support a Student Now
                  </Button>
                </form>
              </CardContent>
            </Card>

          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Donate;
