import {
  createRouter,
  RouterProvider,
  createRoute,
  createRootRoute,
  Outlet,
  redirect,
} from '@tanstack/react-router';
import LoginPage from './pages/LoginPage';
import HostDetailsPage from './pages/HostDetailsPage';
import TeamMembersPage from './pages/TeamMembersPage';
import ResourcesPage from './pages/ResourcesPage';
import ProjectDetailsPage from './pages/ProjectDetailsPage';
import AdminPanel from './pages/AdminPanel';
import Header from './components/Header';
import Footer from './components/Footer';

// Auth guard: redirect to login if no session
function requireAuth() {
  const username = sessionStorage.getItem('username');
  if (!username) {
    throw redirect({ to: '/' });
  }
}

// App session guard: redirect to login if the app hasn't been opened via the login page
function requireAppSession() {
  const appSession = sessionStorage.getItem('appSession');
  if (!appSession) {
    throw redirect({ to: '/' });
  }
}

// Layout component that wraps all pages
function Layout() {
  return (
    <div className="flex min-h-screen flex-col" style={{ backgroundColor: '#050510' }}>
      <div className="bg-orb bg-orb-1" />
      <div className="bg-orb bg-orb-2" />
      <div className="bg-orb bg-orb-3" />
      <Header />
      <main className="relative z-10 flex-1">
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
  beforeLoad: () => {
    // Mark that the app session has started from the login page
    sessionStorage.setItem('appSession', 'true');
  },
  component: LoginPage,
});

const hostRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/host',
  beforeLoad: requireAuth,
  component: HostDetailsPage,
});

const teamRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/team',
  beforeLoad: requireAuth,
  component: TeamMembersPage,
});

const resourcesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/resources',
  beforeLoad: requireAuth,
  component: ResourcesPage,
});

const projectRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/project',
  beforeLoad: requireAuth,
  component: ProjectDetailsPage,
});

const adminRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/admin',
  beforeLoad: requireAppSession,
  component: AdminPanel,
});

// Create router with all routes
const routeTree = rootRoute.addChildren([
  indexRoute,
  hostRoute,
  teamRoute,
  resourcesRoute,
  projectRoute,
  adminRoute,
]);

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
