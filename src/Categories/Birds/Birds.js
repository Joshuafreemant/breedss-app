
// Import Swiper React components
import '../../Home.css';


import { Swiper, SwiperSlide } from "swiper/react";

import { FaTwitterSquare } from 'react-icons/fa';
import { FaInstagramSquare } from 'react-icons/fa';
import { FaFacebookSquare } from 'react-icons/fa';
import { FaArrowRight } from 'react-icons/fa';
import { FaYoutube } from 'react-icons/fa';
import { FaHandshake } from 'react-icons/fa';
import { FaLock } from 'react-icons/fa';
import { FaKey } from 'react-icons/fa';

// import Scroll from './Scroll/Scroll'
import { NavLink } from 'react-router-dom';




import Pet_img from '../../images/post-pet.jpg';
import Bg_img from '../../images/breedss-bird.jpg';
import abt_img1 from '../../images/abt-img1.jpg';
import abt_img2 from '../../images/abt-img2.jpg';
import discover_dog from '../../images/discover-dog.jpg';
import discover_cat from '../../images/discover-cat.jpeg';
import discover_bird from '../../images/breedss_bird.jpg';
import discover_rabbit from '../../images/discover-rabbit.jpg';
import discover_other1 from '../../images/breedss_dog2.jpeg';

import discover_horse from '../../images/breedss_horse.jpeg';
import privacy from '../../images/safe.jpg';
// Import Swiper styles
import "swiper/swiper.min.css";
import "swiper/components/effect-coverflow/effect-coverflow.min.css"
import "swiper/components/pagination/pagination.min.css"

import { useEffect } from "react";

// import Swiper core and required modules
import SwiperCore, {
    EffectCoverflow, Pagination
} from 'swiper/core';

// install Swiper modules
SwiperCore.use([EffectCoverflow, Pagination]);




function ScrollToTopOnMount() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return null;
}

const Birds = () => {
    return (
        <div>
         <ScrollToTopOnMount />

            <main className="main">
                <section className="homepage" id="home">
                    <img src={Bg_img} alt="" className="home__img" />
                    <div className="home__container container grid">
                        <div className="home__data">

                            <h1 className="home__data-title">Post Your<br /> <b>Birds</b> on Breedss</h1>
                            {/* <h1 className="home__data-title">Breedss Birds</h1> */}

                            <NavLink exact to="/login" className="button">
                                Get Started
                            </NavLink>
                        </div>

                        <div className="home__social">
                            <a href="https://www.fb.com" target="_blank" rel="noreferrer" className="home__social-link">   <FaInstagramSquare /></a>
                            <a href="https://www.fb.com" target="_blank" rel="noreferrer" className="home__social-link"><FaTwitterSquare /></a>
                            <a href="https://www.fb.com" target="_blank" rel="noreferrer" className="home__social-link"><FaFacebookSquare /></a>
                            <a href="https://www.fb.com" target="_blank" rel="noreferrer" className="home__social-link"><FaYoutube /></a>

                        </div>
                        <div className="home__info">
                            <div className="">
                                <span className="home__info-title">Post a Picture/Video of Your Birds</span>
                                <a href="#more" className="button button--flex button--link home__info-button">More <FaArrowRight /></a>
                            </div>

                            <div className="home__info-overlay">
                                <img src={Bg_img} alt="pet" className="home__info-img" />
                            </div>
                        </div>
                    </div>


                </section>

                <section id="more" className="about section">
                    <div className="about__container container grid">
                        <div className="about__data">
                            <h2 className="section__title about__title">More Information about Breedss</h2>
                            <p className="about__description">
                                Breedss is a free, online pet media-sharing site among pet owners. Breedss is like Instagram for pet-owners. It is an online platform that helps pet owners showcase their pets, interact and exchange their experiences while raising or owning a pet  globally.
                            </p>



                            <NavLink exact to="/about-us" className="button">About Breedss</NavLink>

                        </div>
                        <div className="about__img">
                            <div className="about__img-overlay">
                                <img src={abt_img1} alt="pet" className="about__img-one" />
                            </div>

                            <div className="about__img-overlay">
                                <img src={abt_img2} alt="pet" className="about__img-two" />
                            </div>

                        </div>
                    </div>
                </section>

                <section className="discover section">
                    <div className="container discover__container">
                        <h2 className="section__title">Discover More on Breedss</h2>
                        <p>Are you a lover of animals, pets? Now you can easily see varieties of pets through Breedss.
                            You don’t have to always be physically present to be of help to pets and pet owners
                            You don’t have to be a Vet Doctor to help pets get restored to good health.
                            Are you in need of a pet, Breedss can help you locate and adopt the best pet of your choice.
                            Explore our gallery to see myriads of pet owners’ profile and details about their pets.
                            Do you want to share your experience with raising pets, no worries. Kindly sign up here and get sharing.
                        </p>
                    </div>


                    <Swiper spaceBetween={32} effect={'coverflow'} loop={true} grabCursor={true} centeredSlides={true} slidesPerView={'auto'} coverflowEffect={{
                        "rotate": 0,
                        "stretch": 0,
                        "depth": 100,
                        "modifier": 1,
                        "slideShadows": true
                    }} pagination={true} className="mySwiper  container container-swipper">
                        <SwiperSlide className="discover__card">
                            <img src={discover_rabbit} className="discover__img" alt="Breedss" />
                            <div className="discover__data">
                                <h2 className="discover__title">Bunnies</h2>
                                <span className="discover__description">Post Pictures/Videos of Your Bunnies</span>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide className="discover__card">
                            <img src={discover_dog} className="discover__img" alt="Breedss" />

                            <div className="discover__data">
                                <h2 className="discover__title">Dogs</h2>
                                <span className="discover__description">Post Pictures/Videos of Your Dog</span>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide className="discover__card">
                            <img src={discover_cat} className="discover__img" alt="Breedss" />
                            <div className="discover__data">
                                <h2 className="discover__title">Cats</h2>
                                <span className="discover__description">Post Pictures/Videos of Your Cats</span>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide className="discover__card">
                            <img src={discover_bird} className="discover__img" alt="Breedss" />
                            <div className="discover__data">
                                <h2 className="discover__title">Birds</h2>
                                <span className="discover__description">Post  Pictures/Videos of Your Birds</span>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide className="discover__card">
                            <img src={discover_horse} className="discover__img" alt="Breedss" />
                            <div className="discover__data">
                                <h2 className="discover__title">Horses</h2>
                                <span className="discover__description">Post Your Horses</span>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide className="discover__card">
                            <img src={discover_other1} className="discover__img" alt="Breedss" />
                            <div className="discover__data">
                                <h2 className="discover__title">Other Pets?</h2>
                                <span className="discover__description">Post Pictures/Videos of Your Pets</span>
                            </div>
                        </SwiperSlide>


                    </Swiper>
                </section>
                {/* <Scroll /> */}
            </main>
        </div>
    )
}
export default Birds;

