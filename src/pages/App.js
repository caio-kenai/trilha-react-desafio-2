import React, { useState, useEffect } from "react";

function RepoCard({ repo }) {
  return (
    <div style={{
      border: "1px solid #ddd",
      borderRadius: 6,
      padding: 12,
      marginBottom: 12,
      boxShadow: "0 2px 5px rgba(0,0,0,0.1)"
    }}>
      <h3>
        <a href={repo.html_url} target="_blank" rel="noreferrer">
          {repo.name}
        </a>
      </h3>
      <p>{repo.description || "Sem descrição"}</p>
      <p>
        <b>Linguagem:</b> {repo.language || "Não informado"} | ⭐ {repo.stargazers_count}
      </p>
    </div>
  );
}

function App() {
  const [username, setUsername] = useState("octocat");
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchRepos = async (user) => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch(`https://api.github.com/users/${user}/repos`);
      if (!response.ok) throw new Error("Usuário não encontrado");
      const data = await response.json();
      setRepos(data);
    } catch (err) {
      setError(err.message);
      setRepos([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetch
