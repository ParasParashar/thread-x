
import Image from "next/image";
import Link from "next/link";

interface props {
  id: string;
  currentUserId: string;
  parentId: string | null;
  content: string;
  author: {
    name: string;
    image: string;
    id: string;
  };
  community: {
    id: string;
    name: string;
    image: string;
  } | null;
  createdAt: string;
  comments: {
    author: {
      image: string;
    };
  }[];
  isComment?: boolean;
}

const ThreadCard = ({
  id,
  currentUserId,
  parentId,
  content,
  author,
  community,
  createdAt,
  comments,
  isComment
}: props) => {
  return (
    <article className={`flex flex-col w-full rounded-xl ${isComment?"px-0 ma-sm:px-7":"bg-dark-2 p-7 mt-5"}`}>
      <div className="flex items-start justify-between">
        <div className="flex w-full flex-1 flex-row gap-4">
          <div className="flex flex-col items-center">
            <Link href={`/profile/${author.id}`} className="relative h-11 w-11">
              <Image
                fill
                src={author.image}
                alt="Profile Image"
                className="rounded-full cursor-pointer"
              />
            </Link>
            <div className="thread-card_bar"/>
            </div>
            <div className="flex w-full flex-col">
              <Link href={`/profile/${author.id}`} className="w-fit">
                <h4 className="cursor-pointer text-sm font-semibold">
                  {author.name}
                </h4>
              </Link>
              <p className="mt-2 text-sm ">{content}</p>
              <div className={`mt-5 flex flex-col gap-3 ${isComment && 'mb-10'}`}>
              <div className='flex gap-3.5'>
                <Image
                  src='/assets/heart-gray.svg'
                  alt='heart'
                  width={24}
                  height={24}
                  className='cursor-pointer object-contain'
                />
                <Link href={`/thread/${id}`}>
                  <Image
                    src='/assets/reply.svg'
                    alt='heart'
                    width={24}
                    height={24}
                    className='cursor-pointer object-contain'
                  />
                </Link>
                <Image
                  src='/assets/repost.svg'
                  alt='heart'
                  width={24}
                  height={24}
                  className='cursor-pointer object-contain'
                />
                <Image
                  src='/assets/share.svg'
                  alt='heart'
                  width={24}
                  height={24}
                  className='cursor-pointer object-contain'
                />
              </div>
              {isComment && comments.length > 0 && (
                <Link href={`/thread/${id}`}>
                    <p className="mt-1 text-[15px] text-gray-400  ">{comments.length} replies</p>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
      </article>
  );
};

export default ThreadCard;
