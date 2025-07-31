import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  MapPin, 
  Clock, 
  DollarSign, 
  Users, 
  TrendingUp, 
  Heart, 
  Shield, 
  Zap,
  ArrowRight,
  Building,
  Calendar
} from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Careers = () => {
  const navigate = useNavigate();
  const openPositions = [
    {
      id: 1,
      title: "Senior Full Stack Developer",
      department: "Engineering",
      location: "Abuja, Nigeria",
      type: "Full-time",
      experience: "3-5 years",
      salary: "₦300,000 - ₦500,000",
      description: "Join our engineering team to build and scale our marketplace platform.",
      requirements: [
        "Strong experience with React, Node.js, and TypeScript",
        "Experience with cloud platforms (AWS/Azure)",
        "Knowledge of microservices architecture",
        "Experience with payment integration"
      ],
      posted: "2024-01-15"
    },
    {
      id: 2,
      title: "Product Marketing Manager",
      department: "Marketing",
      location: "Abuja, Nigeria",
      type: "Full-time",
      experience: "2-4 years",
      salary: "₦200,000 - ₦350,000",
      description: "Drive product adoption and growth through strategic marketing initiatives.",
      requirements: [
        "Experience in digital marketing and product management",
        "Strong analytical and data-driven mindset",
        "Excellent communication skills",
        "Experience with e-commerce platforms"
      ],
      posted: "2024-01-12"
    },
    {
      id: 3,
      title: "Customer Success Specialist",
      department: "Customer Success",
      location: "Remote",
      type: "Full-time",
      experience: "1-3 years",
      salary: "₦150,000 - ₦250,000",
      description: "Help our vendors and customers succeed on our platform.",
      requirements: [
        "Excellent customer service skills",
        "Experience with CRM systems",
        "Strong problem-solving abilities",
        "Fluency in English and local languages"
      ],
      posted: "2024-01-10"
    },
    {
      id: 4,
      title: "UX/UI Designer",
      department: "Design",
      location: "Abuja, Nigeria",
      type: "Full-time",
      experience: "2-4 years",
      salary: "₦180,000 - ₦300,000",
      description: "Create intuitive and beautiful user experiences for our platform.",
      requirements: [
        "Strong portfolio showcasing UX/UI work",
        "Proficiency in Figma, Adobe Creative Suite",
        "Understanding of user-centered design principles",
        "Experience with mobile-first design"
      ],
      posted: "2024-01-08"
    },
    {
      id: 5,
      title: "Business Development Manager",
      department: "Business Development",
      location: "Lagos/Abuja",
      type: "Full-time",
      experience: "3-6 years",
      salary: "₦250,000 - ₦400,000",
      description: "Drive vendor acquisition and strategic partnerships.",
      requirements: [
        "Strong sales and negotiation skills",
        "Experience in B2B sales or partnerships",
        "Understanding of e-commerce ecosystem",
        "Excellent relationship building skills"
      ],
      posted: "2024-01-05"
    },
    {
      id: 6,
      title: "Data Analyst",
      department: "Analytics",
      location: "Remote",
      type: "Full-time",
      experience: "2-4 years",
      salary: "₦200,000 - ₦350,000",
      description: "Analyze platform data to drive business insights and decisions.",
      requirements: [
        "Strong experience with SQL and Python/R",
        "Experience with data visualization tools",
        "Statistical analysis and modeling skills",
        "Business intelligence experience"
      ],
      posted: "2024-01-03"
    }
  ];

  const benefits = [
    {
      icon: Heart,
      title: "Health & Wellness",
      description: "Comprehensive health insurance and wellness programs"
    },
    {
      icon: TrendingUp,
      title: "Career Growth",
      description: "Clear career progression paths and learning opportunities"
    },
    {
      icon: Shield,
      title: "Work-Life Balance",
      description: "Flexible working hours and remote work options"
    },
    {
      icon: DollarSign,
      title: "Competitive Salary",
      description: "Market-leading compensation and performance bonuses"
    },
    {
      icon: Users,
      title: "Great Team",
      description: "Work with passionate and talented professionals"
    },
    {
      icon: Zap,
      title: "Innovation",
      description: "Access to latest technologies and tools"
    }
  ];

  const companyValues = [
    {
      title: "Customer First",
      description: "We prioritize our customers' success and satisfaction in everything we do."
    },
    {
      title: "Innovation",
      description: "We embrace change and continuously innovate to solve complex problems."
    },
    {
      title: "Integrity",
      description: "We act with honesty, transparency, and ethical behavior in all our interactions."
    },
    {
      title: "Collaboration",
      description: "We believe in the power of teamwork and collective achievement."
    }
  ];

  const departments = [...new Set(openPositions.map(pos => pos.department))];
  const [selectedDepartment, setSelectedDepartment] = useState('All Departments');
  
  const filteredPositions = selectedDepartment === 'All Departments' 
    ? openPositions 
    : openPositions.filter(pos => pos.department === selectedDepartment);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Join the <span className="bg-gradient-primary bg-clip-text text-transparent">Abuja E-Mall</span> Team
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Help us revolutionize e-commerce in Nigeria. Build the future of digital marketplaces with a passionate team.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="group">
              View Open Positions
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button size="lg" variant="outline">
              Learn About Our Culture
            </Button>
          </div>
        </div>
      </section>

      {/* Company Values */}
      <section className="py-16 px-4 bg-secondary/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Our Values</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {companyValues.map((value, index) => (
              <Card key={index} className="text-center">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Why Work With Us?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <Card key={index} className="hover:shadow-elegant transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <benefit.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{benefit.title}</h3>
                  <p className="text-muted-foreground">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="py-16 px-4 bg-secondary/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Open Positions</h2>
            <p className="text-muted-foreground">Join our growing team and make an impact</p>
          </div>

          {/* Department Filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            <Button 
              variant={selectedDepartment === 'All Departments' ? "default" : "outline"} 
              className="rounded-full"
              onClick={() => setSelectedDepartment('All Departments')}
            >
              All Departments
            </Button>
            {departments.map((dept) => (
              <Button 
                key={dept} 
                variant={selectedDepartment === dept ? "default" : "outline"} 
                className="rounded-full"
                onClick={() => setSelectedDepartment(dept)}
              >
                {dept}
              </Button>
            ))}
          </div>

          {/* Job Listings */}
          <div className="space-y-6">
            {filteredPositions.map((job) => (
              <Card key={job.id} className="hover:shadow-elegant transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-3 mb-3">
                        <h3 className="text-xl font-bold">{job.title}</h3>
                        <Badge variant="secondary">{job.department}</Badge>
                        <Badge variant="outline">{job.type}</Badge>
                      </div>
                      
                      <p className="text-muted-foreground mb-4">{job.description}</p>
                      
                      <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 mr-1" />
                          {job.location}
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          {job.experience}
                        </div>
                        <div className="flex items-center">
                          <DollarSign className="h-4 w-4 mr-1" />
                          {job.salary}
                        </div>
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          Posted {new Date(job.posted).toLocaleDateString()}
                        </div>
                      </div>

                      <div className="mb-4">
                        <h4 className="font-semibold mb-2">Key Requirements:</h4>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          {job.requirements.slice(0, 2).map((req, index) => (
                            <li key={index} className="flex items-start">
                              <span className="text-primary mr-2">•</span>
                              {req}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    
                    <div className="lg:ml-6 flex flex-col sm:flex-row lg:flex-col gap-3">
                      <Button className="group" onClick={() => navigate(`/careers/apply/${job.id}`)}>
                        Apply Now
                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </Button>
                      <Button variant="outline" onClick={() => navigate(`/careers/job/${job.id}`)}>
                        View Details
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Application Process */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">Our Hiring Process</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { step: "1", title: "Apply Online", description: "Submit your application and resume" },
              { step: "2", title: "Initial Review", description: "We review your application within 5 business days" },
              { step: "3", title: "Interview Process", description: "Technical and cultural fit interviews" },
              { step: "4", title: "Welcome Aboard", description: "Onboarding and getting started" }
            ].map((process, index) => (
              <div key={index} className="relative">
                <div className="bg-primary text-primary-foreground w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-lg font-bold">
                  {process.step}
                </div>
                <h3 className="font-semibold mb-2">{process.title}</h3>
                <p className="text-sm text-muted-foreground">{process.description}</p>
                {index < 3 && (
                  <ArrowRight className="hidden md:block absolute top-6 -right-3 h-5 w-5 text-muted-foreground" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-secondary/30">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Join Us?</h2>
          <p className="text-muted-foreground mb-8">
            Don't see a role that fits? We're always looking for talented individuals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="group">
              Send Us Your Resume
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button size="lg" variant="outline">
              Follow Us on LinkedIn
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Careers;