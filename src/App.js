import React, { useState, useEffect } from "react";

import api from "./services/api";

import "./styles.css";

function App() {
  const [repositories, setRepository] = useState([]);

  useEffect(() => {
    api.get("/repositories").then(response => {
      console.log(response.data)
      setRepository(response.data);
    });
  }, []);

  async function handleAddRepository() {
    const repositoryTitle = `Repo ${Date.now()}`;
    const response = await api.post("/repositories", {
      url: `https://github.com/${repositoryTitle.toLowerCase().trim()}`,
      title: repositoryTitle,
      techs: ["tech1", "tech2"],
    });

    const repository = response.data;

    setRepository([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    const response = await api.delete(`/repositories/${id}`);

    if (response.status === 204) {
      setRepository([...repositories].filter(repository => repository.id !== id));
    }
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => (
          <li key={repository.id}>
            {repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
              </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
