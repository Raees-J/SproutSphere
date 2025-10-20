import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import heroImage from "@/assets/hero-students.jpg";
import careerImage from "@/assets/career-guidance.jpg";
import tutoringImage from "@/assets/tutoring.jpg";
import leadershipImage from "@/assets/leadership.jpg";
import iconCareer from "@/assets/icon-career.jpg";
import iconStudy from "@/assets/icon-study.jpg";
import iconMentalHealth from "@/assets/icon-mental-health.jpg";
import iconSports from "@/assets/icon-sports.jpg";
const Index = () => {
  const programs = [{
    icon: iconCareer,
    title: "Career Guidance",
    description: "Explore diverse career paths and build essential skills for future endeavors."
  }, {
    icon: iconStudy,
    title: "Tutoring & Study Groups",
    description: "Academic support personalized tutoring and collaborative study groups."
  }, {
    icon: iconMentalHealth,
    title: "Mental Health Support",
    description: "Workshops and peer support promoting well-being and resilience."
  }, {
    icon: iconSports,
    title: "Sports & Recreation",
    description: "Organized sports teams and activities for physical health and teamwork."
  }];
  const events = [{
    image: careerImage,
    badge: "Career",
    title: "Annual Career Fair",
    description: "Connect with industry professionals and explore industries and careers future career opportunities.",
    date: "Oct 25"
  }, {
    image: tutoringImage,
    badge: "Academic",
    title: "Academic Excellence Workshop",
    description: "Learn effective study techniques, time management, and exam preparation strategies.",
    date: "Nov 15"
  }, {
    image: leadershipImage,
    badge: "Leadership",
    title: "Youth Leadership Summit",
    description: "Develop leadership skills, teamwork, and critical thinking in an engaging format.",
    date: "Dec 10"
  }];
  const testimonials = [{
    name: "Aisha Khan",
    role: "Former Student",
    quote: "YouthForward career guidance program helped me discover my passion for engineering and provided me with mentors who changed my life."
  }, {
    name: "David Lee",
    role: "Tutoring Program",
    quote: "Thanks to the tutoring support, my grades improved dramatically. I felt so much more confident and prepared for exams."
  }, {
    name: "Sofia Ramirez",
    role: "Mental Health Support",
    quote: "The mental health workshops provided a safe space to discuss challenges and have made a real difference."
  }];
  return <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="bg-background">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                Empowering high school students for a brighter future.
              </h1>
              <p className="text-lg text-muted-foreground mb-8">
                YouthForward provides comprehensive support programs to help students excel academically, develop essential life skills, and explore career paths. Join us in shaping tomorrow's leaders.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/programs">
                  <Button size="lg" className="bg-primary hover:bg-primary/90">
                    Learn More About Our Programs
                  </Button>
                </Link>
                <Link to="/donate">
                  <Button size="lg" variant="outline">
                    Contact Us / Donate
                  </Button>
                </Link>
              </div>
            </div>
            <div>
              <img src={heroImage} alt="Students studying together" className="rounded-2xl shadow-lg w-full" />
            </div>
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section className="py-16 bg-card">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Our Transformative Programs
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {programs.map((program, index) => <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="mb-4 flex justify-center">
                    <img src={program.icon} alt={program.title} className="w-24 h-24 rounded-full object-cover" />
                  </div>
                  <h3 className="font-bold text-xl mb-3">{program.title}</h3>
                  <p className="text-muted-foreground text-sm">{program.description}</p>
                </CardContent>
              </Card>)}
          </div>
        </div>
      </section>

      {/* Events Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Upcoming Events & Workshops
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {events.map((event, index) => <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative">
                  <img src={event.image} alt={event.title} className="w-full h-48 object-cover" />
                  <Badge className="absolute top-4 left-4 bg-primary text-primary-foreground">
                    {event.badge}
                  </Badge>
                  <Badge className="absolute top-4 right-4 bg-card text-card-foreground">
                    {event.date}
                  </Badge>
                </div>
                <CardContent className="p-6">
                  <h3 className="font-bold text-xl mb-3">{event.title}</h3>
                  <p className="text-muted-foreground text-sm">{event.description}</p>
                </CardContent>
              </Card>)}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-card">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Hear From Our Students
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <p className="text-muted-foreground italic mb-6">"{testimonial.quote}"</p>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-primary font-bold text-lg">
                        {testimonial.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <p className="font-bold">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>)}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-primary-foreground mx-[5px]">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Empower a Student Today
          </h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90">
            Your donation provides essential resources, mentorships, and opportunities that change lives.
          </p>
          <Link to="/donate">
            <Button size="lg" variant="secondary" className="bg-card text-card-foreground hover:bg-card/90">
              Support a Student Now
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>;
};
export default Index;