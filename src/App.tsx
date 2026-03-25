// Main app with hash-based routing for presentation system
import { useState, useEffect } from 'react';
import { LandingPage } from './pages/LandingPage';
import { AdminLoginPage } from './pages/AdminLoginPage';
import { PresenterPage } from './pages/PresenterPage';
import { ViewerPage } from './pages/ViewerPage';

type Route = 'landing' | 'admin' | 'presenter' | 'viewer';

function getRouteFromHash(): Route {
  const hash = window.location.hash;
  if (hash === '#/admin') return 'admin';
  if (hash === '#/present') return 'presenter';
  if (hash === '#/view') return 'viewer';
  return 'landing';
}

function isAdminAuthed(): boolean {
  return sessionStorage.getItem('admin_auth') === 'true';
}

function App() {
  const [route, setRoute] = useState<Route>(getRouteFromHash);
  const [guestName, setGuestName] = useState(sessionStorage.getItem('guest_name') || '');
  const [isAuthenticated, setIsAuthenticated] = useState(isAdminAuthed);

  useEffect(() => {
    const handleHash = () => setRoute(getRouteFromHash());
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  function navigate(r: Route) {
    const hashMap: Record<Route, string> = {
      landing: '#/',
      admin: '#/admin',
      presenter: '#/present',
      viewer: '#/view',
    };
    window.location.hash = hashMap[r];
    setRoute(r);
  }

  if (route === 'presenter') {
    if (!isAuthenticated) {
      navigate('admin');
      return null;
    }
    return (
      <PresenterPage
        onLogout={() => {
          sessionStorage.removeItem('admin_auth');
          setIsAuthenticated(false);
          navigate('landing');
        }}
      />
    );
  }

  if (route === 'admin') {
    if (isAuthenticated) {
      navigate('presenter');
      return null;
    }
    return (
      <AdminLoginPage
        onLogin={() => {
          setIsAuthenticated(true);
          navigate('presenter');
        }}
        onBack={() => navigate('landing')}
      />
    );
  }

  if (route === 'viewer') {
    if (!guestName) {
      navigate('landing');
      return null;
    }
    return (
      <ViewerPage
        guestName={guestName}
        onLeave={() => {
          sessionStorage.removeItem('guest_name');
          setGuestName('');
          navigate('landing');
        }}
      />
    );
  }

  return (
    <LandingPage
      onJoin={(name) => {
        setGuestName(name);
        navigate('viewer');
      }}
      onAdminClick={() => navigate('admin')}
      onViewPresentation={() => {
        const displayName = '__display__';
        sessionStorage.setItem('guest_name', displayName);
        setGuestName(displayName);
        navigate('viewer');
      }}
    />
  );
}

export default App;
