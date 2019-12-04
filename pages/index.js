import { useEffect } from 'react';
import axios from 'axios';

function Home() {
  useEffect(() => {
    const getProducts = async () => {
      const url = 'http://localhost:3000/api/products';
      let response = await axios.get(url);
      console.log(response);
    };
    getProducts();
  }, []);

  return <>home</>;
}

export default Home;
