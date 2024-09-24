import React from 'react'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react';
import axios from 'axios';
import "../css/Art.css"

function Art() {
  let { id } = useParams();

  const [ artObject, setArtObject] = useState({});
  const [ listOfComment, setListOfComment] = useState([]);
  const [ newComment, setNewComment] = useState("");

  const [ artistName, setArtistName] = useState("");


  useEffect(() => {
    axios.get(`http://localhost:3001/art/byId/${id}`).then((response) => {
      if(!response.data) {
        setArtObject({});
      } else {
        setArtObject(response.data);
        console.log(response.data.user.username);
        setArtistName(response.data.user.username);
      }
    });

    axios.get(`http://localhost:3001/comment/findByArt/${id}`).then((response) => {
      if(response.data === "No comment found for this art.") {
        setListOfComment([]);
      } else {
        setListOfComment(response.data);
        // console.log(response.data);
      }
    });
  }, [id]);

  const addComment = () => {
    if(localStorage.getItem('status') === false) {
      alert('You Should Log In First');
      return false;
    }
    axios.post(`http://localhost:3001/comment/${id}/${localStorage.getItem('userId')}`, 
      {
        commentBody: newComment
      }
    ).then((response) => {
      if(response.data.error) {
        alert('You Should Log In First');
        console.log(response.data.error);
      } else {
        console.log(response.data);
        console.log('Comment added!!!');
        const commentToAdd = {
          commentBody: newComment, 
          username: response.data.user.username,
        };
        console.log(response.data.id)
        setListOfComment([...listOfComment, commentToAdd]);
        setNewComment("");
        // window.location.reload();
      }
    });
  };

  const addOrder = () => {
    if(localStorage.getItem('status') === false) {
      alert('You Should Log In First');
      return false;
    }
    axios.post(`http://localhost:3001/order/${id}/${localStorage.getItem('userId')}`).then((response) => {
      if(response.data.error) {
        alert('You Should Log In First');
        console.log(response.data.error);
      } else {
        console.log('Add to cart success!!!');
        console.log(response.data);
      }
    });
  };

  // const onDelete = (id) => {
  //   axios.delete(`http://localhost:3001/comment/delete/${id}`).then(() => {
  //     setListOfComment(listOfComment.filter((val) => {
  //       return val.id !== id;
  //     }));
  //   });
  // }

  return (
    <div className='artPost'>
      <div className='postSection'>
        <img  style={{ width: '300px', height: '300px' }} src={`http://localhost:3001/images/`+artObject.img} alt="" />
        <div className="title">ชื่อผลงาน: {artObject.title}</div>
        <div className="price">ราคา: {artObject.price} บาท</div>
        <div className="size">ขนาด: {artObject.size}</div>
        <div className="artist">ผู้วาด: {artistName}</div>
        <div className="desciption">คำบรรยาย: {artObject.description}</div>
      </div>
      <div className='orderSection'>
        {localStorage.getItem('username') !== artistName && <button onClick={addOrder}> Add to Cart </button>}
      </div>
      <div className='commentSection'>
        <div className='addCommentContainer'>
          <input type='text' placeholder='Comment...' autoComplete='off' value={newComment} onChange={(event) => {setNewComment(event.target.value)}}/>
          <button onClick={addComment}> Add Comment </button>
        </div>
        <div className='listOfComment'></div>
        {listOfComment.map((comment, key) => {
          return (
            <div key={key} className='comment'> 
              "{comment.commentBody}"
              <label> Username: {localStorage.getItem('username')}</label>
              {/* {localStorage.getItem('username') === comment.username && <button onClick={() => {onDelete(comment.id)}}> Delete </button>} */}
            </div>
          )
        })}
      </div>
    </div>

  )
}

export default Art;

