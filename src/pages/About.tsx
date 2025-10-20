import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import keaneImg from "@/assets/Keane-Small.jpg";
import keitumetseImg from "@/assets/Keitumetse-Dimpe.png";
import lifaImg from "@/assets/Lifa-Mbangata.jpg";
import raeesImg from "@/assets/Raees-Johaadien.jpg";
import ukhanyoImg from "@/assets/ukhanyo-siyazi.jpg";

const About = () => {
  const team = [
    { name: "KEANE SMALL", role: "Executive Director", image: keaneImg },
    { name: "KEITUMETSE DIMPE", role: "Program Manager", image: keitumetseImg },
    { name: "LIFA MBANGATA", role: "Head of Mentorship", image: lifaImg },
    { name: "RAEES JOHAADIEN", role: "Volunteer Coordinator", image: raeesImg },
    { name: "UKHANYO SIYAZI", role: "Impact Analyst", image: ukhanyoImg }
  ];

  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="bg-background py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Empowering Tomorrow's Leaders, Today
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            SproutSphere is dedicated to fostering the potential within high school learners, 
            equipping them with the tools, knowledge, and support system to thrive in academics, careers, and life.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 bg-card">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Our Core Purpose
          </h2>
          <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            <Card className="border-2 border-primary/20">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-primary mb-4">Our Mission</h3>
                <p className="text-muted-foreground">
                  To empower high school students from underserved communities by providing comprehensive 
                  programs that enhance their academic performance, career readiness, mental well-being, 
                  and overall personal growth.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-2 border-primary/20">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-primary mb-4">Our Vision</h3>
                <p className="text-muted-foreground">
                  A future where every high school student has equitable access to opportunities and resources, 
                  enabling them to achieve their full potential and become confident, resilient, and successful 
                  members of society.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* History */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">
            Our Journey: The Story Behind SproutSphere
          </h2>
          <div className="max-w-4xl mx-auto space-y-6 text-muted-foreground">
             <p className="text-black">
              SproutSphere was founded in 2020 with a mission to provide high school students (G`rades 10-12)
              with the support they need to thrive academically, emotionally, and physically. Recognizing the
              pressure students face, we aimed to create a space where they could receive free tutoring, engage
              in sports, and access mental health support. Our journey began with a small group of passionate
              individuals committed to making a difference. We connected with educators, therapists, and coaches
              to offer comprehensive programs that focus on academic growth, physical wellness, and emotional
              well-being. From our very first tutoring sessions to offering therapy services, we saw students 
              gain confidence, improve their grades, and find the support they needed to navigate life's challenges
            </p>
             <p className="text-black">
              Over the years, SproutSphere has grown into a community where students not only receive academic help
              but also find a safe, inclusive space to develop mentally and socially. Our sports programs have 
              helped foster teamwork and leadership, while our therapy services have provided students with a 
              crucial outlet for stress and anxiety. As we continue to expand our reach and impact, we remain 
              dedicated to empowering the next generation by nurturing their academic potential and emotional 
              resilience. At SproutSphere, we believe in helping students sprout, grow, and achieve their fullest
              potential, both in and out of the classroom.
            </p>
          </div>
        </div>
      </section>

      {/* Team */}
     <section className="py-16 bg-card">
  <div className="container mx-auto px-4">
    <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
      Meet Our Dedicated Team
    </h2>
    <div className="flex flex-wrap justify-center gap-8">
      {team.map((member, index) => (
        <div key={index} className="w-40 text-center">
          <div className="w-32 h-32 rounded-full bg-primary/10 mx-auto mb-4 flex items-center justify-center overflow-hidden">
            {member.image ? (
              <img
                src={member.image}
                alt={member.name}
                className="w-full h-full object-cover rounded-full"
              />
            ) : (
              <span className="text-primary font-bold text-3xl">
                {member.name.charAt(0)}
              </span>
            )}
          </div>
          <h3 className="font-bold text-primary">{member.name}</h3>
          <p className="text-sm text-muted-foreground">{member.role}</p>
        </div>
      ))}
    </div>
  </div>
</section>



      {/* CTA Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Join Our Mission: Make a Difference
          </h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90">
            Your support helps us continue our vital work, providing essential resources today and 
            be a part of their success story.
          </p>
          <Link to="/donate">
            <Button size="lg" variant="secondary" className="bg-card text-card-foreground hover:bg-card/90">
              Support a Student Today
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
