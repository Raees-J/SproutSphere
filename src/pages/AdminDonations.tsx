import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import Footer from "@/components/Footer";

interface Donation {
  id: number;
  amount: number;
  frequency: string;
  created_at: string;
}

const AdminDonations = () => {
  const [donations, setDonations] = useState<Donation[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchDonations = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("donations")
      .select("id, amount, frequency, created_at")
      .order("created_at", { ascending: false });
    if (!error && data) {
      setDonations(data.map((donation: any) => ({
        ...donation,
        id: Number(donation.id)
      })));
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchDonations();
  }, []);

  const handleLogout = () => {
    // Logic for handling the logout goes here
    supabase.auth.signOut();
  };

  return (
    <div className="min-h-screen">
      {/* Removed Navigation component to remove the navbar */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-2xl font-bold">All Donations</CardTitle>
                <button
                  className="px-4 py-2 bg-primary text-white rounded hover:bg-primary/90"
                  onClick={fetchDonations}
                  disabled={loading}
                >
                  Refresh
                </button>
              </div>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div>Loading donations...</div>
              ) : donations.length === 0 ? (
                <div>No donations found.</div>
              ) : (
                <table className="w-full border-collapse">
                  <thead>
                    <tr>
                      <th className="border-b p-2 text-left">ID</th>
                      <th className="border-b p-2 text-left">Amount (R)</th>
                      <th className="border-b p-2 text-left">Frequency</th>
                      <th className="border-b p-2 text-left">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {donations.map((donation) => (
                      <tr key={donation.id}>
                        <td className="border-b p-2">{donation.id}</td>
                        <td className="border-b p-2">R{donation.amount}</td>
                        <td className="border-b p-2">{donation.frequency}</td>
                        <td className="border-b p-2">{new Date(donation.created_at).toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </CardContent>
          </Card>
        </div>
      </section>
      
      {/* Replace Donate button with Logout button */}
      <div className="flex justify-center py-4">
        <button
          className="px-6 py-2 bg-danger text-white rounded hover:bg-danger/90"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>

      <Footer />
    </div>
  );
};

export default AdminDonations;
