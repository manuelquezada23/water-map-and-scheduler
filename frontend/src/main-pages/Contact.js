import React from 'react';

function Contact() {
  return (
      <div className="main-page-body">
          <p className="login-header">Have questions?</p>
          <p className="contact-display-message">Get in touch with our team!</p>
          <form>
              <div className="login-input-boxes">
                  <div className="contact-input-boxes">
                      <input className="contact-input" placeholder="Name" type="text" required />
                      <input className="contact-input" placeholder="Email" type="text" required />
                  </div>
                  <textarea className="contact-message" placeholder="Type response here" rows="10" type="text" required />
                  <div className='contact-submit'>
                    <button className="contact-submit-button">Send</button>
                  </div>
              </div>
          </form>
      </div>
  );
}

export default Contact;