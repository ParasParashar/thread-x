"use client";

import { Link } from "lucide-react";
import Image from "next/image";

type props = {
  image: string;
  name: string;
};
const ActivityCard = ({ image, name }: props) => {
  return (
    <article className="activity-card">
      <Image
        src={image}
        alt="Profile Photo"
        width={24}
        height={24}
        className="rounded-full object-contain"
      />
      <p className="text-sm">
        <span className="text-blue-500">{name}</span>
        {"     "}
        replied to your thread.
      </p>
    </article>
  );
};

export default ActivityCard;
