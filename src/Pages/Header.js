import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <div className="flex flex-row gap-2">
      <Link to="/">Login</Link>
      <Link to="/register">Register</Link>
    </div>
  );
};

export default Header;
