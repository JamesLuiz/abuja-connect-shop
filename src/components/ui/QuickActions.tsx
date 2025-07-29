import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MessageCircle, Phone, Mail, Calendar, Clock, User } from 'lucide-react';
import { useState } from 'react';

const QuickActions = () => {
  const [liveChatOpen, setLiveChatOpen] = useState(false);
  const [scheduleCallOpen, setScheduleCallOpen] = useState(false);
  const [emailSupportOpen, setEmailSupportOpen] = useState(false);

  return (
    <div className="grid md:grid-cols-3 gap-6">
      {/* Start Live Chat */}
      <Dialog open={liveChatOpen} onOpenChange={setLiveChatOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" className="h-24 flex-col space-y-2 hover:bg-primary/5">
            <MessageCircle className="h-8 w-8 text-primary" />
            <span className="font-medium">Start Live Chat</span>
            <span className="text-xs text-muted-foreground">Get instant help</span>
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center">
              <MessageCircle className="h-5 w-5 mr-2 text-primary" />
              Start Live Chat
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="bg-muted/50 p-4 rounded-lg">
              <div className="flex items-center mb-2">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                <span className="text-sm font-medium">Support Team Online</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Average response time: 2 minutes
              </p>
            </div>
            
            <div className="space-y-3">
              <div>
                <Label htmlFor="chat-name">Your Name</Label>
                <Input id="chat-name" placeholder="Enter your name" />
              </div>
              <div>
                <Label htmlFor="chat-email">Email</Label>
                <Input id="chat-email" type="email" placeholder="your@email.com" />
              </div>
              <div>
                <Label htmlFor="chat-message">How can we help?</Label>
                <Textarea id="chat-message" placeholder="Describe your issue..." rows={3} />
              </div>
            </div>
            
            <Button className="w-full">
              <MessageCircle className="h-4 w-4 mr-2" />
              Start Chat
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Schedule a Call */}
      <Dialog open={scheduleCallOpen} onOpenChange={setScheduleCallOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" className="h-24 flex-col space-y-2 hover:bg-accent/5">
            <Phone className="h-8 w-8 text-accent" />
            <span className="font-medium">Schedule a Call</span>
            <span className="text-xs text-muted-foreground">Book consultation</span>
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center">
              <Phone className="h-5 w-5 mr-2 text-accent" />
              Schedule a Call
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="call-name">Full Name</Label>
                <Input id="call-name" placeholder="Your name" />
              </div>
              <div>
                <Label htmlFor="call-phone">Phone Number</Label>
                <Input id="call-phone" placeholder="+234 xxx xxxx xxx" />
              </div>
            </div>
            
            <div>
              <Label htmlFor="call-email">Email</Label>
              <Input id="call-email" type="email" placeholder="your@email.com" />
            </div>
            
            <div>
              <Label htmlFor="call-type">Call Type</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select call type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="vendor-onboarding">Vendor Onboarding</SelectItem>
                  <SelectItem value="technical-support">Technical Support</SelectItem>
                  <SelectItem value="business-consultation">Business Consultation</SelectItem>
                  <SelectItem value="general-inquiry">General Inquiry</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="call-date">Preferred Date</Label>
                <Input id="call-date" type="date" />
              </div>
              <div>
                <Label htmlFor="call-time">Preferred Time</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select time" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="09:00">9:00 AM</SelectItem>
                    <SelectItem value="10:00">10:00 AM</SelectItem>
                    <SelectItem value="11:00">11:00 AM</SelectItem>
                    <SelectItem value="14:00">2:00 PM</SelectItem>
                    <SelectItem value="15:00">3:00 PM</SelectItem>
                    <SelectItem value="16:00">4:00 PM</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div>
              <Label htmlFor="call-notes">Additional Notes</Label>
              <Textarea id="call-notes" placeholder="Tell us what you'd like to discuss..." rows={3} />
            </div>
            
            <Button className="w-full">
              <Calendar className="h-4 w-4 mr-2" />
              Schedule Call
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Email Support */}
      <Dialog open={emailSupportOpen} onOpenChange={setEmailSupportOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" className="h-24 flex-col space-y-2 hover:bg-destructive/5">
            <Mail className="h-8 w-8 text-destructive" />
            <span className="font-medium">Email Support</span>
            <span className="text-xs text-muted-foreground">Send detailed inquiry</span>
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center">
              <Mail className="h-5 w-5 mr-2 text-destructive" />
              Email Support
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="bg-muted/50 p-4 rounded-lg">
              <div className="flex items-center mb-2">
                <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                <span className="text-sm font-medium">Response Time</span>
              </div>
              <p className="text-sm text-muted-foreground">
                We typically respond within 24 hours
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="email-name">Full Name</Label>
                <Input id="email-name" placeholder="Your name" />
              </div>
              <div>
                <Label htmlFor="email-contact">Email</Label>
                <Input id="email-contact" type="email" placeholder="your@email.com" />
              </div>
            </div>
            
            <div>
              <Label htmlFor="email-subject">Subject</Label>
              <Input id="email-subject" placeholder="What is this regarding?" />
            </div>
            
            <div>
              <Label htmlFor="email-category">Category</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="account">Account Issues</SelectItem>
                  <SelectItem value="technical">Technical Support</SelectItem>
                  <SelectItem value="vendor">Vendor Support</SelectItem>
                  <SelectItem value="billing">Billing & Payments</SelectItem>
                  <SelectItem value="general">General Inquiry</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="email-message">Message</Label>
              <Textarea 
                id="email-message" 
                placeholder="Please provide as much detail as possible..." 
                rows={4} 
              />
            </div>
            
            <Button className="w-full">
              <Mail className="h-4 w-4 mr-2" />
              Send Email
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default QuickActions;