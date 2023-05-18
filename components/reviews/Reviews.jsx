import React,{useState,useEffect} from 'react'
import styles from './Reviews.module.css'
import Review from './Review'

const Reviews = ({id}) => {
    // get reviews from api by id
    const [reviews,setReviews]=useState([])
    useEffect(() => {
        const getReviews = async () => {
            try {
                const res=await fetch(`https://api.themoviedb.org/3/movie/${id}/reviews?api_key=db75be3f6da59e6c54d0b9f568d19d16`)
                const data=await res.json()
                setReviews(data.results)
            } catch (error) {
                console.log(error)
            }
        }
        getReviews()
    }, [id])

  return (
    <div className='reviewContainer'>
        <h2 className={styles.reviewHeading}>Reviews({reviews?.length})</h2>
        {reviews?.length===0 && <h3 className={styles.noReview}>No Reviews Found</h3>}
        <div className='reviewList'>
            {reviews?.slice(0,5)?.map((review, index) => {
              return <Review review={review} key={index} />
            })}
        </div>
    </div>
  )
}

export default Reviews
