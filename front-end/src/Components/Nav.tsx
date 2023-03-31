import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <>
      <nav className="text-5xl font-extrabold gap-12 fixed top-0 w-screen h-24 flex items-center justify-center z-10 text-slate-100">
        <Link to={"/upload"}>Upload Image</Link>
        <Link to={"/images"}>View Images</Link>
      </nav>
    </>
  );
};

export default Nav;
