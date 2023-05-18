import React from 'react'
import styles from './Reviews.module.css'

const Review = ({review}) => {
  return (
    <div className={styles.review}>
        <div className={styles.person}>
            <div className={styles.both}>
                <img className={styles.reviewerImg} src={
                    review?.author_details.avatar_path?.includes('http') ? review?.author_details.avatar_path?.slice(1) : `https://image.tmdb.org/t/p/original${review?.author_details.avatar_path}`
                } alt='reviewer'/> 
                <p className={styles.reviewerName}>{review?.author}</p>
            </div>
            <p className={styles.cretaedAt}>
                {new Date(review?.created_at).toLocaleDateString('en-US', {year: 'numeric',month: 'long',day: 'numeric'})}
            </p>
        </div>
        <p className={styles.content}>{review?.content}</p>
    </div>
  )
}

export default Review