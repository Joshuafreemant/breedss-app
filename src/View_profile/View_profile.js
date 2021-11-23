
import './View_profile.css'
import Picture from '../images/user-plus.png';
import { NavLink } from 'react-router-dom';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { useState, useEffect } from "react";
import axios from 'axios'

function ScrollToTopOnMount() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return null;
}

const animatedComponents = makeAnimated();
const petOptions = [
    { value: 'All Pets', label: 'All Pets' },
    { value: 'Dogs', label: 'Dogs' },
    { value: 'Bunnies', label: 'Bunnies' },
    { value: 'Cats', label: 'Cats' },

    { value: 'Birds', label: 'Birds' },
    { value: 'Others', label: 'Others' }
]


export default function Profile() {
 
  const IMGURL = `http://localhost:8080/profileImages/`

    const [userInfo, setUserInfo] = useState([]);

    useEffect(() => {
        axios({
            method: "get",
            url: `/session`,
            dataType: "JSON",
            withcredentials: true
        })
            .then((response) => {
                const respData = response.data.user
                
                setUserInfo(respData)
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    return (
        <div>
            <ScrollToTopOnMount />

            <section className="section profile__section">
                <div className="profile__container container">
                    <div className="profile__image prof">

                    {userInfo.profileImage? <img src={IMGURL+userInfo.profileImage}  alt="" />: <img src={Picture}  alt="" />}

                      



                    </div>

                    <div className="profile__info">
                        <h2>View Profile Info</h2>
                        <p>Fullname: {userInfo.fullName}</p>
                        <p>Username: @{userInfo.username}</p>

                        <div className="change__profile">
                            <NavLink exact to="/edit_profile" className="profile__link">
                                Update Profile
                            </NavLink>
                            &nbsp; &nbsp;
                            <NavLink exact to="/edit_password" className="profile__link">
                                Modify Password
                            </NavLink>
                        </div>


                    </div>
                </div>
            </section>

            <section className="section view__profile-section">
                <div className="container view__profile-container">
                    <form action="">
                        <p>Personal Information</p>
                        <div className="profile-form-group">
                            <label htmlFor="Fullname">Fullname</label>
                            <input
                                type="text"
                                className="profile-form-input"
                                Value={userInfo.fullName}
                                disabled />
                        </div>


                        <div className="profile-form-group">
                            <label htmlFor="Email Address">Email Address</label>
                            <input
                                type="email" className="profile-form-input" Value={userInfo.email} disabled />
                        </div>

                        <div className="profile-form-group">
                            <label htmlFor="username">Username</label>
                            <input type="text" className="profile-form-input" Value={"@" + userInfo.username} disabled />
                        </div>


                        <div className="profile-form-group">
                            <label htmlFor="username">Bio</label>

                            <textarea
                                type="text"
                                className="profile-form-input"

                                rows="6"
                                value={userInfo.bio}
                                disabled
                            />



                        </div>

                        <div className="profile-form-group">
                            <h5> Gender</h5>
                            <select
                                className="profile-form-input"
                                value={userInfo.gender}
                                name={userInfo.gender}
                                disabled
                            >

                                <option >Choose..</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>

                                <option value="Others">Others</option>


                            </select>
                        </div>

                        <div className="profile-form-group">
                            <Select
                                placeholder={'Select Interests.....'}
                                closeMenuOnSelect={false}
                                components={animatedComponents}
                                defaultValue={petOptions[0]}

                                isMulti
                                options={petOptions}
                                disabled={true}

                            />
                        </div>





                        <NavLink exact to="/edit_profile" className="edit-profile__link">
                            Update Profile
                        </NavLink>

                    </form>
                </div>

            </section>
        </div>
    )
}
