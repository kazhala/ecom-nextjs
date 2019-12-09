import { useState, useEffect } from 'react';
import { Button, Segment, Divider } from 'semantic-ui-react';

function CartSummary({ products }) {
  const [isCartEmpty, setCartEmpty] = useState(false);

  useEffect(() => {
    setCartEmpty(products.length === 0);
  }, [products]);

  return (
    <>
      <Divider />
      <Segment clearing size='large'>
        <strong>Sub total:</strong> $0.00
        <Button
          disabled={isCartEmpty}
          icon='cart'
          color='teal'
          floated='right'
          content='Checkout'
        />
      </Segment>
    </>
  );
}

export default CartSummary;
