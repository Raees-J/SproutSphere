import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { useState, useMemo } from "react";
import { format } from "date-fns";
import { BookOpen, Heart, Dumbbell, Briefcase } from "lucide-react";
import tutoringImage from "@/assets/tutoring.jpg";

const Programs = () => {
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [month, setMonth] = useState<Date>(new Date());

  const handleMonthChange = (newMonth: Date) => {
    setMonth(newMonth);
    setDate(undefined); // Clear day selection when month changes
  };

  // Static events data
  const dbEvents = [
    {
      id: "1",
      title: "Career Exploration Workshop",
      description: "Discover various career paths and meet professionals from different industries",
      start_date: "2025-10-15T14:00:00Z",
      category: "Career",
      status: "published"
    },
    {
      id: "2",
      title: "Math Tutoring Session",
      description: "Get help with algebra, geometry, and calculus from experienced tutors",
      start_date: "2025-10-20T15:00:00Z",
      category: "Academic",
      status: "published"
    },
    {
      id: "3",
      title: "Study Skills Workshop",
      description: "Learn effective note-taking and time management strategies",
      start_date: "2025-10-25T14:00:00Z",
      category: "Academic",
      status: "published"
    },
    {
      id: "4",
      title: "Mental Health Awareness Day",
      description: "Learn about stress management and emotional well-being",
      start_date: "2025-11-05T13:00:00Z",
      category: "Wellness",
      status: "published"
    },
    {
      id: "5",
      title: "Science Fair",
      description: "Showcase your projects and explore innovative student experiments",
      start_date: "2025-11-10T10:00:00Z",
      category: "Academic",
      status: "published"
    },
    {
      id: "6",
      title: "Sports Tournament",
      description: "Join us for an exciting day of team sports and friendly competition",
      start_date: "2025-11-15T09:00:00Z",
      category: "Sports",
      status: "published"
    },
    {
      id: "7",
      title: "University Application Workshop",
      description: "Get expert guidance on university applications and entrance exams",
      start_date: "2025-11-20T15:00:00Z",
      category: "Career",
      status: "published"
    },
    {
      id: "8",
      title: "Peer Counseling Session",
      description: "Connect with trained peer counselors for support and guidance",
      start_date: "2025-11-25T14:00:00Z",
      category: "Wellness",
      status: "published"
    },
    {
      id: "9",
      title: "Basketball Skills Training",
      description: "Improve your basketball skills with professional coaches",
      start_date: "2025-12-05T16:00:00Z",
      category: "Sports",
      status: "published"
    },
    {
      id: "10",
      title: "English Literature Study Group",
      description: "Collaborative learning session for English literature students",
      start_date: "2025-12-08T15:00:00Z",
      category: "Academic",
      status: "published"
    },
    {
      id: "11",
      title: "Career Mentorship Program Launch",
      description: "Meet your career mentors and set goals for the semester",
      start_date: "2025-12-12T13:00:00Z",
      category: "Career",
      status: "published"
    },
    {
      id: "12",
      title: "Mindfulness and Meditation",
      description: "Learn relaxation techniques to manage stress and anxiety",
      start_date: "2025-12-18T14:00:00Z",
      category: "Wellness",
      status: "published"
    },
    {
      id: "13",
      title: "Soccer Match",
      description: "Inter-school soccer match and team building activities",
      start_date: "2025-12-22T15:00:00Z",
      category: "Sports",
      status: "published"
    },
    {
      id: "14",
      title: "STEM Workshop",
      description: "Hands-on activities in Science, Technology, Engineering, and Math",
      start_date: "2025-12-28T10:00:00Z",
      category: "Academic",
      status: "published"
    }
  ];

  // TypeScript interfaces
  interface Event {
    title: string;
    subtitle: string;
    date: Date;
    dateString: string;
    badge: string;
  }
  interface Program {
    icon: any;
    title: string;
    description: string;
  }

  const programs: Program[] = [
    {
      icon: Briefcase,
      title: "Career Guidance",
      description:
        "Workshops and personalized mentorship connect students with professionals, helping them explore diverse career paths and build essential skills for their future endeavors.",
    },
    {
      icon: BookOpen,
      title: "School Work Help",
      description:
        "Comprehensive tutoring services and organized study groups provide academic support across all subjects, enabling students excel in their coursework.",
    },
    {
      icon: Heart,
      title: "Mental Health",
      description:
        "Supportive workshops and peer counseling sessions promote emotional well-being, resilience, and positive coping mechanisms for managing stress and social pressures.",
    },
    {
      icon: Dumbbell,
      title: "Sports & Recreation",
      description:
        "Information about forming school teams and participating in community tournaments provides physical activity, teamwork, and healthy lifestyles among students.",
    },
  ];

  // Convert database events to Event objects
  const allEvents: Event[] = useMemo(
    () =>
      dbEvents.map((e) => ({
        title: e.title,
        subtitle: e.description || "",
        date: new Date(e.start_date),
        dateString: format(new Date(e.start_date), "MMMM d, yyyy"),
        badge: e.category || "Event",
      })),
    [dbEvents]
  );

  // Calendar highlight dates
  const eventDates: Date[] = useMemo(
    () => allEvents.map((e) => e.date),
    [allEvents]
  );

  // Events for selected day or month
  const selectedEvents: Event[] = useMemo(() => {
    if (date) {
      // If a specific date is selected, show only events on that day
      return allEvents.filter(
        (e) => format(e.date, "yyyy-MM-dd") === format(date, "yyyy-MM-dd")
      );
    } else {
      // If no date selected, show all events for the visible month
      return allEvents.filter(
        (e) => format(e.date, "MMMM yyyy") === format(month, "MMMM yyyy")
      );
    }
  }, [date, month, allEvents]);

  // Future events (today or later)
  const futureEvents: Event[] = useMemo(() => {
    const today = new Date();
    return allEvents
      .filter((e) => {
        const eventDay = format(e.date, "yyyy-MM-dd");
        const todayDay = format(today, "yyyy-MM-dd");
        return eventDay >= todayDay;
      })
      .sort((a, b) => a.date.getTime() - b.date.getTime());
  }, [allEvents]);

  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="bg-background py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Our Impactful Programs
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8">
            YouthForward is dedicated to empowering high school students through
            a diverse range of programs designed to foster academic success,
            personal growth, and future readiness. Discover how we equip the
            next generation for a brighter tomorrow.
          </p>
          <Link to="/donate">
            <Button size="lg" className="bg-primary hover:bg-primary/90">
              Get Involved
            </Button>
          </Link>
        </div>
      </section>

      {/* Hero Image */}
      <section className="bg-card py-8">
        <div className="container mx-auto px-4">
          <img
            src={tutoringImage}
            alt="Students in program"
            className="rounded-2xl shadow-lg w-full max-w-4xl mx-auto"
          />
        </div>
      </section>

      {/* Programs Grid */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            Explore Our Core Offerings
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-3xl mx-auto">
            Our programs are designed to provide holistic support, catering to
            the diverse needs of high school students as they navigate their
            academic and personal journeys.
          </p>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {programs.map((program, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-8">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <program.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-bold text-xl mb-2">
                        {program.title}
                      </h3>
                      <p className="text-muted-foreground text-sm">
                        {program.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Calendar & Events */}
      <section className="py-16 bg-card">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            Program Calendar & Key Dates
          </h2>
          <p className="text-center text-muted-foreground mb-12">
            Stay informed about important program dates, workshops, and events.
            Plan your participation and mark your calendars!
          </p>

          <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            <div>
              <h3 className="text-2xl font-bold mb-6">Interactive Calendar</h3>
              <Card className="w-fit">
                <CardContent className="p-6">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    month={month}
                    onMonthChange={handleMonthChange}
                    className="rounded-md"
                    modifiers={{ event: eventDates }}
                    modifiersClassNames={{
                      event:
                        "relative after:absolute after:left-1/2 after:-bottom-1 after:-translate-x-1/2 after:w-2 after:h-2 after:rounded-full after:bg-indigo-500",
                    }}
                  />
                </CardContent>
              </Card>
            </div>

            <div>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold">
                  {date 
                    ? `Events on ${format(date, "MMMM d, yyyy")}`
                    : `Events in ${format(month, "MMMM yyyy")}`
                  }
                </h3>
                {date && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setDate(undefined)}
                  >
                    Clear Selection
                  </Button>
                )}
              </div>
              <div className="space-y-4">
                {selectedEvents.length === 0 ? (
                  <div className="text-muted-foreground text-center">
                    No events expected
                  </div>
                ) : (
                  selectedEvents.map((event, index) => (
                    <Card
                      key={index}
                      className="hover:shadow-md transition-shadow"
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <Badge className="bg-primary text-primary-foreground">
                                {event.badge}
                              </Badge>
                            </div>
                            <h4 className="font-bold mb-1">{event.title}</h4>
                            <p className="text-sm text-muted-foreground mb-1">
                              {event.subtitle}
                            </p>
                            <p className="text-sm text-primary font-medium">
                              {format(event.date, "MMMM d, yyyy")}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Future Events Grid */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            Upcoming Events
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {futureEvents.length === 0 ? (
              <div className="text-muted-foreground text-center col-span-3">
                No upcoming events
              </div>
            ) : (
              futureEvents.map((event, index) => (
                <Card
                  key={index}
                  className="hover:shadow-md transition-shadow"
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <Badge className="bg-primary text-primary-foreground">
                            {event.badge}
                          </Badge>
                        </div>
                        <h4 className="font-bold mb-1">{event.title}</h4>
                        <p className="text-sm text-muted-foreground mb-1">
                          {event.subtitle}
                        </p>
                        <p className="text-sm text-primary font-medium">
                          {format(event.date, "MMMM d, yyyy")}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Support a Student Today!
          </h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90">
            Your contribution empowers students to achieve their full potential.
            Join us in making a lasting impact on young lives.
          </p>
          <Link to="/donate">
            <Button
              size="lg"
              variant="secondary"
              className="bg-card text-card-foreground hover:bg-card/90"
            >
              Make a Donation
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Programs;
