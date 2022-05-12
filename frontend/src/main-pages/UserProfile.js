import React, { useState, useEffect } from 'react';
import './main-pages.css'
import { EmailAuthProvider, getAuth, updateProfile, updatePassword, reauthenticateWithCredential, AuthCredential, onAuthStateChanged } from "firebase/auth";


function UserProfile() {
    const auth = getAuth();
    const [wait, finishAwait] = useState(false)
    const user = auth.currentUser;
    const [oldPassword, setOldPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [userEmail, setEmail] = useState("")
    const [userDisplayName, setDisplayName] = useState("")
    const [newName, setNewName] = useState("")

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setEmail(user.email)
                setDisplayName(user.displayName)
                finishAwait(true)
            } else {
                finishAwait(true)
            }
        });
    });

    function updatePasswordClick() {
        const credential = EmailAuthProvider.credential(
            userEmail,
            oldPassword
        )

        reauthenticateWithCredential(user, credential).then(() => {
            if (confirmPassword !== newPassword) {
                alert("New passwords do not match.")
                setConfirmPassword('');
            } else {
                updatePassword(user, newPassword).then(() => {
                    const sqlCommand = "UPDATE users SET Key = '" + newPassword + "' WHERE UserID = '" + user.uid + "';";

                    const postParameters = {
                        sql: sqlCommand
                    }

                    fetch('http://localhost:4567/get-sql-rs', {
                        method: 'POST',
                        body: JSON.stringify(postParameters),
                        headers: { 'Access-Control-Allow-Origin': '*' },
                    }).then(() => {
                        alert("New password has been set!")
                        setOldPassword('');
                        setNewPassword('');
                        setConfirmPassword('');
                    }).catch((error) => console.error("Error:", error))
                }).catch((error) => {
                    alert("failed to update: " + error)
                });
            }

        }).catch((error) => {
            alert("Current password is incorrect.")
            setOldPassword('');
            setNewPassword('');
            setConfirmPassword('');
        });
    }

    function changeName(event) {
        event.preventDefault()
        updateProfile(user, {
            displayName: newName,
            // photoURL: newImage ? newImage : null
        }).then(() => {
            const sqlCommand = "UPDATE users SET Name = '" + newName + "' WHERE UserID = '" + user.uid + "';";

            const postParameters = {
                sql: sqlCommand
            }

            fetch('http://localhost:4567/get-sql-rs', {
                method: 'POST',
                body: JSON.stringify(postParameters),
                headers: { 'Access-Control-Allow-Origin': '*' },
            }).then(() => {

            }).catch((error) => console.error("Error:", error))

            const sqlCommandTwo = "UPDATE reviews SET Name = '" + newName + "' WHERE UserID = '" + user.uid + "';";

            const postParametersTwo = {
                sql: sqlCommandTwo
            }

            fetch('http://localhost:4567/get-sql-rs', {
                method: 'POST',
                body: JSON.stringify(postParametersTwo),
                headers: { 'Access-Control-Allow-Origin': '*' },
            }).then(() => {
                alert("Information saved!")
                window.location.reload(false);
            }).catch((error) => console.error("Error:", error))
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
                        <input className='user-input' placeholder="Name" type="text" defaultValue={userDisplayName}
                            onChange={(e) => {
                                setNewName(e.target.value)
                            }} required />
                        <input className='user-input' placeholder="Email" type="text" disabled value={userEmail}></input>
                        <button className="info-change-button" type="button" onClick={(e) => {
                            changeName(e)
                        }
                        }>Save</button>
                    </form>
                    <form id="password-change" className="user-profile">
                        <p className='profile-header'>Change Password</p>
                        <div>
                            <input className="user-input" placeholder="Old password" type="password" value={oldPassword} onChange={(e) => {
                                setOldPassword(e.target.value)
                            }} required />
                        </div>
                        <div>
                            <input className="user-input" placeholder="New password" value={newPassword} type="password"
                                onChange={(e) => {
                                    setNewPassword(e.target.value)
                                }} required />
                        </div>
                        <div>
                            <input className="user-input" placeholder="Confirm new password" value={confirmPassword} type="password"
                                onChange={(e) => {
                                    setConfirmPassword(e.target.value)
                                }} required />
                        </div>
                        <button className="info-change-button" type="button" onClick={() => {
                            for (const el of document.getElementById('password-change').querySelectorAll("[required]")) {
                                if (!el.reportValidity()) {
                                    return;
                                }
                            }
                            updatePasswordClick()
                        }
                        }>Change</button>
                    </form>
                </div>
            }
        </div>
    );
}

export default UserProfile;