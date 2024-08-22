import React from 'react'
import { Link } from 'react-router-dom'
import Avatar from "../images/pp.png"

const PostAuthor = () => {
  return (
    <Link to={`/posts/users/os`} className='post__author'>
        <div className="post__author-avatar">
            <img src={Avatar} alt="" />
        </div>
        <div className="post__author-details">
            <h5>By: OSMAN</h5>
            <small>Developer</small>
        </div>
    </Link>
  )
}

export default PostAuthor