import { useEffect, useState } from "react";
import axios from "axios";

export default function DbViewer() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get("/api/users")
      .then(res => setUsers(res.data))
      .catch(err => setError(err.message));
  }, []);

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>ORCA - Users Table</h1>
      {error && <p style={{ color: "red" }}>Error: {error}</p>}
      <table border="1" cellPadding="8" style={{ borderCollapse: "collapse", width: "100%" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Verified</th>
            <th>Approved</th>
            <th>Created At</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>{user.is_verified ? "✅" : "❌"}</td>
              <td>{user.is_approved ? "✅" : "❌"}</td>
              <td>{new Date(user.created_at).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}