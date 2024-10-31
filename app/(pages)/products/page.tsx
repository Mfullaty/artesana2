"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ChevronLeft,
  ChevronRight,
  Check,
  Search,
  Filter,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import CallToAction from "@/components/CallToAction";
import FeaturedProducts from "@/components/sections/FeaturedProducts";

interface Product {
  id: string;
  name: string;
  description: string;
  origin: string;
  moisture: string;
  color: string;
  form: string;
  cultivation: string;
  cultivationType: string;
  purity: string;
  grades: string;
  measurement: string;
  inStock: number;
  images: string[];
}

interface PaginationInfo {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

interface Filters {
  form: string[];
  cultivation: string[];
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [pagination, setPagination] = useState<PaginationInfo>({
    page: 1,
    limit: 6,
    total: 0,
    totalPages: 0,
  });
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<Filters>({
    form: [],
    cultivation: [],
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, [pagination.page]);

  useEffect(() => {
    applyFiltersAndSearch();
  }, [filters, searchTerm, products]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `/api/products?page=${pagination.page}&limit=${pagination.limit}`
      );
      const data = await response.json();
      setProducts(data.products);
      setPagination(data.pagination);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  const applyFiltersAndSearch = () => {
    const filtered = products.filter((product) => {
      const matchesFilters =
        (filters.form.length === 0 || filters.form.includes(product.form)) &&
        (filters.cultivation.length === 0 ||
          filters.cultivation.includes(product.cultivation));
      const matchesSearch =
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.origin.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesFilters && matchesSearch;
    });
    setFilteredProducts(filtered);
  };

  const handleFilterChange = (filterType: keyof Filters, value: string) => {
    setFilters((prevFilters) => {
      const updatedFilters = { ...prevFilters };
      if (updatedFilters[filterType].includes(value)) {
        updatedFilters[filterType] = updatedFilters[filterType].filter(
          (item) => item !== value
        );
      } else {
        updatedFilters[filterType] = [...updatedFilters[filterType], value];
      }
      return updatedFilters;
    });
  };

  const handlePageChange = (newPage: number) => {
    setPagination((prev) => ({ ...prev, page: newPage }));
  };

  const ProductCard = ({ product }: { product: Product }) => (
    <Link href={`/products/${product.id}`} passHref>
      <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg cursor-pointer">
        <div className="aspect-square overflow-hidden">
          <Image
            src={product.images[0] || "/placeholder.svg?height=400&width=400"}
            alt={product.name}
            width={400}
            height={400}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <CardContent className="p-6">
          <div className="mb-2">
            <p className="text-sm text-gray-700 font-bold capitalize">
              ORIGIN: {product.origin}
            </p>
          </div>
          <h3 className="font-bold text-2xl mb-2">{product.name}</h3>
          <div className="flex justify-between text-sm text-primary font-bold mb-4">
            <span>Purity: {product.purity}</span>
            <span>
              In Stock: {product.inStock} {product.measurement}
            </span>
          </div>
          <p className="text-gray-600 mb-2 line-clamp-3">
            {product.description}
          </p>

          <div className="grid grid-cols-2 gap-4 text-sm">
            {[
              { label: "Moisture", value: product.moisture },
              { label: "Grades", value: product.grades },
              { label: "Color", value: product.color },
              { label: "Cultivation", value: product.cultivation },
              { label: "Form", value: product.form },
            ].map(({ label, value }) => (
              <div key={label} className="flex items-center">
                <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center mr-2 flex-shrink-0">
                  <Check className="h-4 w-4 text-white font-bold" />
                </div>
                <span className="font-medium mr-1">{label}:</span> {value}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </Link>
  );

  const FilterModal = () => (
    <Dialog open={isFilterOpen} onOpenChange={setIsFilterOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="mb-4"
          onClick={() => setIsFilterOpen(true)}
        >
          <Filter className="mr-2 h-4 w-4" /> Filter Products
        </Button>
      </DialogTrigger>
      <DialogContent
        className="sm:max-w-[425px]"
        onPointerDownOutside={() => setIsFilterOpen(false)}
      >
        <DialogHeader>
          <DialogTitle>Filter Products</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {[
            {
              title: "Form",
              key: "form" as keyof Filters,
              options: ["whole", "pieces", "Powder"],
            },
            {
              title: "Cultivation",
              key: "cultivation" as keyof Filters,
              options: ["organic", "conventional"],
            },
          ].map(({ title, key, options }) => (
            <div key={key} className="space-y-2">
              <h3 className="font-semibold">{title}</h3>
              <div className="grid grid-cols-2 gap-2">
                {options.map((option) => (
                  <label key={option} className="flex items-center space-x-2">
                    <Checkbox
                      id={`${key}-${option}`}
                      checked={filters[key].includes(option)}
                      onCheckedChange={() => handleFilterChange(key, option)}
                    />
                    <span>{option}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>
        <Button
          variant="outline"
          onClick={() => setIsFilterOpen(false)}
          className="mt-4"
        >
          <X className="mr-2 h-4 w-4" /> Close
        </Button>
      </DialogContent>
    </Dialog>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        <Image
          src="/images/cultivation.webp"
          alt="Artesana Organic Products"
          width={1920}
          height={1080}
          className="absolute inset-0 object-cover w-full h-full"
        />
        <div className="absolute inset-0 bg-yellow-800 bg-opacity-80 backdrop-blur-sm" />
        <div className="relative z-10 text-center text-white">
          <h1 className="text-4xl font-bold mb-4 drop-shadow-md">
            Certified Quality Products
          </h1>
          <p className="text-base mb-5 font-mono max-w-3xl mx-auto">
            Discover our range of premium, certified organic and conventional
            agricultural products sourced from trusted farms and producers
            worldwide. Each product is sourced from trusted farms or producers,
            selected for their commitment to sustainable and eco-friendly
            practices.
          </p>
          <p className="text-base max-w-3xl font-mono mx-auto">
            From vibrant, nutrient-rich fruits and vegetables to carefully
            cultivated grains and spices, our products are rigorously tested and
            certified to bring you the best in organic agriculture. Embrace
            freshness, purity, and authenticity with every product, crafted for
            those who value quality and care in every bite.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto py-16 px-4">
        <h2 className="text-4xl font-bold mb-8 text-center">
          Explore Our Products Portfolio
        </h2>

        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
          <div className="relative w-full sm:w-96">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              type="text"
              placeholder="Search by name or origin"
              className="pl-10 w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <FilterModal />
        </div>

        {/* Product Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 6 }).map((_, index) => (
              <Skeleton key={index} className="h-[600px] w-full" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

        {/* Pagination */}
        <div className="flex justify-center items-center mt-12 space-x-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => handlePageChange(pagination.page - 1)}
            disabled={pagination.page === 1}
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Previous page</span>
          </Button>
          {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map(
            (page) => (
              <Button
                key={page}
                variant={pagination.page === page ? "default" : "outline"}
                size="icon"
                onClick={() => handlePageChange(page)}
              >
                {page}
              </Button>
            )
          )}
          <Button
            variant="outline"
            size="icon"
            onClick={() => handlePageChange(pagination.page + 1)}
            disabled={pagination.page === pagination.totalPages}
          >
            <ChevronRight className="h-4 w-4" />
            <span className="sr-only">Next page</span>
          </Button>
        </div>

        {/* Call To Action */}
        <CallToAction />

        {/* Featured Products Section */}
        <FeaturedProducts title="Featured Products" description="" />
      </div>
    </div>
  );
}
