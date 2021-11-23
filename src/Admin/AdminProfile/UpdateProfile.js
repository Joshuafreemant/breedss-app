import React from 'react'
// import './Admin.css'
import AdminHeader from '../Header/Header.js'

import axios from 'axios'
import { useState, useEffect } from "react";
import Swal from 'sweetalert2';
import { NavLink, useParams } from "react-router-dom";


export default function UpdateAdminProfile(props) {

    const [adminInfo, setAdminInfo] = useState([])

    const [adminEmail, setAdminEmail] = useState("")

    const [adminPassword, setAdminPassword] = useState("")




    useEffect(() => {
        axios({
            method: "get",
            url: `/session`,
            dataType: "JSON",
            withcredentials: true
        })
            .then((response) => {
                const respData = response.data.user
              
                setAdminInfo(respData)
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);


    function handleAdminUpdate(event) {
        event.preventDefault();

        let formData = new FormData();
        formData.append('email', adminEmail)
        formData.append('password', adminPassword)


        axios({
            method: 'post',
            url: 'adminUpdate',
            data: formData,
            config: { headers: { 'Content-Type': 'multipart/form-data' } }
        })

            .then((response) => {

      
                if (response.data.message) {
                Swal.fire({
                    icon: "success",
                    title: "Changes Made Successfully",
                    html: "Profile Change success",

                    confirmButtonColor: "hsl(190,64%,22%)",
                })

                props.history.push('/all_users')

            }
            else {
                Swal.fire({
                    icon: "error",
                    title: "Changes not made",

                    html: "Try again later",
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
      <AdminHeader />

            <section className="section admin-section">
                <div className="container admin-login-container">
                    <div className="admin_login">
                        <h1>Update Profile</h1>

                        <form className="form">
                            <div className="form-groups">
                                <label htmlFor="Email"></label>
                                <input
                                    type="email"
                                    className="form-input"
                                    Placeholder="Email Address"
                                  
                                    onChange={e => setAdminEmail(e.target.value)}
                                   />
                            </div>

                            <div className="form-groups">
                                <label htmlFor="Password"></label>
                                <input
                                    type="password"
                                    className="form-input"
                                    placeholder="Password"
                                   
                                     onChange={e => setAdminPassword(e.target.value)}
                                    required />
                            </div>
                            <div className="form-groups">
                                <input type="submit" className="form-button" onClick={e => handleAdminUpdate(e)} value="Make Changes" />

                            </div>

                        </form>


                    </div>

                </div>

            </section>

        </div>
    )
}
