import React, { useEffect, useState } from "react";
import Social from "../Social/Social";
import Pets from "../images/Pets.jpg";
import Petgs from "../images/Petgs.jpg";
import "./Post.css";
import HeaderSec from "../Header_sec/Header_sec";
import { NavLink } from "react-router-dom";

import Spin from "../images/spinner.gif";
import axios from "axios";

function ScrollToTopOnMount() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return null;
}

export default function Post() {
  const [posts, setPosts] = useState([]);
  const [likes, setLikesRealTime] = useState(false);
  const [comments, setCommentsRealTime] = useState(true);
  const [unlikes, setUnlikesRealTime] = useState(false);



  const [blobUrls, setBlobUrls] = useState([]);


  const getPost = async () => {
    await axios.get("/all_posts").then((response) => {
      const allPost = response.data.posts;
      // console.log('postttttttttttt', response.data.posts)
      setPosts(allPost);
    });
  };
  useEffect(() => {
    getPost();
  }, [likes,comments,unlikes]);

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

                        <h3>No Post  Yet</h3>
                        <p>Get Started by clicking the CREATE button below </p>
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
                id={postData.id}
                setUnlikesRealTime={setUnlikesRealTime}
                setLikesRealTime={setLikesRealTime}
                setCommentsRealTime={setCommentsRealTime}

                ext={postData.postFile.slice(postData.postFile.indexOf("."))}
              />
            );
          })
        )}
      </section>
    </div>
  );
}
