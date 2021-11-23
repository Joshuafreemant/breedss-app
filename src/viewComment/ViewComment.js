import React, { useEffect, useState } from 'react'
import { NavLink, useParams } from "react-router-dom";
import axios from 'axios';
import Picture from '../images/user-plus.png';

import Pets from '../images/Pets.jpg';
import Swal from 'sweetalert2';

import './ViewComment.css'
export default function ViewComment() {

    const IMGURL = `http://localhost:8080/profileImages/`

    const { postId } = useParams();

    // from the database
    const [comments, setComments] = useState([]);

    //from the input field
    const [comment, setComment] = useState([]);
    const [post, setPost] = useState([]);
    const [count, setCount] = useState([]);

    function ScrollToTopOnMount() {
        useEffect(() => {
            window.scrollTo(0, 0);
        }, []);

        return null;
    }

 


    const getAllComment = () => {
        let formData = new FormData();
        formData.append('postId', postId)

        axios({
            method: 'post',
            url: '/show_comments',
            data: formData,
            config: { headers: { 'Content-Type': 'multipart/form-data' } }
        })
            .then((response) => {
              const data = response.data.post_comments[0];
                const counts = response.data.count;
                const data2 = response.data.post_comments[0].postComments;
                setComments(data2)
                setPost(data)
                setCount(counts)
            })
            .catch((error) => {
                //handle error
                console.log(error)
            });
    }
    useEffect(() => getAllComment(), [comments]);



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


            <section className="view_comment section">

                <div className="view_comment__container container">

                    <div className="comment__box">
                        <h3>Comments {count}  <input type="text" className="scroll_top" autoFocus /> </h3>
                        <div className="scroll">
                            {
                                comments.map((postComment, id) => (

                                    <div className="comment_user" key={postComment.id}>
                                        {postComment.profileImage ? <img src={IMGURL + postComment.profileImage} alt="" /> : <img src={Picture} alt="" />}

                                        <div className="comment_post">
                                            <h4>{postComment.username}</h4>
                                            <p>{postComment.text}</p>

                                        </div>
                                    </div>

                                ))}
                        </div>



                        <div className="view_comment_input">
                            <form action="">
                                <input
                                    type="text"
                                    className="form-input"
                                    value={comment}
                                    name={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                    placeholder="Add a Comment"

                                />

                                <input type="submit" className="post_button" onClick={e => handleCreateComment(e)} value="Post" />

                            </form>

                        </div>
                    </div>




                </div>

            </section>
        </div>
    )
}
