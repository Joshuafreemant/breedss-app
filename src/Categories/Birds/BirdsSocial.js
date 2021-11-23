import React, { useEffect, useState } from "react";
import Social from "../../Social/Social";

import { NavLink } from "react-router-dom";

import HeaderSec from "../../Header_sec/Header_sec";
import './BirdsSocial.css'
import Spin from "../../images/spinner.gif";
import axios from "axios";

function ScrollToTopOnMount() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return null;
}

export default function BirdsSocial() {
    const [posts, setPosts] = useState([]);
    const [blobUrls, setBlobUrls] = useState([]);


    const getPost = async () => {
        await axios.get("/BirdPosts").then((response) => {
           const allPost = response.data.posts;
            setPosts(allPost);
        });
    };
    useEffect(() => {
        getPost();
    }, []);

    const getImageBlobUrl = async (fileName, index) => {
        const response = await fetch(`http://localhost:8080/${fileName}`);
        const blob = await response.blob();
        const bUrl = URL.createObjectURL(blob);
        setBlobUrls((blobUrls) => {
            const newBlobUrls = [...blobUrls];
            newBlobUrls[index] = bUrl;
            return newBlobUrls;
        });
    };

    useEffect(() => {
        posts.map((postData, index) => getImageBlobUrl(postData.postFile, index));
    }, [posts]);


    return (
        <div>
            <HeaderSec />
            <ScrollToTopOnMount />
            <section className="section post__section-parent">
                {!posts.length ? (
                    <div className="container no-post">

                        <h3>No Post in this Category Yet</h3>
                        <p>Be the first to create by clicking the CREATE button and select the Birds category</p>
                        <NavLink exact to="/create_post" className="create">
                            Create Post
                        </NavLink>
                    </div>
                ) : (
                    posts.map((postData, index) => {
                        return (
                            <Social
                                key={postData.id}
                                {...postData}
                                mediaUrl={blobUrls[index]}
                                postData={postData}
                                //    id={posts[index].id}
                                id={postData.id}
                                // comments={comment}
                                // total={total}
                                ext={postData.postFile.slice(postData.postFile.indexOf("."))}
                            />
                        );
                    })
                )}
            </section>
        </div>
    );
}
