import React, { useEffect, useState } from "react";
import axios from "axios";

function Contact() {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [message, setMessage] = useState("");
    const [success, setSuccess] = useState(false)

    const redirectToPage = () => setSuccess(true) ;  
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
}

function handleContact(n, e, m) {
    axios({
        method: 'post',
        url: '/send',
        data: {
            name: n,
            email: e,
            message: m
        },
        // headers: { "Content-Type": "multipart/form-data" },
    })
    .then(function (response) {
        console.log(response);
    })
    .catch(function (error) {
        console.log(error);
    });

    // let xhr = new XMLHttpRequest();
    // xhr.open('POST', '/send');
    // xhr.setRequestHeader('content-type', 'application/json');
    // xhr.onload = function() {
    //     console.log(xhr.responseText);
    //     if (xhr.responseText == 'success'){
    //         alert("Email sent");
    //         //reload the form
    //     } else {
    //         alert("Oops, something went wrong.")
    //     }
    // }

    // xhr.send("hello")

    // fetch("/send", {
    //     method: "post",
    //     body: email,
    //   }).then((response) => {
    //     return response.json();
    //   }).catch();
    
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

// const contactFrom = document.getElementById('contact-form')
// contactFrom.addEventListener('submit', (e)=>{
//     e.preventDefault
    
// })

export default Contact;
