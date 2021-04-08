import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
// import { prettyDOM } from '@testing-library/dom'
import Blog from './Blog'
describe('<Blog />', () => {
  let blog = {
    title: 'VS Code Guide',
    author: 'TheHamster',
    url: 'www.vscodeguides.com',
    likes: 4,
    user: {
      username: 'alongCameZeus777',
      name: 'Brunhilde',
      id: '606ada6afa67a7035428475f'
    }
  }

  let user = {
    username: 'alongCameZeus777',
    name: 'Brunhilde',
    id: '606ada6afa67a7035428475f'
  }

  let component

  beforeEach(() => {
    component = render(
      <Blog blog={blog} user={user} />
    )
  })

  test('short version renders the correct content', () => {
    const div = component.container.querySelector('.short')
    expect(div).toHaveTextContent(
      blog.title, blog.author
    )
    expect(div).not.toHaveTextContent(
      blog.url, blog.likes
    )
  })

  test('does not render the extended vesion by default', () => {
    const div = component.container.querySelector('.extended')
    expect(div).toHaveStyle('display: none')
  })

})