import { useState, useEffect } from 'react';
import { fetchMoviesDetailsById } from 'services/API';
import {
  NavLink,
  useParams,
  useNavigate,
  Outlet,
  useLocation,
} from 'react-router-dom';

import styles from './movieDetailsPage.module.css';

const MovieDetailsPage = () => {
  const [movieDetails, setMovieDetails] = useState();
  const { id } = useParams();

  const location = useLocation();
  const from = location.state?.from || '/';
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const data = await fetchMoviesDetailsById(id);
        setMovieDetails(data);
      } catch ({ response }) {
        console.log(response.data.message);
      }
    };
    fetchMovies();
  }, [id]);

  return (
    <>
      {movieDetails && (
        <div className={styles.wrapper}>
          <button
            type="button"
            onClick={() => navigate(from)}
            className={styles.btn}
          >
            Go back
          </button>
          <div className={styles.infMovie}>
            <img
              src={`https://image.tmdb.org/t/p/w500/${movieDetails?.poster_path}`}
              alt="poster"
              width="200"
            />
            <section>
              <h2>{movieDetails?.title}</h2>
              <p>User Score: {Math.round(movieDetails?.vote_average * 10)}%</p>
              <h3>Overview</h3>
              <p> {movieDetails?.overview}</p>
              <h3>Genres</h3>
              <ul>
                {movieDetails?.genres.map(({ id, name }) => (
                  <li key={id}>{name}</li>
                ))}
              </ul>
            </section>
          </div>
          <div>
            <h2>Additional information</h2>
            <ul className={styles.list}>
              <li>
                <NavLink to="cast" state={{ from }} className={styles.navLink}>
                  Cast
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="reviews"
                  state={{ from }}
                  className={styles.navLink}
                >
                  Reviews
                </NavLink>
              </li>
            </ul>
          </div>
          <Outlet />
        </div>
      )}
    </>
  );
};

export default MovieDetailsPage;
