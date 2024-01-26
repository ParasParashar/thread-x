"use client";
import { filterUserFollow } from "@/lib/actions/user.actions";
import { useEffect, useState } from "react";
import FolloRequestButton from "./FollowRequestButton";
import UnfollowButton from "./UnfollowButton";
import ButtonLoader from "../Loader/ButtonLoader";

type props = {
  currentUserId: string;
  followUserId: string;
};

const FollowAndUnfollow = ({ currentUserId, followUserId }: props) => {
  const [show, setShow] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function getUserNetwork() {
      const data = await filterUserFollow(currentUserId, followUserId);
      setShow(data);
      setLoading(false);
    }
    getUserNetwork();
  }, []);

  return (
    <div>
      {loading ? (
        <div>
          <ButtonLoader />
        </div>
      ) : (
        <>
          {show ? (
            <UnfollowButton
              currentUserId={currentUserId}
              followUserId={followUserId}
            />
          ) : (
            <FolloRequestButton
              currentUserId={currentUserId}
              followUserId={followUserId}
            />
          )}
        </>
      )}
    </div>
  );
};

export default FollowAndUnfollow;
