import "./Social.css";
import { FaHeart } from "react-icons/fa";
import { FiHeart, FiThumbsUp, FiThumbsDown } from "react-icons/fi";
import Picture from "../images/user-plus.png";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import React, { useEffect, useState } from "react";
import moment from "moment";
import axios from "axios";
import Swal from "sweetalert2";
import { NavLink } from "react-router-dom";
import { MdTexture } from "react-icons/md";

export default function Social({
    id,
    postContent,
    time,
    mediaUrl,
    ext,
    postUsername,
    postData,
    profile,
    icon,
    setLikesRealTime,
    setCommentsRealTime,
    setUnlikesRealTime,
    setDeleteRealTime
}) {
    const IMGURL = `http://localhost:8080/profileImages/`;

    const [show, setShow] = useState(false);
    const [like, setLike] = useState(false);
    const [unlike, setUnlike] = useState(false);
    const [comment, setComment] = useState([]);
    function showMore() {
        setShow((show) => !show);
    }

    const handleLike = async (event) => {
        event.preventDefault();
        let formData = new FormData();
        formData.append("like", like);
        formData.append("id", postData.postId);
        await axios({
            method: "post",
            url: "/like",
            data: formData,
            config: { headers: { "Content-Type": "multipart/form-data" } },
        })
            .then((response) => {
                setLike(true);
                // setLikesRealTime(!false);
                setLikesRealTime((likes) => !likes)

            })
            .catch((error) => {
                //handle error
                console.log(error);
            });
    };

    const handleUnlike = async (event) => {
        event.preventDefault();
        let formData = new FormData();
        formData.append("unlike", unlike);
        formData.append("id", postData.postId);
        await axios({
            method: "post",
            url: "/unlike",
            data: formData,
            config: { headers: { "Content-Type": "multipart/form-data" } },
        })
            .then((response) => {
                setUnlike(true);
                setUnlikesRealTime((unlikes) => !unlikes)

            })
            .catch((error) => {
                //handle error
                console.log(error);
            });
    };

    const handleCreateComment = async (event) => {
        event.preventDefault();

        setComment("");
        let formData = new FormData();
        formData.append("comment", comment);
        formData.append("id", postData.postId);

        await axios({
            method: "post",
            url: "/comment",
            data: formData,
            config: { headers: { "Content-Type": "multipart/form-data" } },
        })
            .then((response) => {
                //handle success
                // setCommentsRealTime(!true);


                setCommentsRealTime((comments) => !comments)





            })
            .catch((error) => {
                //handle error
                console.log(error);
            });
    };

    const handleDelete = async (event) => {
        event.preventDefault();

        let formData = new FormData();
        formData.append("id", postData.postId);

        await axios({
            method: "post",
            url: "/deletePost",
            data: formData,
            config: { headers: { "Content-Type": "multipart/form-data" } },
        })
            .then((response) => {
                //handle success
                setDeleteRealTime((deletepost) => !deletepost)
                if (response.data) {
                    Swal.fire({
                        icon: "success",
                        title: response.data,
                        // html: "login success",

                        confirmButtonColor: "hsl(190,64%,22%)",
                    });
                }
            })
            .catch((error) => {
                //handle error
                console.log(error);
            });
    };





    return (
        <div>

            <section className="post section">
                <div className="post__container container">
                    <div className="post__header">
                        <div className="post__user">
                            <div className="user__picture">
                                {profile ? (
                                    <img src={IMGURL + profile} alt="" />
                                ) : (
                                    <img src={Picture} alt="" />
                                )}
                            </div>
                            <h4>{postUsername}</h4>
                        </div>
                        <div className="post__option">
                            <button onClick={(e) => handleDelete(e)}>{icon}</button>
                        </div>
                    </div>
                    <div className="post__content"></div>
                    <div className="post__content">
                        <p className="post__time">
                            {moment(time).from(moment(new Date(), "YYYY-MM-DD HH:mm:ss"))}

                            <ToastContainer />
                        </p>
                        <p className="post__description">{postContent}</p>

                        {ext === ".mp4" ? (
                            <video
                                src={mediaUrl}
                                type="video/mp4"
                                controls
                                className="post__image"
                            ></video>
                        ) : (
                            <img src={mediaUrl} alt="" className="post__image" />
                        )}
                    </div>

                    <div className="post__actions">
                        {postData.postLikes.map((postLike, id) => (
                            <>
                                <h5 className="all__comment" key={id}>
                                    <NavLink
                                        exact
                                        to={"/view_like/" + postData.postId}
                                        className="like_link"
                                    >
                                        {postLike.postLike < 2
                                            ? postLike.postLike + " Like"
                                            : postLike.postLike + " Likes"}
                                    </NavLink>
                                </h5>
                            </>
                        ))}

                        {postData.postComments.map((postComment, id) => (
                            <>
                                <div className="post__comments" key={id}>
                                    <h5>{postComment.username}: </h5>&nbsp;
                                    <p className={show ? "" : "post__comments-p"}>
                                        {" "}
                                        {postComment.text}
                                    </p>

                                </div>
                            </>
                        ))}

                        <p className="all__comment">
                            <NavLink
                                exact
                                to={"/view_comment/" + postData.postId}
                                className="comment__link"
                            >
                                View all Comments
                            </NavLink>
                        </p>

                        <div className="post__action-like">
                            <div className="post__action-left">
                                <form>
                                    <button name="like" onClick={(e) => handleLike(e)}>
                                        <FiThumbsUp />
                                    </button>

                                    <button name="like" onClick={(e) => handleUnlike(e)}>
                                        <FiThumbsDown />
                                    </button>
                                </form>
                            </div>

                            <div className="post__action-right">
                                <form action="">
                                    <input
                                        type="text"
                                        className="form-input"
                                        value={comment}
                                        name={comment}
                                        onChange={(e) => setComment(e.target.value)}
                                        placeholder="Add a Comment"
                                    />
                                    <input
                                        type="submit"
                                        className="button"
                                        onClick={(e) => handleCreateComment(e)}
                                        value="Post"
                                    />
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
