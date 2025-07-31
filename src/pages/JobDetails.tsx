import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowLeft,
  ArrowRight,
  MapPin,
  Clock,
  DollarSign,
  Calendar,
  Building,
  Users,
  CheckCircle,
  Star
} from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';

const JobDetails = () => {
  const navigate = useNavigate();
  const { jobId } = useParams();

  // Mock detailed job data (in real app, fetch by jobId)
  const jobData = {
    id: jobId,
    title: "Senior Full Stack Developer",
    department: "Engineering",
    location: "Abuja, Nigeria",
    type: "Full-time",
    experience: "3-5 years",
    salary: "₦300,000 - ₦500,000",
    posted: "2024-01-15",
    description: "Join our engineering team to build and scale our marketplace platform. You'll work on exciting challenges including payment integration, real-time features, and scalable architecture that serves thousands of vendors and customers across Nigeria.",
    responsibilities: [
      "Develop and maintain full-stack web applications using React, Node.js, and TypeScript",
      "Design and implement scalable microservices architecture",
      "Integrate payment systems and third-party APIs",
      "Collaborate with product and design teams to deliver exceptional user experiences",
      "Optimize application performance and ensure high availability",
      "Mentor junior developers and contribute to technical decision-making",
      "Participate in code reviews and maintain high code quality standards",
      "Work on mobile-responsive designs and cross-browser compatibility"
    ],
    requirements: [
      "Strong experience with React, Node.js, and TypeScript (3+ years)",
      "Experience with cloud platforms (AWS/Azure) and containerization",
      "Knowledge of microservices architecture and API design",
      "Experience with payment integration (Paystack, Flutterwave, etc.)",
      "Proficiency in database design (PostgreSQL, MongoDB)",
      "Understanding of DevOps practices and CI/CD pipelines",
      "Experience with version control (Git) and agile methodologies",
      "Strong problem-solving skills and attention to detail"
    ],
    preferred: [
      "Experience with e-commerce platforms or marketplace applications",
      "Knowledge of mobile development (React Native)",
      "Understanding of SEO and web analytics",
      "Experience with real-time applications (WebSockets, Socket.io)",
      "Familiarity with testing frameworks (Jest, Cypress)",
      "Open source contributions or personal projects"
    ],
    benefits: [
      "Competitive salary with performance bonuses",
      "Comprehensive health insurance coverage",
      "Professional development budget for courses and conferences",
      "Flexible working hours and remote work options",
      "Modern development tools and equipment",
      "Collaborative and innovative work environment",
      "Opportunity to impact millions of users across Nigeria",
      "Career growth and leadership opportunities"
    ],
    team: {
      size: "8-12 developers",
      structure: "Cross-functional teams with Product, Design, and QA",
      methodology: "Agile/Scrum with 2-week sprints"
    },
    hiringProcess: [
      {
        step: 1,
        title: "Application Review",
        description: "We review your application and resume within 2-3 business days"
      },
      {
        step: 2,
        title: "Technical Screening",
        description: "30-minute phone/video call to discuss your experience and technical background"
      },
      {
        step: 3,
        title: "Technical Interview",
        description: "90-minute technical interview including coding exercises and system design"
      },
      {
        step: 4,
        title: "Team Interview",
        description: "Meet with team members and discuss cultural fit and collaboration"
      },
      {
        step: 5,
        title: "Final Interview",
        description: "Interview with engineering leadership and HR to finalize details"
      }
    ]
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <section className="pt-24 pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <Button variant="ghost" onClick={() => navigate('/careers')} className="mb-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Careers
            </Button>
          </div>

          {/* Job Header */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-3 mb-4">
                    <h1 className="text-3xl font-bold">{jobData.title}</h1>
                    <Badge variant="secondary">{jobData.department}</Badge>
                    <Badge variant="outline">{jobData.type}</Badge>
                  </div>
                  
                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-1" />
                      {jobData.location}
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {jobData.experience}
                    </div>
                    <div className="flex items-center">
                      <DollarSign className="h-4 w-4 mr-1" />
                      {jobData.salary}
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      Posted {new Date(jobData.posted).toLocaleDateString()}
                    </div>
                  </div>

                  <p className="text-muted-foreground">{jobData.description}</p>
                </div>
                
                <div className="lg:ml-6 flex flex-col gap-3 mt-6 lg:mt-0">
                  <Button 
                    className="group"
                    onClick={() => navigate(`/careers/apply/${jobData.id}`)}
                  >
                    Apply Now
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                  <Button variant="outline">
                    Save Job
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Responsibilities */}
              <Card>
                <CardHeader>
                  <CardTitle>Key Responsibilities</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {jobData.responsibilities.map((responsibility, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                        <span>{responsibility}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Requirements */}
              <Card>
                <CardHeader>
                  <CardTitle>Required Qualifications</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {jobData.requirements.map((requirement, index) => (
                      <li key={index} className="flex items-start">
                        <Star className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                        <span>{requirement}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Preferred Qualifications */}
              <Card>
                <CardHeader>
                  <CardTitle>Preferred Qualifications</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {jobData.preferred.map((preference, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-muted-foreground mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-muted-foreground">{preference}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Benefits */}
              <Card>
                <CardHeader>
                  <CardTitle>What We Offer</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {jobData.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Hiring Process */}
              <Card>
                <CardHeader>
                  <CardTitle>Hiring Process</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {jobData.hiringProcess.map((step, index) => (
                      <div key={index} className="flex">
                        <div className="bg-primary text-primary-foreground w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold mr-4 flex-shrink-0">
                          {step.step}
                        </div>
                        <div>
                          <h4 className="font-semibold mb-1">{step.title}</h4>
                          <p className="text-sm text-muted-foreground">{step.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Quick Apply */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Apply</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button 
                    className="w-full group"
                    onClick={() => navigate(`/careers/apply/${jobData.id}`)}
                  >
                    Apply for this Position
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                  <Button variant="outline" className="w-full">
                    Save for Later
                  </Button>
                  <Button variant="ghost" className="w-full">
                    Share this Job
                  </Button>
                </CardContent>
              </Card>

              {/* Team Info */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Users className="h-5 w-5 mr-2" />
                    Team Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <span className="font-medium">Team Size:</span>
                    <p className="text-sm text-muted-foreground">{jobData.team.size}</p>
                  </div>
                  <div>
                    <span className="font-medium">Structure:</span>
                    <p className="text-sm text-muted-foreground">{jobData.team.structure}</p>
                  </div>
                  <div>
                    <span className="font-medium">Methodology:</span>
                    <p className="text-sm text-muted-foreground">{jobData.team.methodology}</p>
                  </div>
                </CardContent>
              </Card>

              {/* Company Info */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Building className="h-5 w-5 mr-2" />
                    About Abuja E-Mall
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    We're revolutionizing e-commerce in Nigeria by connecting local vendors with customers across the country. Join us in building the future of digital marketplaces.
                  </p>
                  <Button variant="outline" size="sm" className="w-full">
                    Learn More About Us
                  </Button>
                </CardContent>
              </Card>

              {/* Contact */}
              <Card>
                <CardHeader>
                  <CardTitle>Questions?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Have questions about this role? Get in touch with our HR team.
                  </p>
                  <Button variant="outline" size="sm" className="w-full">
                    Contact HR
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default JobDetails;