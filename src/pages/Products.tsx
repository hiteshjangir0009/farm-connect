
import React, { useState, useEffect } from 'react';
import { fetchProducts, Product } from '@/services/supabase';
import ProductCard from '@/components/ProductCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import { Search, Filter, Wheat } from 'lucide-react';

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [sortOrder, setSortOrder] = useState('name-asc');
  const [showFilters, setShowFilters] = useState(false);

  // Fetch products on component mount
  useEffect(() => {
    const getProducts = async () => {
      setLoading(true);
      try {
        const data = await fetchProducts();
        setProducts(data);
        setFilteredProducts(data);
      } catch (err) {
        setError('Failed to load products. Please try again later.');
        console.error('Error fetching products:', err);
      } finally {
        setLoading(false);
      }
    };

    getProducts();
  }, []);

  // Filter and sort products when search, category, or sort order changes
  useEffect(() => {
    if (!products.length) return;

    let result = [...products];

    // Apply category filter
    if (categoryFilter !== 'all') {
      result = result.filter(product => product.category.toLowerCase() === categoryFilter.toLowerCase());
    }

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(product => 
        product.name.toLowerCase().includes(query) || 
        product.description.toLowerCase().includes(query)
      );
    }

    // Apply sorting
    result = sortProducts(result, sortOrder);

    setFilteredProducts(result);
  }, [products, searchQuery, categoryFilter, sortOrder]);

  // Sort products based on selected sort order
  const sortProducts = (productsToSort: Product[], order: string): Product[] => {
    const sortedProducts = [...productsToSort];
    
    switch (order) {
      case 'name-asc':
        return sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
      case 'name-desc':
        return sortedProducts.sort((a, b) => b.name.localeCompare(a.name));
      case 'price-asc':
        return sortedProducts.sort((a, b) => a.price - b.price);
      case 'price-desc':
        return sortedProducts.sort((a, b) => b.price - a.price);
      default:
        return sortedProducts;
    }
  };

  // Get unique categories from products
  const categories = ['all', ...new Set(products.map(product => product.category.toLowerCase()))];

  // Render loading skeletons
  const renderSkeletons = () => {
    return Array(8).fill(0).map((_, index) => (
      <div key={index} className="animate-pulse">
        <Skeleton className="aspect-square w-full rounded-md" />
        <Skeleton className="h-4 w-2/3 mt-4" />
        <Skeleton className="h-4 w-1/3 mt-2" />
        <Skeleton className="h-10 w-full mt-4" />
      </div>
    ));
  };

  return (
    <div className="page-transition pt-24 pb-16">
      <div className="container mx-auto px-4">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Our Premium Grains</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore our selection of high-quality grains sourced from sustainable farms around the world.
          </p>
        </div>

        {/* Filters & Search */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-4">
            <div className="relative w-full md:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="w-full md:w-auto"
            >
              <Filter className="mr-2 h-4 w-4" />
              {showFilters ? 'Hide Filters' : 'Show Filters'}
            </Button>
          </div>
          
          {showFilters && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 border rounded-lg animate-slideDown">
              <div>
                <label className="text-sm font-medium mb-2 block">Category</label>
                <Select
                  value={categoryFilter}
                  onValueChange={setCategoryFilter}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="text-sm font-medium mb-2 block">Sort By</label>
                <Select
                  value={sortOrder}
                  onValueChange={setSortOrder}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="name-asc">Name (A to Z)</SelectItem>
                    <SelectItem value="name-desc">Name (Z to A)</SelectItem>
                    <SelectItem value="price-asc">Price (Low to High)</SelectItem>
                    <SelectItem value="price-desc">Price (High to Low)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="product-grid">
            {renderSkeletons()}
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <div className="mb-4 text-destructive">
              <Wheat className="h-12 w-12 mx-auto opacity-20" />
            </div>
            <h3 className="text-xl font-medium mb-2">Something went wrong</h3>
            <p className="text-muted-foreground mb-6">{error}</p>
            <Button 
              onClick={() => window.location.reload()}
              variant="outline"
            >
              Try Again
            </Button>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <div className="mb-4">
              <Search className="h-12 w-12 mx-auto text-muted-foreground opacity-20" />
            </div>
            <h3 className="text-xl font-medium mb-2">No products found</h3>
            <p className="text-muted-foreground mb-6">Try adjusting your search or filter criteria</p>
            <Button 
              onClick={() => {
                setSearchQuery('');
                setCategoryFilter('all');
                setSortOrder('name-asc');
              }}
              variant="outline"
            >
              Clear Filters
            </Button>
          </div>
        ) : (
          <>
            <p className="text-sm text-muted-foreground mb-6">
              Showing {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
            </p>
            <div className="product-grid">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Products;
