import { formatDateString } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import DeleteButton from "../shared/DeleteButton";
import Favorite from "../shared/FavoriteButton";
import Repost from "../shared/RepostButton";

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
  likes: string[];
  isComment?: boolean;
  profile?: boolean;
  image?: string | null;
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
  isComment,
  profile,
  likes,
  image,
}: props) => {
  return (
    <>
      {profile && (
        <div className="relative">
          <DeleteButton
            currentUserId={currentUserId}
            threadId={id}
            type="user"
          />
        </div>
      )}
      <article
        className={`flex flex-col w-full lg:w-8/12 xl:9/12 md:9/12 border-y-[3px] shadow-xl border-[#262626] rounded-2xl ${
          isComment ? "px-0 ma-sm:px-7 p-1" : "bg-dark-2 p-7 mt-5"
        }`}
      >
        <div className="flex items-start justify-between">
          <div className="flex w-full flex-1 flex-row gap-4">
            <div className="flex flex-col items-center">
              <Link
                href={`/profile/${author.id}`}
                className="relative h-11 w-11"
              >
                <Image
                  fill
                  src={author.image}
                  alt="Profile Image"
                  className="rounded-full cursor-pointer"
                />
              </Link>
              {comments.length > 0 && <div className="thread-card_bar" />}
            </div>
            <div className="flex w-full flex-col">
              <Link href={`/profile/${author.id}`} className="w-fit">
                <h4 className="cursor-pointer text-sm font-semibold">
                  {author.name}
                </h4>
              </Link>
              <p className="mt-2 text-sm ">{content}</p>
              {image && image.length > 0 && (
                <div className="mt-3">
                  <img
                    src={image}
                    alt="Thread Image"
                    className="rounded-md object-cover w-[90%] sm:w-[95%]"
                  />
                </div>
              )}
              <div
                className={`mt-5 flex flex-col gap-3 ${isComment && "mb-10"}`}
              >
                <div className="flex gap-3.5">
                  <Favorite currentUserId={currentUserId} id={id} />

                  <Link
                    href={`/thread/${id}`}
                    className="hover:bg-[#1e1e1e] rounded-full p-1"
                  >
                    <Image
                      src="/assets/reply.svg"
                      alt="heart"
                      width={24}
                      height={24}
                      className="cursor-pointer object-contain"
                    />
                  </Link>
                  <Repost currentUserId={currentUserId} id={id} />

                  <Image
                    src="/assets/share.svg"
                    alt="heart"
                    width={24}
                    height={24}
                    className="cursor-pointer object-contain"
                  />
                </div>
                <div className="flex items-center gap-3">
                  {comments.length > 0 && (
                    <>
                      {comments.map((comment: any, index: number) =>(
                        <div key={`comment-${index}`}>
                          <Image
                            src={comment.author.image || './assets/members.svg'} 
                            width={20}
                            height={20}
                            className="rounded-full object-cover"
                            alt="Reply People Profile"
                          />
                        </div>
                      ))}
                      <Link href={`/thread/${id}`}>
                        <p className="mt-1 text-[15px] text-gray-400 hover:text-neutral-200  ">
                          {comments.length} replies
                        </p>
                      </Link>
                    </>
                  )}
                  {likes.length > 0 && (
                    <p className="mt-1 text-[15px] text-gray-400 hover:text-neutral-200  ">
                      {likes.length} likes
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        {!isComment && community && (
          <Link
            href={`/communities/${community.id}`}
            className="flex items-center p-2 "
          >
            <p className="hover:text-neutral-200 text-gray-500 font-light text-sm transition">
              {formatDateString(createdAt)}
              {community && ` - ${community.name} Community`}
            </p>
            <Image
              src={community.image}
              alt={community.name}
              width={16}
              height={16}
              className="ml-1 rounded-full object-cover"
            />
          </Link>
        )}
      </article>
    </>
  );
};

export default ThreadCard;
