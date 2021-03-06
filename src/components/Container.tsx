import { ReactNode } from "react";

type Props = {
  children?: ReactNode;
};

const Container = ({ children }: Props) => (
  <div className="min-h-screen mx-auto px-4 md:max-w-2xl">{children}</div>
);

export default Container;
