import React, { useEffect, useState } from "react";

function Contact() {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [message, setMessage] = useState("");
    const [success, setSuccess] = useState(false)

    const redirectToPage = () => setSuccess(true) ;  

    // {success && (
    //     <Fragment>
    //       <Redirect to='/thankyou' />  
    //     </Fragment>
    //    )} 

    // if (success) {
    //     return (
    //         <div className="main-page-body">
    //             <p className="login-header">Thank you!</p>
    //             <p className="contact-display-message">Your message has been sent.</p>
    //         </div>
    //     )
    // } else {
        return (
            <div className="main-page-body">
                <p className="login-header">Have questions?</p>
                <p className="contact-display-message">Get in touch with our team!</p>
                <form id='contact-form'>
                    <div className="login-input-boxes">
                        <div className="contact-input-boxes">
                            <input className="contact-input" placeholder="Name" type="text" onChange={(e) => setName(e.target.value)} required />
                            <input className="contact-input" placeholder="Email" type="email" onChange={(e) => setEmail(e.target.value)} required />
                        </div>
                        <textarea className="contact-message" placeholder="Type response here" rows="10" type="text" onChange={(e) => setMessage(e.target.value)} required />
                        <div className='contact-submit'>
                            <button className="contact-submit-button" onClick={(e) => {
                                for (const el of document.getElementById('contact-form').querySelectorAll("[required]")) {
                                    if (!el.reportValidity()) {
                                      return;
                                    }
                                }
                                e.preventDefault();
                                handleContact(name, email, message)
                            }}>Send</button>
                        </div>
                    </div>
                </form>
            </div>
        );
    // }
}

function handleContact(name, email, message) {
    console.log("handled")
    console.log(name)
    console.log(email)
    console.log(message)

    fetch("/send", {
        method: "post",
        body: email,
      }).then((response) => {
        return response.json();
      }).catch();
    
    // fetch('http://localhost:3000/send', {
    //     method: "POST",
    //     body: JSON.stringify(name,email,message),
    //     headers: {
    //         'Accept': 'application/json',
    //         'Content-Type': 'application/json'
    //     },
    //     }).then(
    //     (response) => (response.json())
    //     ).then((response)=> {}
    //     ).catch((error) => {})
}

// function setSuccess() {
//     return (
//         <div className="main-page-body">
//             <p className="login-header">Thank you!</p>
//             <p className="contact-display-message">Your message has been sent.</p>
//         </div>
//     )
// }

export default Contact;
