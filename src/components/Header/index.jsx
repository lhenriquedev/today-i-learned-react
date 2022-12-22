import React from "react";

export function Header({ showForm, setShowForm }) {
  return (
    <header className="header">
      <div className="logo">
        <img src="logo.png" alt="Today I Learned logo" />
        <h1>Today I Learned</h1>
      </div>
      <button
        className="btn btn-large btn-open"
        onClick={() => setShowForm((state) => !state)}
      >
        {showForm ? "Close" : "Share a fact"}
      </button>
    </header>
  );
}
