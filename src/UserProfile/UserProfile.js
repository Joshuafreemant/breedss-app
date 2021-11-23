import './UserProfile.css'
import Pet_img from '../images/post-pet.jpg';
import Picture from '../images/user-plus.png';

import Social from '../Social/Social'

import Pets from '../images/Pets.jpg';
import Petgs from '../images/Petgs.jpg';
import Petv from '../images/Pet.mp4';
import { NavLink, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from 'axios';
import Spin from '../images/spinner.gif';

function ScrollToTopOnMount() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return null;
}


export default function UserProfile() {
    const IMGURL = `http://localhost:8080/profileImages/`

    const [users, setUsers] = useState([]);
    const [follow, setFollow] = useState([]);
    const [following, setFollowing] = useState([]);
    const [changeFollow, setChangeFollow] = useState('Follow');
    const { id } = useParams();
    const [userPost, setUserPost] = useState([]);
    const [posts, setPosts] = useState([]);
    const [blobUrls, setBlobUrls] = useState([]);
    const [comment, setComment] = useState([]);
    const [total, setTotal] = useState([]);
    const [realfollow, setFollowRealTime] = useState(false);
    const [realfollowing, setFollowingRealTime] = useState(false);
    const [likes, setLikesRealTime] = useState(false);
    const [comments, setCommentsRealTime] = useState(true);
    const [unlikes, setUnlikesRealTime] = useState(false);


    const handleFollow = (e) => {

        // this handles the follow function, it sends the id of the user to be followed to the backend
        e.preventDefault();
        let formData = new FormData();
        formData.append('id', users.id);
        axios({
            method: 'post',
            url: '../follow',
            data: formData,
            config: { headers: { 'Content-Type': 'multipart/form-data' } }
        }).then((response) => {
            setFollowRealTime((realfollow) => !realfollow);
            setFollowingRealTime((realfollowing) => !realfollowing)

        })
            .catch((error) => {
                console.log(error)
            })
    }




    const getUserPost = () => {

        axios.post(
            '../viewProfile',
            JSON.parse(id),
            { params: { id } }
        )
            .then(response => {
                // this gets the exact user profile  that is clicked
                const user = response.data.users[0]
                setUsers(user)

                const check = response.data.check
                // Check maybe I am following the user, in order to change the button to following
                if (check) {
                    setChangeFollow('Following')


                }
                // this brings the exact number of posts the user has created
                const userPosts = response.data.TotalPost
                setUserPost(userPosts)


                // this brings the exact number of people that the user is following 
                const followers = response.data.Totality

                setFollowing(followers)

                // this brings the exact number of people that are following the user
                const followw = response.data.Total
                setFollow(followw)
            })
            .catch(error => {
                console.log(error)
            });
    }

    useEffect(() => getUserPost(), [realfollow, realfollowing, likes, comments, unlikes]);


    const sendId = () => {

        let formData = new FormData();
        formData.append('id', id);
        axios({
            method: 'post',
            url: '/userPosts',
            data: formData,
            config: { headers: { 'Content-Type': 'multipart/form-data' } }
        }).then(response => {
            // this gets the exact user post  that is clicked

            const allPost = response.data.posts
            setPosts(allPost)
        })
            .catch(error => {
                console.log(error)
            });
    }
    useEffect(() => sendId(), [likes, comments, unlikes]);







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





    return (
        <div>
            <ScrollToTopOnMount />

            <section className="profile__page-sectionn section">
                <div className="container profile__page-container">
                    <div className="profile__page-grid">
                        <div className="profile__grid-image">
                            {users.profileImage ? <img src={IMGURL + users.profileImage} alt="" /> : <img src={Picture} alt="" />}
                        </div>

                        <div className="profile__grid-info">
                            <div className="user__follow">
                                <h2>{users.fullName}</h2>
                                <span>{users.bio}</span>
                                <br />
                                <br />
                                {/* <NavLink exact to="/view_profile" className="view__profile-button">
                                    View Profile
                                </NavLink> */}
                                <form className="form">
                                    <input
                                        type="text"
                                        name="id"
                                        className="form-input"
                                        hidden
                                        value={users.id}

                                        required />



                                    <input
                                        type="submit"
                                        className="view__profile-button"
                                        onClick={e => handleFollow(e)}
                                        value={changeFollow} />



                                </form>
                            </div>

                            <div className="post__info">
                                <h1>{userPost}</h1>
                                <p>Posts</p>
                            </div>

                            <div className="post__info">

                                <h1>{follow}</h1>
                                <p>Followers</p>
                            </div>



                            <div className="post__info">
                                <h1>{following}</h1>
                                <p>Following</p>
                            </div>


                        </div>
                    </div>
                </div>

            </section>

            <section className="section post__section-parent">
                {posts.length === 0 ? <h1 className="no__post">No Post Yet</h1> : !posts.length ? <div className="spinner"><img src={Spin} /></div> :

                    posts.map((postData, index) => {
                        return <Social
                            key={postData.id}
                            {...postData}
                            mediaUrl={blobUrls[index]}
                            postData={postData}
                            //    id={posts[index].id} 
                            id={postData.id}

                            comments={comment}
                            total={total}
                            ext={postData.postFile.slice(postData.postFile.indexOf('.'))}
                            setUnlikesRealTime={setUnlikesRealTime}
                            setLikesRealTime={setLikesRealTime}
                            setCommentsRealTime={setCommentsRealTime}
                        />
                    })}
            </section>

        </div>
    )
}
