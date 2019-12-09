import { useState, useEffect } from 'react';
import StripCheckout from 'react-stripe-checkout';
import { Button, Segment, Divider } from 'semantic-ui-react';
import calculateCartTotal from '../../utils/calculateCartTotal';

function CartSummary({ success, products, handleCheckout }) {
  const [isCartEmpty, setCartEmpty] = useState(false);
  const [cartAmount, setCartAmount] = useState(0);
  const [stripeAmount, setStripeAmount] = useState(0);

  useEffect(() => {
    const { cartTotal, stripeTotal } = calculateCartTotal(products);
    setCartAmount(cartTotal);
    setStripeAmount(stripeTotal);
    setCartEmpty(products.length === 0);
  }, [products]);

  return (
    <>
      <Divider />
      <Segment clearing size='large'>
        <strong>Sub total:</strong> {cartAmount}
        <StripCheckout
          name='BilibonShop'
          amount={stripeAmount}
          image={products.length > 0 ? products[0].product.mediaUrl : ''}
          currency='AUD'
          shippingAddress={true}
          billingAddress={true}
          zipCode={true}
          token={handleCheckout}
          triggerEvent='onClick'
          stripeKey='pk_test_lawKW4r0s7MeOmuHjWXLatMh00UuoRi7jN'
        >
          <Button
            disabled={isCartEmpty || success}
            icon='cart'
            color='teal'
            floated='right'
            content='Checkout'
          />
        </StripCheckout>
      </Segment>
    </>
  );
}

export default CartSummary;
