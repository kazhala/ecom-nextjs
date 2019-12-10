import axios from 'axios';
import ProductList from '../components/Index/ProductList';
import baseUrl from '../utils/baseUrl';

function Home(props) {
  const { products } = props;

  return <ProductList products={products} />;
}

Home.getInitialProps = async ctx => {
  const page = ctx.query.page ? ctx.query.page : '1';
  const size = 9;
  // fetch data
  const url = `${baseUrl}/api/products`;
  const payload = { params: { page, size } };
  let response = await axios.get(url, payload);
  // return response data
  return { products: response.data };
};

export default Home;
