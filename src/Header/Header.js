

import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Swal from 'sweetalert2';
import { Dropdown, Menu } from 'semantic-ui-react'

import styled from 'styled-components';
import { NavLink,Redirect } from "react-router-dom";
import './Header.css';
import './H.css';
import { BiMenuAltLeft } from 'react-icons/bi';
import { FaTimes } from 'react-icons/fa';
import { FaCaretDown } from 'react-icons/fa';
import { MdPets } from 'react-icons/md';



export default function Header(props) {

    const [click, setClick] = useState(false);
    const [drop, setDrop] = useState(false);

    function openNav() {
        setClick((click) => !click)
    }
    function openDrop() {
        setDrop((drop) => !drop)


    }

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
                const message = response.data


                setUserInfo(respData)
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const handleLogout = async (event) => {
        event.preventDefault();

        await axios({
            method: 'post',
            url: '/logout'
        })

            .then(function (response) {
                //handle success
               
                
                if(response){
                    // Swal.fire({
                    //     icon: "success",
                    //     title: "Logout Successful",
                    //     html: "logout success",

                    //     confirmButtonColor: "hsl(190,64%,22%)",
                    // })


                    window.location.reload();
                   
                }

            })
            .catch(function (error) {
                //handle error
                console.log(error)
            });
    }





    return (
        <div>
            <header className="header" id="header">
                <nav className="nav container">
                    <NavLink className="nav__logo" exact to="/"><MdPets /> Breedss</NavLink>

                    {/* <div className="nav__menu" id="nav-menu"> */}

                    <div className={click ? 'show-menu' : 'nav__menu'}>
                        <ul className="nav__list">

                            <li className="nav__items">
                                <NavLink exact to="/about-us" onClick={openNav} className="nav__link">
                                    About Us
                                </NavLink>

                            </li>



                            {/* <li className="nav__items">
                                <NavLink exact to="/adverts" onClick={openNav} className="nav__link">
                                    Adverts
                                </NavLink>
                            </li> */}

                            <li className="nav__items">
                                <NavLink exact to="/how_to_use" onClick={openNav} className="nav__link">
                                    How to Use
                                </NavLink>
                            </li>



                            <Dropdown text='Categories' pointing className='link item dropdownn__links'>
                                <Dropdown.Menu>
                                    <Dropdown.Divider />
                                    <Dropdown.Item>
                                        <NavLink exact to="/dogs" onClick={openNav} className="nav__link dropdownn">
                                            Dogs
                                        </NavLink>
                                    </Dropdown.Item>
                                    <Dropdown.Divider />

                                    <Dropdown.Item>
                                        <NavLink exact to="/birds" onClick={openNav} className="nav__link dropdownn">
                                            Birds
                                        </NavLink>
                                    </Dropdown.Item>
                                    <Dropdown.Divider />
                                    <Dropdown.Item>
                                        <NavLink exact to="/cats" onClick={openNav} className="nav__link dropdownn">
                                            Cats
                                        </NavLink>
                                    </Dropdown.Item>
                                    <Dropdown.Divider />

                                    <Dropdown.Item>
                                        <NavLink exact to="/bunnies" onClick={openNav} className="nav__link dropdownn">
                                            Bunnies
                                        </NavLink>
                                    </Dropdown.Item>
                                    <Dropdown.Divider />


                                    <Dropdown.Item>
                                        <NavLink exact to="/others" onClick={openNav} className="nav__link dropdownn">
                                            Other Pets
                                        </NavLink>
                                    </Dropdown.Item>
                                    <Dropdown.Divider />


                                </Dropdown.Menu>
                            </Dropdown>





                            {!userInfo ?
                                <>
                                    <li className="nav__items">
                                        <NavLink exact to="/login" onClick={openNav} className="nav__link login__link">
                                            Login
                                        </NavLink>

                                    </li>
                                    <li className="nav__items">
                                        <NavLink exact to="/signup" onClick={openNav} className="nav__link signup__link">
                                            Sign Up
                                        </NavLink>
                                    </li>
                                </>
                                :
                                <>





                                    <Dropdown text='Breeds Social' pointing className='link item dropdownn__links'>
                                        <Dropdown.Menu>
                                            <Dropdown.Divider />
                                            <Dropdown.Item>
                                                <NavLink exact to="/post" onClick={openNav} className="nav__link dropdownn">
                                                    All Breedds
                                                </NavLink>
                                            </Dropdown.Item>
                                            <Dropdown.Divider />

                                            <Dropdown.Item>
                                                <NavLink exact to="/breedssdog" onClick={openNav} className="nav__link dropdownn">
                                                    Breedds Dogs
                                                </NavLink>
                                            </Dropdown.Item>
                                            <Dropdown.Divider />

                                            <Dropdown.Item>
                                                <NavLink exact to="/breedssbird" onClick={openNav} className="nav__link dropdownn">
                                                    Breedds Birds
                                                </NavLink>
                                            </Dropdown.Item>
                                            <Dropdown.Divider />
                                            <Dropdown.Item>
                                                <NavLink exact to="/breedsscat" onClick={openNav} className="nav__link dropdownn">
                                                    Breedds Cats
                                                </NavLink>
                                            </Dropdown.Item>
                                            <Dropdown.Divider />

                                            <Dropdown.Item>
                                                <NavLink exact to="/breedssbunny" onClick={openNav} className="nav__link dropdownn">
                                                    Breedds Bunnies
                                                </NavLink>
                                            </Dropdown.Item>
                                            <Dropdown.Divider />


                                            <Dropdown.Item>
                                                <NavLink exact to="/otherbreedss" onClick={openNav} className="nav__link dropdownn">
                                                    Others
                                                </NavLink>
                                            </Dropdown.Item>
                                            <Dropdown.Divider />


                                        </Dropdown.Menu>
                                    </Dropdown>






                                    <li className="nav__items">
                                        <button type="button" className="logout" onClick={(e) => handleLogout(e)}>Logout</button>
                                        {/* <NavLink exact to="/login"  className="nav__link signup__link">
                                       Logout
                                    </NavLink> */}
                                    </li>
                                </>
                            }

                        </ul>

                    </div>


                    {click ? <FaTimes className='nav__tog' onClick={openNav} /> : <BiMenuAltLeft className='nav__toggle' onClick={openNav} />}


                </nav>
            </header>
        </div>
    )
}
