import Nav from '@/components/Nav'

const SubmitPage = () => {
  return (
    <div className="bg-base-100 flex flex-col items-center justify-center min-h-screen">
      <div className="flex flex-col space-y-4">
        <input type="text" placeholder="Title" className="input input-bordered w-full max-w-xs" />
        <input
          type="text"
          placeholder="Author(s)"
          className="input input-bordered w-full max-w-xs"
        />
        <input
          type="text"
          placeholder="Journal Name"
          className="input input-bordered w-full max-w-xs"
        />
        <input
          type="text"
          placeholder="Year of publication"
          className="input input-bordered w-full max-w-xs"
        />
        <input
          type="text"
          placeholder="Volume (Optional)"
          className="input input-bordered w-full max-w-xs"
        />

        <input
          type="text"
          placeholder="Pages (Optional)"
          className="input input-bordered w-full max-w-xs"
        />
        <input type="text" placeholder="DOI" className="input input-bordered w-full max-w-xs" />
        <button className="btn btn-primary">Submit</button>
      </div>
      <Nav />
    </div>
  )
}

export default SubmitPage
