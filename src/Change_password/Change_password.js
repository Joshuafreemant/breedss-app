
import './Change_password.css'
import Button from '../Button2/Button'
import Picture from '../images/user-plus.png';
import { NavLink } from 'react-router-dom';
import { useEffect } from "react";

function ScrollToTopOnMount() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return null;
}

export default function Change_password() {
    return (
        <>
         <ScrollToTopOnMount />

               <section className="section edit-password__section">
                <div className="edit-password__container container">
                    <div className="edit-password__image prof">

                        <img src={Picture} alt="" />
                        <p className="add-image-p">Add Image</p>
                        <form action="" method="post" className="edit-password__image-form">
                            <input type="file" name="" id="" className="edit-password__image-input" />
                            {/* <button>Done</button> */}
                        </form>



                    </div>

                    <div className="edit-password__info">
                        <h2>Change Password</h2>
                        <p>Fullname: Joshua Freeman</p>
                        <p>Username: @Joshfreeman73</p>

                        <div className="change__edit-password">
                            <NavLink exact to="/view_profile" className="edit_password__link">
                            View Profile
                            </NavLink>
&nbsp; &nbsp;
                            <NavLink exact to="/edit_profile" className="edit_password__link">
                                Edit Profile
                            </NavLink>
                        </div>


                    </div>
                </div>
            </section>

            <section className="section edit__password-section">
                <div className="container edit__password-container">
                    <form action="">
                    <p>Change Password</p>
                        <div className="edit-password-form-group">
                            <label htmlFor="Fullname">Current Password *</label>
                            <input type="password" className="edit-password-form-input" required />
                        </div>

                        
                        <div className="edit-password-form-group">
                            <label htmlFor="Email Address">New Password *</label>
                            <input type="password" className="edit-password-form-input" required />
                        </div>

                        <div className="edit-password-form-group">
                            <label htmlFor="Email Address">Confirm New Password *</label>
                            <input type="password" className="edit-password-form-input" required />
                        </div>

                       

                        <Button text="Make Changes"/>

                      

                    </form>
                </div>

            </section>
        
        </>
    )
}
