import React, { ReactNode } from "react";

type Props = {
  children?: ReactNode;
  title?: string;
};

const Layout = ({ children, title = "This is the default title" }: Props) => (
  <div className="mx-auto md:max-w-3xl">
    {children}
    <footer className="absolute bottom-2 text-gray-700">
      © {new Date().getFullYear()} By Rory
    </footer>
  </div>
);

export default Layout;
