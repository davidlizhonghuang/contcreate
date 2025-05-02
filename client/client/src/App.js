import React, { useState } from "react";
import axios from "axios";

function App() {
  const [topic, setTopic] = useState("");
  const [article, setArticle] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    const res = await axios.post("http://localhost:5000/api/generate", { topic });
    setArticle(res.data.article);
    setLoading(false);
  };

  return (
    <div style={{ padding: 30, fontFamily: "Arial" }}>
      <h2>AI Article Generator</h2>
      <input
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        placeholder="Enter a topic..."
        style={{ width: 300, padding: 8 }}
      />
      <button onClick={handleGenerate} style={{ marginLeft: 10, padding: 8 }}>
        Generate
      </button>
      <div style={{ marginTop: 20, padding: 10, border: "1px solid #ccc", borderRadius: 5, width: 1000 }}>
        <h3>Generated Article:</h3>
        {loading ? <p>Generating...</p> : <p>{article}</p>}
      </div>
    </div>
  );
}

export default App;
