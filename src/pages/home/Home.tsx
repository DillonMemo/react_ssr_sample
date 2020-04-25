import React from "react";
import styled from "styled-components";

export interface HomeProps {}

const Home: React.FC<HomeProps> = ({}) => {
  return (
    <div>
      Home__<RedTxt>Red!!</RedTxt>
    </div>
  );
};

const RedTxt = styled.span`
  color: red;
`;

export default Home;
