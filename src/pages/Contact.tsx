
import React from 'react';
import { Phone, Mail, MapPin, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/components/ui/use-toast';

const Contact = () => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // In a real app, you would send the form data to your backend
    toast({
      title: "Message sent",
      description: "We've received your message and will get back to you soon.",
    });
    // Reset the form
    e.currentTarget.reset();
  };

  return (
    <div className="page-transition pt-16">
      {/* Hero Section */}
      <section className="min-h-[40vh] flex flex-col items-center justify-center relative bg-secondary">
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Contact Us</h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Have questions or feedback? We'd love to hear from you.
          </p>
        </div>
      </section>
      
      {/* Contact Information */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {[
              {
                icon: <Phone className="h-8 w-8" />,
                title: "Phone",
                details: "+1 (123) 456-7890",
                description: "Mon-Fri from 8am to 5pm"
              },
              {
                icon: <Mail className="h-8 w-8" />,
                title: "Email",
                details: "support@graingrove.com",
                description: "We'll respond as soon as possible"
              },
              {
                icon: <MapPin className="h-8 w-8" />,
                title: "Address",
                details: "123 Harvest Lane, Wheatfield, CA 94107",
                description: "Open for visits by appointment"
              }
            ].map((item, index) => (
              <div key={index} className="bg-card border border-border/50 rounded-lg p-8 text-center transition-transform hover:-translate-y-1 duration-300">
                <div className="inline-flex items-center justify-center bg-primary/10 rounded-full p-3 mb-4">
                  {item.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="font-medium mb-1">{item.details}</p>
                <p className="text-muted-foreground text-sm">{item.description}</p>
              </div>
            ))}
          </div>
          
          {/* Contact Form and Map */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Your Name</Label>
                    <Input id="name" placeholder="John Doe" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" type="email" placeholder="john@example.com" required />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input id="subject" placeholder="How can we help you?" required />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea 
                    id="message" 
                    placeholder="Tell us what you need..." 
                    className="min-h-[150px]"
                    required 
                  />
                </div>
                
                <Button type="submit" className="w-full sm:w-auto">
                  <Send className="mr-2 h-4 w-4" />
                  Send Message
                </Button>
              </form>
            </div>
            
            <div>
              <h2 className="text-2xl font-bold mb-6">Our Location</h2>
              <div className="h-[400px] bg-muted rounded-lg overflow-hidden">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.0982682741187!2d-122.41941568481132!3d37.77492957975928!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085809c6c8f4459%3A0xb10ed6d9b5050fa5!2sTwitter!5e0!3m2!1sen!2sus!4v1648106318093!5m2!1sen!2sus" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section className="py-16 md:py-24 bg-secondary">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Frequently Asked Questions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              {
                question: "How are your grains sourced?",
                answer: "We source our grains directly from small-scale farmers who practice sustainable and organic farming methods. We visit each farm personally to ensure they meet our quality standards."
              },
              {
                question: "Do you ship internationally?",
                answer: "Currently, we only ship within the continental United States. We're working on expanding our shipping options to serve more customers around the world."
              },
              {
                question: "Are all your products organic?",
                answer: "Yes, all of our grains are certified organic. We believe in providing the highest quality products that are free from harmful pesticides and chemicals."
              },
              {
                question: "What is your return policy?",
                answer: "We accept returns within 30 days of purchase if you're not completely satisfied with your order. Please contact our customer service team to initiate the return process."
              }
            ].map((faq, index) => (
              <div key={index} className="bg-card border border-border/50 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-2">{faq.question}</h3>
                <p className="text-muted-foreground">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
