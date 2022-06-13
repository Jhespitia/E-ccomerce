import React from 'react'
import  axios  from 'axios';
import { useNavigate } from 'react-router-dom';
import Footer from '../Footer/Footer';
import NavBar from '../NavBar/NavBar';
import { useForm } from 'react-hook-form';
import '../Styles/login.css'

const Login = () => {

  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  
  const submit = data => {
    axios.post('https://ecommerce-api-react.herokuapp.com/api/v1/users/login' , data)
    .then(res => {
      console.log(res.data.data.token)
      localStorage.setItem('token', res.data.data.token)
      localStorage.setItem("userName", res.data.data.user.firstName + " " + res.data.data.user.lastName);
      navigate('/')
      alert('Login Successful')
    })
    
    .catch(err => {
      console.log(err.response.status)
      if(err.response.status === 404){
        alert('Invalid credentials')
      }
      })
    //console.log(data); = 'token
  }

  return (
    <div>
      <NavBar />
      <div className="login-container">
        <h2>!! Welcome !!</h2>
        <h3>Please login to continue</h3>
      </div>

      <form onSubmit={handleSubmit(submit)}>
        <div className='login-card card mb-3'>
          <h3 className="card-header">Login</h3>

          <div className="form-group row">
            <div className='test-card'>
              <h5 className='test'>Test data</h5>
              <p className='data-email'>
                <i className="fa-solid fa-envelope"> : </i> max@gmail.com</p>
              <p className='data-pass'>
                <i className="fa-solid fa-key"> : </i> pass1234</p>
            </div>
          </div>

          <div className="form-group">
            <div className="form-floating mb-3">
              <input 
                {...register('email')}
                type="email"  
                className="form-control" 
                id="floatingInput" 
                placeholder="name@example.com" />
              <label htmlFor="floatingInput">Email address</label>
            </div>

            <div className="form-floating">
              <input
              {...register('password')}
              type="password" 
              className="form-control" 
              id="floatingPassword" 
              placeholder="Password" />
              <label htmlFor="floatingPassword">Password</label>
            </div>

            <div>
              <button 
              type="submit" 
              className="bt-login btn btn-secondady">Login
              </button>
              
              <small className="form-text text-muted">We'll never share your details.</small>

              <small className="txt-dont">Don't have and account?
                <div className='txt-sign'
                  onClick={() => navigate('/signup')}>Sign up</div>
              </small>
            </div>
          </div>
        </div>
      </form>
      <Footer />
    </div>
  )
}

export default Login;