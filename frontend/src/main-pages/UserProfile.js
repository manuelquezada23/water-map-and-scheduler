import React from 'react';
import PictureIconLarge from '../picture-large.png'
import './main-pages.css'
import { useNavigate, useLocation } from "react-router-dom";

function UserProfile() {
    const navigate = useNavigate();
    return (
        <div className="main-page-body">
            <div className="user-profile-box">
                <div className="user-profile">
                    <p className='profile-header'>My Profile</p>
                    <img className="profile-image" src={PictureIconLarge}></img>
                    <input className='user-input' defaultValue="Emily Hinds" type="text"/>
                    <input className='user-input' defaultValue="emily_hinds@brown.edu" type="text"/>
                    <button className="info-change-button">Save</button>
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
            <div>
                <button className="profile-edit-save-button">Save</button>
            </div>
        </div>
    );
}

export default UserProfile;