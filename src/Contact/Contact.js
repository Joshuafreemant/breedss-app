
import './Contact.css'
import Button from '../Button2/Button'
import { useEffect } from "react";

function ScrollToTopOnMount() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return null;
}
export default function Contact() {
    return (
        <div>
         <ScrollToTopOnMount />

            <section className="contact section">
                <div className="contact__title container">
                    <h1 className="contact__heading">
                        Contact Support
                    </h1>
                    <p className="contact__email">You can get in touch with our customer service for any sort of complaint or to be more informed about our services info@breedss.com
</p>
<p className="contact__paragraph">Follow us on all social media platforms (Facebook, Pinterest, Twitter, Instagram, YouTube)</p>
                    <p className="contact__paragraph">Reach out anytime 
                   via the email above or Fill out the Form below</p>
                </div>
                <div className="contact__container container">
                   
                <form action="" className="contact__form">
                                <div className="form-groups">
                                    <label htmlFor="Email">Name *</label>
                                    <input type="text" className="form-input"  autoComplete required />
                                </div>

                                <div className="form-groups">
                                    <label htmlFor="Password">Email Address *</label>
                                    <input type="email"  className="form-input"   required/>
                                </div>

                                <div className="form-groups">
                                    <label htmlFor="Message">Message *</label>
                                    <textarea name="" id="" cols="30" rows="10" required className="form-textarea"></textarea>
                                </div>


                                <div className="contact__btn">
                                   <Button text="Send Message" className="contact__button" />
                                </div>

                                
                            </form>
                </div>
            </section>

        </div>
    )
}
