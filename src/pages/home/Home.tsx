/** @jsx jsx */
import { jsx, css } from "@emotion/core";

export interface HomeProps {}

const Home: React.FC<HomeProps> = ({}) => {
  return (
    <div css={divWrapper}>
      Home__<span>Blue!!</span>
      PORT : {process.env.PORT}
    </div>
  );
};

const divWrapper = css`
  span {
    color: blue;
  }
`;

export default Home;
