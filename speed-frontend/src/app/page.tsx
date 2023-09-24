import Image from 'next/image'
import Nav from '../components/Nav'

export default function Home() {
  return (
    <div className="bg-base-100  flex flex-col items-center justify-center min-h-screen  ">
      <h1 className="text-6xl font-bold text-center">Welcome to SPEED!</h1>
      <p className="text-center">
        The best place to find true{' '}
        <span className="bg-secondary font-bold"> software engineering claims! </span>
      </p>
      {/* Buttons */}
      <div className="flex flex-col mt-16 w-1/3 sm:w-1/6 space-y-4">
        <button className="btn btn-primary">Login 🔍</button>
        <button className="btn btn-secondary">Create an Account ⭐</button>
      </div>
      <Nav />
    </div>
  )
}
