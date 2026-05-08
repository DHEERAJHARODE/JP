import React, { useEffect, useState } from "react";
import { getApplications, updateDocumentStatus } from "../../services/adminService";
import "../../App.css";

const ApplicationsList = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    const { data, error } = await getApplications();
    if (!error) {
      setApplications(data);
    }
    setLoading(false);
  };

  const handleStatusChange = async (id, newStatus) => {
    // UI me turant update dikhane ke liye (Optimistic Update)
    setApplications(applications.map(app => app.id === id ? { ...app, status: newStatus } : app));
    
    // Database me update karne ke liye
    const { error } = await updateDocumentStatus("applications", id, newStatus);
    if (error) {
      alert("Status update failed: " + error);
      fetchData(); // Agar fail ho toh purana data wapas le aao
    }
  };

  return (
    <div className="page-container">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
        <h2>Admin Panel - Job Applications</h2>
        <div style={{ background: "#4f46e5", color: "white", padding: "8px 16px", borderRadius: "20px", fontSize: "0.9rem", fontWeight: "600" }}>
          Total Applications: {applications.length}
        </div>
      </div>

      <div className="glass-card" style={{ overflowX: "auto" }}>
        {loading ? (
          <div style={{ textAlign: "center", padding: "40px", color: "#64748b" }}>Loading applications...</div>
        ) : applications.length === 0 ? (
          <div style={{ textAlign: "center", padding: "40px", color: "#64748b" }}>No job applications found.</div>
        ) : (
          <table style={{ width: "100%", borderCollapse: "collapse", minWidth: "900px" }}>
            <thead>
              <tr style={{ background: "#f8fafc", borderBottom: "2px solid #e2e8f0", textAlign: "left" }}>
                <th style={{ padding: "16px", color: "#64748b", fontWeight: "600" }}>Date</th>
                <th style={{ padding: "16px", color: "#64748b", fontWeight: "600" }}>Candidate Info</th>
                <th style={{ padding: "16px", color: "#64748b", fontWeight: "600" }}>Position</th>
                <th style={{ padding: "16px", color: "#64748b", fontWeight: "600" }}>Resume & Details</th>
                <th style={{ padding: "16px", color: "#64748b", fontWeight: "600" }}>Action / Status</th>
              </tr>
            </thead>
            <tbody>
              {applications.map((app) => (
                <tr key={app.id} style={{ borderBottom: "1px solid #f1f5f9" }}>
                  
                  {/* Date */}
                  <td style={{ padding: "16px", fontSize: "0.9rem", color: "#475569" }}>
                    {app.createdAt ? new Date(app.createdAt).toLocaleDateString() : "N/A"}
                  </td>

                  {/* Candidate Info */}
                  <td style={{ padding: "16px" }}>
                    <div style={{ fontWeight: "600", color: "#0f172a", marginBottom: "4px" }}>👤 {app.name}</div>
                    <div style={{ fontSize: "0.85rem", color: "#475569", marginBottom: "4px" }}>📧 {app.email}</div>
                    <div style={{ fontSize: "0.85rem", color: "#475569" }}>📞 {app.phone}</div>
                  </td>

                  {/* Position */}
                  <td style={{ padding: "16px", fontWeight: "600", color: "#2563eb" }}>
                    {app.position}
                  </td>

                  {/* Resume & Summary */}
                  <td style={{ padding: "16px", maxWidth: "250px" }}>
                    <a 
                      href={app.resumeLink} 
                      target="_blank" 
                      rel="noreferrer" 
                      style={{ display: "inline-block", background: "#eff6ff", color: "#1d4ed8", padding: "6px 12px", borderRadius: "6px", textDecoration: "none", fontSize: "0.85rem", fontWeight: "600", marginBottom: "8px" }}
                    >
                      📄 View Resume
                    </a>
                    <div style={{ fontSize: "0.85rem", color: "#64748b", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                      <strong>Summary:</strong> {app.summary || "No summary provided."}
                    </div>
                  </td>

                  {/* Status Action */}
                  <td style={{ padding: "16px" }}>
                    <select 
                      value={app.status || "Pending Review"}
                      onChange={(e) => handleStatusChange(app.id, e.target.value)}
                      style={{
                        padding: "8px 12px", borderRadius: "8px", border: "1px solid #cbd5e1",
                        background: app.status === "Hired" ? "#dcfce3" : app.status === "Rejected" ? "#fee2e2" : app.status === "Interview Scheduled" ? "#fef08a" : "#fff",
                        color: app.status === "Hired" ? "#166534" : app.status === "Rejected" ? "#991b1b" : app.status === "Interview Scheduled" ? "#854d0e" : "#334155",
                        fontWeight: "600", outline: "none", cursor: "pointer", width: "100%", maxWidth: "180px"
                      }}
                    >
                      <option value="Pending Review">Pending Review</option>
                      <option value="Interview Scheduled">Interview Scheduled</option>
                      <option value="Hired">Hired</option>
                      <option value="Rejected">Rejected</option>
                    </select>
                  </td>
                  
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default ApplicationsList;