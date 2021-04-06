import React, {useState} from 'react'

const BlogForm = ({ createBlog }) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')
  
    const handleTitleChange = (event) => {
      setTitle(event.target.value)
    }

    const handleAuthorChange = (event) => {
        setAuthor(event.target.value)
      }

      const handleUrlChange = (event) => {
        setUrl(event.target.value)
      }
  
    const handleAddBlog = (event) => {
      event.preventDefault()
      createBlog({
        title: title,
        author: author,
        url: url,
        userId: event.user.id
      })
  
      setTitle('')
      setAuthor('')
      setUrl('')
    }

    return (
      <div>
        <h2>create new</h2>
        <form onSubmit={handleAddBlog}>
        <div>
            title:
            <input
            type="text"
            value={title}
            name="Title"
            onChange={({ target }) => setTitle(target.value)}
            />
            </div>
            <div>
            author:
            <input
            type="text"
            value={author}
            name="Author"
            onChange={({ target }) => setAuthor(target.value)}
            />
            </div>
            <div>
            url:
            <input
            type="text"
            value={url}
            name="Url"
            onChange={({ target }) => setUrl(target.value)}
            />
            </div>
        <button type="submit">create</button>
        </form>
      </div>
    )
  }
  
  export default BlogForm