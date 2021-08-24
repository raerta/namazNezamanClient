import React from "react";

const Layout = ({ children }) => {
  return (
    <div className="w-full homeBg h-full flex-1 items-center justify-center">
      <div className="bg-gradient-to-b from-black to-transparent">
       

        {children}

        
      </div>
     
    </div>
  );
};

export default Layout;
