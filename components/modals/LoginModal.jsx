import React,{useState} from 'react'
import styles from './Modal.module.css'
import RegisterModule from './RegisterModal'
import axios from 'axios'

const LoginModal = ({onClose}) => {
  const [showRegister, setShowRegister] = useState(false)
  const [showLogin, setShowLogin] = useState(true)
  const [loading, setLoading] = useState(false)
  const [err, setErr] = useState(null)
  const [inputs, setInputs] = useState({
    email: '',
    password: ''
  })

  const handleChange = (e) => {
    setInputs(prev=>({ ...prev,[e.target.name]: e.target.value}))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      console.log(inputs)
      const res=await axios.post('https://movie-app-one-neon.vercel.app/api/users/login',inputs)
      console.log(res.data)
      const userData = JSON.stringify(res.data); // Convert object to string
      localStorage.setItem('MovieApp_user', userData);
      setLoading(false)
      setErr(null)
      setInputs({
        email: '',
        password: ''
      })
      onClose();
    } catch (error) {
      setLoading(false)
      setErr(error)
    }
  }

  const handleModal = () => {
    setShowLogin(false)
    setShowRegister(true)
  }

  return (
    <>
    {!showRegister ? <div className={styles.modalOverlay}>
      <div className={styles.loginModal}>
          <div className={styles.top}>
            <h2>Login</h2>
            <div onClick={onClose} className={styles.cross}>
              <svg className='fill-current text-black' xmlns='http://www.w3.org/2000/svg' width='18' height='18' viewBox='0 0 18 18'>
                <path d='M18 1.5L16.5 0 9 7.5 1.5 0 0 1.5 7.5 9 0 16.5 1.5 18 9 10.5 16.5 18 18 16.5 10.5 9z'/>
              </svg>
            </div>
          </div>
          <form className={styles.form} onSubmit={handleSubmit}>
            
            <div className={styles.formGroup}>
              <label htmlFor="email" className='email' id='email'>Email:</label>
              <input type="email" placeholder='Email' name='email' value={inputs.email} onChange={handleChange}/>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="email" className='email' id='password'>Password:</label>
              <input type="password" placeholder='Password' name='password' value={inputs.password} onChange={handleChange}/>
            </div>

            <div className={styles.submit}>
              <button type="submit" className={styles.btn}>Login</button>
            </div>
            {/* new user msg */}
            <div className={styles.newUser}>
              <p style={{marginTop:'8px'}}>New User? <span style={{color:'blue',cursor:'pointer'}} onClick={handleModal}>Sign Up</span></p>
            </div>

          </form>
      </div>
    </div>
    : <RegisterModule onClose={onClose} />}
    </>
  )
}

export default LoginModal
