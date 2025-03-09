
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Wheat, Truck, ShieldCheck, Leaf } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const featureItems = [
  {
    icon: <Wheat className="h-6 w-6 text-wheat-600" />,
    title: "Premium Quality",
    description: "Our grains are carefully selected from the finest farms to ensure exceptional quality and taste."
  },
  {
    icon: <Truck className="h-6 w-6 text-wheat-600" />,
    title: "Fast Delivery",
    description: "We offer prompt and reliable delivery services to bring fresh grains straight to your doorstep."
  },
  {
    icon: <ShieldCheck className="h-6 w-6 text-wheat-600" />,
    title: "Certified Organic",
    description: "Our products are certified organic, ensuring they are grown without harmful pesticides or chemicals."
  },
  {
    icon: <Leaf className="h-6 w-6 text-wheat-600" />,
    title: "Sustainably Sourced",
    description: "We partner with farmers who practice sustainable agriculture to protect our environment."
  }
];

const grainCategories = [
  {
    name: "Wheat",
    image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6962b3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    description: "Premium wheat varieties for baking and cooking"
  },
  {
    name: "Rice",
    image: "https://images.unsplash.com/photo-1586201375761-83865001e8ac?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    description: "Fine rice grains from sustainable farms"
  },
  {
    name: "Maize",
    image: "https://images.unsplash.com/photo-1551754655-cd27e38d2076?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    description: "Nutritious maize varieties for diverse culinary needs"
  },
  {
    name: "Specialty Grains",
    image: "https://images.unsplash.com/photo-1455853828816-0c301a011711?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    description: "Unique grain selections for health-conscious consumers"
  }
];

const Home = () => {
  return (
    <div className="page-transition pt-16">
      {/* Hero Section */}
      <section className="hero-section min-h-[85vh] flex flex-col items-center justify-center relative">
        <div className="absolute inset-0 -z-20">
          <img 
            src="https://images.unsplash.com/photo-1536657464919-892534f60d6e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
            alt="Wheat field" 
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="container mx-auto px-4 text-center z-10 animate-fadeIn">
          <span className="inline-block text-sm md:text-base px-3 py-1 rounded-full bg-primary/10 text-primary-foreground mb-4">
            Premium Grains for Healthy Living
          </span>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-balance max-w-4xl mx-auto">
            Pure, Natural Grains from Farm to Table
          </h1>
          <p className="text-lg md:text-xl text-foreground/80 mb-8 max-w-2xl mx-auto">
            Experience the exceptional quality of our carefully selected grains, sourced directly from sustainable farms.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              asChild
              size="lg" 
              className="px-8 text-base font-medium"
            >
              <Link to="/products">Shop Now</Link>
            </Button>
            <Button 
              asChild
              variant="outline" 
              size="lg" 
              className="px-8 text-base font-medium"
            >
              <Link to="/about">Learn More</Link>
            </Button>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 md:py-24 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="section-heading mb-8">Why Choose Our Grains</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We pride ourselves on delivering the highest quality grains with exceptional service and commitment to sustainability.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featureItems.map((feature, index) => (
              <div 
                key={index} 
                className="bg-card border border-border/30 rounded-lg p-6 shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="bg-primary/10 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Categories Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="section-heading mb-8">Explore Our Categories</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Browse through our diverse selection of premium grains to find the perfect match for your culinary needs.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {grainCategories.map((category, index) => (
              <Link 
                to="/products" 
                key={index}
                className="group relative overflow-hidden rounded-lg aspect-square"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10" />
                <img 
                  src={category.image} 
                  alt={category.name} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 z-20 flex flex-col justify-end p-6 text-white">
                  <h3 className="text-xl font-semibold mb-2">{category.name}</h3>
                  <p className="text-white/80 text-sm mb-4">{category.description}</p>
                  <div className="flex items-center text-sm font-medium">
                    <span>Explore</span>
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      
      {/* Call to Action Section */}
      <section className="py-16 md:py-24 bg-primary/10">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Experience Premium Quality?</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
            Start your journey with our premium grains today and elevate your culinary creations to new heights.
          </p>
          <Button 
            asChild
            size="lg" 
            className="px-8 text-base font-medium"
          >
            <Link to="/products">Shop Collection</Link>
          </Button>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-card border-t border-border py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between gap-8">
            <div className="mb-8 md:mb-0">
              <div className="flex items-center space-x-2 mb-4">
                <Wheat className="h-6 w-6 text-wheat-600" />
                <span className="font-bold text-xl">Farm Connect</span>
              </div>
              <p className="text-muted-foreground max-w-xs">
                Providing premium quality grains from sustainable farms to your table since 2010.
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              <div>
                <h4 className="font-semibold mb-4">Shop</h4>
                <ul className="space-y-2">
                  <li><Link to="/products" className="text-muted-foreground hover:text-foreground">All Products</Link></li>
                  <li><Link to="/products" className="text-muted-foreground hover:text-foreground">Featured</Link></li>
                  <li><Link to="/products" className="text-muted-foreground hover:text-foreground">New Arrivals</Link></li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold mb-4">Company</h4>
                <ul className="space-y-2">
                  <li><Link to="/about" className="text-muted-foreground hover:text-foreground">About Us</Link></li>
                  <li><Link to="/contact" className="text-muted-foreground hover:text-foreground">Contact</Link></li>
                  <li><Link to="/" className="text-muted-foreground hover:text-foreground">Blog</Link></li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold mb-4">Legal</h4>
                <ul className="space-y-2">
                  <li><Link to="/" className="text-muted-foreground hover:text-foreground">Privacy Policy</Link></li>
                  <li><Link to="/" className="text-muted-foreground hover:text-foreground">Terms of Service</Link></li>
                  <li><Link to="/" className="text-muted-foreground hover:text-foreground">Returns Policy</Link></li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="border-t border-border/60 mt-12 pt-6 text-center text-muted-foreground text-sm">
            &copy; {new Date().getFullYear()} Farm Connect. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
