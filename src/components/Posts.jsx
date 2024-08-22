import React, { useState } from 'react'
import PostItem from './PostItem'
import Thumbnail1 from '../images/logo.svg'

const DUMMY_POSTS = [{
    id:'1',
    thumbnail: Thumbnail1,
    category:'education',
    title: 'Blog 1',
    desc: 'This is the blog post about education',
    authorID: 1
},
{
    id:'2',
    thumbnail: Thumbnail1,
    category:'science',
    title: 'Blog 2',
    desc: 'This is the blog post about science',
    authorID: 1
},
{
    id:'3',
    thumbnail: Thumbnail1,
    category:'weather',
    title: 'Blog 3',
    desc: 'This is the blog post about weather and Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    authorID: 1
}]

const Posts = () => {
    const [posts, setPosts] = useState(DUMMY_POSTS)

  return (

    <section className='posts'>
        <div className="container posts__container">
            {
                posts.map(({id, thumbnail, category, title, desc, authorID}) => <PostItem key={id} postID={id} thumbnail={thumbnail} category={category} title={title} description={desc} authorID={authorID} />)
            }
        </div>
    </section>
  )
}

export default Posts