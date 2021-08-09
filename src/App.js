import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const LOGIN_DETAILS_STORAGE_KEY = 'loggedBloglistappUser'
  const [notificationMessage, setNotificationMessage] = useState(null)
  const blogFormRef = useRef()

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
      setNotificationMessage({ text: 'Wrong username or password', type: 'error'})
      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000)
    }
  }

  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.removeItem(LOGIN_DETAILS_STORAGE_KEY)
    setUser(null)
    blogService.setToken('')
  }

  const createBlog = async (newBlog) => {
    blogFormRef.current.toggleVisibility()
    const returnedBlog = await blogService.create(newBlog)
    setBlogs(blogs.concat(returnedBlog))
    setNotificationMessage({ text: `A new blog ${returnedBlog.title} by ${returnedBlog.author} added`})
    setTimeout(() => {
      setNotificationMessage(null)
    }, 5000)
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
    <Togglable buttonLabel="create new blog" ref={blogFormRef}>
      <BlogForm createBlog={createBlog} />
    </Togglable>
  )

  return (
    <>
      <Notification message={notificationMessage} />

      {user === null

        ? <div>
            <h2>Log in to application</h2>
            {loginForm()}
          </div>

        : <div>
            <h2>blogs</h2>
            <p>{user.name} logged in <button onClick={handleLogout}>Logout</button></p>
            {createBlogForm()}
            {blogs.map(blog =>
              <Blog key={blog.id} blog={blog} />
            )}
          </div>
        }
    </>
  )
}

export default App
