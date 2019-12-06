const catchErrors = (err, displayError) => {
  let errorMsg;
  if (err.response) {
    // The request was made and server responded with status
    // that is not in the range of 2xx
    errorMsg = err.response.data;
    console.log('Error response', errorMsg);

    // for cloudinary image uploads
    if (err.response.data.error) {
      errorMsg = err.response.data.error;
    }
  } else if (err.request) {
    // The request was made but no response was received
    errorMsg = err.request;
    console.log('Error request', err.request);
  } else {
    // something else happened
    errorMsg = err.message;
    console.log('Error message', errorMsg);
  }
  displayError(errorMsg);
};

export default catchErrors;
