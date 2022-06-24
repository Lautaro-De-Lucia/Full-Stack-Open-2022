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

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
  }

module.exports = {
    initialBlogs,
    blogsInDb
  }