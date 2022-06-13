import React from 'react';
import NavBar from '../NavBar/NavBar';
import Footer from '../Footer/Footer';
import { SignIn } from '../Store/Slices/Cart.slice';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import '../Styles/signUp.css'

const SignUp = () => {

    const { register, formState: { errors }, handleSubmit } = useForm();

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const submit = data => {
        dispatch(SignIn(data))
            .then(() => navigate(-1))
    }

    console.log(errors);


    return (
        <div>
            <NavBar />
            <div className="signUp-container">
                <h2>!! Welcome !!</h2>
                <h3>Please create an Account to continue</h3>
            </div>

            <form className="login" onSubmit={handleSubmit(submit)}>
                <div className='login-card card mb-3'>
                    <h3 className="card-header">Sing Up</h3>

                    <div className="form-floating mb-3">
                        <input
                            {...register('email')}
                            type="text"
                            className="form-control"
                            id="email"
                            placeholder="name@example.com" />
                        <label htmlFor="floatingInput">Email address</label>
                    </div>

                    <div className="form-floating mb-3">
                        <input
                            {...register('firstName')}
                            type="text"
                            className="form-control"
                            id="firstName"
                            placeholder="name@example.com" />
                        <label htmlFor="firstName">First Name</label>
                    </div>

                    <div className="form-floating mb-3">
                        <input
                            {...register('lastName')}
                            type="text"
                            className="form-control"
                            id="lastName"
                            placeholder="name@example.com" />
                        <label htmlFor="firstName">Last Name</label>
                    </div>

                    <div className="form-floating mb-3">
                        <input
                            {...register('password')}
                            type="password"
                            className="form-control"
                            id="password"
                            placeholder="name@example.com" />
                        <label htmlFor="password">Password </label>
                    </div>

                    <div className="form-floating mb-3">
                        <input
                            {...register("phone", { required: true, maxLength: 10, minLength: 10 })}
                            type="tel"
                            className="form-control"
                            id="phone"
                            placeholder="name@example.com" />
                        <label htmlFor="phone">Phone (10 characters) </label>
                    </div>
                    <div className="error-message">
                        {errors.phone && "The phone length is 10 characters"}
                    </div>
                    <button className='submit-button btn btn-secondady'>
                        Sign up
                    </button>

                    <div className="switch-forms">
                        <small className="txt-dont">Already have an account?
                            <div className='txt-sign'
                                onClick={() => navigate('/login')}>Log In</div>
                        </small>
                    </div>

                </div>
            </form>
            <Footer />
        </div>
    )
}

export default SignUp