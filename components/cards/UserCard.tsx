"use client"
import Image from "next/image";
import { FiExternalLink } from "react-icons/fi";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

interface props {
  id: string;
  name: string;
  username: string;
  imgUrl: string;
  personType: string;
}
const UserCard = ({ id, name, username, imgUrl, personType }: props) => {
    const router = useRouter();
  return (
    <article className="user-card">
      <div 
      onClick={()=>router.push(`/profile/${id}`)}
      className="user-card_avatar">
        <div className="relative w-14 h-14 object-cover">
        <Image
          src={imgUrl}
          alt="Logo"
          fill
          className="rounded-full object-cover cursor-pointer"
          />
          </div>
        <div className="flex-1 text-ellipsis cursor-pointer">
          <div className="font-semibold">{name}</div>
          <p className="text-sm text-gray-600">@{username}</p>
        </div>
        </div>
      <div className="user-card_btn "
      onClick={()=>router.push(`/profile/${id}`)}>
 <FiExternalLink size={20} />
       </div>
    </article>
  );
};

export default UserCard;
