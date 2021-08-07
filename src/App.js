import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const LOGIN_DETAILS_STORAGE_KEY = 'loggedBloglistappUser'
  const [newBlogTitle, setNewBlogTitle] = useState('')
  const [newBlogAuthor, setNewBlogAuthor] = useState('')
  const [newBlogUrl, setNewBlogUrl] = useState('')


  useEffect(() => {
    (async () => {
      const blogsFromDb = await blogService.getAll()
      setBlogs(blogsFromDb)
    })()
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem(LOGIN_DETAILS_STORAGE_KEY)
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        LOGIN_DETAILS_STORAGE_KEY, JSON.stringify(user)
      )

      setUser(user)
      setUsername('')
      setPassword('')
      blogService.setToken(user.token)
    } catch (exception) {
      console.error('Wrong credentials')
    }
  }

  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.removeItem(LOGIN_DETAILS_STORAGE_KEY)
    setUser(null)
    blogService.setToken('')
  }

  const createBlog = async (event) => {
    event.preventDefault()
    const blog = {
      title: newBlogTitle,
      author: newBlogAuthor,
      url: newBlogUrl,
    }

    const returnedBlog = await blogService.create(blog)

    setBlogs(blogs.concat(returnedBlog))
    setNewBlogTitle('')
    setNewBlogAuthor('')
    setNewBlogUrl('')
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
          <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
          <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  )

  const createBlogForm = () => (
    <form onSubmit={createBlog}>
      <div>
        title:
          <input
          type="text"
          value={newBlogTitle}
          name="Title"
          onChange={({ target }) => setNewBlogTitle(target.value)}
        />
      </div>
      <div>
        author:
          <input
          type="text"
          value={newBlogAuthor}
          name="Author"
          onChange={({ target }) => setNewBlogAuthor(target.value)}
        />
      </div>
      <div>
        url:
          <input
          type="text"
          value={newBlogUrl}
          name="URL"
          onChange={({ target }) => setNewBlogUrl(target.value)}
        />
      </div>
      <button type="submit">create</button>
    </form>
  )

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        {loginForm()}
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <p>{user.name} logged in <button onClick={handleLogout}>Logout</button></p>
      <h2>create new</h2>
      {createBlogForm()}
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App
