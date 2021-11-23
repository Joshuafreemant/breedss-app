import Bg_img from '../images/bg.jpg';
import Button from '../Button/Button'
import { NavLink } from "react-router-dom";
import './Forgot.css'
import { useEffect } from "react";

function ScrollToTopOnMount() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return null;
}
export default function forgot() {
    return (
        <div>
         <ScrollToTopOnMount />

            <section className="forgot section">
                <div className="forgot__container container">
                    <div className="left__side">
                        <img src={Bg_img} alt="" className="left__side-bg" />
                    </div>
                    <div className="right__side">
                        <h2 className="forgot__title">
                            Forgot Password?
                        </h2>
                        <p className="forgot__description">
                        Don’t have an account yet?
Not to worry, <NavLink exact to="/signup" className="login__in-link">
                                        Sign Up
                                    </NavLink> here

                        </p>
                        <div className="forgot__form-container">
                            <form action="" className="form">
                                <div className="form-groups">
                                    <label htmlFor="Email"></label>
                                    <input type="email" className="form-input" Placeholder="Email Address"  required />
                                </div>



                                <div className="form-groups">
                                    <Button text="Reset Password" />
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
