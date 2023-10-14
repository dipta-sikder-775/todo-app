// import tickImage from '../assets/images/double-tick.png';
// import noteImage from "../assets/images/notes.png";
// import plusImage from "../assets/images/plus.png";
import { HiOutlineSearch } from "react-icons/hi";
import { CgAdd } from "react-icons/cg";

export default function Header() {

  return (
    <div>
      <form
        className="flex items-center rounded-md bg-gray-100 px-4 py-4"
        onSubmit={()=>{}}
      >
        <img
          src="/assets/images/notes.svg"
          className="h-6 w-6"
          alt="Notes icon"
        />

        <input
          type="text"
          placeholder="Type your todo"
          className="w-full border-none bg-gray-100 px-4 py-1 text-lg text-gray-800 outline-none placeholder:text-gray-600"
          value={input}
          onChange={handleInput}
          required
        />

        <button
          type="submit"
          // className={`h-8 w-8 appearance-none bg-[url('/assets/images/plus.png')] bg-contain bg-no-repeat`}
        >
          <CgAdd className="ml-1 h-8 w-8" />
          <span className="sr-only">submit</span>
        </button>
      </form>

      <ul className="my-4 flex justify-between text-xs text-gray-500">
        <li className="flex cursor-pointer space-x-1" onClick={()=>{}}>
          <img
            className="h-4 w-4"
            src="/assets/images/double-tick.svg"
            alt="Complete"
          />

          <div className="relative">
            <span className="group">
              Complete All Tasks
              <div className="absolute -left-12 -top-20 hidden w-[300px] bg-white p-4 shadow-md group-hover:block">
                This option is not supported by json-server.
                <br />
                So implemented by loop
              </div>
            </span>
          </div>
        </li>

        <li className="cursor-pointer" onClick={()=>{}}>
          <div className="relative">
            <span className="group">
              Clear completed
              <div className="absolute -left-12 -top-20 hidden w-[300px] bg-white p-4 shadow-md group-hover:block">
                This option is not supported by json-server.
                <br />
                So implemented by loop
              </div>
            </span>
          </div>
        </li>
      </ul>

      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center rounded-l-md bg-indigo-600 px-3">
          <HiOutlineSearch className="h-5 w-5 text-white" />
        </div>

        <input
          type="search"
          className="block w-full rounded-r-md border border-gray-300 bg-gray-100 p-2.5 pl-12 text-sm text-gray-900 outline-none focus:ring-violet-600"
          placeholder="Search your todo here"
          onChange={handleSearch}
        />
      </div>
    </div>
  );
}
