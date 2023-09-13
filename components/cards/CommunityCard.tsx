import Image from "next/image";
import Link from "next/link";

import { Button } from "../ui/button";
import JoinButton from "../shared/JoinButton";
import { currentUser } from "@clerk/nextjs";
import { fetchUser } from "@/lib/actions/user.actions";
import Community from "@/lib/models/community.model";
import {
  addMemberToCommunity,
  filterMemberFromCommunity,
  removeUserFromCommunity,
} from "@/lib/actions/community.action";
import LeaveButton from "../shared/LeaveButton";
import DeleteButton from "../shared/DeleteButton";

interface Props {
  id: string;
  name: string;
  username: string;
  imgUrl: string;
  bio: string;
  members: {
    image: string;
    _id: string;
  }[];
  deleteShow?: boolean;
}

async function CommunityCard({
  id,
  name,
  username,
  imgUrl,
  bio,
  members,
  deleteShow,
}: Props) {
  const userData = await currentUser();
  if (!userData) return null;
  const result = await fetchUser(userData.id);
  const filterCommunityMember = await filterMemberFromCommunity(id, result._id);
  return (
    <article className="community-card bg-dark-2">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Link href={`/communities/${id}`} className="relative h-12 w-12">
            <Image
              src={imgUrl}
              alt="community_logo"
              width={48}
              height={48}
              className="rounded-full object-cover"
            />
          </Link>

          <div>
            <Link href={`/communities/${id}`}>
              <h4 className="font-semibold text-gray-100">{name}</h4>
            </Link>
            <p className="text-sm text-gray-600">@{username}</p>
          </div>
        </div>
        {deleteShow && <DeleteButton communityId={id} type="community" />}
      </div>
      <div className="flex justify-between flex-wrap items-center">
        <p className="mt-4 text-subtle-medium text-gray-600">{bio}</p>
        {filterCommunityMember ? (
          <LeaveButton id={id} members={result._id} />
        ) : (
          <JoinButton id={id} members={result._id} />
        )}
      </div>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
        <Link href={`/communities/${id}`}>
          <Button size="sm" className="rounded-lg bg-blue-500 px-5 py-1.5">
            View
          </Button>
        </Link>

        {members.length > 0 && (
          <div className="flex items-center">
            {members.map((member, index) => (
              <div
                key={index}
                className="relative w-8 h-8 rounded-full object-cover"
              >
                <Image
                  src={member.image}
                  alt={`user_${index}`}
                  fill
                  className={`${
                    index !== 0 && "-ml-2"
                  } rounded-full object-cover`}
                />
              </div>
            ))}
            <p className="ml-1 text-sm text-gray-600">
              {members.length}+ Users
            </p>
          </div>
        )}
      </div>
    </article>
  );
}

export default CommunityCard;
