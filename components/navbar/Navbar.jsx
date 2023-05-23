import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from './Navbar.module.css';
import { RxHamburgerMenu } from 'react-icons/rx';
import { BiSearch } from 'react-icons/bi';
import { IoChevronBackOutline } from 'react-icons/io5';
import {BiArrowBack} from 'react-icons/bi';
import Link from 'next/link'
import { useRouter } from 'next/router';
import {TbLogin} from 'react-icons/tb';
import {FaBookmark} from 'react-icons/fa';
import LoginModal from '../modals/LoginModal';

const Navbar = ({isLoggedIn,user}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const router=useRouter();
  const [searchSelected, setSearchSelected] = useState(false);
  const [openLogin, setOpenLogin] = useState(false);
  const [openSignup, setOpenSignup] = useState(false);

  const search = async() => {
    // `/movie/${id}?title=${encodeURIComponent(title)}
    router.push(`/?title=${searchTerm}`);
    // setSearchTerm('');
  } 

  // // when we clear the search term, we want to go back to the home page
  // useEffect(() => {
  //   if (searchTerm === '') {
         
  //   }
  // }, [searchTerm]);

 

  const handleMenuClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // for responsiveness
  useEffect(() => {
    const handleResize = () => {
      setIsMenuOpen(window.innerWidth <= 788 ? isMenuOpen : false);
      setIsMobile(window.innerWidth <= 788);
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <Link className={styles.logo} href={`/`}>
          <Image src='https://cdn-icons-png.flaticon.com/128/5395/5395925.png' alt="logo" width={33} height={33}  />
          <p className={styles.logoText}>Movie<span className={styles.second}>App</span></p>
        </Link>
        <div className={`${styles.navComponents} ${isMenuOpen ? styles.isMobile : ''}`}>
        {searchSelected ?
              <div className={styles.search}>
                <button onClick={()=>setSearchSelected(false)}><BiArrowBack fontWeight={550} /></button>
                <input onMouseOut={()=>{}} value={searchTerm} onChange={e=>setSearchTerm(e.target.value)} type="text" placeholder='Search Title Here..' />
                <button onClick={search}>Search</button>
              </div> :
              <div className={styles.searchIcon} onClick={()=>setSearchSelected(true)}>
                <div className={`${styles.navText1}`}>
                  <BiSearch size={22} color='white' style={{marginLeft:'5px'}} />
                </div>
              </div>
        }
        {!searchSelected &&<> <Link className={`${styles.navText} ${router.asPath === '/#upcoming' ? styles.active : ''}`} href='/#upcoming'>Upcoming</Link>
          <Link className={`${styles.navText} ${router.asPath === '/#top_rated' ? styles.active : ''}`} href='/#top_rated'>Top rated</Link>
          <Link className={`${styles.navText} ${router.asPath === '/#popular' ? styles.active : ''}`} href='/#popular'>Popular</Link>
          <Link className={`${styles.navText} ${router.asPath === '/#series' ? styles.active : ''}`} href='/#series'>Top Series</Link>
          {!isLoggedIn ? 
          <Link onClick={()=>setOpenLogin(true)} className={`${styles.navText6}`} href='/#login'>Login <TbLogin size={22} color='white' style={{marginLeft:'4px'}} /></Link>
          : <Link className={`${styles.navText7}`} href={`/favorites/${user._id}`}>Saved <FaBookmark color='white' style={{marginLeft:'4px'}} /></Link>    }      
        </> }
        
        </div>
        <div className={styles.hamburger} onClick={handleMenuClick}>
          <RxHamburgerMenu size={30} />
        </div>
      </div>
      {openLogin && <LoginModal onClose={()=>setOpenLogin(false)} />}
    </div>
  );
};

export default Navbar;
