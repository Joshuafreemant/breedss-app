import React from 'react'
import './Admin.css'
import axios from 'axios'
import { useState, useEffect } from "react";
import Swal from 'sweetalert2';


export default function Admin(props) {

    const [adminEmail, setAdminEmail] = useState("")

    const [adminPassword, setAdminPassword] = useState("")



    function handleAdminLogin(event) {
        event.preventDefault();

        let formData = new FormData();
        formData.append('email', adminEmail)
        formData.append('password', adminPassword)


        axios({
            method: 'post',
            url: 'adminLogin',
            data: formData,
            config: { headers: { 'Content-Type': 'multipart/form-data' } }
        })

            .then((response) => {

                
                if (response.data.user) {
                Swal.fire({
                    icon: "success",
                    title: "Login Successful",
                    html: "login success",

                    confirmButtonColor: "hsl(190,64%,22%)",
                })

                props.history.push('/all_users')

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
            <section className="section admin-section">
                <div className="container admin-login-container">
                    <div className="admin_login">
                        <h1>Admin Login</h1>

                        <form className="form">
                            <div className="form-groups">
                                <label htmlFor="Email"></label>
                                <input
                                    type="email"
                                    className="form-input"
                                    Placeholder="Email Address"
                                    value={adminEmail}
                                    onChange={e => setAdminEmail(e.target.value)}
                                    required />
                            </div>

                            <div className="form-groups">
                                <label htmlFor="Password"></label>
                                <input
                                    type="password"
                                    className="form-input"
                                    placeholder="Password"
                                    value={adminPassword}
                                    onChange={e => setAdminPassword(e.target.value)}
                                    required />
                            </div>

                            <div className="form-groups">
                                <input type="submit" className="form-button" onClick={e => handleAdminLogin(e)} value="Log In" />

                            </div>

                        </form>


                    </div>

                </div>

            </section>

        </div>
    )
}
