
import './Edit_profile.css'
import Picture from '../images/user-plus.png';
import { NavLink } from 'react-router-dom';
import Button from '../Button2/Button'
import { RiImageAddLine } from "react-icons/ri";
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import Swal from 'sweetalert2';

import { useState, useEffect } from "react";
import axios from 'axios'

function ScrollToTopOnMount() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return null;
}

const animatedComponents = makeAnimated();



// const interests=[];
// let i=0, len=interests.length;


export default function Profile(props) {


    const IMGURL = `http://localhost:8080/profileImages/`
  

    const [file, setFile] = useState(Picture)
    const [profilePic, setProfilePic] = useState(Picture)
    const [editInfo, setEditInfo] = useState([]);
    const [interest, setInterest] = useState([]);
    const { email, fullName, username, bio, gender, profileImage } = editInfo

    const [myBio, setMyBio] = useState(bio)
  
    const [myGender, setMyGender] = useState("")

    const handleChange = (e) => {
        setFile(URL.createObjectURL(e.target.files[0]))
        setProfilePic(e.target.files[0])
    }

  

    const handleGender = (e) => {
       
        setMyGender(e.target.value);
    }

  




    const petOptions = [
        { value: 'All Pets', label: 'All Pets' },
        { value: 'Dogs', label: 'Dogs' },
        { value: 'Bunnies', label: 'Bunnies' },
        { value: 'Cats', label: 'Cats' },

        { value: 'Birds', label: 'Birds' },
        { value: 'Others', label: 'Others' }
    ]

    function handleEditSubmit(event) {
        event.preventDefault();
        let formData = new FormData();
        formData.append('file', profilePic)
        formData.append('bio', myBio)
        formData.append('interest', interest)
  
        formData.append('gender', myGender)




        axios({
            method: 'post',
            url: '/update',
            data: formData,
            config: { headers: { 'Content-Type': 'multipart/form-data' } }
        })
            .then(function (response) {
                if(response.data.upd){

                        Swal.fire({
                        icon: "success",
                        title: "Updated Successfully",
                        html: "Profile Successfully Updated",

                        confirmButtonColor: "hsl(190,64%,22%)",
                    })

                    props.history.push('/view_profile')

                }
                else{
                    Swal.fire({
                        icon: "error",
                        title: "Update Failed",

                        html: "Profile Update Failed",
                        confirmButtonColor: "hsl(190,64%,22%)",
                    }) 
                }
           
                   



            //     }
            console.log('shey mo kere niiiiiiiiiii', response.data.upd);

            })
            .catch(function (error) {
                //handle error
                console.log(error)
            });

    }


    const getSession = async () => {
        await axios({
            method: "get",
            url: `/session`,
            dataType: "JSON",
            withcredentials: true
        })
            .then((response) => {
                const respData = response.data.user
                setEditInfo(respData)
                
                setFile(response.data.user.profileImage)
            })
            .catch((error) => {
                console.log(error);
            });
    }

    useEffect(() => getSession(), []);


    return (
        <div>
            <ScrollToTopOnMount />
            {/* Backend\mediaFiles\ProfileImages\DSC_6265.JPG */}
           
            <section className="section edit-profile__section">
                <div className="edit-profile__container container">
                    <div className="edit-profile__image prof">
                    {profileImage? <img src={IMGURL+profileImage}  alt="" />: <img src={Picture}  alt="" />}


                        
                       
                      
                    </div> 

                    <div className="edit-profile__info">
                        <h2>Edit Profile Info</h2>

                        <p>Fullname: {fullName}</p>
                        <p>Username: @{username}</p>

                        <div className="change__edit-profile">
                            <NavLink exact to="/view_profile" className="edit_profile__link">
                                View Profile
                            </NavLink>
                            &nbsp; &nbsp;
                            <NavLink exact to="/edit_password" className="edit_profile__link">
                                Modify Password
                            </NavLink>
                        </div>


                    </div>
                </div>
            </section>

            <section className="section edit__profile-section">
                <div className="container edit__profile-container">
                    <form action="">
                        <p>Personal Information</p>
                        <div className="edit-profile-form-group">
                            <label htmlFor="fullName">Fullname</label>
                            <input
                                type="text"
                                className="edit-profile-form-input"
                                Value={fullName}
                                name={fullName}
                                disabled

                            />
                        </div>


                        <div className="edit-profile-form-group">
                            <label htmlFor="Email Address">Email Address</label>
                            <input
                                type="email"
                                className="edit-profile-form-input"
                                Value={email}
                                name={email}
                                disabled


                            />
                        </div>

                        <div className="profile-form-group">
                            <label htmlFor="username">Username</label>

                            <input
                                type="text"
                                className="edit-profile-form-input"
                                Value={username}
                                name={username}
                                disabled


                            />
                        </div> 
                        
                        <div className="profile-form-group">
                            <label htmlFor="username">Upload Profile image</label>

                            <input
                                type="file"
                                className="edit-profile-form-input"
                                name={file}
                              
                                onChange={handleChange}


                            />
                        </div>

                        <div className="edit-profile-form-group">
                            <label htmlFor="username">Bio</label>

                            <textarea
                                type="text"
                                className="edit-profile-form-input"
                                name={bio}
                                rows="6"
                                // value={bio}
                                onChange={(e) => setMyBio(e.target.value)}

                            >
                                
                               
                            </textarea>
                        </div>

                        <div className="edit-profile-form-group">
                            <h5> Gender</h5>
                            <select
                                className="edit-profile-form-input"
                                value={myGender}
                                name={gender}
                                onChange={handleGender}
                            >

                                <option >Choose..</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>

                                <option value="Others">Others</option>


                            </select>
                        </div>

                        <Select 
                            placeholder={'Select Interests.....'}
                            closeMenuOnSelect={false}
                            components={animatedComponents}
                            // defaultValue={petOptions[0]}
                            value={interest}
                            // name={interest}
                            isMulti
                            options={petOptions}
                            disabled={true}
                            onChange={(value) => setInterest(value)}
                           
                                
                            />

                                
                         



                      




                        <div className="form-groups">
                            <input type="submit" className="form-button2" onClick={e => handleEditSubmit(e)} value="Make Changes" />
                        </div>

                    </form>
                </div>

            </section>
        </div>
    )
}
