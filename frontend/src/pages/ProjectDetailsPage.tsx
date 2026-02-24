import { Link } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Calendar, Users, CheckCircle2 } from 'lucide-react';

export default function ProjectDetailsPage() {
  // Sample project data - in a real app, this would come from the backend
  const projects = [
    {
      id: 1,
      name: 'Website Redesign',
      description: 'Complete overhaul of the company website with modern design',
      status: 'In Progress',
      team: 5,
      deadline: '2026-03-15',
    },
    {
      id: 2,
      name: 'Mobile App Development',
      description: 'Native mobile application for iOS and Android platforms',
      status: 'Planning',
      team: 8,
      deadline: '2026-04-30',
    },
    {
      id: 3,
      name: 'Marketing Campaign',
      description: 'Q2 marketing campaign across multiple channels',
      status: 'Completed',
      team: 4,
      deadline: '2026-02-20',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed':
        return 'default';
      case 'In Progress':
        return 'secondary';
      case 'Planning':
        return 'outline';
      default:
        return 'outline';
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Header */}
      <div className="mb-8">
        <Link to="/">
          <Button variant="ghost" className="mb-4 gap-2">
            <ArrowLeft className="h-4 w-4" /> Back to Home
          </Button>
        </Link>
        <h1 className="mb-2 text-4xl font-bold">Project Details</h1>
        <p className="text-lg text-muted-foreground">
          View and manage all your active projects
        </p>
      </div>

      {/* Projects Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <Card key={project.id} className="transition-shadow hover:shadow-lg">
            <CardHeader>
              <div className="mb-2 flex items-start justify-between">
                <CardTitle className="text-xl">{project.name}</CardTitle>
                <Badge variant={getStatusColor(project.status)}>{project.status}</Badge>
              </div>
              <CardDescription>{project.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Users className="h-4 w-4" />
                  <span>{project.team} team members</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>Due: {new Date(project.deadline).toLocaleDateString()}</span>
                </div>
                {project.status === 'Completed' && (
                  <div className="flex items-center gap-2 text-sm text-primary">
                    <CheckCircle2 className="h-4 w-4" />
                    <span>Project completed</span>
                  </div>
                )}
              </div>
              <Button className="mt-4 w-full" variant="outline">
                View Details
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State (if no projects) */}
      {projects.length === 0 && (
        <Card className="p-12 text-center">
          <CardHeader>
            <CardTitle>No Projects Yet</CardTitle>
            <CardDescription>
              Get started by creating your first project
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button>Create Project</Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
