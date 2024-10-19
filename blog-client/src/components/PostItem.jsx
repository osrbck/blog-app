import React from 'react'
import { Link } from 'react-router-dom'
import PostAuthor from './PostAuthor'

const PostItem = ({postID, category, title, description, authorID, thumbnail, createdAt}) => {

    const postDescription = description.length > 120 ? description.substr(0, 120) + "..." : description;
    const postTitle = title.length > 30 ? title.substr(0, 30) + "..." : title;

  return (
    <article className="post container-posts">
        <div className="post__thumbnail">
        <img 
            src={`${process.env.REACT_APP_ASSETS_URL}/uploads/${thumbnail}`} 
            alt={title} 
            style={{ height: '300px', width: '400px', objectFit: 'cover', borderRadius: '.8rem' }} 
            />
        </div>
        <div className="post__content">
            <Link to={`/posts/${postID}`}>
                <h3>{postTitle}</h3>
            </Link>
            <p dangerouslySetInnerHTML={{__html: postDescription}}/>
            <div className="post__footer">
                <PostAuthor authorID={authorID} createdAt={createdAt} />
                <Link to={`/posts/categories/${category}`} className='btn category'>{category}</Link>
            </div>
        </div>
    </article>
  )
}

export default PostItem