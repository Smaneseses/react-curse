import axios from 'axios';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const FullPizza: React.FC = () => {
  const { id } = useParams();
  const [pizza, pizzaData] = React.useState<{
    imageUrl: string;
    title: string;
    price: number;
  }>();
  const navigate = useNavigate();

  React.useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get(`https://683352f0464b499636ff1495.mockapi.io/items/` + id);
        pizzaData(data);
      } catch (error) {
        alert('123');
        navigate('/');
      }
    }
    fetchPizza();
  }, []);
  if (!pizza) {
    return 'Загрузка';
  }

  return (
    <div className="container">
      <img src={pizza.imageUrl}></img>
      <h2>{pizza.title}</h2>
      <h4>{pizza.price}</h4>
    </div>
  );
};

export default FullPizza;
