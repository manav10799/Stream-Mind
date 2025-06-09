import React from "react";
import { LOGIN_IMAGE_PREFIX, uniqueParts } from "../utils/constants";

const LoginPageImageTransition = () => {
  return (
    <div>
      <div className="relative top-0">
        <div className="absolute top-0 left-0 w-full h-[100vh] z-10 pointer-events-none overlay-gradient-blur"></div>
        <div className="flex flex-wrap w-1/2 transition-images p-10 relative">
          {uniqueParts.map((un, i) => (
            <img
              src={LOGIN_IMAGE_PREFIX + un}
              alt="login_preview_images"
              key={i}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default LoginPageImageTransition;
