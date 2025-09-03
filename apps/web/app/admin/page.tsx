"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";

interface Region {
  id: string;
  name: string;
}

export default function AdminPage() {
  const router = useRouter();
  const [regions, setRegions] = useState<Region[]>([]);
  const [newRegion, setNewRegion] = useState("");
  const [loading, setLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/');
      return;
    }
    setIsAuthenticated(true);
    fetchRegions();
  }, [router]);

  const fetchRegions = async () => {
    try {
      const response = await fetch('http://localhost:3000/regions');
      if (response.ok) {
        const data = await response.json();
        setRegions(data);
      }
    } catch (error) {
      console.error('Failed to fetch regions:', error);
    }
  };

  const handleAddRegion = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRegion.trim()) return;

    setLoading(true);
    try {
      const response = await fetch('http://localhost:3000/addRegion', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ region: newRegion.trim() })
      });

      if (response.ok) {
        setNewRegion("");
        fetchRegions();
        alert('Region added successfully!');
      } else {
        const data = await response.json();
        alert(data.error || 'Failed to add region');
      }
    } catch (error) {
      alert('Network error. Please try again.');
    }
    setLoading(false);
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className="container">
          <div className={styles.headerContent}>
            <button 
              className="btn btn-secondary"
              onClick={() => router.push('/')}
            >
              ← Back to Dashboard
            </button>
            <h1 className={styles.logo}>BetterUp Admin</h1>
            <button 
              className="btn btn-secondary"
              onClick={() => {
                localStorage.removeItem('token');
                router.push('/');
              }}
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className={styles.admin}>
        <div className="container">
          <h2>System Administration</h2>
          
          <div className={styles.section}>
            <h3>Monitoring Regions</h3>
            <p className={styles.description}>
              Add new regions where your websites will be monitored from.
            </p>
            
            <form onSubmit={handleAddRegion} className={styles.form}>
              <div className={styles.formGroup}>
                <input
                  type="text"
                  className="input"
                  value={newRegion}
                  onChange={(e) => setNewRegion(e.target.value)}
                  placeholder="e.g., US-East, EU-West, Asia-Pacific"
                  required
                />
                <button 
                  type="submit" 
                  className="btn btn-primary"
                  disabled={loading}
                >
                  {loading ? 'Adding...' : 'Add Region'}
                </button>
              </div>
            </form>

            <div className={styles.regionsList}>
              <h4>Current Regions ({regions.length})</h4>
              {regions.length === 0 ? (
                <p className={styles.empty}>No regions configured yet.</p>
              ) : (
                <div className={styles.regionsGrid}>
                  {regions.map(region => (
                    <div key={region.id} className="card">
                      <h5>{region.name}</h5>
                      <p>Region ID: {region.id}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className={styles.section}>
            <h3>System Information</h3>
            <div className={styles.infoGrid}>
              <div className="card">
                <h4>Backend Status</h4>
                <p className="status-online">● Online</p>
                <p>Express.js API running on port 3000</p>
              </div>
              <div className="card">
                <h4>Database</h4>
                <p className="status-online">● Connected</p>
                <p>PostgreSQL with Prisma ORM</p>
              </div>
              <div className="card">
                <h4>Monitoring Services</h4>
                <p className="status-warning">● Running</p>
                <p>Go-based publisher/consumer system</p>
              </div>
              <div className="card">
                <h4>Redis</h4>
                <p className="status-online">● Connected</p>
                <p>Message queue for real-time monitoring</p>
              </div>
            </div>
          </div>

          <div className={styles.section}>
            <h3>Quick Actions</h3>
            <div className={styles.actionsGrid}>
              <button 
                className="btn btn-secondary"
                onClick={() => {
                  if (confirm('This will restart the monitoring services. Continue?')) {
                    alert('Monitoring services restart initiated (simulated)');
                  }
                }}
              >
                Restart Monitoring
              </button>
              <button 
                className="btn btn-secondary"
                onClick={() => {
                  if (confirm('This will clear all monitoring data. Continue?')) {
                    alert('Data clearing initiated (simulated)');
                  }
                }}
              >
                Clear Monitoring Data
              </button>
              <button 
                className="btn btn-secondary"
                onClick={() => {
                  alert('System backup initiated (simulated)');
                }}
              >
                Backup System
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
