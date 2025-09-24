import avatar from "../../public/avatar3-1.svg";
import datascan from "../assets/datascan.svg";
// BACKGROUND IMAGE: frontend/src/assets/Page4.svg
import { Tag } from "./Tag";
export const Background = () => {
  return (
    <div className="w-screen h-full bg-[#000]">
      {/* <img
        src={datascan}
        alt="datascan"
        className="absolute bottom-1/7 right-1/6 transform -translate-x-1/2 -translate-y-1/2 w-[200px]"
      />
      <img
        src={datascan}
        alt="datascan"
        className="absolute top-1/6 right-1/6 transform -translate-x-1/2 -translate-y-1/2 w-[200px]"
      />
      <img
        src={datascan}
        alt="datascan"
        className="absolute top-1/3 left-1/5 transform -translate-x-1/2 -translate-y-1/2 w-[200px] scale-x-[-1]"
      /> */}

      {/* <img
          src={avatar}
          alt="avatar"
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[700px]"
        /> */}
        <Tag />
        
    </div>
  );
};
