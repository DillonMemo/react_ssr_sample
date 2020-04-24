import React from "react";
import { Link } from "react-router-dom";

export interface HeaderProps {}

const Header: React.FC<HeaderProps> = ({}) => {
  return (
    <header>
      <Link to="/">Home</Link>
      <Link to="/news">News</Link>
    </header>
  );
};

export default Header;
