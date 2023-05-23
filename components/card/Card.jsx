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
import {BsFillBookmarkHeartFill} from 'react-icons/bs'
import { useRouter } from 'next/router';
import LoginModal from '../modals/LoginModal';
import {RiDeleteBack2Fill} from 'react-icons/ri';

const Card = ({movie,title,isLoggedIn,user}) => {
  const [budget, setBudget] = useState(0);
  const [revenue, setRevenue] = useState(0);
  const [loading,setLoading] = useState(false);
  const isSeries = title==='series';
  const [isLiked, setIsLiked] = useState(false)
  const router=useRouter();
  const userId=user?._id;
  const [showLoginModal,setShowLoginModal]=useState(false);

  // check if page is favorites page
  const isFavPage=router.pathname.includes('/favorites');


     //like or dislike post
     useEffect(() => {
      setIsLiked(user?.favorites?.includes(movie.id));
    }, [movie.id, user?.favorites, user]);

    const likeHandler = async () => {
      if (isLoggedIn) {
        try {
          const res = await axios.patch(`https://movie-app-one-neon.vercel.app/api/users/${userId}`, { movieId: movie.id });
          const users = localStorage?.getItem('MovieApp_user');
          const userData = JSON?.parse(users);
          let myUser = userData?.user;
          let myToken = userData?.token;
          myUser.favorites = res.data.user.favorites;
          localStorage.setItem('MovieApp_user', JSON.stringify({ user: myUser, token: myToken }));          
          setIsLiked(!isLiked);
        } catch (error) {
          console.log(error);
        }
      } else {
        setShowLoginModal(true);
      }
    };

    const handlePage = () => {
      window.open(`https://www.themoviedb.org/movie/${movie.id}`, '_blank');
    }

  useEffect(() => {
    const fetchMovieBudget = async () => {
      setLoading(true);
      try {
        if(title!=='series'){
          const response = await axios.get(
            `https://api.themoviedb.org/3/movie/${movie.id}?api_key=db75be3f6da59e6c54d0b9f568d19d16`
          );
          setRevenue(response.data.revenue);
          setBudget(response.data.budget);
        }
        // console.log(response.data.budget) 
        setLoading(false);
      } catch (error) {
        console.log('Error fetching movie budget:', error);
      }
    };

    fetchMovieBudget();
  }, [movie.id,title]);

  const getPoster = () => {
    if (movie.poster_path !== null || movie.poster_path !== undefined || movie.poster_path !== '') {
      return `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;
    } else {
      return 'https://www.movienewz.com/img/films/poster-holder.jpg';
      // hostname of above url is..
    }
  };

  const removeHandler = async () => {
    // alert('Are you sure you want to remove this movie from your favorites?');
    try{
      const res=await axios.patch(`http://localhost:3000/api/users/favorite/remove`,{movieId:movie.id,userId});
      const users = localStorage?.getItem('MovieApp_user');
      const userData = JSON?.parse(users);
      let myUser = userData?.user;
      let myToken = userData?.token;
      myUser.favorites = await res.data.user.favorites;
      localStorage.setItem('MovieApp_user', JSON.stringify({ user: myUser, token: myToken }));
      // router.replace(router.asPath);
      window.location.reload();
    }catch(error){
      console.log(error);
    }
  }

  return (
    <div className={styles.cardConatiner}>
      
      <div className={styles.imgContainer}>
        <Image src={getPoster() ? getPoster() : 'https://www.movienewz.com/img/films/poster-holder.jpg'} height={300} width={220}  alt={isSeries ? movie?.name : movie.title} />
        <div className={styles.overlay} onClick={likeHandler}>
          {!isFavPage ? <BsFillBookmarkHeartFill size={22} color={isLiked ? 'red' : 'blue'} /> :
          <RiDeleteBack2Fill size={30} color={'white'} onClick={removeHandler} />
          }
        </div>
      </div>

      <div className={styles.textContainer}>
        <div className={styles.top}>
          <p className={styles.title}>{isSeries ? movie?.name : movie.title}</p>
          <p className={styles.lang}>{iso6391.getName(movie.original_language)}</p>
        </div>      
        
        <div className={styles.genreContainer}>
          {movie?.genre_ids?.map((genre) => (
            <p key={genre} className={styles.genre}>{getGenre(genre)}</p>
          ))}
        </div>
      
        <div className={styles.boxes}>    
          
          <div className={styles.box}>
            <p className={styles.boxText}>{isSeries ? "first Air On" : "Release date"}</p>
            <p className={styles.boxContent}>{isSeries ? movie?.first_air_date : movie?.release_date}</p>
          </div>

          {/* vote_average */}
          {title!=='upcoming' && title!=='popular' && <div className={styles.box}>
            <p className={styles.boxText}>Votes</p>
              <div style={{ width: 40, height: 40 }}>
                <CircularProgressbar  styles={buildStyles({ textSize: '30px',textColor: 'rgb(244, 51, 151)',stroke: '#111',})} value={(movie.vote_average)*10} text={`${(movie.vote_average)*10}%`} />
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
          <Link className={styles.nowBtn} href={title!=='series' ? `/movie/${movie.id}` : `/tv/${movie.id}`}>
            <p>Preview</p>
            <AiOutlineDoubleRight size={17}/>
          </Link>
        </div>
      </div>
      {
        showLoginModal && <LoginModal 
        onClose={()=>
          setShowLoginModal(false)
        } />
      }
    </div>
  );
};

export default Card;
