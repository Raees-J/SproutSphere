import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-4">Quick Links</h3>
            <div className="flex flex-col gap-2">
              <Link to="/" className="text-muted-foreground hover:text-primary transition-colors">
                Home
              </Link>
              <Link to="/programs" className="text-muted-foreground hover:text-primary transition-colors">
                Programs
              </Link>
              <Link to="/about" className="text-muted-foreground hover:text-primary transition-colors">
                About Us
              </Link>
            </div>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4">Get Involved</h3>
            <div className="flex flex-col gap-2">
              <Link to="/donate" className="text-muted-foreground hover:text-primary transition-colors">
                Donate
              </Link>
              <Link to="/programs" className="text-muted-foreground hover:text-primary transition-colors">
                Volunteer
              </Link>
              <Link to="/news" className="text-muted-foreground hover:text-primary transition-colors">
                News & Updates
              </Link>
            </div>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4">Connect With Us</h3>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-muted flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-muted flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-muted flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-muted flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-border mt-8 pt-8 text-center text-muted-foreground text-sm">
          <p>© 2024 SproutSphere. Empowering high school students for a brighter future.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
