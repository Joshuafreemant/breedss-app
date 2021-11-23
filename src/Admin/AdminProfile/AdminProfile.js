import React from 'react'
// import './Admin.css'
import AdminHeader from '../Header/Header.js'

import axios from 'axios'
import { useState, useEffect } from "react";
import Swal from 'sweetalert2';
import { NavLink, useParams } from "react-router-dom";


export default function AdminProfile() {

    const [adminInfo, setAdminInfo] = useState([])




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

    return (
        <div>
            <AdminHeader />

            <section className="section admin-section">
                <div className="container admin-login-container">
                    <div className="admin_login">
                        <h1>Admin Profile</h1>

                        <form className="form">
                            <div className="form-groups">
                                <label htmlFor="Email"></label>
                                <input
                                    type="email"
                                    className="form-input"
                                    Placeholder="Email Address"
                                    value={adminInfo.email}
                                    disabled
                                    required />
                            </div>

                            <div className="form-groups">
                                <label htmlFor="Password"></label>
                                <input
                                    type="password"
                                    className="form-input"
                                    placeholder="Password"
                                    value={adminInfo.password}
                                    disabled
                                    // onChange={e => setAdminPassword(e.target.value)}
                                    required />
                            </div>

                            <div className="form-groups">



                                <NavLink exact to="/update_admin_profile" className="form-button update" style={{textAlign: "center"}}>
                                    Update Profile
                                </NavLink>
                            </div>

                        </form>


                    </div>

                </div>

            </section>

        </div>
    )
}
