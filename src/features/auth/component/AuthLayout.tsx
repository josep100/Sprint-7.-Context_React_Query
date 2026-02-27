import type { ReactNode } from "react";
import collage from "../../../assets/collage.jpg";

const AuthLayout = ({children, title}: {children: ReactNode, title:string}) => {
  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 bg-linear-to-br from-[#0d253f] via-[#0f2a45] to-[#081c2c]"
      style={{ backgroundImage: `url(${collage})` }}
    >
      <div
        className="
          w-full max-w-md
          bg-white/10
          backdrop-blur-xl
          border border-white/20
          text-white
          p-8
          rounded-2xl
          shadow-2xl
        "
      >
        <h1 className="text-3xl font-bold mb-6 text-center tracking-wide">
          {title}
        </h1>
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
