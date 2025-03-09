
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Menu, X, Wheat } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const Navbar = () => {
  const { itemCount } = useCart();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // Change navbar style on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Close mobile menu when location changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);
  
  // Navigation links
  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Products', path: '/products' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];
  
  return (
    <header 
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled 
          ? 'bg-white/90 backdrop-blur-md shadow-sm py-3' 
          : 'bg-transparent py-5'
      )}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <Link 
          to="/" 
          className="flex items-center space-x-2 transition-transform duration-300 hover:scale-105"
        >
          <Wheat className="h-7 w-7 text-wheat-600" />
          <span className="font-bold text-xl text-foreground">Grain Grove</span>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={cn(
                'nav-item text-foreground/80 hover:text-foreground font-medium transition-colors py-1',
                location.pathname === link.path && 'text-foreground after:w-full'
              )}
            >
              {link.name}
            </Link>
          ))}
        </nav>
        
        {/* Cart Button */}
        <div className="flex items-center">
          <Link to="/cart">
            <Button 
              variant="ghost"
              size="icon"
              className="relative btn-hover"
              aria-label="Shopping Cart"
            >
              <ShoppingCart className="h-5 w-5" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center animate-scaleIn">
                  {itemCount}
                </span>
              )}
            </Button>
          </Link>
          
          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="icon"
            className="ml-2 md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Close Menu" : "Open Menu"}
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>
      
      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-background border-b border-border animate-slideDown">
          <nav className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  'px-4 py-2 rounded-md transition-colors',
                  location.pathname === link.path 
                    ? 'bg-secondary text-foreground font-medium' 
                    : 'text-foreground/70 hover:bg-secondary/50'
                )}
              >
                {link.name}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
