const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')

const api = supertest(app)

const Blog = require('../models/blog')

const initialBlogs = [  
    {    
        title: 'my blog',
        author: 'me',
        url: 'www.myblog.com/me/',
        likes: 1  
    },  
    {    
        title: 'me & all my friends blog',
        author: 'me & all my friends',
        url: 'www.myblog.com/me&myfriends/',
        likes: 2  
    },
]

beforeEach(async () => {
    await Blog.deleteMany({})
    for (let blog of helper.initialBlogs) {
      let blogObject = new Blog(blog)
      await blogObject.save()
    }
  })

test('correct amount of blog posts is returned', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('a valid blog can be added', async () => {
    const newBlog = {
        title: 'golb',
        author: '???',
        url: 'www.myblog.com/???',
        likes: 123
    }
  
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)
  

      const blogsAtEnd = await helper.blogsInDb()  
      expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
      const contents = blogsAtEnd.map(n => n.title)
  
    expect(contents).toContain(
      'golb'
    )
  })

describe('deletion of a blog', () => {
    test('deletion is successfull and returns 204', async () => {
      const blogsAtStart = await helper.blogsInDb()
      const blogToDelete = blogsAtStart[0]

      await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .expect(204)
  
      const blogsAtEnd = await helper.blogsInDb()
  
      expect(blogsAtEnd).toHaveLength(
        helper.initialBlogs.length - 1
      )
  
      const contents = blogsAtEnd.map(r => r.title)
  
      expect(contents).not.toContain(blogToDelete.title)
    })
})

describe('updating a blog', () => {
    test('updating the number of likes is susccessfull', async () => {
    
      const blogsAtStart = await helper.blogsInDb()
      const blogToUpdate = blogsAtStart[0]
      const newLikes = 12;
      blogToUpdate.likes = newLikes;

      await api
        .put(`/api/blogs/${blogToUpdate.id}`)
        .send(blogToUpdate)
        .expect(200)
  
      const blogsAtEnd = await helper.blogsInDb()
  
      expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
  
      const contents = blogsAtEnd.map(r => r.likes)
  
      expect(contents).toContain(newLikes)
    })
})


afterAll(() => {
    mongoose.connection.close()
    })