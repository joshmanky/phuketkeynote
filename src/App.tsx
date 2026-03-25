// Main app with hash-based routing for presentation system
import { useState, useEffect } from 'react';
import { LandingPage } from './pages/LandingPage';
import { AdminLoginPage } from './pages/AdminLoginPage';
import { PresenterPage } from './pages/PresenterPage';
import { ViewerPage } from './pages/ViewerPage';

type Route = 'landing' | 'admin' | 'presenter' | 'display' | 'viewer';

function getRouteFromHash(): Route {
  const hash = window.location.hash;
  if (hash === '#/admin') return 'admin';
  if (hash === '#/present') return 'presenter';
  if (hash === '#/display') return 'display';
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
      display: '#/display',
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
        displayMode={false}
        onLogout={() => {
          sessionStorage.removeItem('admin_auth');
          setIsAuthenticated(false);
          navigate('landing');
        }}
      />
    );
  }

  if (route === 'display') {
    return (
      <PresenterPage
        displayMode={true}
        onLogout={() => navigate('landing')}
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
          sessionStorage.removeItem('guest_id');
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
      onViewPresentation={() => navigate('display')}
    />
  );
}

export default App;
