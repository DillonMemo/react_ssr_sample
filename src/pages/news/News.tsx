import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import Axios from "axios";

export interface NewsProps {}

const News: React.FC<NewsProps> = ({}) => {
  const [quote, setQuote] = useState<string>("");

  useEffect(() => {
    setQuote("test");
    Axios.get("http://horizonshq.herokuapp.com/api/inspirationalquotes")
      .then((response) => {
        console.log(response);
        setQuote(response.data.message);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <>
      <Helmet>
        <title>Title | News</title>
      </Helmet>
      <div>
        News__
        <p>{quote}</p>
      </div>
    </>
  );
};

export default News;
