import React, { useState } from 'react';
import PictureIconLarge from '../picture-large.png'
import './main-pages.css'
import { getAuth } from "firebase/auth";

function UserProfile() {
    const auth = getAuth();
    const user = auth.currentUser;
    const userEmail = user.email;
    const userDisplayName = user.displayName;
    const userProfileImage = user.photoURL

    const [file, setFile] = useState(PictureIconLarge)

    if (userProfileImage) {
        setFile(userProfileImage)
    }

    function handleChange(event) {
        setFile(URL.createObjectURL(event.target.files[0]))
    }

    function uploadPicture() {
        console.log("cool")
    }

    return (
        <div className="main-page-body">
            <div className="user-profile-box">
                <div className="user-profile">
                    <p className='profile-header'>My Profile</p>
                    <div className="profile-image-box">
                        <img className="profile-image" src={file} alt="profile"></img>
                        <div className="user-image-buttons">
                            <label htmlFor="fusk" className="upload-button">Upload</label>
                            <input id="fusk" type="file" defaultValue="" name="photo" style={{display: "none"}} onChange={(e) => {handleChange(e)}}></input>
                        </div>
                    </div>
                    <input className='user-input' placeholder="Name" type="text" value={userDisplayName} />
                    <input className='user-input' placeholder="Email" type="text" disabled value={userEmail}></input>
                    <button className="info-change-button" onClick={uploadPicture}>Save</button>
                </div>
                <div className="user-profile">
                    <p className='profile-header'>Change Password</p>
                    <div>
                        <input className="user-input" placeholder="Old password" type="text" required />
                    </div>
                    <div>
                        <input className="user-input" placeholder="New password" type="text" required />
                    </div>
                    <div>
                        <input className="user-input" placeholder="Confirm new password" type="text" required />
                    </div>
                    <button className="info-change-button">Change</button>
                </div>

            </div>
        </div>
    );
}

export default UserProfile;