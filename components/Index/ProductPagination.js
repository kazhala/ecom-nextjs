import { Container, Pagination } from 'semantic-ui-react';

function ProductPagination({ totalPages }) {
  return (
    <Container textAlign='center' style={{ margin: '2em' }}>
      <Pagination
        defaultActivePage={1}
        totalPages={totalPages}
        onPageChange={(e, data) => {
          console.log(data);
        }}
      />
    </Container>
  );
}

export default ProductPagination;
