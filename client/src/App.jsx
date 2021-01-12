import React, { useState, useEffect, useContext } from 'react';
import { AppContext } from './context/AppContext';
import News from './components/News';
import Loading from './components/Loading';
import './App.css';

const App = () => {
  const { loading, setLoading } = useContext(AppContext);
  const [news, setNews] = useState(null);

  const fetchTheNews = () => {
    setLoading(true);
    fetch('/api/news')
      .then((response) => response.json())
      .then((data) => {
        setLoading(false);
        setNews(data);
      });
  };

  useEffect(fetchTheNews, []);

  return (
    <>
      <div className="container d-flex flex-wrap justify-content-center py-5">
        <News news={news} />
      </div>
      <div className="d-flex justify-content-center">
        <Loading loading={loading} />
      </div>
    </>
  );
};

export default App;
