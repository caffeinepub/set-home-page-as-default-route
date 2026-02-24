import { Link } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, Sparkles, Zap, Target } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <section className="mb-16 text-center">
        <div className="mx-auto max-w-3xl">
          <h1 className="mb-6 text-5xl font-bold tracking-tight md:text-6xl">
            Welcome to Your Project Hub
          </h1>
          <p className="mb-8 text-xl text-muted-foreground">
            Manage, track, and collaborate on your projects with ease. Everything you need in one place.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/project-details">
              <Button size="lg" className="gap-2">
                View Projects <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
            <Button size="lg" variant="outline">
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="mb-16">
        <h2 className="mb-10 text-center text-3xl font-bold">Key Features</h2>
        <div className="grid gap-6 md:grid-cols-3">
          <Card className="transition-shadow hover:shadow-lg">
            <CardHeader>
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <Sparkles className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Intuitive Design</CardTitle>
              <CardDescription>
                Clean and modern interface that makes project management a breeze
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Navigate effortlessly through your projects with our user-friendly design.
              </p>
            </CardContent>
          </Card>

          <Card className="transition-shadow hover:shadow-lg">
            <CardHeader>
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <Zap className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Lightning Fast</CardTitle>
              <CardDescription>
                Built on the Internet Computer for unmatched speed and reliability
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Experience blazing-fast performance with decentralized infrastructure.
              </p>
            </CardContent>
          </Card>

          <Card className="transition-shadow hover:shadow-lg">
            <CardHeader>
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <Target className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Goal Focused</CardTitle>
              <CardDescription>
                Keep your team aligned and focused on what matters most
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Track progress and achieve your goals with powerful project tools.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="rounded-2xl bg-primary/5 p-12 text-center">
        <h2 className="mb-4 text-3xl font-bold">Ready to Get Started?</h2>
        <p className="mb-8 text-lg text-muted-foreground">
          Explore your projects and see what you can accomplish today.
        </p>
        <Link to="/project-details">
          <Button size="lg" className="gap-2">
            Go to Projects <ArrowRight className="h-5 w-5" />
          </Button>
        </Link>
      </section>
    </div>
  );
}
