import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { apiService } from '../services/api';

function Dashboard() {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const { user } = useAuth();

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const response = await apiService.getDashboard();
      setDashboardData(response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getStatusClass = (status) => {
    switch (status.toLowerCase()) {
      case 'delivered':
        return 'status delivered';
      case 'shipped':
        return 'status shipped';
      case 'processing':
        return 'status processing';
      default:
        return 'status';
    }
  };

  if (loading) {
    return (
      <div className="container">
        <h2>Loading dashboard...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container">
        <h2>Error loading dashboard</h2>
        <p>{error}</p>
        <button onClick={fetchDashboardData} className="btn btn-primary">
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <h2>Welcome to Your Dashboard, {user?.username}!</h2>
      
      {dashboardData && (
        <>
          {/* User Stats */}
          <div className="dashboard-section">
            <h3>Account Overview</h3>
            <div className="stats-grid">
              <div className="stat-card">
                <h3>{dashboardData.stats.totalOrders}</h3>
                <p>Total Orders</p>
              </div>
              <div className="stat-card">
                <h3>${dashboardData.stats.totalSpent}</h3>
                <p>Total Spent</p>
              </div>
              <div className="stat-card">
                <h3>{new Date(dashboardData.stats.memberSince).getFullYear()}</h3>
                <p>Member Since</p>
              </div>
            </div>
          </div>

          {/* Recent Orders */}
          <div className="dashboard-section">
            <h3>Recent Orders</h3>
            {dashboardData.orders && dashboardData.orders.length > 0 ? (
              <table className="orders-table">
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Date</th>
                    <th>Total</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {dashboardData.orders.map((order) => (
                    <tr key={order.id}>
                      <td>#{order.id}</td>
                      <td>{new Date(order.date).toLocaleDateString()}</td>
                      <td>${order.total}</td>
                      <td>
                        <span className={getStatusClass(order.status)}>
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No orders found.</p>
            )}
          </div>

          {/* Dashboard Options */}
          <div className="dashboard-section">
            <h3>Quick Actions</h3>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <button className="btn btn-primary">View All Orders</button>
              <button className="btn btn-primary">Manage Profile</button>
              <button className="btn btn-primary">Track Shipment</button>
              <button className="btn btn-primary">Contact Support</button>
              <button className="btn btn-secondary">Download Invoice</button>
              <button className="btn btn-secondary">Update Payment Method</button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Dashboard;