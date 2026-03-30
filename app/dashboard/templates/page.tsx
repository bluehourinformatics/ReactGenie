"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Search,
  LayoutTemplate,
  ShoppingCart,
  Users,
  BarChart3,
  FileText,
  MessageSquare,
  Image,
} from "lucide-react";

const categories = [
  { id: "all", name: "All" },
  { id: "dashboard", name: "Dashboard" },
  { id: "ecommerce", name: "E-commerce" },
  { id: "landing", name: "Landing" },
  { id: "blog", name: "Blog" },
  { id: "social", name: "Social" },
];

const templates = [
  {
    id: "1",
    name: "Admin Dashboard",
    description: "Complete admin dashboard with analytics, tables, and charts",
    category: "dashboard",
    icon: BarChart3,
    popular: true,
  },
  {
    id: "2",
    name: "E-commerce Store",
    description: "Full-featured online store with cart and checkout",
    category: "ecommerce",
    icon: ShoppingCart,
    popular: true,
  },
  {
    id: "3",
    name: "SaaS Landing Page",
    description: "Modern landing page for SaaS products",
    category: "landing",
    icon: LayoutTemplate,
    popular: true,
  },
  {
    id: "4",
    name: "Blog Platform",
    description: "Minimalist blog with markdown support and categories",
    category: "blog",
    icon: FileText,
    popular: false,
  },
  {
    id: "5",
    name: "Social Feed",
    description: "Social media-style feed with posts and comments",
    category: "social",
    icon: MessageSquare,
    popular: false,
  },
  {
    id: "6",
    name: "Photo Gallery",
    description: "Responsive image gallery with lightbox",
    category: "landing",
    icon: Image,
    popular: false,
  },
  {
    id: "7",
    name: "Team Management",
    description: "Team dashboard with member profiles and roles",
    category: "dashboard",
    icon: Users,
    popular: false,
  },
  {
    id: "8",
    name: "Product Catalog",
    description: "Product listing with filters and search",
    category: "ecommerce",
    icon: ShoppingCart,
    popular: false,
  },
];

export default function TemplatesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filteredTemplates = templates.filter((t) => {
    const matchesSearch = t.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || t.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <LayoutTemplate className="h-6 w-6 text-primary" />
          <h1 className="text-3xl font-bold tracking-tight">Templates</h1>
        </div>
        <p className="text-lg text-muted-foreground">
          Start with a template to build faster.
        </p>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search templates..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
          <TabsList>
            {categories.map((cat) => (
              <TabsTrigger key={cat.id} value={cat.id}>
                {cat.name}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>

      {/* Templates Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredTemplates.map((template) => (
          <Card
            key={template.id}
            className="group cursor-pointer border-border transition-all hover:border-primary/50 hover:shadow-lg"
          >
            <CardHeader className="p-0">
              <div className="relative flex aspect-video items-center justify-center rounded-t-lg bg-secondary">
                <template.icon className="h-12 w-12 text-primary/50" />
                {template.popular && (
                  <Badge className="absolute right-2 top-2" variant="default">
                    Popular
                  </Badge>
                )}
              </div>
            </CardHeader>
            <CardContent className="p-4">
              <CardTitle className="text-base">{template.name}</CardTitle>
              <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                {template.description}
              </p>
              <Button className="mt-4 w-full" variant="secondary">
                Use Template
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredTemplates.length === 0 && (
        <Card className="border-border">
          <CardContent className="flex flex-col items-center justify-center py-16">
            <LayoutTemplate className="h-12 w-12 text-muted-foreground/50" />
            <h3 className="mt-4 text-lg font-medium">No templates found</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Try adjusting your search or filter.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
