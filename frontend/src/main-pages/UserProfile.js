import React, { useState, useEffect } from 'react';
import PictureIconLarge from '../picture-large.png'
import './main-pages.css'
import { EmailAuthProvider, getAuth, updateProfile, updatePassword, reauthenticateWithCredential, AuthCredential, onAuthStateChanged } from "firebase/auth";

function UserProfile() {
    const auth = getAuth();
    const [wait, finishAwait] = useState(false)
    const user = auth.currentUser;
    const [file, setFile] = useState(PictureIconLarge)
    const [newImage, setNewImage] = useState()
    const [oldPassword, setOldPassword] = useState()
    const [newPassword, setNewPassword] = useState()
    const [confirmPassword, setConfirmPassword] = useState()
    const [userEmail, setEmail] = useState("")
    const [userDisplayName, setDisplayName] = useState("")
    const [newName, setNewName] = useState("")
    const [passwordWait, finishPasswordAwait] = useState(true)

    useEffect(() => {

        onAuthStateChanged(auth, (user) => {
            if (user) {
                //   setLogIn(true)
                setEmail(user.email)
                setDisplayName(user.displayName)
                finishAwait(true)
            } else {
                finishAwait(true)
            }
        });
    });

    // const [userDisplayName, setDisplayName] = useState("")
    // const [userProfileImage = user.photoURL

    // if (userProfileImage) {
    //     // console.log(userProfileImage)
    //     // setFile(userProfileImage)
    // }

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

    function updatePassword(event) {
        event.preventDefault();

        const credential = EmailAuthProvider.credential(
            userEmail,
            oldPassword
        )
            
        reauthenticateWithCredential(user, credential).then(() => {
                console.log("everything is fine")
                console.log("yes")
                if (confirmPassword !== newPassword) {
                    alert("Password do not match.")
                } else {
                    console.log("cool")
                    finishPasswordAwait(false)
                    // updatePassword(user, newPassword).then(() => {
                    //     // Update successful.
                    //     alert("Password updated");
                    //     setOldPassword('');
                    //     setNewPassword('');
                    //     setConfirmPassword('');
                    //     // window.location.reload(false);
                    // }).catch((error) => {
                    //     // An error ocurred
                    //     // ...
                    //     alert("failed to update: " + error)
                    // });
                }

            }).catch((error) => {
                alert("Incorrect password.")
                console.log(error)
            });

        console.log(passwordWait)

        // if (!error) {
        //     if (confirmPassword.length !== 0 && newPassword.length !== 0) {
        //         if (confirmPassword !== newPassword) {
        //             alert("Password do not match.")
        //         } else {
        //             console.log("cool")
        //             updatePassword(user, newPassword).then(() => {
        //             }).then(
        //                 alert("Password updated"),
        //                 setOldPassword(''),
        //                 setNewPassword(''),
        //                 setConfirmPassword('')
        //             ).catch((error) => {
        //                 alert("failed to update: " + error)
        //             });

        //         }
        //     }
        // }
    }

    function changeName(event) {
        event.preventDefault()
        updateProfile(user, {
            displayName: newName,
            // photoURL: newImage ? newImage : null
        }).then(() => {
            alert("Information saved!")
            window.location.reload(false);
        }).catch((error) => {
            alert(error)
        });
    }

    return (
        <div className="main-page-body">
            {(!wait) &&
                <div></div>
            }
            {(wait) &&
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
                        <input className='user-input' placeholder="Name" type="text" defaultValue={userDisplayName}
                            onChange={(e) => {
                                console.log(e.target.value)
                                setNewName(e.target.value)
                            }} required />
                        <input className='user-input' placeholder="Email" type="text" disabled value={userEmail}></input>
                        <button className="info-change-button" onClick={(e) => {
                            /** update photo */
                            changeName(e)
                        }
                        }>Save</button>
                    </form>
                    <form id="password-change" className="user-profile">
                        <p className='profile-header'>Change Password</p>
                        <div>
                            <input className="user-input" placeholder="Old password" type="password" onChange={(e) => {
                                setOldPassword(e.target.value)
                            }} required />
                        </div>
                        <div>
                            <input className="user-input" placeholder="New password" type="password"
                                onChange={(e) => {
                                    setNewPassword(e.target.value)
                                }} required />
                        </div>
                        <div>
                            <input className="user-input" placeholder="Confirm new password" type="password"
                                onChange={(e) => {
                                    setConfirmPassword(e.target.value)
                                }} required />
                        </div>
                        <button className="info-change-button" onClick={(e) => {
                            for (const el of document.getElementById('password-change').querySelectorAll("[required]")) {
                                if (!el.reportValidity()) {
                                    return;
                                }
                            }
                            updatePassword(e)
                        }
                        }>Change</button>
                    </form>
                </div>
            }
        </div>
    );
}

export default UserProfile;