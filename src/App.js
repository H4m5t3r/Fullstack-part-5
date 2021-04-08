import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)

  const updateBlogList = () => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs.sort((b1, b2) => (b1.likes > b2.likes) ? -1 : 1))
    )
  }

  useEffect(() => {
    updateBlogList()
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
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
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('wrong username or password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    try {
      window.localStorage.removeItem(
        'loggedBlogappUser'
      )
      setUser(null)
    } catch (exception) {
      setErrorMessage('Already logged out')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const addBlog = (blogObject) => {
    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
      })
    setSuccessMessage(
      `a new blog ${blogObject.title} by ${blogObject.author} added`
    )
    setTimeout(() => {
      setSuccessMessage(null)
    }, 5000)
  }

  const addLike = async (blog) => {
    blog.likes += 1
    await blogService.update(blog.id, blog)
    updateBlogList()
  }

  // const handleDeleteBlog = async (blog) => {
  //   await blogService.delete(blog.id)
    
  // }

  const loginForm = () => {
    return (
      <div>
        <h2>Log in to application</h2>
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
      </div>
    )
  }

  const blogForm = () => {
    return (
      <div>
        <h2>blogs</h2>
        <p>
          {user.name} logged in <button
          type="submit" onClick={handleLogout}>logout</button>
        </p>
        <Togglable buttonLabel="create new blog">
          <BlogForm
            createBlog={addBlog}
            user = {user}
          />
        </Togglable>
        <li>
          {blogs.map(blog =>
            <Blog
              key={blog.id}
              blog={blog}
              addLike={() => addLike(blog)}
            />
          )}
        </li>
      </div>
    )
  }

  const ErrorNotification = ({ message }) => {
    if (message === null) {
      return null
    }
  
    return (
      <div className="error">
        {message}
      </div>
    )
  }

  const SuccessNotification = ({ message }) => {
    if (message === null) {
      return null
    }
  
    return (
      <div className="success">
        {message}
      </div>
    )
  }

  return (
    <div>
    <ErrorNotification message={errorMessage} />
    <SuccessNotification message={successMessage} />

    {user === null && loginForm()}
    {user !== null && blogForm()}
    </div>
  )
}

export default App