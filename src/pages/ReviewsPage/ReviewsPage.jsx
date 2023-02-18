import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import styles from './reviewsPage.module.css';

import { fetchMoviesReviewsById } from 'services/API';

const ReviewsPage = () => {
  const [reviews, setReviews] = useState([]);
  const { id } = useParams();
  console.log(reviews);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const data = await fetchMoviesReviewsById(id);
        setReviews(data);
      } catch ({ response }) {
        console.log(response.data.message);
      }
    };
    fetchReviews();
  }, [id]);

  const element = reviews.map(({ id, author, content }) => (
    <li key={id}>
      <h3>{author}</h3>
      <p>{content}</p>
    </li>
  ));

  return (
    <ul className={styles.list}>
      {element.length === 0
        ? "We don't have any reviews for this movie"
        : element}
    </ul>
  );
};
export default ReviewsPage;
