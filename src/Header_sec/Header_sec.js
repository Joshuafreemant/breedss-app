
import './Header_sec.css'
import { FaSearch,FaUserCog,FaTimesCircle } from 'react-icons/fa';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { NavLink } from 'react-router-dom';
import React, { useState } from 'react';



export default function HeaderSec() {

    


    return (
        <div>
            <section className="post__nav-header section">
                <div className="post__nav container">
                    <div className="post__nav-profile">
                        <NavLink exact to="/profile" className="user__link dropdown__profile">
                         
                        <span>Profile</span> 
                          
                          
                        </NavLink>
                        <NavLink exact to="/favourite" className="user__link">
                            Liked Posts
                        </NavLink>

                       

                        <NavLink exact to="/create_post" className="user__link">
                            Create Post
                        </NavLink>

                      <div className= 'header__search'>

                      <NavLink exact to="/search" className="user__link">
                      <FaSearch/>
                        </NavLink>
                     
                      </div>
                    </div>
                   
                   


                  

                </div>
                
            </section>
        </div>
    )
}
