import React, { Component } from 'react'
import {Redirect,Route} from 'react-router-dom';
import { useState, useEffect } from "react";
import axios from 'axios';

const ProtectedRoute =({auth, component: Component, ...rest})=> {

    const [users, setUsersw] = useState([]);

    useEffect(() => {
        axios({
            method: "get",
            url: `/session`,
            dataType: "JSON",
            withcredentials: true
        })
            .then((response) => {
                const respData = response.data.user

                setUsersw(respData)
                console.log('protectedrrrrrrrrrrrrrrrrr', respData);
                
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    return (
        <Route {...rest} render={(props)=>{
            auth=users;
            if(users) return <Component {...props}/>;
            if(!users)return <Redirect to={{path:"/",state:{from:props.location}}}/>
        }}/>
    );
    

};
export default ProtectedRoute;