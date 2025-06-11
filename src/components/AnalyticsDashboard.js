import React from 'react';

const summaryMetrics = [
  { label: 'Total Sales This Month', value: 'R 120,000', icon: '💰' },
  { label: 'Livestock Sold', value: '150', icon: '🐄' },
  { label: 'Produce Sold (kg)', value: '2000', icon: '🥬' },
  { label: 'New Customers', value: '45', icon: '🧑‍🤝‍🧑' },
  { label: 'Avg Order Value', value: 'R 850', icon: '📊' },
];

const progressData = [
  { label: 'Livestock Sales Target', progress: 75 },
  { label: 'Produce Sales Target', progress: 85 },
  { label: 'Customer Growth Target', progress: 60 },
];

const styles = {
  container: {
    color: '#1B5E20',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    padding: '20px',
    maxWidth: '800px',
    margin: 'auto',
  },
  header: {
    marginBottom: '20px',
    fontWeight: '700',
    fontSize: '28px',
  },
  summaryCards: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '15px',
    marginBottom: '30px',
    justifyContent: 'center',
  },
  summaryCard: {
    flex: '1 1 140px',
    backgroundColor: '#E8F5E9',
    borderRadius: '8px',
    padding: '15px 20px',
    boxShadow: '0 1px 4px rgba(0,0,0,0.1)',
    textAlign: 'center',
    minWidth: '140px',
  },
  summaryIcon: {
    fontSize: '36px',
    marginBottom: '8px',
  },
  summaryValue: {
    fontSize: '22px',
    fontWeight: '700',
    color: '#2E7D32',
    marginBottom: '4px',
  },
  summaryLabel: {
    fontSize: '14px',
    color: '#4CAF50',
  },
  progressHeader: {
    fontSize: '20px',
    fontWeight: '600',
    marginBottom: '15px',
    color: '#388E3C',
    textAlign: 'center',
  },
  progressContainer: {
    maxWidth: '600px',
    margin: 'auto',
  },
  progressItem: {
    marginBottom: '20px',
  },
  progressLabel: {
    fontWeight: '600',
    marginBottom: '6px',
    color: '#388E3C',
  },
  progressBarBg: {
    backgroundColor: '#C8E6C9',
    borderRadius: '12px',
    width: '100%',
    height: '18px',
    overflow: 'hidden',
  },
  progressBarFill: (progress) => ({
    backgroundColor: '#4CAF50',
    height: '100%',
    width: `${progress}%`,
    transition: 'width 0.4s ease-in-out',
    borderRadius: '12px 0 0 12px',
  }),
};

const ProgressBar = ({ progress }) => (
  <div style={styles.progressBarBg}>
    <div style={styles.progressBarFill(progress)} />
  </div>
);

export default function AnalyticsDashboard() {
  return (
    <div style={styles.container}>
      <h2 style={styles.header}>📊 Analytics Overview</h2>

      <div style={styles.summaryCards}>
        {summaryMetrics.map(({ label, value, icon }) => (
          <div key={label} style={styles.summaryCard}>
            <div style={styles.summaryIcon}>{icon}</div>
            <div style={styles.summaryValue}>{value}</div>
            <div style={styles.summaryLabel}>{label}</div>
          </div>
        ))}
      </div>

      <h3 style={styles.progressHeader}>Progress Towards Targets</h3>
      <div style={styles.progressContainer}>
        {progressData.map(({ label, progress }) => (
          <div key={label} style={styles.progressItem}>
            <div style={styles.progressLabel}>{label}</div>
            <ProgressBar progress={progress} />
          </div>
        ))}
      </div>
    </div>
  );
}
