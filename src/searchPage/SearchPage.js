import React, { useEffect, useState } from 'react'
import HeaderSec from '../Header_sec/Header_sec'
import './searchPage.css'
import Spin from '../images/spinner.gif';
import Picture from '../images/user-plus.png';

import axios from 'axios';
import { NavLink } from 'react-router-dom';

function ScrollToTopOnMount() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return null;
}

export default function SearchPage() {
  const IMGURL = `http://localhost:8080/profileImages/`

  const [users, setUsers] = useState([]);
  const [value, setValue] = useState('');
  const [result, setResult] = useState(users);


  const handleSearch = (event) => {
    let search = event.target.value.toLowerCase();
    setValue(search)

    setResult(
      users.filter((data) => {
        return data.username.toLowerCase().includes(search.toLowerCase()) ||
          (data.fullName && data.fullName.toLowerCase().includes(search.toLowerCase()));
        // (item.name && item.name.toLowerCase().includes(search))

      })
    )
    // setUsers(result)
    event.preventDefault();
  }

  const getU = async () => {
    await axios.get("/allUsers")
        .then((response) => {
          //fetch all the users from the api
          const respData = response.data.users
         //set users here
          setUsers(respData)
          //set search result 
          setResult(respData)
        });
}
useEffect(() => getU(), []);



 
 



  return (
    <>
      <HeaderSec />
      <ScrollToTopOnMount />
      <section className="section search__section">
        <div className="container search-container">

          <form>
            <input
              type="text"
              name=""
              autoFocus
              placeholder="Search Pet Owners(Username/Fullname)"
              onChange={(event) => handleSearch(event)}
              value={value}


            />

          </form>
        </div>



        {result.map((user, index) => (
          <div className="search-content container" key={user.id}>
            <div className="user-image-left">
             

            {user.profileImage? <img src={IMGURL+user.profileImage}  alt="" />: <img src={Picture}  alt="" />}

            </div>

            <div className="user-info-middle">
              <h2>{user.fullName}</h2>
              <h5>@{user.username}</h5>
              <p>Lover of Dogs, Cats and All Pets</p>
            </div>

            <div className="user-view-right">
              <NavLink exact to={'/user_profile/' + user.id} className="view_profile_link">
                View Profile
              </NavLink>
            </div>
          </div>


        ))}




      </section>

    </>
  )
}
