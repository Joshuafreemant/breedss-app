import React, { useEffect, useState } from 'react'
import AdminHeader from '../Header/Header.js'
import './AllUser.css'
import Spin from '../../images/spinner.gif';
import Image from '../../images/abt-img2.jpg';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import Picture from '../../images/user-plus.png';

function ScrollToTopOnMount() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return null;
}


export default function AllUser() {


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
      })
    )
    // setUsers(result)
    event.preventDefault();
  }

  useEffect(() => {
    axios({
      method: "get",
      url: `/allUsers`,
      dataType: "JSON",
      withcredentials: true
    })
      .then((response) => {
        const respData = response.data.users
        console.log("allusers", respData);
        setUsers(respData)
        setResult(respData)
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);


  return (
    <>

      <AdminHeader />
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
              <p>{user.bio}</p>
            </div>

            <div className="user-view-right">
              <NavLink exact to={'/userinfo/' + user.id} className="view_profile_link">
                View Profile
              </NavLink>
            </div>
          </div>


        ))}




      </section>
    </>
  )



}
