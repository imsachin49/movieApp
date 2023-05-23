import {FaChevronCircleRight} from 'react-icons/fa';
import {FaChevronCircleLeft} from 'react-icons/fa';
import React, { useState, useEffect, useRef } from 'react';
import styles from './Casts.module.css';
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import SwiperCore, { Navigation } from 'swiper';

SwiperCore.use([Navigation]);

const Casts = ({ movieId,title}) => {
  const [cast, setCast] = useState([]);
  const [slidesPerView, setSlidesPerView] = useState(4);
  const swiperRef = useRef(null);

  useEffect(() => {
    const fetchCast = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/${title==='movie' ? 'movie' : 'tv'}/${movieId}/credits?api_key=db75be3f6da59e6c54d0b9f568d19d16`
        );
        setCast(response.data.cast);
      } catch (error) {
        console.log(error);
      }
    };

    fetchCast();
  }, [movieId]);

  const getProfilePath = (profile_path) => {
    if (profile_path) {
      return `https://image.tmdb.org/t/p/w500/${profile_path}`;
    } else {
      return 'https://cdn-icons-png.flaticon.com/128/4140/4140061.png';
    }
  };

  const handleResize = () => {
    const screenWidth = typeof window !== 'undefined' ? window.innerWidth : 0;
    if (screenWidth >= 1024) {
      setSlidesPerView(8);
    } else if (screenWidth >= 720) {
      setSlidesPerView(6);
    } else if (screenWidth >= 550) {
      setSlidesPerView(5);
    } else if (screenWidth >= 400) {
      setSlidesPerView(4);
    } else {
      setSlidesPerView(3);
    }
  };

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleNext = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slideNext();
    }
  };

  const handlePrev = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slidePrev();
    }
  };

  return (
    <div className={styles.castsContainer}>
      <h1 style={{marginLeft:'6px'}}>Casts({cast.length})</h1>
      {cast.length >0 ? <div className={styles.customButtons} style={{position:'relative'}}>
        <button className={styles.prevButton} onClick={handlePrev} style={{position:'absolute',top:'30%',left:'0rem',zIndex:'5',padding:'5px',cursor:'pointer',background:'none',border:'none'}}>
          <FaChevronCircleLeft size={24} color='blue' />
        </button>
        <Swiper
          spaceBetween={20}
          slidesPerView={slidesPerView}
          navigation={{
            prevEl: '.prevButton',
            nextEl: '.nextButton',
          }}
          className={styles.castsWrapper}
          ref={swiperRef}>
          {cast.map((c) => (
            <SwiperSlide className={styles.cast} key={c.id}>
              <img src={getProfilePath(c.profile_path)} alt='no' />
              <h3>{c.name}</h3>
            </SwiperSlide>
          ))}
        </Swiper>
      <button className={styles.nextButton} onClick={handleNext} style={{position:'absolute',top:'30%',right:'0rem',zIndex:'5',padding:'5px',cursor:'pointer',background:'none',border:'none'}}>
        <FaChevronCircleRight size={24} color='blue' />
      </button>
    </div> : <h2 style={{textAlign:'start',marginLeft:'1rem',color:'gray'}}>Cast Data not Found</h2>}
  </div>
  );
};

export default Casts;
