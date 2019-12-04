import { useEffect } from 'react';
import axios from 'axios';

function Home(props) {
  const { products } = props;
  // useEffect(() => {
  //   getProducts();
  // }, []);
  console.log(products);

  return <>home</>;
}

Home.getInitialProps = async () => {
  // fetch data
  const url = 'http://localhost:3000/api/products';
  let response = await axios.get(url);
  // return response data
  return { products: response.data };
};

export default Home;
