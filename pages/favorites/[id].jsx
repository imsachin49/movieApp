import React,{useState,useEffect} from 'react'
import { useRouter } from 'next/router'
import Navbar from '@/components/navbar/Navbar';
import Card from '@/components/card/Card';
import axios from 'axios';
import BounceLoader from "react-spinners/BounceLoader"
// import styles from './Favorite.module.css'
import styles from '../../components/cards/Cards.module.css'


const Favorite = () => {
    const router = useRouter()
    const id=router.query.id;
    const [movies, setMovies] = useState([]);
    const [user, setUser] = useState({});
    const [token, setToken] = useState('');
    const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
    const users = localStorage?.getItem('MovieApp_user');
    if (users) {
      const userData = JSON?.parse(users);
      const myUser = userData?.user;
      const myToken = userData?.token;
      setToken(myToken);
      setUser(myUser);
     }
    }
  }, []);

  // check if user is logged in or not
  const isLoggedIn = token ? true : false;
  console.log('isLoggedIn', isLoggedIn);

  useEffect(() => {
        const fetchFavorites = async () => {
            setLoading(true);
            try {
                const res=await axios.get(`https://movie-app-one-neon.vercel.app/api/users/favorite/${user._id}`)
                console.log(res.data);
                setMovies(res.data);
                setLoading(false);
            } catch (error) {
                console.log(error)

            }
        }
        fetchFavorites();
    }, [user._id]);

    return (
        <div>
            <Navbar isLoggedIn={isLoggedIn} user={user} /> 
            <div className={styles.outer}>
                <h1 className={styles.savedHead}>Your wishList</h1>
                <h1 className={styles.forLine}></h1>
            </div>
            
            {movies.length>0 ? <>{!loading ? 
                <div className={styles.cards}>
                {movies.map(m => (
                    <div className={styles.card} key={m.id}>
                        <Card movie={m} title='Favs' isLoggedIn={isLoggedIn} user={user}  />
                    </div>
                ))}
                </div>: 
                <div className={styles.loading}>
                    <BounceLoader  color="#eb0ec7" />
                </div>
            }</> : <div className={styles.noFav}>
                <h1 className={styles.noFavHead}>No favorites yet</h1>
            </div>}
        </div>
    )
}

export default Favorite
