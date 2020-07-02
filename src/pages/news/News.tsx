/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { useState, useEffect, Fragment } from "react";
import { Helmet } from "react-helmet";

export interface NewsProps {}

const News: React.FC<NewsProps> = ({}) => {
  const [quote, setQuote] = useState<string>("");
  useEffect(() => {
    setQuote("test");
    fetch("http://horizonshq.herokuapp.com/api/inspirationalquotes")
      .then((json) => json.json())
      .then((response) => {
        console.log(response);
        setQuote(response.message);
      })
      .catch((error) => console.error(error));
  }, []);
  return (
    <Fragment>
      <Helmet>
        <title>Title | News</title>
      </Helmet>
      <div>
        News__
        <p>{quote}</p>
      </div>
    </Fragment>
  );
};

const NewsWrapper = css``;

export default News;
