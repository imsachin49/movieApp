import React, { useEffect, useState,CSSProperties } from 'react';
import styles from './Cards.module.css';
import Card from '../card/Card';
import {IoChevronBackOutline} from 'react-icons/io5';
import {IoChevronForwardOutline} from 'react-icons/io5';
import { useRouter } from 'next/router';
import axios from 'axios';
import ClipLoader from "react-spinners/ClipLoader"
import BounceLoader from "react-spinners/BounceLoader"

const Cards = ({ title,isLoggedIn,user }) => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const query=useRouter()?.query?.title;
  const router=useRouter();
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const isSeries = title === 'series';

  useEffect(() => {
    if (query) {
      setLoading(true);
      axios.get(`https://api.themoviedb.org/3/search/movie`, {
        params: {
          api_key: 'db75be3f6da59e6c54d0b9f568d19d16', // Replace with your TMDb API key
          query: query,
          page: page
        }
      })
        .then(response => {
          const data = response?.data;
          setMovies(data.results);
          setTotalPages(data.total_pages);
          setLoading(false);
        })
        .catch(error => {
          console.error('Error:', error);
        });
    } else if (title==='series'){
      setLoading(true);
      // gett popular series
      axios.get(`https://api.themoviedb.org/3/tv/popular?api_key=db75be3f6da59e6c54d0b9f568d19d16&page=${page}`)
        .then(response => {
          const data = response?.data;
          setMovies(data.results);
          setTotalPages(data.total_pages);
          setLoading(false);
          // console.log(data.results)
          // console.log(data.results)
        }).catch(error => {
          console.error('Error:', error);
        });
    } else {
      setLoading(true);
      axios.get(`https://api.themoviedb.org/3/movie/${title}?api_key=db75be3f6da59e6c54d0b9f568d19d16&page=${page}`)
        .then(response => {
          const data = response?.data;
          setMovies(data.results);
          setTotalPages(data.total_pages);
          setLoading(false);
        }).catch(error => {
          console.error('Error:', error);
        });
    }
  }, [query, page]);

  return (
    <div className={styles.cardsContainer} id={title}>
      <div className={styles.pages}>
        <span className={styles.categoryHeading}> {isSeries ? "Popular "+title : title+" movies"} {query ? query : ""}</span>
        {/* {query && <h1 className={styles.categoryHeading}>{title}</h1>} */}
      </div>
      {!loading ? 
        <div className={styles.cards}>
        {movies.map(m => (
          <div className={styles.card} key={m.id}>
            <Card movie={m} title={title} isLoggedIn={isLoggedIn} user={user}  />
          </div>
        ))}
      </div>: <div className={styles.loading}>
        <BounceLoader  color="#eb0ec7" />
      </div>}
        {
          movies.length === 0 && <h4 className={styles.categoryHeading}>No Movies Found</h4>
        }
      <div className={styles.pagination}>
          <button disabled={page === 1} onClick={() => setPage(page - 1)}><IoChevronBackOutline/>Previous</button>
          <div className={styles.pagess}>
            <span>{page}/{totalPages}</span>
          </div>
          <button disabled={page === totalPages} onClick={() => setPage(page + 1)}>Next<IoChevronForwardOutline/></button>
      </div>
    </div>
  );
};

export default Cards;
