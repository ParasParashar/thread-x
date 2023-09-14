"use client"
import Image from "next/image";
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
      <div className="user-card_avatar">
        <div className="relative w-14 h-14 object-cover">
        <Image
          src={imgUrl}
          alt="Logo"
          fill
          className="rounded-full object-cover"
          />
          </div>
        <div className="flex-1 text-ellipsis">
          <div className="font-semibold">{name}</div>
          <p className="text-sm text-gray-600">@{username}</p>
        </div>
      <Button className="user-card_btn "
      onClick={()=>router.push(`/profile/${id}`)}>
        View
      </Button>
      </div>
    </article>
  );
};

export default UserCard;
