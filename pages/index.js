import axios from 'axios';
import ProductList from '../components/Index/ProductList';
import baseUrl from '../utils/baseUrl';
import ProductPagination from '../components/Index/ProductPagination';

function Home(props) {
  const { products, totalPages } = props;

  return (
    <>
      <ProductList products={products} />
      <ProductPagination totalPages={totalPages} />
    </>
  );
}

Home.getInitialProps = async ctx => {
  const page = ctx.query.page ? ctx.query.page : '1';
  const size = 9;
  // fetch data
  const url = `${baseUrl}/api/products`;
  const payload = { params: { page, size } };
  let response = await axios.get(url, payload);
  // return response data
  return response.data;
};

export default Home;
