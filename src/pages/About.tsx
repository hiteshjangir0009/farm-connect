
import React from 'react';
import { Wheat, Award, GraduationCap, Leaf } from 'lucide-react';

const About = () => {
  return (
    <div className="page-transition pt-16">
      {/* Hero Section */}
      <section className="min-h-[60vh] flex flex-col items-center justify-center relative bg-secondary">
        <div className="container mx-auto px-4 py-24 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">About Grain Grove</h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Your trusted source for premium quality organic grains since 2010.
          </p>
        </div>
      </section>
      
      {/* Our Story Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Story</h2>
              <p className="text-muted-foreground mb-4">
                Grain Grove was founded in 2010 with a simple mission: to provide high-quality organic grains to health-conscious consumers while supporting sustainable farming practices.
              </p>
              <p className="text-muted-foreground mb-4">
                What started as a small family operation has grown into a trusted supplier for thousands of households across the country, all while maintaining our commitment to quality, sustainability, and supporting local farmers.
              </p>
              <p className="text-muted-foreground">
                Today, we continue to expand our selection of premium grains while staying true to our founding principles of quality, sustainability, and community.
              </p>
            </div>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1464226184884-fa280b87c399?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
                alt="Farmers in a wheat field" 
                className="rounded-lg shadow-lg w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Our Values Section */}
      <section className="py-16 md:py-24 bg-secondary">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Wheat className="h-10 w-10 text-wheat-600" />,
                title: "Quality",
                description: "We rigorously test and select only the finest grains to ensure exceptional taste, texture, and nutritional value."
              },
              {
                icon: <Leaf className="h-10 w-10 text-green-600" />,
                title: "Sustainability",
                description: "We partner with farmers who practice sustainable agriculture to protect our environment for future generations."
              },
              {
                icon: <Award className="h-10 w-10 text-amber-600" />,
                title: "Integrity",
                description: "We maintain honest and transparent relationships with our customers, partners, and the communities we serve."
              }
            ].map((value, index) => (
              <div key={index} className="bg-card p-8 rounded-lg shadow-sm text-center">
                <div className="flex justify-center mb-4">
                  {value.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                <p className="text-muted-foreground">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Team Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Johnson",
                role: "Founder & CEO",
                image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80"
              },
              {
                name: "Michael Chen",
                role: "Head of Grain Selection",
                image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80"
              },
              {
                name: "Elena Rodriguez",
                role: "Sustainability Director",
                image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1961&q=80"
              }
            ].map((member, index) => (
              <div key={index} className="bg-card border border-border/50 rounded-lg overflow-hidden shadow-sm transition-transform hover:-translate-y-1 duration-300">
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="w-full h-80 object-cover object-center"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                  <p className="text-muted-foreground">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Certifications Section */}
      <section className="py-16 md:py-24 bg-primary/10">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-12">Our Certifications</h2>
          <div className="flex flex-wrap justify-center gap-8">
            {[
              {
                icon: <GraduationCap className="h-16 w-16" />,
                name: "USDA Organic"
              },
              {
                icon: <Leaf className="h-16 w-16" />,
                name: "Non-GMO Project"
              },
              {
                icon: <Award className="h-16 w-16" />,
                name: "Fair Trade Certified"
              }
            ].map((cert, index) => (
              <div key={index} className="flex flex-col items-center p-6">
                {cert.icon}
                <span className="mt-2 font-medium">{cert.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
