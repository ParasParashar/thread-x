import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
interface props{
    image:string;
    name:string;
    paramId:string;
}
const ChatHeader = ({image,name,paramId}:props) => {
  return (
    <nav className="bg-[#272727] p-1">
        <div className="flex items-center gap-2">
          <div className="relative h-14 w-14 object-cover">
            <Link href={`/profile/${paramId}`}>
              <Image
                src={image}
                fill
                alt="Profile Image"
                className="rounded-full object-contain"
              />
            </Link>
          </div>
          <Link href={`/profile/${paramId}`}>
            <h2 className="text-left text-sm font-semibold">{name}</h2>
          </Link>
        </div>
      </nav>
  )
}

export default ChatHeader
