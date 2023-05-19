import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from './Navbar.module.css';
import { RxHamburgerMenu } from 'react-icons/rx';
import Link from 'next/link'
import { useRouter } from 'next/router';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const router=useRouter();
  
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
          <Link className={`${styles.navText} ${router.asPath === '/#upcoming' ? styles.active : ''}`} href='/#upcoming'>Upcoming</Link>
          <Link className={`${styles.navText} ${router.asPath === '/#top_rated' ? styles.active : ''}`} href='/#top_rated'>Top rated</Link>
          <Link className={`${styles.navText} ${router.asPath === '/#popular' ? styles.active : ''}`} href='/#popular'>Popular</Link>
          <div className={styles.search}>
            <input onMouseOut={()=>{}} value={searchTerm} onChange={e=>setSearchTerm(e.target.value)} type="text" placeholder='Search Title Here..' />
            <button onClick={search}>Search</button>
          </div>

        </div>
        <div className={styles.hamburger} onClick={handleMenuClick}>
          <RxHamburgerMenu size={30} />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
