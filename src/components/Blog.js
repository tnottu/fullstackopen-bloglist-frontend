import React, {useState} from 'react'

const Blog = ({blog, updateBlog, removeBlog, user}) => {
  const [visible, setVisible] = useState(false)
  const toggleButtonText = visible ? 'hide' : 'view'

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const detailsStyle = {
    display: visible ? 'block' : 'none',
  }

  const handleLike = () => {
    const updatedBlog = Object.assign({}, blog, {
      likes: blog.likes + 1,
    })
    updateBlog(updatedBlog)
  }

  const handleRemove = () => {
    if (window.confirm(`Remove blog ${blog.title} bt ${blog.user.name}?`)) {
      removeBlog(blog)
    }
  }

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author}
        <button onClick={() => setVisible(!visible)}>{toggleButtonText}</button>
        <div style={detailsStyle}>
          {blog.url}<br />
          {blog.likes} <button onClick={handleLike}>Like</button><br />
          {blog.user.name}<br />
          {blog.user.username === user.username && <button onClick={handleRemove}>remove</button>}
        </div>
      </div>
    </div>
  )
}

export default Blog
