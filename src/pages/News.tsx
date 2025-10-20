import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { ArrowRight } from "lucide-react";
import { format } from "date-fns";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string | null;
  image_url: string | null;
  category: string;
  read_time: string;
  published_at: string;
  status: string;
  created_at: string;
  updated_at: string;
}

const News = () => {
  // Static blog posts data
  const blogPosts: BlogPost[] = [
    {
      id: "1",
      title: "How to Excel in Your Final Exams",
      excerpt: "Discover proven strategies and study techniques that will help you prepare effectively for your final examinations.",
      content: null,
      image_url: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&q=80",
      category: "Academic",
      read_time: "5 min read",
      published_at: "2024-01-15T10:00:00Z",
      status: "published",
      created_at: "2024-01-15T10:00:00Z",
      updated_at: "2024-01-15T10:00:00Z"
    },
    {
      id: "2",
      title: "Career Paths in Technology",
      excerpt: "Explore the exciting world of technology careers and learn about the skills you need to succeed in this dynamic field.",
      content: null,
      image_url: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80",
      category: "Career",
      read_time: "7 min read",
      published_at: "2024-01-10T10:00:00Z",
      status: "published",
      created_at: "2024-01-10T10:00:00Z",
      updated_at: "2024-01-10T10:00:00Z"
    },
    {
      id: "3",
      title: "Mental Health and Well-being Tips",
      excerpt: "Learn essential strategies for maintaining your mental health and managing stress during your high school years.",
      content: null,
      image_url: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&q=80",
      category: "Wellness",
      read_time: "6 min read",
      published_at: "2024-01-05T10:00:00Z",
      status: "published",
      created_at: "2024-01-05T10:00:00Z",
      updated_at: "2024-01-05T10:00:00Z"
    }
  ];
  const isLoading = false;

  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Newsletter Section */}
      <section className="bg-muted py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Stay Updated with SproutSphere!
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Subscribe to our newsletter for the latest news, student success stories, upcoming events, 
              and empowering tips for academic and personal growth.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input 
                type="email" 
                placeholder="Enter your email"
                className="flex-1 bg-card"
              />
              <Button className="bg-primary hover:bg-primary/90">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Latest News & Blog
          </h2>
          
          <div className="space-y-8 max-w-4xl mx-auto">
            {isLoading ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">Loading blog posts...</p>
              </div>
            ) : blogPosts && blogPosts.length > 0 ? (
              blogPosts.map((post) => (
                <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="md:col-span-1">
                      <img 
                        src={post.image_url || "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80"} 
                        alt={post.title}
                        className="w-full h-full object-cover min-h-[200px]"
                      />
                    </div>
                    <CardContent className="md:col-span-2 p-6">
                      <Badge className="bg-primary text-primary-foreground mb-3">
                        {post.category}
                      </Badge>
                      <h3 className="text-2xl font-bold mb-3">{post.title}</h3>
                      <p className="text-muted-foreground mb-4">{post.excerpt}</p>
                      <div className="flex items-center justify-between">
                        <div className="text-sm text-muted-foreground">
                          <span>{format(new Date(post.published_at), "MMMM d, yyyy")}</span>
                          <span className="mx-2">•</span>
                          <span>{post.read_time}</span>
                        </div>
                        <Button variant="ghost" className="text-primary hover:text-primary/90">
                          Read More <ArrowRight className="ml-2 w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </div>
                </Card>
              ))
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No blog posts available yet.</p>
              </div>
            )}
          </div>
          
          <div className="text-center mt-12">
            <Button variant="outline" size="lg">
              View More Posts
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default News;
