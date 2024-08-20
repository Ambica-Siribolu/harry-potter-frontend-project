import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './Spells.css';
const Spells = () => {
  const [spells, setSpells] = useState([]);
  const [searchSpell, setSearchSpell] = useState([]);
  const [loading, setLoading] = useState(false);

  const searchHandler = (event) => {
    setSearchSpell (spells.filter((item) => (item.spell).toLowerCase().includes((event.target.value).toLowerCase())))
}
  const API='https://potterapi-fedeperin.vercel.app/en';
   useEffect(() => {
       const getSpells = async () => {
      try {
        setLoading(true);
        const spellsData = await axios.get(`${API}/spells`)
        console.log(spellsData.data);
          if (spellsData.data) {
          setLoading(false);
          setSpells(spellsData.data);
        }
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };

    getSpells();
  }, []);


  const allSpells = searchSpell.length ? searchSpell : spells;

  const spellItems = allSpells.map((spell, index) => {
    return (
      <div key={index} className="border border-secondary rounded w-25 text-center m-2 spell pt-2 pb-2 text-white">
            <h6><span className='text-dark'>Spell:</span><br/><p>{spell.spell}</p></h6>
            <h6><span className='text-dark'>Use:</span><br/>{spell.use}</h6>
             </div>
    );
  });

  return (
    <div>
      <div className="w-50 m-auto ">
        <input onChange={searchHandler} type="text" placeholder="Search for Spell...." className="form-control mt-2"/>
      </div>
      <div className="d-flex flex-wrap justify-content-center mt-4">
        {spellItems}
      </div>
    </div>
  );
};
export default Spells;


      