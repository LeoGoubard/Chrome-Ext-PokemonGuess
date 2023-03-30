import React, { useEffect, useState } from "react";
import axios from 'axios';
import { render } from 'react-dom';

function Popup() {
  const [data, setData] = useState([]);
  const [pokemonData, setPokemonData] = useState('');
  const [value, setValue] = useState("");
  const [pokemonRange, setPokemonRange] = useState({});

  const generateARandomNumber = (responseData) => {
    const pokemonId = Math.floor(Math.random() * responseData.length);
    return pokemonId;
  }
  const fetchGeneration = async (id) => {
    const response = await axios(`https://pokebuildapi.fr/api/v1/pokemon/generation/${id}`);
    const pokemonId = generateARandomNumber(response.data)
    console.log(pokemonId, response.data.length);
    setPokemonRange({ actual: 0, max: response.data.length });
    await setData(response.data)
    await setPokemonData(response.data[pokemonId]);
  }
  const handleFetchGeneration = async (id) => {
    await fetchGeneration(id);
  }
  
  const changePokemon = async () => {
    const pokemonId = generateARandomNumber(data)
    setPokemonData(data[pokemonId]);

    // getGeneration(pokemonId)
  };
  useEffect(() => {
    if (value === pokemonData.name) {
      setValue('');
      setPokemonRange({...pokemonRange, actual: pokemonRange.actual + 1})
      setData(data.filter(item => item.name !== pokemonData.name));
      changePokemon()
    }
      
  }, [value])
    
  const goBack = () => {
    setData([]);
    setValue('');
    setPokemonRange({});
    setPokemonData({});
  }
  return (
    <div>
      <h1>Pokemon Guess</h1>
      {data.length ? (
        <div>
          <button onClick={(e) => changePokemon(e)}>Next Pokemon</button>
            <img src={pokemonData.image} style={{ width: '100px', height: '100px' }}/>
          <p>{pokemonData.name}</p>
          <input value={value} onChange={e => setValue(e.target.value)} type='text' />
          <p>{pokemonRange.actual} / {pokemonRange.max}</p>
          <button onClick={(e) => goBack()}>Change the gen</button>
        </div>

      ) : (
        <div>
          <button onClick={(e) => handleFetchGeneration('1')}>Generate a Pokemon from generation 1</button>
          <button onClick={(e) => handleFetchGeneration('2')}>Generate a Pokemon from generation 2</button>
          <button onClick={(e) => handleFetchGeneration('3')}>Generate a Pokemon from generation 3</button>
          <button onClick={(e) => handleFetchGeneration('4')}>Generate a Pokemon from generation 4</button>
        </div>
      )}
    </div>
  )
}

render(<Popup />, document.getElementById("react-target"));