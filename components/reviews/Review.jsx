import React,{useState} from 'react'
import styles from './Reviews.module.css'
import Image from 'next/image'

const Review = ({review}) => {
    const [readMore,setReadMore]=useState(false)
    const [text,setText]=useState('...read more')
    const readMoreHandle = () => {
        setReadMore(!readMore)
        setText(text==='...read more' ? '...read less' : '...read more')
    }

    return (
        <div className={styles.review}>
            <div className={styles.person}>
                <div className={styles.both}>
                    <Image className={styles.reviewerImg} src={
                        review?.author_details.avatar_path?.includes('http') ? review?.author_details.avatar_path?.slice(1) : `https://image.tmdb.org/t/p/original${review?.author_details.avatar_path}`
                    } alt='reviewer' width={200} height={250}/> 
                    <p className={styles.reviewerName}>{review?.author}</p>
                </div>
                <p className={styles.cretaedAt}>
                    {new Date(review?.created_at).toLocaleDateString('en-US', {year: 'numeric',month: 'long',day: 'numeric'})}
                </p>
            </div>
            <p className={styles.content}>{readMore ? review?.content : review?.content?.substr(0,200)}<span style={{fontWeight:'bold',color:'blue',cursor:'pointer'}} onClick={readMoreHandle}>{review?.content?.length >200 ? text : ""}</span></p>
        </div>
    )
}

export default Review
