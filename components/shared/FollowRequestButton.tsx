"use client";

import useFollow from "@/app/hooks/useFollow";
import { useEffect, useState } from "react";
import SmallLoader from "./SmallLoader";

interface Props {
  currentUserId: string;
  followUserId: string;
}

const FolloRequestButton = ({ currentUserId, followUserId }: Props) => {
  const [loading, setLoading] = useState(true);
  const { hasFollowed, toggleFollowed } = useFollow({
    currentUserId,
    followUserId,
  });
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1200);
  }, []);
  return (
    <button onClick={(e: any) => toggleFollowed(e)}>
      {loading ? (
        <div>
          <SmallLoader />
        </div>
      ) : (
        <>
          {hasFollowed ? (
            <span className="unfollow-button">Requested</span>
          ) : (
            <span className="follow-button">Follow</span>
          )}
        </>
      )}
    </button>
  );
};

export default FolloRequestButton;
