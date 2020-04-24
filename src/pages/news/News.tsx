import React from "react";
import { Helmet } from "react-helmet";

export interface NewsProps {}

const News: React.FC<NewsProps> = ({}) => {
  return (
    <>
      <Helmet>
        <title>Title | News</title>
      </Helmet>
      <div>News__</div>
    </>
  );
};

export default News;
