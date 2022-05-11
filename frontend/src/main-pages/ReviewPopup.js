import React from 'react';
import PictureIcon from '../picture.png'

function ReviewPopup() {
  function sendReview() {
    //loads reviews
    fetch('http://localhost:4567/get-sql-rs', {
      method: 'POST',
      body: JSON.stringify({ sql: "SELECT * FROM reviews" }),
      headers: {
        "Access-Control-Allow-Origin": "*"
      },
    }).then((response) => response.json())
  }

  return (
    <div className="main-page-body">
      <div className='popup-box'>
        <div className='review-popup'>
          <p className="building-name">Sciences Library</p>
          <div className='author-box'>
            <img className="review-image" src={PictureIcon}></img>
            <div className="stars">
              <p className="author">Jane Doe</p>
              {/* <p className="author">stars</p> */}
              <p>star rating</p>
            </div>
          </div>
          <textarea className="review-box" placeholder="What did you think?" type="text" required />
          <div className="review-submit">
            <button className="review-submit-button" onClick={(e)=>{
              e.preventDefault()
              sendReview();
            }}>Post</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReviewPopup;