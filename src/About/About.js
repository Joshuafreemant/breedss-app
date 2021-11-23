
import './About.css';
import { useEffect } from "react";

function ScrollToTopOnMount() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return null;
}
export default function About() {
    return (
        <div>
        <ScrollToTopOnMount />
           <section className="section about__section">
               <div className="container about__container-page">
                   <h1>About Us</h1>

                   <div className="about__description-page">
                       <h1>Brief Intro</h1>
                       <p>
                       Breedss is a free, online pet media-sharing website among pet owners. 
                       </p>
                      
                       <h1>Brief History/State a Problem</h1>
                       
                       <p>
                   
Often times than not, when raising pets, we encounter certain problems that gets us worried, but we fail to realize that we are not the first to raise pets and we wont be the last to, if only there was an avenue to always ask those bugging questions on our mind.
<br/>
Breedss was founded in (the year) for this sole purpose. It has been our aim to help pet-parent share their experiences in order to help others around the world going through similar issue with their pet(s).
                       </p>
                       <blockquote cite="http://www.worldwildlife.org/who/index.html">

</blockquote>
                       <p>“Often, we are too slow to recognize how much and in what ways we can assist each other through sharing expertise and knowledge.”

</p>
<p>Owen Arthur.
</p>
<p>(1949, Barbadian politician)</p>
                   
                   </div>
               </div>
           </section> 
        </div>
    )
}
