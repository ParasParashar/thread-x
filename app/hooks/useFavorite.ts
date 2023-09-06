import { filterUserFavorite} from "@/lib/actions/user.actions";
import axios from "axios";
import { redirect, useRouter } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";

type props = {
    currentUserId: string;
    id: string;
}

const useFavorite = ({ currentUserId, id }: props) => {
    const data = {currentUserId,id}
    const router = useRouter();
    const [hasFavorited, setHasFavorited] = useState(false);

    useEffect(() => {
        async function checkFavorite () {
            try {
                if (!currentUserId) {
                router.push('/sign-in')
                    return;
                }
                setHasFavorited(false);
    
                const hasFavorite = await filterUserFavorite(currentUserId, id);
                setHasFavorited(hasFavorite);
            } catch (error) {
                console.error('Error checking favorite:', error);
            }
        }
    
        checkFavorite();
    }, [currentUserId, id]);
    const toggleFavorite = useCallback(async (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
        try {
            if (!currentUserId) {
                router.push('/sign-in')
                return;
            }

            let request;
            if (hasFavorited) {
                request = ()=>axios.delete('/api/favorite',{data})
                router.refresh();
            } else {
                request = ()=>axios.post('/api/favorite',data)
                router.refresh();
            }
                await request(); 
                setHasFavorited(!hasFavorited);
                router.refresh();
        }  catch (error:any) {
            throw new Error(`Something Went Wrong: ${error.message}`);
        }
    }, [currentUserId, hasFavorited, id, router]);

    return {
        hasFavorited,
        toggleFavorite
    };
}

export default useFavorite;
