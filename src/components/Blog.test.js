import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
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
})
