import axios from 'axios';
import ProductList from '../components/Index/ProductList';
import baseUrl from '../utils/baseUrl';

function Home(props) {
  const { products } = props;

  return <ProductList products={products} />;
}

Home.getInitialProps = async () => {
  // fetch data
  const url = `${baseUrl}/api/products`;
  let response = await axios.get(url);
  // return response data
  return { products: response.data };
};

export default Home;
