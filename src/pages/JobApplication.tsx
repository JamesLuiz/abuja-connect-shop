import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowLeft,
  Upload,
  FileText,
  MapPin,
  Clock,
  DollarSign,
  Building
} from 'lucide-react';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

const JobApplication = () => {
  const navigate = useNavigate();
  const { jobId } = useParams();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    experience: '',
    education: '',
    skills: '',
    motivation: '',
    availability: '',
    salary: '',
    portfolio: '',
    references: ''
  });
  
  const [resume, setResume] = useState<File | null>(null);
  const [coverLetter, setCoverLetter] = useState<File | null>(null);

  // Mock job data (in real app, fetch by jobId)
  const jobData = {
    id: jobId,
    title: "Senior Full Stack Developer",
    department: "Engineering",
    location: "Abuja, Nigeria",
    type: "Full-time",
    experience: "3-5 years",
    salary: "₦300,000 - ₦500,000"
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, type: 'resume' | 'coverLetter') => {
    const file = e.target.files?.[0];
    if (file) {
      // Check file type
      const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      if (!allowedTypes.includes(file.type)) {
        toast({
          title: "Invalid file type",
          description: "Please upload a PDF, DOC, or DOCX file.",
          variant: "destructive",
        });
        return;
      }
      
      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Please upload a file smaller than 5MB.",
          variant: "destructive",
        });
        return;
      }
      
      if (type === 'resume') {
        setResume(file);
      } else {
        setCoverLetter(file);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!resume) {
      toast({
        title: "Resume required",
        description: "Please upload your resume to continue.",
        variant: "destructive",
      });
      return;
    }

    try {
      // Simulate application submission
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Application Submitted!",
        description: "Thank you for your application. We'll review it and get back to you within 5 business days.",
      });
      
      navigate('/careers');
    } catch (error) {
      toast({
        title: "Submission Failed",
        description: "There was an error submitting your application. Please try again.",
        variant: "destructive",
      });
    }
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
            
            {/* Job Summary */}
            <Card className="mb-8">
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-3 mb-3">
                      <h1 className="text-2xl font-bold">{jobData.title}</h1>
                      <Badge variant="secondary">{jobData.department}</Badge>
                      <Badge variant="outline">{jobData.type}</Badge>
                    </div>
                    
                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
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
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <h2 className="text-3xl font-bold mb-4">
              Apply for <span className="bg-gradient-primary bg-clip-text text-transparent">Position</span>
            </h2>
            <p className="text-muted-foreground text-lg">
              Complete the form below to submit your application
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Personal Information */}
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name *</Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      placeholder="Your first name"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name *</Label>
                    <Input
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      placeholder="Your last name"
                      required
                    />
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="your.email@example.com"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="+234 800 000 0000"
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="Your current address"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Professional Information */}
            <Card>
              <CardHeader>
                <CardTitle>Professional Background</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="experience">Work Experience *</Label>
                  <Textarea
                    id="experience"
                    name="experience"
                    value={formData.experience}
                    onChange={handleInputChange}
                    placeholder="Describe your relevant work experience, including job titles, companies, and key responsibilities..."
                    rows={4}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="education">Education *</Label>
                  <Textarea
                    id="education"
                    name="education"
                    value={formData.education}
                    onChange={handleInputChange}
                    placeholder="List your educational background, including degrees, institutions, and graduation years..."
                    rows={3}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="skills">Key Skills *</Label>
                  <Textarea
                    id="skills"
                    name="skills"
                    value={formData.skills}
                    onChange={handleInputChange}
                    placeholder="List your technical and soft skills relevant to this position..."
                    rows={3}
                    required
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="availability">Availability</Label>
                    <select
                      id="availability"
                      name="availability"
                      value={formData.availability}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded-md bg-background"
                    >
                      <option value="">Select availability</option>
                      <option value="immediately">Immediately</option>
                      <option value="2-weeks">2 weeks notice</option>
                      <option value="1-month">1 month notice</option>
                      <option value="negotiable">Negotiable</option>
                    </select>
                  </div>
                  <div>
                    <Label htmlFor="salary">Expected Salary</Label>
                    <Input
                      id="salary"
                      name="salary"
                      value={formData.salary}
                      onChange={handleInputChange}
                      placeholder="₦000,000 - ₦000,000"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="portfolio">Portfolio/LinkedIn (Optional)</Label>
                  <Input
                    id="portfolio"
                    name="portfolio"
                    type="url"
                    value={formData.portfolio}
                    onChange={handleInputChange}
                    placeholder="https://your-portfolio.com or LinkedIn URL"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Documents Upload */}
            <Card>
              <CardHeader>
                <CardTitle>Documents</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Resume Upload */}
                <div>
                  <Label className="text-base font-medium">Resume/CV *</Label>
                  <div className="mt-2 border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
                    <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground mb-2">
                      Upload your resume (PDF, DOC, DOCX - Max 5MB)
                    </p>
                    <input
                      type="file"
                      onChange={(e) => handleFileUpload(e, 'resume')}
                      accept=".pdf,.doc,.docx"
                      className="hidden"
                      id="resume-upload"
                    />
                    <Label htmlFor="resume-upload" className="inline-block">
                      <Button type="button" variant="outline" className="cursor-pointer">
                        <FileText className="h-4 w-4 mr-2" />
                        Choose File
                      </Button>
                    </Label>
                    {resume && (
                      <div className="mt-3 p-2 bg-secondary/30 rounded">
                        <p className="text-sm font-medium">{resume.name}</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Cover Letter Upload */}
                <div>
                  <Label className="text-base font-medium">Cover Letter (Optional)</Label>
                  <div className="mt-2 border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
                    <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground mb-2">
                      Upload your cover letter (PDF, DOC, DOCX - Max 5MB)
                    </p>
                    <input
                      type="file"
                      onChange={(e) => handleFileUpload(e, 'coverLetter')}
                      accept=".pdf,.doc,.docx"
                      className="hidden"
                      id="cover-letter-upload"
                    />
                    <Label htmlFor="cover-letter-upload" className="inline-block">
                      <Button type="button" variant="outline" className="cursor-pointer">
                        <FileText className="h-4 w-4 mr-2" />
                        Choose File
                      </Button>
                    </Label>
                    {coverLetter && (
                      <div className="mt-3 p-2 bg-secondary/30 rounded">
                        <p className="text-sm font-medium">{coverLetter.name}</p>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Additional Information */}
            <Card>
              <CardHeader>
                <CardTitle>Additional Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="motivation">Why do you want to work with us? *</Label>
                  <Textarea
                    id="motivation"
                    name="motivation"
                    value={formData.motivation}
                    onChange={handleInputChange}
                    placeholder="Tell us what motivates you to join Abuja E-Mall and how you can contribute to our mission..."
                    rows={4}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="references">References (Optional)</Label>
                  <Textarea
                    id="references"
                    name="references"
                    value={formData.references}
                    onChange={handleInputChange}
                    placeholder="Provide contact information for 2-3 professional references..."
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Submit Button */}
            <div className="flex justify-end space-x-4">
              <Button type="button" variant="outline" onClick={() => navigate('/careers')}>
                Cancel
              </Button>
              <Button type="submit" className="group">
                Submit Application
                <ArrowLeft className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform rotate-180" />
              </Button>
            </div>
          </form>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default JobApplication;