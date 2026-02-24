import { createRouter, RouterProvider, createRoute, createRootRoute, Outlet } from '@tanstack/react-router';
import HomePage from './pages/HomePage';
import ProjectDetailsPage from './pages/ProjectDetailsPage';
import Header from './components/Header';
import Footer from './components/Footer';

// Layout component that wraps all pages
function Layout() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

// Define routes
const rootRoute = createRootRoute({
  component: Layout,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: HomePage,
});

const projectDetailsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/project-details',
  component: ProjectDetailsPage,
});

// Create router with all routes
const routeTree = rootRoute.addChildren([indexRoute, projectDetailsRoute]);

const router = createRouter({ routeTree });

// Register router for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
