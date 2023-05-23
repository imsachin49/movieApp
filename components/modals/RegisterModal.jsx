import React,{useState} from 'react'
import styles from './Modal.module.css'
import LoginModal from './LoginModal'
import axios from 'axios'

const RegisterModule = ({onClose}) => {
  const [showRegister, setShowRegister] = useState(true)
  const [showLogin, setShowLogin] = useState(false)
  const [loading, setLoading] = useState(false)
  const [err, setErr] = useState(null)
  const [inputs, setInputs] = useState({
    username: '',
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
      const res=await axios.post('https://movie-app-one-neon.vercel.app/api/users/register',inputs)
      console.log(res.data)
      const userData = JSON.stringify(res.data); // Convert object to string
      localStorage.setItem('MovieApp_user', userData);
      setLoading(false)
      setErr(null)
      setInputs({
        username: '',
        email: '',
        password: ''
      })
      setShowRegister(false)
      setShowLogin(true)
    } catch (error) {
      setLoading(false)
      setErr(error.response.data.msg)
    }
  }


  const handleModal = () => {
    setShowRegister(false)
    setShowLogin(true)
  }

  return (
    <>
    { !showLogin ?
      <div className={styles.modalOverlay}>
      <div className={styles.loginModal}>
          <div className={styles.top}>
            <h2>Register</h2>
            <div onClick={onClose} className={styles.cross}>
              <svg className='fill-current text-black' xmlns='http://www.w3.org/2000/svg' width='18' height='18' viewBox='0 0 18 18'>
                <path d='M18 1.5L16.5 0 9 7.5 1.5 0 0 1.5 7.5 9 0 16.5 1.5 18 9 10.5 16.5 18 18 16.5 10.5 9z'/>
              </svg>
            </div>
          </div>
          <form className={styles.form} onSubmit={handleSubmit}>
            
            <div className={styles.formGroup}>
              <label htmlFor="text" className='text' id='text'>UserName:</label>
              <input type="text" placeholder='Username' name='username' value={inputs.username} onChange={handleChange} />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="email" className='email' id='email'>Email:</label>
              <input type="email" placeholder='Email' name='email' value={inputs.email} onChange={handleChange}/>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="email" className='email' id='password'>Password:</label>
              <input type="password" placeholder='Password' name='password' value={inputs.password} onChange={handleChange}/>
            </div>

            <div className={styles.submit}>
              <button type="submit" className={styles.btn}>Signup</button>
            </div>
            {/* new user msg */}
            <div className={styles.newUser}>
              <p style={{marginTop:'8px'}}>Already have account? <span style={{color:'blue',cursor:'pointer'}} onClick={handleModal}>Login In</span></p>
            </div>

          </form>
      </div>
    </div>
      : <LoginModal onClose={onClose} />
    }
    </>
  )
}

export default RegisterModule
