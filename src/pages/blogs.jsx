import Head from 'next/head'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function Home() {

  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    // fetch data from API
    fetch("/api/blogs/articles")
      .then(res => res.json())
      .then(data => {
        // do something with data
        console.log(data)
        setBlogs(data)
      })
  }, [])

  return (
    <>
      <Head>
        <title>Blogs</title>
      </Head>
      <h1>Blogs</h1>
      <ul>
        {
          blogs.map(blog => {
            return (
              <Link href={`/blogs/${blog._id}`}>
                <li key={blog._id}> {blog.title}</li>
              </Link>
            )
          })
        }
      </ul>
      <p>
      </p>

    </>
  )
}
