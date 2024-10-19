import React, { useContext, useEffect, useState } from 'react'
import { DUMMY_POSTS } from '../data'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { useNavigate, useParams } from 'react-router-dom'
import { UserContext } from '../context/userContext'
import axios from 'axios'

const EditPost = () => {

  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('')
  const [description, setDescription] = useState('')
  const [thumbnail, setThumb] = useState('')
  const [error,setError] = useState('')

  const navigate = useNavigate()
  const {id} = useParams()

  const {currentUser} = useContext(UserContext)
  const token = currentUser?.token

  //redirect to login page for any user
  useEffect(() =>{
    if(!token){
      navigate('/login')
    }
  }, [])

  const modules = {
    toolbar: [
      [{'header' : [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
      ['link', 'image'],
      ['clean']
    ]
  }

    const formats = [
      'header',
      'bold', 'italic', 'underline', 'strike', 'blockquote',
      'list', 'bullet', 'indent',
      'link', 'image'
    ]


    const POST_CATEGORIES = ["Houseplants", "Flower Legends", "Art", "Invesment"]


    useEffect(() =>{
      const getPost = async () => {
        try {
          const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/posts/${id}`)
          setTitle(response.data.title)
          setDescription(response.data.description)
          setCategory(response.data.category)
        } catch (err) {
          console.log(err)
        }
      }
      getPost();
    }, [id])

    const editPost = async (e) => {
      e.preventDefault();
      const postData = new FormData();
      postData.set('title', title);
      postData.set('category', category);
      postData.set('description', description);
      postData.set('thumbnail', thumbnail);
    
      try {
        const response = await axios.patch(
          `${process.env.REACT_APP_BASE_URL}/posts/${id}`,
          postData,
          {
            withCredentials: true,
            headers: { Authorization: `Bearer ${token}` }
          }
        );
        if (response.status === 200) {
          navigate(`/posts/${id}`);
        }
      } catch (err) {
        setError(err.response?.data?.message || 'Something went wrong');
      }
    }

  return (
    <section className='create-post'>
      <div className="container">
        <h2 className='center'>Edit post</h2>
        {error && <p className='form__error-message'>{error}</p>}
        <form className="form create__post-form" onSubmit={editPost}>
          <input type="text" placeholder='Title' value={title} onChange={e => setTitle(e.target.value)} autoFocus/>
          <select name="category" value={category} onChange={e => setCategory(e.target.value)}>
            {
              POST_CATEGORIES.map(cat => <option key={cat}>{cat}</option>)
            }
          </select>
          <ReactQuill modules={modules} formats={formats} value={description} onChange={setDescription} />
            <input type="file" onChange={e => setThumb(e.target.files[0])} accept='png, jpg, jpeg, svg' />
            <button type="submit" className='btn primary'>Update</button>
        </form>
      </div>
    </section>
  )
}

export default EditPost