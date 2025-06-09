import React, { useEffect, useState } from "react";

const Header = () => {
  return (
    <div>
      <div className="h-20 bg-stone-900 relative z-10 p-4 opacity-99">
        <img
          className="w-16 ml-20"
          src="https://img.hotstar.com/image/upload/v1737554969/web-assets/prod/images/rebrand/logo.png"
        />
      </div>
    </div>
  );
};

export default Header;
