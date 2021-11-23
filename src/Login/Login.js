import Bg_img from '../images/bg.jpg';
// import discover_rabbit from '../images/discover-rabbit.jpg';
import Button from '../Button/Button'
import { withRouter, NavLink } from "react-router-dom";
import './Login.css'
import axios from 'axios'
import SweetAlert from 'react-bootstrap-sweetalert';
import Swal from 'sweetalert2';
import { useState, useEffect } from "react";

function ScrollToTopOnMount() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return null;
}
export default function Login(props) {

    const [email, setEmail] = useState("")

    const [password, setPassword] = useState("")


    useEffect(() => {
        axios({
            method: "get",
            url: `/session`,
            dataType: "JSON",
            withcredentials: true
        })
            .then((response) => {
                console.log("real_user", response.data.real_user_mail.email);

            })
            .catch((error) => {
                console.log(error);
            });
    }, []);


    function handleLoginSubmit(event) {
        event.preventDefault();
        let formData = new FormData();
        formData.append('email', email);

        formData.append('password', password)
        axios({
            method: 'post',
            url: '/login',
            data: formData,
            config: { headers: { 'Content-Type': 'multipart/form-data' } }


        })


            .then((response) => {
                console.log("user Object", response.data.user)
                // console.log("responseeeeeeeeeeeeeeeee", response.data.sessionSuccess)

                if (response.data.user) {

                    Swal.fire({
                        icon: "success",
                        title: "Login Successful",
                        html: "login success",

                        confirmButtonColor: "hsl(190,64%,22%)",
                    })
                   
                    props.history.push('/post')
                    window.location.reload();
                }
                else {
                    Swal.fire({
                        icon: "error",
                        title: "Login Failed",

                        html: "Invalid Username/Password",
                        confirmButtonColor: "hsl(190,64%,22%)",
                    })
                }

            })
            .catch((error) => {


                console.log(error)
            })


    }
    return (
        <div>
            <ScrollToTopOnMount />

            <section className="login section">
                <div className="login__container container">
                    <div className="left__side">
                        <img src={Bg_img} alt="" className="left__side-bg" />
                    </div>
                    <div className="right__side">
                        <h2 className="login__title">
                            Login to your Account
                        </h2>
                        <p className="login__description">
                            To Get Started, we’ll need your details in the form below
                        </p>
                        <div className="login__form-container">
                            <form className="form">
                                <div className="form-groups">
                                    <label htmlFor="Email"></label>
                                    <input
                                        type="email"
                                        name="email"
                                        className="form-input"
                                        Placeholder="Email Address"
                                        value={email}
                                        onChange={e => setEmail(e.target.value)}
                                        required />
                                </div>

                                <div className="form-groups">
                                    <label htmlFor="Password"></label>
                                    <input
                                        type="password"
                                        name="password"
                                        className="form-input"
                                        placeholder="Password"
                                        value={password}
                                        onChange={e => setPassword(e.target.value)}
                                        required />
                                </div>

                                <div className="form-groups">
                                    <input type="submit" className="form-button" onClick={e => handleLoginSubmit(e)} value="Log In" />

                                </div>

                                <NavLink exact to="/forgot" className="login__in-link">
                                    Forgot Password?
                                </NavLink>
                            </form>
                        </div>
                    </div>
                </div>

            </section>
        </div>
    )
}
