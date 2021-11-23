import React, { useEffect, useState } from 'react'
import { NavLink, useParams } from "react-router-dom";
import axios from 'axios';
import Pets from '../images/Pets.jpg';
import Swal from 'sweetalert2';
import Picture from '../images/user-plus.png';

import './ViewLikes.css'
export default function ViewComment() {

  const IMGURL = `http://localhost:8080/profileImages/`

    const { postId } = useParams();

    // from the database
    const [likes, setLikes] = useState([]);

    //from the input field
    const [comment, setComment] = useState([]);
    const [post, setPost] = useState([]);
    const [count, setCount] = useState([]);

   

    const getAllComment = () => {
        let formData = new FormData();
        formData.append('postId', postId)

        axios({
            method: 'post',
            url: '/showLike',
            data: formData,
            config: { headers: { 'Content-Type': 'multipart/form-data' } }
        })
            .then((response) => {
              
                const data = response.data.post_likes[0].postLikes;
                const counts = response.data.likes;
           
                setLikes(data)
                setCount(counts)
            })
            .catch((error) => {
                //handle error
                console.log(error)
            });
    }
    useEffect(() => getAllComment(), []);



    const handleCreateComment = async (event) => {
        event.preventDefault();

        setComment('')
        let formData = new FormData();
        formData.append('comment', comment)
        formData.append('id', postId)

        await axios({
            method: 'post',
            url: '/comment',
            data: formData,
            config: { headers: { 'Content-Type': 'multipart/form-data' } }
        })
            .then((response) => {
                //handle success

                if (response.data.message) {
                    Swal.fire({
                        icon: "success",
                        title: "Successfull",
                        // html: "login success",

                        confirmButtonColor: "hsl(190,64%,22%)",
                    })

                }
            })
            .catch((error) => {
                //handle error
                console.log(error)
            });
    }


    return (
        <div>


            <section className="view_like section">
                <div className="view_like__container container">

                    <div className="like__box">
                        <h3>Likes {count} <input type="text" className="scroll_top"  autoFocus/> </h3>
                        <div className="scroll">


                        {
                        likes.map((like, id) => (

                            <div className="like_user">
                                <div className="user_like">
                                 
                        {like.profileImage? <img src={IMGURL+like.profileImage}  alt="" />: <img src={Picture}  alt="" />}

                                    <div className="like_post">
                                        <h4>{like.username}</h4>
                                        
                                    </div>
                                </div>


                                <div className="user-view-right">
                                
                                    <NavLink exact to={'/user_profile/' +like.userId} className="view_profile_link">
                                        View Profile
                                    </NavLink>
                                </div>

                            </div>

                            ))}


                            

                        </div>




                    </div>




                </div>

            </section>
        </div>
    )
}
