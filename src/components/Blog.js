import React, {useState} from 'react'

const Blog = ({blog, updateBlog}) => {
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

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author}
        <button onClick={() => setVisible(!visible)}>{toggleButtonText}</button>
        <div style={detailsStyle}>
          {blog.url}<br />
          {blog.likes} <button onClick={handleLike}>Like</button><br />
          {blog.user.name}
        </div>
      </div>
    </div>
  )
}

export default Blog
