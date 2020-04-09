import React, { useState, useEffect } from 'react';

import api from './services/api';
import './styles.css';

function App() {
  const [repositories, setRepositories] = useState([]);

  async function loadRepositories() {
    const response = await api.get('repositories');
    setRepositories(response.data);
  }

  useEffect(() => {
    loadRepositories();
  }, []);

  async function handleAddRepository() {
    const newRepository = {
      title: `Repositório: ${Date.now()}`,
      url: 'https://github.com/eniosombra/repo-teste',
      techs: ['Node', 'ReactJS', 'React Native'],
    };

    const response = await api.post('repositories', newRepository);

    setRepositories([...repositories, response.data]);
  }

  async function handleRemoveRepository(id) {
    const repos = repositories;

    const repositoryIndex = repositories.findIndex(
      (repository) => repository.id === id,
    );

    repos.splice(repositoryIndex, 1);

    const response = await api.delete(`/repositories/${id}`);
    setRepositories([...repos]);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((repository) => (
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
