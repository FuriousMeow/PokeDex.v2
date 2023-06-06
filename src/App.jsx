import React, { useState } from 'react';

function App() {
  const [pokemonData, setPokemonData] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleSearch = () => {
    let searchText = document.getElementById("searchLine");
    let searchValue = searchText.value;

    fetch("https://pokeapi.co/api/v2/pokemon/" + searchValue)
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Произошла ошибка при получении данных");
        }
      })
      .then(data => {
        setPokemonData(data);
        setErrorMessage(null);
      })
      .catch(error => {
        setPokemonData(null);
        setErrorMessage("Покемон не найден!");
        console.error(error);
      });
  };

  const pokemonInfoStyle = {
    backgroundColor: 'white',
    borderRadius: '10px',
    padding: '20px',
    marginTop: '30px',
    marginBottom: '15px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    color: 'black',
    width: 'fit-content',
    margin: '0 auto',
  };

  return (
    <div>
      <h1>PokeDex</h1>
      <div>
        <div className="item">
          <div className="pokemonSearch">
            <input id="searchLine" type="text" className="inputLine" placeholder="🥸Введите название покемона или его ID🥸" />
            <button id="searchButton" className="button" onClick={handleSearch}>Пошук🔎</button>
          </div>
        </div>
        {pokemonData && (
          <div style={pokemonInfoStyle}>
            <div>
              <h2>{pokemonData.name}</h2>
              <p>Здібності: {pokemonData.abilities.map(ability => ability.ability.name).join(", ")}</p>
              <p>Вага: {pokemonData.weight / 10} kg</p>
              <p>Розмір: {pokemonData.height / 10} m</p>
            </div>
            <img src={pokemonData.sprites.other["official-artwork"].front_default} alt={pokemonData.name} style={{ width: '200px', border: '1px solid #000', borderRadius: '10px' }} />
          </div>
        )}
        {errorMessage && <p>{errorMessage}</p>}
      </div>
    </div>
  );
}

export default App;