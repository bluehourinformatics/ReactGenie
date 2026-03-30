"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import {
  Clock,
  ExternalLink,
  FolderOpen,
  MoreHorizontal,
  Plus,
  Trash2,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import NewProjectModal from "../new-project-modal";

const projects = [
  {
    id: "1",
    name: "E-commerce Dashboard",
    description: "A modern dashboard for tracking sales and inventory",
    lastEdited: "2 hours ago",
    thumbnail: "/thumbnails/ecommerce.png",
  },
  {
    id: "2",
    name: "Task Manager Pro",
    description: "Kanban-style task management with team collaboration",
    lastEdited: "1 day ago",
    thumbnail: "/thumbnails/task.png",
  },
  {
    id: "3",
    name: "Portfolio Website",
    description: "Personal portfolio with project showcase",
    lastEdited: "3 days ago",
    thumbnail: "/thumbnails/portfolio.png",
  },
  {
    id: "4",
    name: "Weather App",
    description: "Real-time weather forecasting application",
    lastEdited: "1 week ago",
    thumbnail: "/thumbnails/weather.png",
  },
];

export default function RecentProjects() {
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Recent Projects</h2>
          <Button
            onClick={() => setModalOpen(true)}
            variant="outline"
            size="sm"
            className="gap-2"
          >
            <Plus className="h-4 w-4" />
            New Project
          </Button>
        </div>
        {projects.length === 0 ? (
          <Card className="border-border bg-card">
            <CardContent className="flex flex-col items-center justify-center py-16">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-secondary">
                <FolderOpen className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="mt-4 text-lg font-medium">No projects yet</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Get started by creating your first project
              </p>
              <Button onClick={() => setModalOpen(true)} className="mt-4 gap-2">
                <Plus className="h-4 w-4" />
                Create Project
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {projects.map((project) => (
              <Card
                key={project.id}
                className="group border-border bg-card transition-all hover:border-primary/50"
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
        )}
      </div>
      <NewProjectModal open={modalOpen} onOpenChange={setModalOpen} />
    </>
  );
}
