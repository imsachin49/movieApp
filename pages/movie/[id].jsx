import React, { useEffect,useState } from 'react'
import { useRouter } from 'next/router'
import Navbar from '../../components/navbar/Navbar'
import styles from './Movie.module.css'
import { CircularProgressbar,buildStyles  } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import Reviews from '@/components/reviews/Reviews';
import iso6391 from 'iso-639-1';
import { FaArrowRight } from 'react-icons/fa';
import Image from 'next/image'
import Footer from '@/components/footer/Footer';

const Movie = () => {
    const router = useRouter()
    const { id } = router.query
    const [movie,setMovie]=useState({})

    useEffect(() => {
        const getMovieInfo = async () => {
            try {
                const res=await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=db75be3f6da59e6c54d0b9f568d19d16`)
                const data=await res.json()
                setMovie(data)
            } catch (error) {
                console.log(error)
            }
        }
        getMovieInfo()
    }, [id])

    // console.log(movie.vote_average.toFixed(1))
    // origin country
    // console.log(movie?.origin_country)
    
    return (
        <div className='movieContainer'>
            <Navbar />
            <div className={styles.wrapper}>
                <div className={styles.leftWrapper}>
                    {/* <img src={`https://image.tmdb.org/t/p/w500/${movie?.poster_path}`} alt="" /> */}
                    <Image src={`https://image.tmdb.org/t/p/w500/${movie?.poster_path}`} alt='noImg' width={300} height={400} />
                    <button className={styles.btn} onClick={()=>window.open(`https://www.themoviedb.org/movie/${movie.id}`, '_blank')}>View on TMDB
                        <FaArrowRight className={styles.icon} />
                    </button>
                </div>
                <div className={styles.rightWrapper}>
                    
                    <h1 className={styles.movieTitle}>{movie?.title}</h1>
                    
                    <p className={styles.original_title}> {movie?.original_title===movie.title ? "" : movie.original_title} ({iso6391.getName(movie.original_language)})</p>
                    
                    <div className={styles.genreContainer}>
                        {movie?.genres?.map((genre) => (
                            <p key={genre.id} className={styles.genre}>{genre?.name}</p>
                        ))}
                    </div>

                    <p className={styles.overview}>{movie?.overview}</p>
                    
                    <div className={styles.movieInfo}>
                        <div className={styles.movieInfoItem}>
                            <span className={styles.movieInfoKey}>Release Date:</span>
                            <span className={styles.movieInfoValue}>{movie?.release_date}</span>
                        </div>
                        <div className={styles.movieInfoItem}>
                            <span className={styles.movieInfoKey}>Vote Average:</span>
                            <span className={styles.movieInfoValue}>{movie?.vote_average}</span>
                        </div>
                        <div className={styles.movieInfoItem}>
                            <span className={styles.movieInfoKey}>Vote Count:</span>
                            <span className={styles.movieInfoValue}>{movie?.vote_count}</span>
                        </div>
                        <div className={styles.movieInfoItem}>
                            <span className={styles.movieInfoKey}>Runtime:</span>
                            <span className={styles.movieInfoValue}>{movie?.runtime}</span>
                        </div>
                        <div className={styles.movieInfoItem}>
                            <span className={styles.movieInfoKey}>Budget:</span>
                            <span className={styles.movieInfoValue}>${movie?.budget}</span>
                        </div>
                        <div className={styles.movieInfoItem}>
                            <span className={styles.movieInfoKey}>Revenue:</span>
                            <span className={styles.movieInfoValue}>${movie?.revenue}</span>
                        </div>
                        <div className={styles.movieInfoItem}>
                            <span className={styles.movieInfoKey}>Popularity:</span>
                            <span className={styles.movieInfoValue}>{movie?.popularity}</span>
                        </div>
                    </div>
                    
                    <div className={styles.productionCompanies}>
                        <p className={styles.productionCompaniesTitle}>Production Companies :</p>
                        <div className={styles.productionCompaniesContainer}>
                            {movie?.production_companies?.map((company) => (
                                <div key={company.id} className={styles.productionCompany}>
                                    <p className={styles.companyName}>{company?.name}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <Reviews id={id} />

                </div>
            </div>
            {/* <Footer /> */}
        </div>
    )
}

export default Movie
