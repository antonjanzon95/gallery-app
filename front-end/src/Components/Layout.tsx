import { ReactNode } from "react";
import Nav from "./Nav";

interface Props {
  children: ReactNode;
}

const Layout: React.FC<Props> = ({ children }) => {
  return (
    <>
      <Nav />
      <section className="w-screen min-h-screen bg-gray-900 flex justify-center text-slate-100 pt-32">
        {children}
      </section>
    </>
  );
};

export default Layout;
