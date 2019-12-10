import { useState, useEffect } from 'react';
import {
  Form,
  Input,
  TextArea,
  Button,
  Image,
  Message,
  Header,
  Icon
} from 'semantic-ui-react';
import axios from 'axios';
import baseUrl from '../utils/baseUrl';
import catchErrors from '../utils/catchErrors';

const INITIAL_PRODUCT = {
  name: '',
  price: '',
  media: '',
  description: ''
};

function CreateProduct() {
  const [product, setProduct] = useState(INITIAL_PRODUCT);

  const { name, price, description, media } = product;

  const [mediaPreview, setMediaPreview] = useState('');

  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [error, setError] = useState('');

  const handleChange = e => {
    const { name, value, files } = e.target;
    if (name === 'media' && files[0]) {
      setProduct(prevProduct => ({ ...prevProduct, media: files[0] }));
      setMediaPreview(window.URL.createObjectURL(files[0]));
    } else {
      setProduct(prevProduct => ({ ...prevProduct, [name]: value }));
    }
  };

  useEffect(() => {
    const isProduct = Object.values(product).every(el => Boolean(el));
    isProduct ? setDisabled(false) : setDisabled(true);
  }, [product]);

  const handleImageUpload = async () => {
    const data = new FormData();
    data.append('file', media);
    data.append('upload_preset', 'bilibonshop');
    data.append('cloud_name', 'kazhala');
    const response = await axios.post(
      'https://api.cloudinary.com/v1_1/kazhala/image/upload',
      data
    );
    const mediaUrl = response.data.url;
    return mediaUrl;
  };

  const handleSubmit = async e => {
    try {
      e.preventDefault();
      setLoading(true);
      setError('');
      const mediaUrl = await handleImageUpload();
      const url = `${baseUrl}/api/product`;
      const { name, price, description } = product;
      const payload = { mediaUrl, name, price, description };
      await axios.post(url, payload);
      // console.log(response);
      setProduct(INITIAL_PRODUCT);
      setSuccess(true);
    } catch (err) {
      catchErrors(err, setError);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header as='h2' block>
        <Icon name='add' color='orange' />
        Create New Product
      </Header>
      <Form
        error={error ? true : false}
        loading={loading}
        success={success}
        onSubmit={handleSubmit}
      >
        <Message error header='Oops' content={error} />
        <Message
          success
          icon='check'
          header='Success!'
          content='Your product has been posted'
        />
        <Form.Group widths='equal'>
          <Form.Field
            control={Input}
            name='name'
            label='Name'
            placeholder='Name'
            onChange={handleChange}
            value={name}
          />
          <Form.Field
            control={Input}
            name='price'
            label='Price'
            placeholder='Price'
            min='0.00'
            step='0.01'
            type='number'
            onChange={handleChange}
            value={price}
          />
          <Form.Field
            control={Input}
            name='media'
            type='file'
            label='Media'
            content='Select Image'
            accept='image/*'
            onChange={handleChange}
          />
        </Form.Group>
        <Image src={mediaPreview} rounded centered size='small' />
        <Form.Field
          control={TextArea}
          name='description'
          label='Description'
          placeholder='Description'
          onChange={handleChange}
          value={description}
        />
        <Form.Field
          control={Button}
          disabled={disabled || loading}
          color='blue'
          icon='pencil alternate'
          content='Submit'
          type='submit'
        />
      </Form>
    </>
  );
}

export default CreateProduct;
