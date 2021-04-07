import React, {useState} from 'react'
const Blog = ({ blog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [showAllInfo, setVisible] = useState(false)

  const hideWhenVisible = { display: showAllInfo ? 'none' : '' }
  const showWhenVisible = { display: showAllInfo ? '' : 'none' }

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author}
      </div>
    </div>
  )
}

export default Blog