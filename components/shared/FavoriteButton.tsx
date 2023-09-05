"use client";
import useFavorite from "@/app/hooks/useFavorite";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import React, { useState } from "react";

type props = {
  currentUserId: string;
  id: string;
};

const Favorite = ({ currentUserId, id }: props) => {
  const [isScaling, setIsScaling] = useState(false);
  const { hasFavorited, toggleFavorite } = useFavorite({ currentUserId, id });

  const handleButtonClick = (e: React.MouseEvent<HTMLDivElement>) => {
      toggleFavorite(e);
      setIsScaling(true);
    setTimeout(() => {
      setIsScaling(false);
    }, 500); 
  };

  return (
    <div
      onClick={handleButtonClick}
      className="hover:bg-[#1e1e1e] relative rounded-full cursor-pointer p-1"
    >
      <AiOutlineHeart size={24} className="fill-[#56567b]" />
      <AiFillHeart
        onClick={(e: any) => handleButtonClick(e)}
        size={20}
        className={`
        absolute top-[6.1px] right-[5.6px]
        ${hasFavorited ? "text-rose-500" : "text-[#090909]"}
        ${
          isScaling
            ? "transform scale-150 transition-transform duration-200"
            : ""
        }
        `}
      />
    </div>
  );
};

export default Favorite;
