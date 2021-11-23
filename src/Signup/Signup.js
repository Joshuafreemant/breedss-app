
import Bg_img from '../images/bg.jpg';
import Button from '../Button/Button'
import axios from 'axios'
import { withRouter,NavLink } from "react-router-dom";


import './Signup.css'
import { useState,useEffect } from "react";

function ScrollToTopOnMount() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return null;
}

function Signup(props) {
    const [name, setName ]=useState("")
    const [email, setEmail]=useState("")
    const [username, setUsername]=useState("")
    const [password, setPassword]=useState("")

    function handleFormSubmit( event ) {
        event.preventDefault();
      

        let formData = new FormData();
        formData.append('name', name)
        formData.append('email', email)
        formData.append('username', username)
        formData.append('password', password)

        axios({
            method: 'post',
            url: '/register',
            data: formData,
            config: { headers: {'Content-Type': 'multipart/form-data' }}
        })
        .then(function (response) {
            //handle success
        
            props.history.push('/login')

        })
        .catch(function (error) {
            //handle error
            console.log(error)
        });
      
    }
    return (
        <div>
            <ScrollToTopOnMount />

            <section className="signup section">

                <div className="signup__container container">
                    <div className="left__side">
                        <img src={Bg_img} alt="" className="left__side-bg" />
                    </div>
                    <div className="right__side">
                        <h2 className="signup__title">
                            Set Up Your Account
                        </h2>
                        <p className="signup__description">
                            To Get Started, we’ll need your details in the form below
                        </p>
                        <div className="signup__form-container">
                            <form action="" className="form">
                                <div className="form-groups">
                                    <label htmlFor="Fullname"></label>
                                    <input
                                        type="text"
                                        className="form-input"
                                        Placeholder="Fullname *"
                                        value={name}
                                        onChange={e => setName(e.target.value)}
                                        required
                                         />
                                </div>

                                <div className="form-groups">
                                    <label htmlFor="Email"></label>
                                    <input 
                                    type="email" 
                                    className="form-input" 
                                    Placeholder="Email Address *" 
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    required
                                     />
                                </div>

                                <div className="form-groups">
                                    <label htmlFor="Username"></label>
                                    <input 
                                    type="text" 
                                    className="form-input" 
                                    Placeholder="Username *"  
                                    value={username}
                                    onChange={e => setUsername(e.target.value)}
                                    required
                                     />
                                </div>



                                <div className="form-groups">
                                    <label htmlFor="Password"></label>
                                    <input 
                                    type="password" 
                                    className="form-input" 
                                    placeholder="Password *" 
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                    required
                                     />
                                </div>

                                <div className="form-groups">
                                <input type="submit" className="form-button" onClick={e =>handleFormSubmit(e)} value="Sign Up" />
                                </div>

                                <NavLink exact to="/login" className="login__in-link">
                                    Login
                                </NavLink>
                            </form>
                        </div>
                    </div>
                </div>


            </section>
        </div>
    )
}
export default withRouter(Signup)