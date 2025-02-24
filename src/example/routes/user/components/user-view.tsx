import React from "react";
import { User } from "../../../models/user-model.js";

interface UserViewProps {
  user: User | null;
  loading: boolean;
  error: string | null;
  onLoadRandomUser: () => void;
  onRefreshUser: () => void;
}

export function UserView({
  user,
  loading,
  error,
  onLoadRandomUser,
  onRefreshUser,
}: UserViewProps) {
  return (
    <div className="user-card">
      <h2>User Profile (React)</h2>

      {loading && <div className="loading">Loading...</div>}

      {error && <div className="error">{error}</div>}

      {user && (
        <div>
          <p>
            <strong>Name:</strong> {user.name}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <p>
            <strong>Status:</strong>{" "}
            <span className={`status ${user.status}`}>{user.status}</span>
          </p>
        </div>
      )}

      <div>
        <button onClick={onLoadRandomUser}>Load Random User</button>
        <button onClick={onRefreshUser}>Refresh</button>
      </div>
    </div>
  );
}
