"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import styles from "./page.module.css";

interface WebsiteDetails {
  id: string;
  name: string;
  url: string;
  latencyReport: Array<{
    id: string;
    latency: number;
    time: string;
    regions: {
      name: string;
    };
  }>;
  status: Array<{
    id: string;
    status: boolean;
    regions: {
      name: string;
    };
  }>;
}

export default function WebsiteDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const [website, setWebsite] = useState<WebsiteDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/');
      return;
    }

    fetchWebsiteDetails(token);
  }, [params.id, router]);

  const fetchWebsiteDetails = async (token: string) => {
    try {
      const response = await fetch(`http://localhost:3000/website/${params.id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setWebsite(data);
      } else if (response.status === 403) {
        setError('You do not have access to this website');
      } else {
        setError('Website not found');
      }
    } catch (error) {
      setError('Failed to load website details');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className={styles.page}>
        <div className="container">
          <div className={styles.loading}>
            <h2>Loading website details...</h2>
          </div>
        </div>
      </div>
    );
  }

  if (error || !website) {
    return (
      <div className={styles.page}>
        <div className="container">
          <div className={styles.error}>
            <h2>Error</h2>
            <p>{error || 'Website not found'}</p>
            <button 
              className="btn btn-primary"
              onClick={() => router.push('/')}
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Calculate statistics
  const avgLatency = website.latencyReport.length > 0 
    ? Math.round(website.latencyReport.reduce((acc, report) => acc + report.latency, 0) / website.latencyReport.length)
    : 0;

  const uptimePercentage = website.status.length > 0
    ? Math.round((website.status.filter(s => s.status).length / website.status.length) * 100)
    : 0;

  const latestStatus = website.status[0]?.status ?? false;
  const latestLatency = website.latencyReport[0]?.latency ?? 999;

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
            <h1 className={styles.logo}>BetterUp</h1>
          </div>
        </div>
      </header>

      <main className={styles.dashboard}>
        <div className="container">
          <div className={styles.websiteHeader}>
            <div>
              <h1>{website.name}</h1>
              <p className={styles.websiteUrl}>{website.url}</p>
            </div>
            <div className={`${styles.statusBadge} ${latestStatus ? 'status-online' : 'status-offline'}`}>
              {latestStatus ? 'Online' : 'Offline'}
            </div>
          </div>

          <div className={styles.statsGrid}>
            <div className="card">
              <h3>Current Status</h3>
              <p className={`${styles.statNumber} ${latestStatus ? 'status-online' : 'status-offline'}`}>
                {latestStatus ? 'Online' : 'Offline'}
              </p>
            </div>
            <div className="card">
              <h3>Response Time</h3>
              <p className={styles.statNumber}>{latestLatency}ms</p>
            </div>
            <div className="card">
              <h3>Average Latency</h3>
              <p className={styles.statNumber}>{avgLatency}ms</p>
            </div>
            <div className="card">
              <h3>Uptime</h3>
              <p className={`${styles.statNumber} ${uptimePercentage >= 99 ? 'status-online' : uptimePercentage >= 95 ? 'status-warning' : 'status-offline'}`}>
                {uptimePercentage}%
              </p>
            </div>
          </div>

          <div className={styles.chartsSection}>
            <div className="card">
              <h3>Response Time History</h3>
              <div className={styles.chart}>
                {website.latencyReport.slice(0, 20).map((report, index) => (
                  <div 
                    key={report.id}
                    className={styles.chartBar}
                    style={{
                      height: `${Math.min((report.latency / 1000) * 100, 100)}%`,
                      backgroundColor: report.latency > 500 ? 'var(--error)' : report.latency > 200 ? 'var(--warning)' : 'var(--success)'
                    }}
                    title={`${report.latency}ms - ${new Date(report.time).toLocaleString()}`}
                  />
                ))}
              </div>
            </div>

            <div className="card">
              <h3>Status History</h3>
              <div className={styles.statusHistory}>
                {website.status.slice(0, 10).map((statusReport) => (
                  <div key={statusReport.id} className={styles.statusItem}>
                    <div className={`${styles.statusDot} ${statusReport.status ? 'status-online' : 'status-offline'}`} />
                    <span>{statusReport?.regions?.name ?? 'Unknown region'}</span>
                    <span className={styles.statusTime}>
                      {new Date().toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className={styles.regionsSection}>
            <h3>Monitoring Regions</h3>
            <div className={styles.regionsGrid}>
              {Array.from(new Set(website.latencyReport.map(r => r.regions.name))).map(regionName => {
                const regionLatency = website.latencyReport.find(r => r.regions.name === regionName);
                const regionStatus = website.status.find(s => s.regions.name === regionName);
                
                return (
                  <div key={regionName} className="card">
                    <h4>{regionName}</h4>
                    <div className={styles.regionStats}>
                      <div className={`${styles.regionStatus} ${regionStatus?.status ? 'status-online' : 'status-offline'}`}>
                        {regionStatus?.status ? 'Online' : 'Offline'}
                      </div>
                      <div className={styles.regionLatency}>
                        Latency: {regionLatency?.latency ?? 999}ms
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
