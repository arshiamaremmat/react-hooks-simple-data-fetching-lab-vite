// src/components/App.jsx
import React, { useEffect, useState } from "react";

function App() {
  const [dogUrl, setDogUrl] = useState(null);
  const [loading, setLoading] = useState(true);

  const DOG_API = "https://dog.ceo/api/breeds/image/random";

  async function fetchDog() {
    try {
      setLoading(true);
      const res = await fetch(DOG_API);
      const data = await res.json();
      // API returns { message: "<img_url>", status: "success" } in prod,
      // but our tests mock { message, status: 200, ok: true } — we only need message.
      setDogUrl(data.message);
    } catch (err) {
      // Simple fallback; tests don't assert this, but it’s nice to have
      setDogUrl(null);
      console.error("Failed to fetch dog image:", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    // fetch once on mount
    fetchDog();
  }, []);

  return (
    <main style={{ maxWidth: 720, margin: "2rem auto", padding: "0 1rem", textAlign: "center" }}>
      <h1>Random Dog Viewer</h1>

      {loading ? (
        <p>Loading...</p>
      ) : (
        dogUrl && (
          <img
            src={dogUrl}
            alt="Random dog"
            style={{ borderRadius: "12px" }}
          />
        )
      )}

      <div style={{ marginTop: "1rem" }}>
        <button onClick={fetchDog}>New Dog</button>
      </div>
    </main>
  );
}

export default App;
