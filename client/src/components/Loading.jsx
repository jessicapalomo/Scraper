import React from 'react';
import Loader from 'react-loader-spinner';

const Loading = ({ loading }) => {
  return (
    <Loader
      id="loader"
      visible={loading}
      type="Hearts"
      color="#00BFFF"
      height={250}
      width={250}
    />
  );
};

export default Loading;
