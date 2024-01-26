"use client";
import useFavorite from "@/app/hooks/useFavorite";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import React, { useEffect, useState } from "react";

type props = {
  currentUserId: string;
  id: string;
};

const Favorite = ({ currentUserId, id }: props) => {
  const [isScaling, setIsScaling] = useState(false);
  const [check, setCheck] = useState(false);
  const { hasFavorited, toggleFavorite } = useFavorite({ currentUserId, id });

  useEffect(() => {
    setCheck(hasFavorited);
  }, [hasFavorited]);

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
      {check ? (
        <AiFillHeart
          onClick={(e: any) => handleButtonClick(e)}
          size={24}
          className={`
        text-rose-500
        ${
          isScaling
            ? "transform scale-[2] transition-transform duration-200"
            : ""
        }
        `}
        />
      ) : (
        <AiOutlineHeart
          size={24}
          className={`
      text-[#56567b]
      ${
        isScaling ? "transform scale-150 transition-transform duration-200" : ""
      }
      `}
        />
      )}
    </div>
  );
};

export default Favorite;
