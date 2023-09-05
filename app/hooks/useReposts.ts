
import { filterUserRepost } from "@/lib/actions/user.actions";
import axios from "axios";
import { redirect, useRouter } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";

type props = {
    currentUserId: string;
    id: string;
}

const useRepost = ({ currentUserId, id }: props) => {
    const data = { currentUserId, id }
    const router = useRouter();
    const [hasReposts, setHasReposts] = useState(false);

    useEffect(() => {
        async function checkFavorite() {
            try {
                if (!currentUserId) {
                    redirect("/sign- in");
                    return;
                }
                setHasReposts(false);

                const hasThreadRepost = await filterUserRepost(currentUserId, id);
                setHasReposts(hasThreadRepost);
            } catch (error) {
                console.error('Error checking favorite:', error);
            }
        }
        checkFavorite();
    }, [currentUserId, id]);
    const toggleReposts = useCallback(async (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
        try {
            if (!currentUserId) {
                redirect("/sign-in");
                return;
            }

            let request;
            if (hasReposts) {
                request = () => axios.delete('/api/reposts', { data })
            router.refresh();
            } else {
                request = () => axios.post('/api/reposts', data)
            router.refresh();
            }
            await request();
            setHasReposts(!hasReposts);
            router.refresh();
        } catch (error: any) {
            throw new Error(`Something Went Wrong: ${error.message}`);
        }
    }, [currentUserId, hasReposts, id, router]);

    return {
        hasReposts,
        toggleReposts
    };
}

export default useRepost;
