import React, { useEffect } from "react";

function Logout() {
  useEffect(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    localStorage.removeItem("_id");
    localStorage.removeItem("type");
    window.location.href = "http://localhost:3000/";
  }, []);

  return <div></div>;
}

export default Logout;
