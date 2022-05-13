import React, { useEffect, useState } from "react";
import axios from "axios";

function Contact() {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [message, setMessage] = useState("");
    const [success, setSuccess] = useState(false)

    const redirectToPage = () => setSuccess(true);

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
                for (const el of document.getElementById('contact-form').querySelectorAll("[required]")) {
                    el.value = ""
                }
                alert("Email sent!")
                setEmail('')
                setName('')
                setMessage('')
            })
            .catch(function (error) {
                console.log(error);
                alert("Oops, you dropped something")
            });
    }

    return (
        <div className="main-page-body">
            <p className="login-header">Have questions?</p>
            <p className="contact-display-message">Get in touch with our team!</p>
            <form id='contact-form'>
                <div className="login-input-boxes">
                    <div className="contact-input-boxes">
                        <input id="name-input" className="contact-input" placeholder="Name" type="text" onChange={(e) => setName(e.target.value)} required />
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

export default Contact;
