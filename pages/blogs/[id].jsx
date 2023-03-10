import Head from "next/head"

// Step 2: This component is rendered from the server (Server-Side Rendering) SSR
export default function Blog({ blog }) {
  console.log('blog 2', blog)
  return (
    <>
      <Head>
        <title>{blog.title}</title>
      </Head>
      <h1>{blog.title}</h1>
      <p>{blog.content}</p>
    </>
  )
}

// STEP 1: This function will be executed at the server before loading the page.
export async function getServerSideProps({ params }) {
  console.debug('params', params)
  const res = await fetch(`http://localhost:3000/api/blogs/articles/${params.id}`)
  const blog = await res.json()
  console.debug('blog 1', blog)
  return { props: { blog } }
}