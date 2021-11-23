import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './Home.js'
import Header from './Header/Header'
import Footer from './Footer/Footer'
import Login from './Login/Login'
import Signup from './Signup/Signup'

import Forgot from './Forgot/Forgot'
import Post from './Post/Post'
import Social from './Social/Social'
import Faqs from './Faqs/Faqs'
import Contact from './Contact/Contact'
import Create from './Create/Create'
import Profile from './Profile/Profile'
import Favorite from './Favourite/Favourite'
import UserProfile from './UserProfile/UserProfile'
import UserInfo from './Admin/UserInfo/UserInfo'
import AllUser from './Admin/AllUser/AllUser'
import AdminProfile from './Admin/AdminProfile/AdminProfile'
import UpdateAdminProfile from './Admin/AdminProfile/UpdateProfile'



import Edit_profile from './Edit_profile/Edit_profile'
import ViewComment from './viewComment/ViewComment'
import ViewLikes from './ViewLikes/ViewLikes'
import View_profile from './View_profile/View_profile'
import Change_password from './Change_password/Change_password'
import About from './About/About'
import Adverts from './Adverts/Adverts'
import Privacy_policy from './Privacy_policy/Privacy_policy'
import How_to from './How_to/How_to'
import Accessibility from './Accessibility/Accessibility'
import Terms from './Terms/Terms'
import SearchPage from './searchPage/SearchPage'
import Admin from './Admin/Admin'

import Dogs from './Categories/Dogs/Dogs'
import DogsSocial from './Categories/Dogs/DogsSocial'



import Cats from './Categories/Cats/Cats'
import CatsSocial from './Categories/Cats/CatsSocial'


import Birds from './Categories/Birds/Birds'
import BirdsSocial from './Categories/Birds/BirdsSocial'
import Bunnies from './Categories/Bunnies/Bunnies'
import BunnySocial from './Categories/Bunnies/BunnySocial'


import Others from './Categories/Others/Others'
import OtherSocial from './Categories/Others/OtherSocial'


import { useEffect } from "react";
import ProtectedRoute from './ProtectedRoute'
function ScrollToTopOnMount() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return null;
}

export default function App() {
  return (
    <div>
      <ScrollToTopOnMount />

      <Router>
        <Header />
        <Switch>

          <Route exact path="/" component={Home} />
          <Route path="/home" component={Home} />
          <Route path="/about" component={Home} />
          <Route path="/signup" component={Signup} />
          <Route path="/login" component={Login} />
          <Route path="/forgot" component={Forgot} />
          <Route path="/faqs" component={Faqs} />
          <Route path="/support" component={Contact} />
          <Route path="/privacy_policy" component={Privacy_policy} />
          <Route path="/about-us" component={About} />
          <Route path="/how_to_use" component={How_to} />
          <Route path="/accessibility" component={Accessibility} />
          <Route path="/terms" component={Terms} />
          <Route path="/dogs" component={Dogs} />
          <Route path="/bunnies" component={Bunnies} />
          <Route path="/cats" component={Cats} />
          <Route path="/birds" component={Birds} />
          <Route path="/others" component={Others} />


          <ProtectedRoute path="/user_profile/:id" component={UserProfile} auth={false} />
          <ProtectedRoute path="/userinfo/:id" component={UserInfo} auth={false} />
          <ProtectedRoute path="/view_comment/:postId" component={ViewComment} auth={false} />
          <ProtectedRoute path="/view_like/:postId" component={ViewLikes} auth={false} />
          <ProtectedRoute path="/profile" component={Profile} auth={false} />
          <ProtectedRoute path="/view_profile" component={View_profile} auth={false} />
          <ProtectedRoute path="/edit_profile" component={Edit_profile} auth={false} />
          <ProtectedRoute path="/edit_password" component={Change_password} auth={false} />
          <ProtectedRoute path="/create_post" component={Create} auth={false} />
          <ProtectedRoute path="/breedssbird" component={BirdsSocial} auth={false} />
          <ProtectedRoute path="/breedssbunny" component={BunnySocial} auth={false} />
          <ProtectedRoute path="/breedsscat" component={CatsSocial} auth={false} />
          <ProtectedRoute path="/breedssdog" component={DogsSocial} auth={false} />
          <ProtectedRoute path="/otherbreedss" component={OtherSocial} auth={false} />
          <ProtectedRoute path="/post" component={Post} auth={false} />
          <ProtectedRoute path="/search" component={SearchPage} auth={false} />
          <ProtectedRoute path="/favourite" component={Favorite} auth={false} />
          <ProtectedRoute path="/adverts" component={Adverts} auth={false} />
          <ProtectedRoute path="/admin" component={Admin} auth={false} />
          <ProtectedRoute path="/all_users" component={AllUser} auth={false} />
          <ProtectedRoute path="/admin_profile" component={AdminProfile} auth={false} />
          <ProtectedRoute path="/update_admin_profile" component={UpdateAdminProfile} auth={false} />
        </Switch>
        <Footer />

      </Router>
    </div>

  )
}


