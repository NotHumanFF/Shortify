import React from 'react'

const notfound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <h1 className="text-7xl font-bold mb-8 text-center text-neutral">URL not found</h1>
        <a className='link text-primary' href="http://localhost:3000">Go to Home page</a>
    </div>
)
}

export default notfound