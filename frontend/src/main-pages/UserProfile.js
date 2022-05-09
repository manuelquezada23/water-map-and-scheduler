import React, { useState } from 'react';
import PictureIconLarge from '../picture-large.png'
import './main-pages.css'
import { getAuth, updateProfile, signInWithEmailAndPassword, reauthenticateWithCredential, AuthCredential, onAuthStateChanged} from "firebase/auth";

function UserProfile() {
    const auth = getAuth();
    // const [wait, finishAwait] = useState(false)

    const user = auth.currentUser;
    const userEmail = user.email;
    const userDisplayName = user.displayName;
    const userProfileImage = user.photoURL

    const [file, setFile] = useState(PictureIconLarge)
    const [newImage, setNewImage] = useState()
    const [newName, setName] = useState(userDisplayName)
    const [oldPassword, setOldPassword] = useState()
    const [newPassword, setNewPassword] = useState()
    const [confirmPassword, setConfirmPassword] = useState()

    if (userProfileImage) {
        // console.log(userProfileImage)
        // setFile(userProfileImage)
    }

    function handleChange(event) {
        const newPicture = URL.createObjectURL(event.target.files[0])
        if (newPicture != null) {
            setFile(newPicture)
            setNewImage(newPicture)
        }
    }

    function uploadPicture() {
        if (newImage) {
            updateProfile(auth.currentUser, {
                photoURL: newImage
            }).then(() => {
                // Profile updated!
                window.location.reload(false);
            }).catch((error) => {
                window.alert(error)
            });
        }
    }

    function updatePassword() {
        // console.log(oldPassword)
        console.log("clicked")
        // console.log(auth)
        // console.log(oldPassword)
        var credential = new AuthCredential(
            userEmail,
            oldPassword
        );
        // signInWithEmailAndPassword(auth, userEmail, oldPassword)
        reauthenticateWithCredential(user, credential)
        .then(()=>{
            if (confirmPassword.length !== 0 && newPassword.length !== 0) {
                if (confirmPassword !== newPassword) {
                    alert("Password do not match.")
                } else {
                    updatePassword(user, newPassword).then(() => {
                    }).then(
                        alert("Password updated")
                    ).catch((error) => {
                        alert("failed to update: " +error)
                    });
                    
                }
            }
        }).catch((error) => {
            // alert("Incorrect password.")
            console.log(error)
        }  
        );
    }

    function changeName() {
        console.log(user)
        console.log(newName)
        // updateProfile(user, {
        //     displayName: newName,
        //     photoURL: newImage ? newImage : null
        // }).then(()=>{
        //     alert("Information saved!")
        // }).catch((error) => {
        //     alert(error)
        // });
    }

    return (
        <div className="main-page-body">
            {/* {(!wait) &&
                <div></div>
            }
            {(wait) &&  */}
            <div className="user-profile-box">
                <form className="user-profile">
                    <p className='profile-header'>My Profile</p>
                    <div className="profile-image-box">
                        <img className="profile-image" src={file} alt="profile"></img>
                        <div className="user-image-buttons">
                            <label htmlFor="fusk" className="upload-button">Upload</label>
                            <input id="fusk" type="file" defaultValue="" name="photo" style={{ display: "none" }} onChange={(e) => { handleChange(e) }}></input>
                        </div>
                    </div>
                    <input className='user-input' placeholder="Name" type="text" value={newName}
                    onChange= {(e) => {
                        setName(e.target.value)
                    }} required/>
                    <input className='user-input' placeholder="Email" type="text" disabled value={userEmail}></input>
                    <button className="info-change-button" onClick={() => {
                        /** update photo */
                        changeName()
                    }
                        }>Save</button>
                </form>
                <form id="password-change" className="user-profile">
                    <p className='profile-header'>Change Password</p>
                    <div>
                        <input className="user-input" placeholder="Old password" type="password" onChange= {(e) => {
                            setOldPassword(e.target.value)
                        }} required />
                    </div>
                    <div>
                        <input className="user-input" placeholder="New password" type="password" 
                            onChange= {(e) => {
                            setNewPassword(e.target.value)
                        }}required />
                    </div>
                    <div>
                        <input className="user-input" placeholder="Confirm new password" type="password" 
                            onChange= {(e) => {
                            setConfirmPassword(e.target.value)
                        }} required />
                    </div>
                    <button className="info-change-button" onClick={() => {
                        for (const el of document.getElementById('password-change').querySelectorAll("[required]")) {
                            if (!el.reportValidity()) {
                                return;
                            }
                        }
                        console.log("reached")
                        updatePassword()
                    }  
                    }>Change</button>
                </form>
            </div>
            {/* } */}
        </div>
    );
}

export default UserProfile;