 import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './Characters.css';
const Characters = () => {
  const [characters, setCharacters] = useState([]);
  const [searchCharacter, setSearchCharacter] = useState([]);
  const [loading, setLoading] = useState(false);

  const searchHandler = (event) => {
    setSearchCharacter(characters.filter((item) => (item.fullName).toLowerCase().includes((event.target.value).toLowerCase())))
}
  const API='https://potterapi-fedeperin.vercel.app/en';
   useEffect(() => {
       const getCharacters = async () => {
      try {
        setLoading(true);
        const charactersData = await axios.get(`${API}/characters`)
          if (charactersData.data) {
          setLoading(false);
          setCharacters(charactersData.data);
        }
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };

    getCharacters();
  }, []);

  const allCharacters = searchCharacter.length ? searchCharacter : characters;

  const characterItems = allCharacters.map((character, index) => {
    return (
      <div key={index} className="border border-secondary rounded text-center character m-1">
        <img className='image' src={character.image}/><br/>
        <h6>FullName :{character.fullName} </h6>
        <h6>Nickname:{character.nickname}</h6>
        <h6>Date Of Birth:{character.birthdate}</h6>
      </div>
    );
  });

  return (
    <div>
      <div className="w-50 m-auto">
        <input onChange={searchHandler} type="text" placeholder="Search for Character...." className="form-control mt-2"/>
      </div>
      <div className="d-flex flex-wrap justify-content-center mt-4">
        {characterItems}
      </div>
    </div>
  );
};
export default Characters;

  
