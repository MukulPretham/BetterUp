"use client";

import { useState, useEffect } from "react";
import { Button } from "@repo/ui/button";
import styles from "./page.module.css";

// Types
interface Website {
  id: string;
  name: string;
  url: string;
  status: boolean;
  latency: number;
  lastChecked: string;
}

interface User {
  username: string;
  email: string;
}

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [websites, setWebsites] = useState<Website[]>([]);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [showAddWebsite, setShowAddWebsite] = useState(false);
  const [loading, setLoading] = useState(false);

  // Check authentication on mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Verify token and get user data
      fetchUserData(token);
    }
  }, []);

  const fetchUserData = async (token: string) => {
    try {
      const response = await fetch('http://localhost:3000/profile', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const userData = await response.json();
        setIsAuthenticated(true);
        setUser(userData);
        // Fetch user's websites
        fetchWebsites(token);
      } else {
        localStorage.removeItem('token');
        setIsAuthenticated(false);
      }
    } catch (error) {
      localStorage.removeItem('token');
      setIsAuthenticated(false);
    }
  };

  const fetchWebsites = async (token: string) => {
    try {
      const response = await fetch('http://localhost:3000/websites', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const websitesData = await response.json();
        setWebsites(websitesData);
      } else {
        console.error('Failed to fetch websites');
      }
    } catch (error) {
      console.error('Error fetching websites:', error);
    }
  };

  const handleAuth = async (username: string, password: string, email?: string) => {
    setLoading(true);
    try {
      const endpoint = authMode === 'login' ? '/logIn' : '/signUp';
      const body = authMode === 'login' 
        ? { username, password }
        : { username, password, email: email || '' };

      const response = await fetch(`http://localhost:3000${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });

      const data = await response.json();
      
      if (response.ok) {
        if (authMode === 'login' && data.token) {
          localStorage.setItem('token', data.token);
          setIsAuthenticated(true);
          setUser({ username, email: email || '' });
          setShowAuthModal(false);
          fetchWebsites(data.token);
        } else if (authMode === 'signup') {
          alert('Account created successfully! Please login.');
          setAuthMode('login');
        }
      } else {
        alert(data.error || 'Authentication failed');
      }
    } catch (error) {
      alert('Network error. Please try again.');
    }
    setLoading(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    setUser(null);
    setWebsites([]);
  };

  const handleAddWebsite = async (name: string, url: string) => {
    const token = localStorage.getItem('token');
    if (!token) return;

    setLoading(true);
    try {
      // Normalize user input: accept only domain like "google.com" and send as full URL
      const extractDomain = (input: string) => {
        let domain: string | undefined = input.trim().toLowerCase();
        // Basic domain validation (allows subdomains)
        const domainRegex = /^(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z]{2,}$/i;
        if (!domainRegex.test(domain)) {
          throw new Error('Please enter a valid domain like "google.com"');
        }
        return domain;
      };

      const normalizedUrl = extractDomain(url);
      const response = await fetch('http://localhost:3000/addWebsite', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ name, url: normalizedUrl })
      });

      const data = await response.json();
      
      if (response.ok) {
        alert('Website added successfully!');
        setShowAddWebsite(false);
        fetchWebsites(token);
      } else {
        alert(data.error || 'Failed to add website');
      }
    } catch (error) {
      alert('Network error. Please try again.');
    }
    setLoading(false);
  };

  const handleRemoveWebsite = async (websiteId: string) => {
    const token = localStorage.getItem('token');
    if (!token) return;

    if (!confirm('Are you sure you want to remove this website from monitoring?')) {
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`http://localhost:3000/website/${websiteId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await response.json();
      
      if (response.ok) {
        alert('Website removed from monitoring!');
        fetchWebsites(token);
      } else {
        alert(data.error || 'Failed to remove website');
      }
    } catch (error) {
      alert('Network error. Please try again.');
    }
    setLoading(false);
  };

  if (!isAuthenticated) {
    return (
      <div className={styles.page}>
        <main className={styles.hero}>
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>
              Monitor Your Websites
              <br />
              <span className={styles.heroSubtitle}>Like a Pro</span>
            </h1>
            <p className={styles.heroDescription}>
              Get real-time uptime monitoring, performance insights, and instant alerts 
              for all your websites across multiple regions.
            </p>
            <div className={styles.heroActions}>
              <button 
                className="btn btn-primary"
                onClick={() => {
                  setAuthMode('signup');
                  setShowAuthModal(true);
                }}
              >
                Get Started Free
              </button>
              <button 
                className="btn btn-secondary"
                onClick={() => {
                  setAuthMode('login');
                  setShowAuthModal(true);
                }}
              >
                Sign In
              </button>
            </div>
          </div>
          <div className={styles.heroImage}>
            <div className={styles.monitorCard}>
              <div className={styles.monitorHeader}>
                <div className={styles.monitorDots}>
                  <span></span><span></span><span></span>
                </div>
                <span>BetterUp Dashboard</span>
              </div>
              <div className={styles.monitorContent}>
                <div className={styles.monitorSite}>
                  <div className="status-online">●</div>
                  <span>google.com</span>
                  <span>45ms</span>
                </div>
                <div className={styles.monitorSite}>
                  <div className="status-online">●</div>
                  <span>github.com</span>
                  <span>120ms</span>
                </div>
                <div className={styles.monitorSite}>
                  <div className="status-offline">●</div>
                  <span>example.com</span>
                  <span>999ms</span>
                </div>
              </div>
            </div>
          </div>
        </main>

        {showAuthModal && (
          <AuthModal 
            mode={authMode}
            onClose={() => setShowAuthModal(false)}
            onSubmit={handleAuth}
            loading={loading}
            onSwitchMode={() => setAuthMode(authMode === 'login' ? 'signup' : 'login')}
          />
        )}
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className="container">
          <div className={styles.headerContent}>
            <h1 className={styles.logo}>BetterUp</h1>
            <div className={styles.headerActions}>
              <span>Welcome, {user?.username}</span>
              <button 
                className="btn btn-secondary"
                onClick={() => window.location.href = '/admin'}
              >
                Admin
              </button>
              <button className="btn btn-secondary" onClick={handleLogout}>
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className={styles.dashboard}>
        <div className="container">
          <div className={styles.dashboardHeader}>
            <h2>Website Monitoring Dashboard</h2>
            <button 
              className="btn btn-primary"
              onClick={() => setShowAddWebsite(true)}
            >
              Add Website
            </button>
          </div>

          <div className={styles.statsGrid}>
            <div className="card">
              <h3>Total Websites</h3>
              <p className={styles.statNumber}>{websites.length}</p>
            </div>
            <div className="card">
              <h3>Online</h3>
              <p className={`${styles.statNumber} status-online`}>
                {websites.filter(w => w.status).length}
              </p>
            </div>
            <div className="card">
              <h3>Offline</h3>
              <p className={`${styles.statNumber} status-offline`}>
                {websites.filter(w => !w.status).length}
              </p>
            </div>
            <div className="card">
              <h3>Avg Response Time</h3>
              <p className={styles.statNumber}>
                {Math.round(websites.reduce((acc, w) => acc + w.latency, 0) / websites.length)}ms
              </p>
            </div>
          </div>

          <div className={styles.websitesList}>
            <h3>Your Websites</h3>
            <div className={styles.websitesGrid}>
              {websites.map(website => (
                <div key={website.id} className="card">
                  <div className={styles.websiteHeader}>
                    <h4 
                      className={styles.websiteTitle}
                      onClick={() => window.location.href = `/website/${website.id}`}
                    >
                      {website.name}
                    </h4>
                    <div className={`${styles.status} ${website.status ? 'status-online' : 'status-offline'}`}>
                      {website.status ? 'Online' : 'Offline'}
                    </div>
                  </div>
                  <p className={styles.websiteUrl}>{website.url}</p>
                  <div className={styles.websiteStats}>
                    <span>Response Time: {website.latency}ms</span>
                    <span>Last Check: {new Date(website.lastChecked).toLocaleTimeString()}</span>
                  </div>
                  <div className={styles.websiteActions}>
                    <button 
                      className="btn btn-secondary"
                      onClick={() => window.location.href = `/website/${website.id}`}
                    >
                      View Details
                    </button>
                    <button 
                      className="btn btn-destructive"
                      onClick={() => handleRemoveWebsite(website.id)}
                      disabled={loading}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {showAddWebsite && (
        <AddWebsiteModal 
          onClose={() => setShowAddWebsite(false)}
          onSubmit={handleAddWebsite}
          loading={loading}
        />
      )}
    </div>
  );
}

// Auth Modal Component
function AuthModal({ mode, onClose, onSubmit, loading, onSwitchMode }: {
  mode: 'login' | 'signup';
  onClose: () => void;
  onSubmit: (username: string, password: string, email?: string) => void;
  loading: boolean;
  onSwitchMode: () => void;
}) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(username, password, email);
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <div className={styles.modalHeader}>
          <h2>{mode === 'login' ? 'Sign In' : 'Create Account'}</h2>
          <button onClick={onClose} className={styles.closeButton}>×</button>
        </div>
        <form onSubmit={handleSubmit} className={styles.modalForm}>
          {mode === 'signup' && (
            <div className={styles.formGroup}>
              <label>Email</label>
              <input
                type="email"
                className="input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          )}
          <div className={styles.formGroup}>
            <label>Username</label>
            <input
              type="text"
              className="input"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label>Password</label>
            <input
              type="password"
              className="input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button 
            type="submit" 
            className="btn btn-primary"
            disabled={loading}
          >
            {loading ? 'Loading...' : (mode === 'login' ? 'Sign In' : 'Create Account')}
          </button>
        </form>
        <div className={styles.modalFooter}>
          <button onClick={onSwitchMode} className={styles.switchButton}>
            {mode === 'login' ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
          </button>
        </div>
      </div>
    </div>
  );
}

// Add Website Modal Component
function AddWebsiteModal({ onClose, onSubmit, loading }: {
  onClose: () => void;
  onSubmit: (name: string, url: string) => void;
  loading: boolean;
}) {
  const [name, setName] = useState('');
  const [url, setUrl] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(name, url);
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <div className={styles.modalHeader}>
          <h2>Add Website</h2>
          <button onClick={onClose} className={styles.closeButton}>×</button>
        </div>
        <form onSubmit={handleSubmit} className={styles.modalForm}>
          <div className={styles.formGroup}>
            <label>Website Name</label>
            <input
              type="text"
              className="input"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., My Blog"
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label>Website Domain</label>
            <input
              type="text"
              className="input"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="e.g., google.com"
              required
            />
          </div>
          <button 
            type="submit" 
            className="btn btn-primary"
            disabled={loading}
          >
            {loading ? 'Adding...' : 'Add Website'}
          </button>
        </form>
      </div>
    </div>
  );
}