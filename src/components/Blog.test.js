import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog />', () => {
  let component
  const blog = {
    title: 'Excession',
    author: 'Iain M. Banks',
    likes: 7,
    url: 'https://en.wikipedia.org/wiki/Excession',
    user: {
      username: 'teppotestaaja',
      name: 'Teppo Testaaja',
    },
  }

  beforeEach(() => {
    component = render(
      <Blog blog={blog} />
    )
  })

  test('at start renders title and author', () => {
    expect(component.container).toHaveTextContent('Excession')
    expect(component.container).toHaveTextContent('Iain M. Banks')
  })

  test('at start does not render url or likes', () => {
    expect(component.container.querySelector('.blog-details-likes-count')).toBeNull()
    expect(component.container).not.toHaveTextContent('https://en.wikipedia.org/wiki/Excession')
  })

  test('after clicking the button, render url and likes', () => {
    const viewButton = component.container.querySelector('.blog-details-toggle')
    fireEvent.click(viewButton)
    expect(component.container.querySelector('.blog-details-likes-count')).toHaveTextContent('7')
    expect(component.container).toHaveTextContent('https://en.wikipedia.org/wiki/Excession')
  })

  test('multiple like-button clicks call event handler same amount', () => {
    const mockHandler = jest.fn()

    component = render(
      <Blog blog={blog} updateBlog={mockHandler} />
    )

    const viewButton = component.container.querySelector('.blog-details-toggle')
    fireEvent.click(viewButton)

    const likeButton = component.getByText('Like')
    fireEvent.click(likeButton)
    fireEvent.click(likeButton)

    expect(mockHandler.mock.calls).toHaveLength(2)
  })
})
