import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

interface Donation {
  id: string;
  amount: number;
  frequency: string;
  created_at: string;
}

interface Event {
  id: string;
  title: string;
  description: string | null;
  start_date: string;
  end_date: string;
  location: string | null;
  category: string | null;
  status: string;
  created_at: string;
}

const AdminDashboard = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [donations, setDonations] = useState<Donation[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: "",
    description: "",
    start_date: "",
    end_date: "",
    location: "",
    category: "",
    status: "draft",
  });
  const [editingEventId, setEditingEventId] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const authStatus = sessionStorage.getItem("adminAuth");
    if (authStatus === "true") {
      setIsAuthenticated(true);
      fetchDonations();
      fetchEvents();
    }
  }, []);

  const handleLogin = () => {
    if (password === "codebusters") {
      setIsAuthenticated(true);
      sessionStorage.setItem("adminAuth", "true");
      fetchDonations();
      fetchEvents();
      toast({
        title: "Success",
        description: "Logged in successfully",
      });
    } else {
      toast({
        title: "Error",
        description: "Invalid password",
        variant: "destructive",
      });
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem("adminAuth");
    setPassword("");
  };

  const fetchDonations = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("donations")
      .select("id, amount, frequency, created_at")
      .order("created_at", { ascending: false });
    if (!error && data) {
      setDonations(data);
    }
    setLoading(false);
  };

  const fetchEvents = async () => {
    const { data, error } = await supabase
      .from("events")
      .select("*")
      .order("start_date", { ascending: false });
    if (!error && data) {
      setEvents(data);
    }
  };

  const handleAddEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingEventId) {
      // Update existing event
      const { error } = await supabase
        .from("events")
        .update(newEvent)
        .eq("id", editingEventId);
      
      if (error) {
        toast({
          title: "Error",
          description: "Failed to update event",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Success",
          description: "Event updated successfully",
        });
        resetForm();
        fetchEvents();
      }
    } else {
      // Insert new event
      const { error } = await supabase.from("events").insert([newEvent]);
      if (error) {
        toast({
          title: "Error",
          description: "Failed to add event",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Success",
          description: "Event added successfully",
        });
        resetForm();
        fetchEvents();
      }
    }
  };

  const handleEditEvent = (event: Event) => {
    setEditingEventId(event.id);
    setNewEvent({
      title: event.title,
      description: event.description || "",
      start_date: event.start_date.slice(0, 16), // Format for datetime-local input
      end_date: event.end_date.slice(0, 16),
      location: event.location || "",
      category: event.category || "",
      status: event.status,
    });
    // Scroll to form
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const resetForm = () => {
    setNewEvent({
      title: "",
      description: "",
      start_date: "",
      end_date: "",
      location: "",
      category: "",
      status: "draft",
    });
    setEditingEventId(null);
  };

  const handleDeleteEvent = async (id: string) => {
    const { error } = await supabase.from("events").delete().eq("id", id);
    if (error) {
      toast({
        title: "Error",
        description: "Failed to delete event",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Success",
        description: "Event deleted successfully",
      });
      fetchEvents();
    }
  };

  const handleToggleEventStatus = async (id: string, currentStatus: string) => {
    const newStatus = currentStatus === "published" ? "draft" : "published";
    const { error } = await supabase
      .from("events")
      .update({ status: newStatus })
      .eq("id", id);
    
    if (error) {
      toast({
        title: "Error",
        description: "Failed to update event status",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Success",
        description: `Event ${newStatus === "published" ? "published" : "unpublished"} successfully`,
      });
      fetchEvents();
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Admin Login</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleLogin()}
                  placeholder="Enter admin password"
                />
              </div>
              <Button onClick={handleLogin} className="w-full">
                Login
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <Button onClick={handleLogout} variant="outline">
              Logout
            </Button>
          </div>

          <Tabs defaultValue="donations" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="donations">Donations</TabsTrigger>
              <TabsTrigger value="events">Event Management</TabsTrigger>
            </TabsList>

            <TabsContent value="donations" className="space-y-4">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Donations Table</CardTitle>
                    <Button onClick={fetchDonations} disabled={loading}>
                      Refresh
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  {loading ? (
                    <div>Loading donations...</div>
                  ) : donations.length === 0 ? (
                    <div>No donations found.</div>
                  ) : (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Amount (R)</TableHead>
                          <TableHead>Frequency</TableHead>
                          <TableHead>Date</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {donations.map((donation) => (
                          <TableRow key={donation.id}>
                            <TableCell>R{donation.amount}</TableCell>
                            <TableCell>{donation.frequency}</TableCell>
                            <TableCell>
                              {new Date(donation.created_at).toLocaleString()}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="events" className="space-y-4">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>
                      {editingEventId ? "Edit Event" : "Add New Event"}
                    </CardTitle>
                    {editingEventId && (
                      <Button onClick={resetForm} variant="outline" size="sm">
                        Cancel Edit
                      </Button>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleAddEvent} className="space-y-4">
                    <div>
                      <Label htmlFor="title">Event Title</Label>
                      <Input
                        id="title"
                        required
                        value={newEvent.title}
                        onChange={(e) =>
                          setNewEvent({ ...newEvent, title: e.target.value })
                        }
                      />
                    </div>
                    <div>
                      <Label htmlFor="description">Description</Label>
                      <Input
                        id="description"
                        value={newEvent.description}
                        onChange={(e) =>
                          setNewEvent({ ...newEvent, description: e.target.value })
                        }
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="start_date">Start Date & Time</Label>
                        <Input
                          id="start_date"
                          type="datetime-local"
                          required
                          value={newEvent.start_date}
                          onChange={(e) =>
                            setNewEvent({ ...newEvent, start_date: e.target.value })
                          }
                        />
                      </div>
                      <div>
                        <Label htmlFor="end_date">End Date & Time</Label>
                        <Input
                          id="end_date"
                          type="datetime-local"
                          required
                          value={newEvent.end_date}
                          onChange={(e) =>
                            setNewEvent({ ...newEvent, end_date: e.target.value })
                          }
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="location">Location</Label>
                      <Input
                        id="location"
                        value={newEvent.location}
                        onChange={(e) =>
                          setNewEvent({ ...newEvent, location: e.target.value })
                        }
                      />
                    </div>
                    <div>
                      <Label htmlFor="category">Category</Label>
                      <Input
                        id="category"
                        placeholder="e.g., Career, Academic, Wellness, Sports"
                        value={newEvent.category}
                        onChange={(e) =>
                          setNewEvent({ ...newEvent, category: e.target.value })
                        }
                      />
                    </div>
                    <div className="flex items-center gap-4">
                      <Button type="submit">
                        {editingEventId ? "Update Event" : "Add Event"}
                      </Button>
                      <label className="flex items-center gap-2 text-sm">
                        <input
                          type="checkbox"
                          checked={newEvent.status === "published"}
                          onChange={(e) =>
                            setNewEvent({
                              ...newEvent,
                              status: e.target.checked ? "published" : "draft",
                            })
                          }
                        />
                        Publish immediately
                      </label>
                    </div>
                  </form>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>All Events</CardTitle>
                </CardHeader>
                <CardContent>
                  {events.length === 0 ? (
                    <div>No events found.</div>
                  ) : (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Title</TableHead>
                          <TableHead>Category</TableHead>
                          <TableHead>Start Date</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {events.map((event) => (
                          <TableRow key={event.id}>
                            <TableCell>{event.title}</TableCell>
                            <TableCell>{event.category || "N/A"}</TableCell>
                            <TableCell>
                              {new Date(event.start_date).toLocaleString()}
                            </TableCell>
                            <TableCell>
                              <span
                                className={`px-2 py-1 rounded text-xs ${
                                  event.status === "published"
                                    ? "bg-green-100 text-green-800"
                                    : "bg-gray-100 text-gray-800"
                                }`}
                              >
                                {event.status}
                              </span>
                            </TableCell>
                            <TableCell>
                              <div className="flex gap-2">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleEditEvent(event)}
                                >
                                  Edit
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() =>
                                    handleToggleEventStatus(event.id, event.status)
                                  }
                                >
                                  {event.status === "published" ? "Unpublish" : "Publish"}
                                </Button>
                                <Button
                                  variant="destructive"
                                  size="sm"
                                  onClick={() => handleDeleteEvent(event.id)}
                                >
                                  Delete
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  );
};

export default AdminDashboard;
