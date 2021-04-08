import React, { useState } from 'react'

const Blog = ({ blog, addLike, removeBlog, user }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [extendedInfo, setExtended] = useState(false)

  const hideWhenExtended = { display: extendedInfo ? 'none' : '' }
  const showWhenExtended = { display: extendedInfo ? '' : 'none' }

  const toggleVisibility = () => {
    setExtended(!extendedInfo)
  }

  return (
    <div style={blogStyle}>
      <div style ={hideWhenExtended}>
        {blog.title} {blog.author} <button
          onClick={toggleVisibility}>view</button>
      </div>
      <div style={showWhenExtended}>
        <div>
          {blog.title} {blog.author} <button
            onClick={toggleVisibility}>hide</button>
        </div>
        <div>{blog.url}</div>
        <div>
          likes {blog.likes} <button onClick={addLike}
          >like</button>
        </div>
        <div>
          {blog.user.name}
        </div>
        <div>
          {user.username === blog.user.username ?
            <button onClick={removeBlog}>remove</button>
            : null
          }
        </div>
      </div>
    </div>
  )
}

export default Blog