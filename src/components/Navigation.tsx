import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sprout } from "lucide-react";

const Navigation = () => {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;
  
  return (
    <nav className="sticky top-0 z-50 bg-card border-b border-border">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
              <div className="w-16 h-16 rounded-full bg-primary overflow-hidden">
                <img src="/Logo (1).png" alt="Logo" className="w-full h-full object-cover" />
              </div>
            <span className="text-2xl font-bold text-primary">SproutSphere</span>
          </Link>
          
          <div className="hidden md:flex items-center gap-6">
            <Link 
              to="/" 
              className={`font-medium transition-colors hover:text-primary ${
                isActive("/") ? "text-primary" : "text-foreground"
              }`}
            >
              Home
            </Link>
            <Link 
              to="/about" 
              className={`font-medium transition-colors hover:text-primary ${
                isActive("/about") ? "text-primary" : "text-foreground"
              }`}
            >
              About Us
            </Link>
            <Link 
              to="/programs" 
              className={`font-medium transition-colors hover:text-primary ${
                isActive("/programs") ? "text-primary" : "text-foreground"
              }`}
            >
              Programs
            </Link>
            <Link 
              to="/news" 
              className={`font-medium transition-colors hover:text-primary ${
                isActive("/news") ? "text-primary" : "text-foreground"
              }`}
            >
              News/Blog
            </Link>
            <Link to="/donate">
              <Button className="bg-primary hover:bg-primary/90">
                Donate
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
