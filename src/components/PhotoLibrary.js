import React, { useEffect, useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchPhotosSuccess, fetchPhotosError } from "../redux/actions";
import PhotoCard from "./PhotoCard";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import "../styles/PhotoLibrary.css";
import { Link } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import Button from "@mui/material/Button";

function PhotoLibrary() {
  const dispatch = useDispatch();
  const photosState = useSelector((state) => state.photos);
  const { loading, error, data: photos } = photosState || {};
  const favorites = useSelector((state) => state.favorites);
  const [sortBy, setSortBy] = useState("");
  const [sortedPhotos, setSortedPhotos] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const limit = 12;
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const fetchPhotosData = async () => {
    try {
      const query = `
        query SlingacademyQuery($limit: String, $offset: String) {
          slingacademyQuery(limit: $limit, offset: $offset) {
            message
            photos {
              description
              id
              title
              url
              user
            }
            limit
            offset
            success
            total_photos
          }
        }
        `;

      const variables = { limit, offset };

      const response = await fetch(
        "https://napak.stepzen.net/api/photo-gallery/__graphql",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization:
              "apikey napak::stepzen.io+1000::8a9dfa8e1f6e6a0139a70e2b40652ca8b6e5a34408af696930057a210a4f9fa1",
          },
          body: JSON.stringify({ query, variables }),
        }
      );

      const result = await response.json();
      const photosData = result?.data?.slingacademyQuery?.photos || [];
      if (!result?.data?.slingacademyQuery?.success) {
        throw new Error(result?.data?.slingacademyQuery?.message);
      }

      if (photosData.length === 0) {
        setHasMore(false);
      } else {
        setSortedPhotos((prevPhotos) => [...prevPhotos, ...photosData]);
        setOffset(offset + limit);
      }
    } catch (error) {
      dispatch(fetchPhotosError(error.message));
    }
  };

  useEffect(() => {
    fetchPhotosData();
  }, [dispatch, limit, offset]);

  useEffect(() => {
    if (sortBy === "addedToFavorites") {
      const sorted = photos.slice().sort((a, b) => {
        const aIsFavorite = favorites.some((fav) => fav.id === a.id);
        const bIsFavorite = favorites.some((fav) => fav.id === b.id);
        return bIsFavorite - aIsFavorite;
      });
      setSortedPhotos(sorted);
    } else if (sortBy === "alphabetical") {
      const sorted = photos.slice().sort((a, b) => {
        return a.title.localeCompare(b.title);
      });
      setSortedPhotos(sorted);
    } else {
      setSortedPhotos(photos);
    }
  }, [photos, favorites, sortBy]);

  const handleSearchChange = useCallback((e) => {
    setSearchTerm(e.target.value);
  }, []);

  useEffect(() => {
    const filteredPhotos = photos.filter((photo) =>
      photo.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSortedPhotos(filteredPhotos);
  }, [photos, searchTerm]);

  const sortByAddedToFavorites = () => {
    setSortBy("addedToFavorites");
  };

  const sortAlphabetically = () => {
    setSortBy("alphabetical");
  };

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop ===
        document.documentElement.offsetHeight &&
      hasMore &&
      !loading
    ) {
      fetchPhotosData();
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  if (loading && sortedPhotos.length === 0) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="photo-library">
      <nav className="topbar">
        <div className="photolib">
          <h1>Photo &nbsp;Library</h1>
        </div>
        <div className="fav">
          <Link
            to="/favorites"
            style={{ textDecoration: "none", color: "black" }}
          >
            <h3>Favorites</h3>
          </Link>
        </div>
      </nav>
      <br />
      <div className="search-bar">
        <TextField
          label={<SearchIcon />}
          value={searchTerm}
          onChange={handleSearchChange}
          variant="outlined"
          fullWidth
        />
      </div>
      <br />
      <div className="sort-options">
        <Button onClick={sortByAddedToFavorites}>
          Sort by Added to Favorites
        </Button>
        <Button onClick={sortAlphabetically}>Sort Alphabetically</Button>
      </div>
      <Grid container ml={5} spacing={3} mt={1}>
        {sortedPhotos &&
          sortedPhotos.map((photo) => (
            <Grid item key={photo.id} xs={12} sm={6} md={4}>
              <PhotoCard photo={photo} />
            </Grid>
          ))}
      </Grid>
    </div>
  );
}

export default PhotoLibrary;
