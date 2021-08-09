import React, { useState } from 'react'

const Blog = ({ blog, updateBlog, removeBlog, user }) => {
  const [visible, setVisible] = useState(false)
  const toggleButtonText = visible ? 'hide' : 'view'

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
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
        {visible &&
          <div className="blog-details">
            {blog.url}<br />
            <span className="blog-details-likes-count">{blog.likes}</span> <button onClick={handleLike}>Like</button><br />
            {blog.user.name}<br />
            {(user && user.username === blog.user.username) && <button onClick={handleRemove}>remove</button>}
          </div>
        }
      </div>
    </div>
  )
}

export default Blog
