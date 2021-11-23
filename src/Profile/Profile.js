import './Profile.css'
import Pet_img from '../images/post-pet.jpg';
import Social from '../Social/Social'
import { ImBin } from "react-icons/im";
import Picture from '../images/user-plus.png';

import { NavLink } from "react-router-dom";
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Spin from '../images/spinner.gif';


function ScrollToTopOnMount() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return null;
}
export default function Profile(props) {


    const [posts, setPosts] = useState([]);
    const [blobUrls, setBlobUrls] = useState([]);
    const [comment, setComment] = useState([]);
    const [total, setTotal] = useState([]);

    const [userFollow, setUserFollow] = useState([]);
    const [userFollowing, setUserFollowing] = useState([]);
    const [userPost, setUserPost] = useState([]);

    const [likes, setLikesRealTime] = useState(false);
    const [comments, setCommentsRealTime] = useState(true);
    const [unlikes, setUnlikesRealTime] = useState(false);
    const [deletepost, setDeleteRealTime] = useState(false);

    const IMGURL = `http://localhost:8080/profileImages/`


    const getPost = () => {
        axios.get("/myPosts")
            .then((response) => {
                // console.log('posttttttttttttttttttttttttttttttt', response.data.posts)
                const allPost = response.data.posts
                setPosts(allPost)
            });
    }
    useEffect(() => getPost(), [likes, comments, unlikes, deletepost]);


    const getImageBlobUrl = async (fileName, index) => {
        const response = await fetch(`http://localhost:8080/${fileName}`)
        const blob = await response.blob()
        const bUrl = URL.createObjectURL(blob)
        setBlobUrls((blobUrls) => {
            const newBlobUrls = [...blobUrls]
            newBlobUrls[index] = bUrl
            return newBlobUrls
        })
    }



    useEffect(() => {
        posts.map((postData, index) => getImageBlobUrl(postData.postFile, index))

    }, [posts])



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

                setUserInfo(respData)
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);




    useEffect(() => {
        axios({
            method: "get",
            url: `/userProfile`,
            dataType: "JSON",
            withcredentials: true
        })
            .then((response) => {
                // console.log("my_profile", response.data.myFollowCount);
                const myFollowCount = response.data.myFollowCount;
                const myFollowing = response.data.myFollowing;
                const myPosts = response.data.myPosts;

                setUserFollow(myFollowCount)
                setUserFollowing(myFollowing)
                setUserPost(myPosts)

            })
            .catch((error) => {
                console.log(error);
            });
    }, []);




    return (
        <div>
            <ScrollToTopOnMount />

            <section className="profile__page-sectionn section">
                <div className="container profile__page-container">
                    <div className="profile__page-grid">
                        <div className="profile__grid-image">

                            {userInfo.profileImage ? <img src={IMGURL + userInfo.profileImage} alt="" /> : <img src={Picture} alt="" />}

                        </div>

                        <div className="profile__grid-info">
                            <div className="user__follow">
                                <h2>{userInfo.fullName}</h2>
                                <span>{userInfo.bio}</span>
                                <br />
                                <br />
                                <NavLink exact to="/view_profile" className="view__profile-button">
                                    View Profile
                                </NavLink>

                            </div>

                            <div className="post__info">
                                <h1>{userPost}</h1>
                                <p>Posts</p>
                            </div>

                            <div className="post__info">
                                <h1>{userFollow}</h1>
                                <p>Followers</p>
                            </div>
                            <div className="post__info">
                                <h1>{userFollowing}</h1>
                                <p>Following</p>
                            </div>


                        </div>
                    </div>
                </div>
            </section>

            <section className="section post__section-parent">
                {posts.length === 0 ? <h1 className="no__post">No Post Yet</h1> : !posts.length ? <div className="spinner">
                    <img src={Spin} alt="breeds" /></div> :
                    posts.map((postData, index) => {
                        return <Social
                            key={postData.id}
                            {...postData}
                            mediaUrl={blobUrls[index]}
                            postData={postData}
                            id={postData.id} 
                            icon={<ImBin />}
                            props={props}
                            comments={comment}
                            total={total}
                            ext={postData.postFile.slice(postData.postFile.indexOf('.'))}
                            setUnlikesRealTime={setUnlikesRealTime}
                            setLikesRealTime={setLikesRealTime}
                            setCommentsRealTime={setCommentsRealTime}
                            setDeleteRealTime={setDeleteRealTime}
                        />
                    })}
            </section>
        </div>
    )
}
