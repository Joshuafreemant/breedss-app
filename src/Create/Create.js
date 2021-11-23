
import './Create.css'

// import HeaderSec from '../Header_sec/Header_sec'
import Button from '../Button2/Button'
import { useState, useEffect } from "react";
import axios from 'axios'
import Swal from 'sweetalert2';

function ScrollToTopOnMount() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return null;
}
export default function Create(props) {
    const [text, setText] = useState("")
    const [category, setCategory] = useState("All Pets")
    const [file, setFile] = useState("")
    const [visible, setVisible] = useState("Public")

    const handleCategory = (e) => {
       
        setCategory(e.target.value);
    }
    const handleChange = (e) => {
        
      
        setVisible(e.target.value);
    }

    const fileSelect = (event) => {
        setFile(event.target.files[0])
    }

    function handleCreatePost(event) {
        event.preventDefault();


        let formData = new FormData();
        formData.append('text', text)
        formData.append('file', file)

        formData.append('visible', visible)
        formData.append('category', category)

        axios({
            method: 'post',
            url: '/post',
            // url: 'http://localhost/dashboard/pets-app/Backenddd/post.php',

            data: formData,
            config: { headers: { 'Content-Type': 'multipart/form-data' } }
        })
            .then(function (response) {
                //handle success
               
                const message = response.data.message
                console.log('ori e o pe', response.data.message)
              

                if (message === "Successfully Uploaded and Moved to the database") {

                    Swal.fire({
                        icon: "success",
                        title: "Post Created",
                        html: "Successfully Created",

                        confirmButtonColor: "hsl(190,64%,22%)",
                    })


                    props.history.push('/post')

                }
                else if(message === "Your Account Paused"){
                    Swal.fire({
                        icon: "error",
                        title: "Account Paused",
                        html: "Contact the Support for Help",

                        confirmButtonColor: "hsl(190,64%,22%)",
                    })
                }
               
                else {
                    Swal.fire({
                        icon: "error",
                        title: "Post Creation Failed",

                        html: "File Existed, try renaming or uploading another file",
                        confirmButtonColor: "hsl(190,64%,22%)",
                    })
                }



            })
            .catch(function (error) {
                //handle error
                console.log("error ", error)
            });

    }

    return (
        <div>
            <ScrollToTopOnMount />
            <section className="create__post section">
                {/* <HeaderSec/> */}


                <div className="create__post-container container">
                    <form>
                        <div className="create__post-textarea">
                            <textarea
                                placeholder="Write Something....."
                                required
                                name="text"
                                id=""
                                cols="30"
                                rows="10"
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                            >

                            </textarea>
                        </div>

                        <div className="create__post-file">
                            <input
                                type="file"
                                name="file"
                                onChange={fileSelect}
                            // accept=".jpg,.jpeg,.png,.mp4"
                            />

                        </div>
                        {/* 
    <div className="create__post-type">

    <input 
    type="text" 
    name="" 
    id="" 
    value="post" 
    disabled 
    required 
    hidden/>

    </div> */}



                        <div className="selectElement">
                            <div className="create__post-visibility">
                                <h5>Set Post Visibility</h5>
                                <select
                                    value={visible}
                                    name={visible}
                                    onChange={handleChange}>
                                    <option value="Public">Public</option>
                                    {/* <option value="Friends Only">Friends Only</option> */}
                                    <option value="Private">Private</option>


                                </select>
                            </div>
<br/>
                            <div className="create__post-visibility">
                                <h5> Post Category</h5>
                                <select
                                    value={category}
                                    name={category}
                                    onChange={handleCategory}>

                                    <option value="Dogs">Dogs</option>
                                    <option value="Bunnies">Bunnies</option>
                                    <option value="Cats">Cats</option>
                                    <option value="Birds">Birds</option>
                                    <option value="Others">Others</option>


                                </select>
                            </div>


                        </div>


                        <input type="submit" className="form-button2" onClick={e => handleCreatePost(e)} value="Create Post" />

                    </form>
                </div>
            </section>
        </div>
    )
}
