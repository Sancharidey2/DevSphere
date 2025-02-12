import React from "react";
import { Link } from "react-router-dom";
import "../index.css";

const PageNotFound = () => {
  return (
    <div className="pageNotFound" id="mainn" style={{ padding: 40 }}>
      <div className="fof">
        <h1>Error 404</h1>
        <div>
          <Link to="/">Go Home</Link>
        </div>
      </div>
    </div>
  );
};
export default PageNotFound;
