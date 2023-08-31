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
        <Image
          src={imgUrl}
          alt="Logo"
          width={48}
          height={48}
          className="rounded-full"
        />
        <div className="flex-1 text-ellipsis">
          <div className="font-semibold">{name}</div>
          <p className="text-sm text-gray-700">@{username}</p>
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
