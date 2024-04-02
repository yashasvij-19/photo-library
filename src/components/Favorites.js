// Favorites.js

import React from "react";
import { useSelector, useDispatch } from "react-redux";
import PhotoCard from "./PhotoCard";
import Grid from "@mui/material/Grid";
import "../styles/Favorites.css";
import { Link } from "react-router-dom";

function Favorites() {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites);

  return (
    <div className="favorites">
      <nav className="topbar-favorites">
        <div className="favorites">
          <h1>Favorites</h1>
        </div>
        <div className="library">
          <Link to="/" style={{ textDecoration: "none", color: "black" }}>
            {" "}
            <h3>Photo Library</h3>
          </Link>
        </div>
      </nav>
      <Grid container ml={5} spacing={3} mt={3}>
        {favorites &&
          favorites.map((photo) => (
            <Grid item key={photo.id} xs={12} sm={6} md={4}>
              <PhotoCard photo={photo} />
            </Grid>
          ))}
      </Grid>
    </div>
  );
}

export default Favorites;
