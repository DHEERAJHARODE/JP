import React, { useEffect, useState } from "react";
import { getQueries, updateDocumentStatus } from "../../services/adminService";
import "../../App.css";

const QueriesList = () => {
  const [queries, setQueries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    const { data, error } = await getQueries();
    if (!error) {
      setQueries(data);
    }
    setLoading(false);
  };

  const handleStatusChange = async (id, newStatus) => {
    // UI me turant update dikhane ke liye (Optimistic Update)
    setQueries(queries.map(q => q.id === id ? { ...q, status: newStatus } : q));
    
    // Database me update karne ke liye
    const { error } = await updateDocumentStatus("queries", id, newStatus);
    if (error) {
      alert("Status update failed: " + error);
      fetchData(); // Agar fail ho toh purana data wapas le aao
    }
  };

  return (
    <div className="page-container">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
        <h2>Admin Panel - Contact Queries</h2>
        <div style={{ background: "#4f46e5", color: "white", padding: "8px 16px", borderRadius: "20px", fontSize: "0.9rem", fontWeight: "600" }}>
          Total Queries: {queries.length}
        </div>
      </div>

      <div className="glass-card" style={{ overflowX: "auto" }}>
        {loading ? (
          <div style={{ textAlign: "center", padding: "40px", color: "#64748b" }}>Loading queries...</div>
        ) : queries.length === 0 ? (
          <div style={{ textAlign: "center", padding: "40px", color: "#64748b" }}>No contact queries found.</div>
        ) : (
          <table style={{ width: "100%", borderCollapse: "collapse", minWidth: "900px" }}>
            <thead>
              <tr style={{ background: "#f8fafc", borderBottom: "2px solid #e2e8f0", textAlign: "left" }}>
                <th style={{ padding: "16px", color: "#64748b", fontWeight: "600" }}>Date</th>
                <th style={{ padding: "16px", color: "#64748b", fontWeight: "600" }}>User Info</th>
                <th style={{ padding: "16px", color: "#64748b", fontWeight: "600" }}>Subject</th>
                <th style={{ padding: "16px", color: "#64748b", fontWeight: "600" }}>Message</th>
                <th style={{ padding: "16px", color: "#64748b", fontWeight: "600" }}>Action / Status</th>
              </tr>
            </thead>
            <tbody>
              {queries.map((query) => (
                <tr key={query.id} style={{ borderBottom: "1px solid #f1f5f9" }}>
                  
                  {/* Date */}
                  <td style={{ padding: "16px", fontSize: "0.9rem", color: "#475569" }}>
                    {query.createdAt ? new Date(query.createdAt).toLocaleDateString() : "N/A"}
                  </td>

                  {/* User Info */}
                  <td style={{ padding: "16px" }}>
                    <div style={{ fontWeight: "600", color: "#0f172a", marginBottom: "4px" }}>👤 {query.name}</div>
                    <div style={{ fontSize: "0.85rem", color: "#475569" }}>📧 {query.email}</div>
                  </td>

                  {/* Subject */}
                  <td style={{ padding: "16px", fontWeight: "600", color: "#2563eb" }}>
                    {query.subject}
                  </td>

                  {/* Message */}
                  <td style={{ padding: "16px", maxWidth: "300px" }}>
                    <div style={{ fontSize: "0.9rem", color: "#334155", lineHeight: "1.5" }}>
                      {query.message}
                    </div>
                  </td>

                  {/* Status Action */}
                  <td style={{ padding: "16px" }}>
                    <select 
                      value={query.status || "Unread"}
                      onChange={(e) => handleStatusChange(query.id, e.target.value)}
                      style={{
                        padding: "8px 12px", borderRadius: "8px", border: "1px solid #cbd5e1",
                        background: query.status === "Resolved" ? "#dcfce3" : query.status === "In Progress" ? "#fef08a" : "#fff",
                        color: query.status === "Resolved" ? "#166534" : query.status === "In Progress" ? "#854d0e" : "#334155",
                        fontWeight: "600", outline: "none", cursor: "pointer", width: "100%", maxWidth: "150px"
                      }}
                    >
                      <option value="Unread">Unread</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Resolved">Resolved</option>
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

export default QueriesList;