import React, { useEffect,useState } from 'react';
import styles from './Card.module.css';
import {getGenre} from '../Convertors';
import { FaArrowRight } from 'react-icons/fa';
import {AiOutlineDoubleRight} from 'react-icons/ai';
import { CircularProgressbar,buildStyles  } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import axios from 'axios';
import Link from 'next/link';
import iso6391 from 'iso-639-1';
import Image from 'next/image'

const Card = ({movie,title}) => {
  // console.log(movie)
  const [budget, setBudget] = useState(0);
  const [revenue, setRevenue] = useState(0);
  const [loading,setLoading] = useState(false);

  const handlePage = () => {
    window.open(`https://www.themoviedb.org/movie/${movie.id}`, '_blank');
  }

  useEffect(() => {
    const fetchMovieBudget = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${movie.id}?api_key=db75be3f6da59e6c54d0b9f568d19d16`
        );
        setBudget(response.data.budget);
        setRevenue(response.data.revenue);
        // console.log(response.data.budget) 
        setLoading(false);
      } catch (error) {
        console.log('Error fetching movie budget:', error);
      }
    };

    fetchMovieBudget();
  }, [movie.id]);

  const getPoster = () => {
    if (movie.poster_path !== null) {
      return `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;
    } else {
      return 'https://www.movienewz.com/img/films/poster-holder.jpg';
      // hostname of above url is..
      
    }
  };

  return (
    <Link className={styles.cardConatiner} href={`/movie/${movie.id}`}>
      <div className={styles.imgContainer}>
        <Image src={getPoster()} height={300} width={220}  alt={movie.title} />
      </div>
      <div className={styles.textContainer}>
        <div className={styles.top}>
          <p className={styles.title}>{movie.title}</p>
          <p className={styles.lang}>{iso6391.getName(movie.original_language)}</p>
        </div>      
        
        <div className={styles.genreContainer}>
          {movie.genre_ids.map((genre) => (
            <p key={genre} className={styles.genre}>{getGenre(genre)}</p>
          ))}
        </div>
      
        <div className={styles.boxes}>    
          
          <div className={styles.box}>
            <p className={styles.boxText}>Release date</p>
            <p className={styles.boxContent}>{movie.release_date}</p>
          </div>

          {/* vote_average */}
          {title!=='upcoming' && title!=='popular' && <div className={styles.box}>
            <p className={styles.boxText}>Votes</p>
              <div style={{ width: 40, height: 40 }}>
                <CircularProgressbar  styles={buildStyles({ textSize: '36px',textColor: 'rgb(244, 51, 151)',stroke: '#111',})} value={(movie.vote_average)*10} text={`${(movie.vote_average)*10}%`} />
              </div>
          </div>}

          {/* revenue */}
          {title==='popular' && 
          <div className={styles.box}>
              <p className={styles.boxText}>Revenue</p>
              <p className={styles.boxContent}>{revenue!==0 ? "$"+revenue : "N/A"}</p>
          </div>}

        </div>
        
        <div className={styles.boxes}>    
          
        {/* popularity */}
          {title!=='upcoming' && title!=='top_rated' && <div className={styles.box}>
              <p className={styles.boxText}>Popularity</p>
              <p className={styles.boxContent}>{movie.popularity}</p>
          </div>}

          {/* vote_count */}
          {title==='top_rated' && 
          <div className={styles.box}>
              <p className={styles.boxText}>Vote Count</p>
              <p className={styles.boxContent}>{
                movie.vote_count
              }</p>
          </div>}

          {/* budget */}
          {title==='upcoming' && <div className={styles.box}>
              <p className={styles.boxText}>Budget</p>
              <p className={styles.boxContent}>{budget!==0 ? "$"+budget : "N/A"}</p>
          </div>}
          
          <Link className={styles.nowBtn} href={`/movie/${movie.id}`}>
            <p>Preview</p>
            <AiOutlineDoubleRight size={17}/>
          </Link>

        </div>
      </div>
    </Link>
  );
};

export default Card;

