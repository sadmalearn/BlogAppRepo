import React from 'react'
import "./HowItWorks.css"

const HowItWorks = () => {
  return (
    <section className="howItWorksContainer">
      <h1>How It Works</h1>
      <p>
        Welcome to MyBlogSite! Our platform is designed to make blogging easy and enjoyable for everyone. Here's how it works:
      </p>
      <ol>
        <li>
          <strong>Create an account:</strong> Sign up to start sharing your thoughts and ideas with the world.
        </li>
        <li>
          <strong>Write your blog:</strong> Use our simple editor to craft engaging posts. Add images, links, and format your text effortlessly.
        </li>
        <li>
          <strong>Publish and share:</strong> Once you're happy with your blog, publish it with a single click and share it on social media.
        </li>
        <li>
          <strong>Explore and interact:</strong> Read blogs from other creators, leave comments, and connect with the community.
        </li>
      </ol>
      <p>
        We’re here to help you tell your story. Happy blogging!
      </p>
    </section>
  )
}

export default HowItWorks
