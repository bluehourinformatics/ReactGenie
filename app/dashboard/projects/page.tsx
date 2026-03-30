"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Search,
  Plus,
  FolderKanban,
  MoreHorizontal,
  ExternalLink,
  Trash2,
  Clock,
  FolderOpen,
  Grid3X3,
  List,
} from "lucide-react";
import { cn } from "@/lib/utils";
import NewProjectModal from "@/components/new-project-modal";

const projects = [
  {
    id: "1",
    name: "E-commerce Dashboard",
    description: "A modern dashboard for tracking sales and inventory",
    lastEdited: "2 hours ago",
    status: "active",
  },
  {
    id: "2",
    name: "Task Manager Pro",
    description: "Kanban-style task management with team collaboration",
    lastEdited: "1 day ago",
    status: "active",
  },
  {
    id: "3",
    name: "Portfolio Website",
    description: "Personal portfolio with project showcase",
    lastEdited: "3 days ago",
    status: "deployed",
  },
  {
    id: "4",
    name: "Weather App",
    description: "Real-time weather forecasting application",
    lastEdited: "1 week ago",
    status: "draft",
  },
  {
    id: "5",
    name: "Blog Platform",
    description: "A minimalist blog with markdown support",
    lastEdited: "2 weeks ago",
    status: "active",
  },
  {
    id: "6",
    name: "Recipe Finder",
    description: "Search and discover recipes from around the world",
    lastEdited: "3 weeks ago",
    status: "deployed",
  },
];

export default function ProjectsPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProjects = projects.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <>
      <div className="mx-auto max-w-6xl space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FolderKanban className="h-6 w-6 text-primary" />
            <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
          </div>
          <Button onClick={() => setModalOpen(true)} className="gap-2">
            <Plus className="h-4 w-4" />
            New Project
          </Button>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex rounded-lg border border-border">
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                "rounded-r-none",
                viewMode === "grid" && "bg-secondary",
              )}
              onClick={() => setViewMode("grid")}
            >
              <Grid3X3 className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                "rounded-l-none",
                viewMode === "list" && "bg-secondary",
              )}
              onClick={() => setViewMode("list")}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Projects Grid/List */}
        {filteredProjects.length === 0 ? (
          <Card className="border-border">
            <CardContent className="flex flex-col items-center justify-center py-16">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-secondary">
                <FolderOpen className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="mt-4 text-lg font-medium">No projects found</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Try adjusting your search or create a new project.
              </p>
            </CardContent>
          </Card>
        ) : viewMode === "grid" ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filteredProjects.map((project) => (
              <Card
                key={project.id}
                className="group border-border transition-all hover:border-primary/50"
              >
                <CardHeader className="p-0">
                  <div className="relative aspect-video overflow-hidden rounded-t-lg bg-secondary">
                    <div className="flex h-full items-center justify-center">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                        <FolderOpen className="h-6 w-6" />
                      </div>
                    </div>
                    <div className="absolute right-2 top-2 opacity-0 transition-opacity group-hover:opacity-100">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="secondary"
                            size="icon"
                            className="h-8 w-8"
                          >
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <ExternalLink className="mr-2 h-4 w-4" />
                            Open
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-4">
                  <CardTitle className="text-base">{project.name}</CardTitle>
                  <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                    {project.description}
                  </p>
                  <div className="mt-3 flex items-center justify-between">
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      {project.lastEdited}
                    </div>
                    <Button asChild variant="ghost" size="sm">
                      <Link href={`/workspace/${project.id}`}>Open</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="border-border">
            <div className="divide-y divide-border">
              {filteredProjects.map((project) => (
                <div
                  key={project.id}
                  className="flex items-center justify-between p-4 hover:bg-secondary/50"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                      <FolderOpen className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">{project.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {project.description}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-muted-foreground">
                      {project.lastEdited}
                    </span>
                    <Button asChild variant="ghost" size="sm">
                      <Link href={`/workspace/${project.id}`}>Open</Link>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        )}
      </div>
      <NewProjectModal open={modalOpen} onOpenChange={setModalOpen} />
    </>
  );
}
