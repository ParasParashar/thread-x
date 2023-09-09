import { filterUserFollow} from "@/lib/actions/user.actions";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";

type props = {
    currentUserId: string;
    followUserId: string;
}

const useFollow = ({ currentUserId, followUserId }: props) => {
    const data = {currentUserId,followUserId}
    const router = useRouter();
    const [hasFollowed, sethasFollowed] = useState(false);

    useEffect(() => {
        async function checkFavorite () {
            try {
                if (!currentUserId) {
                router.push('/sign-in')
                    return;
                }
                sethasFollowed(false);
    
                const hasFollows = await filterUserFollow(currentUserId, followUserId);
                sethasFollowed(hasFollows);
            } catch (error) {
                console.error('Error checking favorite:', error);
            }
        }
    
        checkFavorite();
    }, [currentUserId, followUserId]);
    const toggleFollowed= useCallback(async (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
        try {
            if (!currentUserId) {
                router.push('/sign-in')
                return;
            }

            let request;
            if (hasFollowed) {
                request = ()=>axios.delete('/api/follow',{data})
                router.refresh();
            } else {
                request = ()=>axios.post('/api/follow',data)
                router.refresh();
            }
                await request(); 
                sethasFollowed(!hasFollowed);
                router.refresh();
        }  catch (error:any) {
            throw new Error(`Something Went Wrong: ${error.message}`);
        }
    }, [currentUserId, hasFollowed, followUserId, router]);

    return {
        hasFollowed,
        toggleFollowed
    };
}

export default useFollow;

