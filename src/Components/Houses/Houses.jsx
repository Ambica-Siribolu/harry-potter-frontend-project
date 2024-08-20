import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './Houses.css';

const Houses = () => {
  const [houses, setHouses] = useState([]);
  const [searchHouse, setSearchHouse] = useState([]);
  const [loading, setLoading] = useState(false);

  const searchHandler = (event) => {
    setSearchHouse(houses.filter((item) => (item.house).toLowerCase().includes((event.target.value).toLowerCase())))
}
  const API='https://potterapi-fedeperin.vercel.app/en';
   useEffect(() => {
       const getHouses = async () => {
      try {
        setLoading(true);
        const housesData = await axios.get(`${API}/houses`)
        console.log(housesData.data);
          if (housesData.data) {
          setLoading(false);
          setHouses(housesData.data);
        }
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };

    getHouses();
  }, []);


  const allHouses = searchHouse.length ? searchHouse : houses;

  const houseItems = allHouses.map((house, index) => {
    return (
      <div key={index} className="border border-secondary rounded text-center m-2 house">
            <h6><span className='text-warning'>House :</span><br/>{house.house}</h6>
            <h6><span className='text-warning'>Founder :</span><br/>{house.founder}</h6>
             <p><span className='text-warning'>emoji :</span><br/>{house.emoji}</p>
            <p><span className='text-warning'>Animal:</span><br/>{house.animal}</p>
           <p><span className='text-warning'>Colors:</span><br/>{house.colors}</p>
      
      </div>
    );
  });

  return (
    <div>
      <div className="w-50 m-auto">
        <input onChange={searchHandler} type="text" placeholder="Search for House...." className="form-control mt-2"/>
      </div>
      <div className="d-flex flex-wrap justify-content-center mt-4">
        {houseItems}
      </div>
    </div>
  );
};
export default Houses;

  
