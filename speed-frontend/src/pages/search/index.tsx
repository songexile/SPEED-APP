import Nav from '@/components/Nav'

const SearchPage = () => {
  return (
    <div>
      <div className="bg-base-100 flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-4xl font-bold text-center">
          Search Software Engineering methods to find claims.
        </h1>
        <div className="space-y-4 flex flex-col">
          <label className="label mt-4">
            <span className="">Choose a Software Engineering Method</span>
          </label>
          <select className="select select-bordered w-full max-w-xs bg-secondary">
            <option disabled selected>
              Rapid Application Development
            </option>
            <option>Waterfall </option>
            <option>Agile </option>
          </select>
          <input
            type="text"
            placeholder="Start Year"
            className="input input-bordered w-full max-w-xs"
          ></input>
          <input
            type="text"
            placeholder="End Year"
            className="input input-bordered w-full max-w-xs"
          ></input>
          <button className="btn btn-primary">Submit</button>
        </div>
      </div>
      <Nav />
    </div>
  )
}

export default SearchPage
