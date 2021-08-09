import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Blogform from './Blogform'

describe('Blogform', () => {

  test('updates parent state and calls onSubmit', () => {
    const mockCreateBlog = jest.fn()

    const component = render(
      <Blogform createBlog={mockCreateBlog} />
    )

    const form = component.container.querySelector('form')

    const titleInput = component.container.querySelector('input[name="title"]')
    const authorInput = component.container.querySelector('input[name="author"]')
    const urlInput = component.container.querySelector('input[name="url"]')

    const blog = {
      title: 'Dune',
      author: 'Frank Herbert',
      url: 'https://en.wikipedia.org/wiki/Dune_(novel)',
    }

    fireEvent.change(titleInput, {
      target: { value: blog.title }
    })
    fireEvent.change(authorInput, {
      target: { value: blog.author }
    })
    fireEvent.change(urlInput, {
      target: { value: blog.url }
    })
    fireEvent.submit(form)

    expect(mockCreateBlog.mock.calls).toHaveLength(1)

    const entry = mockCreateBlog.mock.calls[0][0]
    expect(entry.title).toBe(blog.title)
    expect(entry.author).toBe(blog.author)
    expect(entry.url).toBe(blog.url)
  })

})
