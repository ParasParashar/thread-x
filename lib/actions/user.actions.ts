"use server"

import { revalidatePath } from "next/cache";
import User from "../models/user.model";
import { connectToDB } from "../mongoose"
import Thread from "../models/thread.model";
import mongoose, { FilterQuery, SortOrder } from "mongoose";
import Community from "../models/community.model";
import { currentUser } from "@clerk/nextjs";
import Message from "../models/message.model";
interface props {
    userId: string;
    userName: string;
    name: string;
    bio: string;
    image: string;
    path: string;
}
export async function updateUser({
    userId,
    userName,
    name,
    bio,
    image,
    path
}: props): Promise<void> {
    connectToDB();
    try {
        await User.findOneAndUpdate({
            id: userId,
        }, {
            userName: userName.toLowerCase(),
            name,
            bio,
            image,
            onboarded: true,
        },
            { upsert: true }
        );
        if (path === '/profile/edit') {
            revalidatePath(path);
        }
    } catch (error: any) {
        throw new Error('Failed to Create User');
    }
}

export async function fetchUser(userId: string) {
    try {
        connectToDB();
        return await User.findOne({ id: userId })
            .populate({ path: 'communities', model: Community });
    } catch (error: any) {
        throw new Error(error);
    };
};

export async function fetchUserPosts(userId: string) {
    try {
        connectToDB();
        const threadsWithCommunity = await User.findOne({ id: userId })
            .populate({
                path: 'threads',
                model: Thread,
                populate: [
                    {
                        path: 'children',
                        model: Thread,
                        populate: {
                            path: 'author',
                            model: User,
                            select: 'name _id image id'
                        }
                    },
                    {
                        path: 'community',
                        model: Community,
                        select: 'name id _id image'
                    }
                ]
            });

        return threadsWithCommunity;
    } catch (error: any) {
        throw new Error(error)
    }
}

export async function fetchUsers({
    userId,
    searchString = "",
    pageNumber = 1,
    pageSize = 20,
    sortBy = 'desc'
}: {
    userId: string;
    searchString?: string;
    pageNumber?: number;
    pageSize?: number;
    sortBy?: SortOrder;
}) {
    try {
        connectToDB();
        console.log(searchString, 'wrk')
        const skipAmount = (pageNumber - 1) * pageSize;
        const regex = new RegExp(searchString, "i");
        const query: FilterQuery<typeof User> = {
            id: { $ne: userId },
        };
        if (searchString.trim() !== "") {
            query.$or = [
                { username: { $regex: regex } },
                { name: { $regex: regex } },
            ];
        };
        const sortOptions = { createdAt: sortBy };

        const usersQuery = User.find(query)
            .sort(sortOptions)
            .skip(skipAmount)
            .limit(pageSize);

        const totalUsersCount = await User.countDocuments(query);

        const users = await usersQuery.exec();

        const isNext = totalUsersCount > skipAmount + users.length;

        return { users, isNext };
    } catch (error: any) {
        throw new Error(error)
    }
};

export async function getActivity(userId: string) {
    try {
        connectToDB();
        const userThread = await Thread.find({ author: userId });
        const childThreadsId = userThread.reduce((acc, userThread) => {
            return acc.concat(userThread.children)
        }, []);
        const replies = await Thread.find({
            _id: { $in: childThreadsId },
            author: { $ne: userId }
        })
            .populate({
                path: 'author',
                model: User,
                select: 'name image _id'
            });
        return replies;
    } catch (error: any) {
        throw new Error(error)
    }

}

export async function getUserReplies(userId: string) {
    try {
        connectToDB();
        const replies = await Thread.find({
            author: userId,
            parentId: { $exists: true }
        }).populate({ path: 'author', model: User });
        return replies;
    } catch (error: any) {
        throw new Error(error);
    }
}

export async function filterUserFavorite(currentUserId: string, threadId: string) {
    try {
        connectToDB();
        const user = await User.findOne({ id: currentUserId });
        if (!user) throw new Error('User Not Found');
        const thread = await Thread.findOne({ _id: threadId });
        if (!thread) throw new Error('Thread Not Found');
        const filter = await user.favorite.includes(threadId);
        return filter;
    } catch (error: any) {
        throw new Error('Error: ' + error.message);
    }
}

export async function filterUserRepost(currentUserId: string, threadId: string) {
    try {
        connectToDB();
        const user = await User.findOne({ id: currentUserId });
        if (!user) throw new Error('User Not Found');
        const thread = await Thread.findOne({ _id: threadId });
        if (!thread) throw new Error('Thread Not Found');
        const filter = await user.reposts.includes(threadId);
        return filter;
    } catch (error: any) {
        throw new Error('Error: ' + error.message);
    }
}

export async function filterUserFollow(currentUserId: string, followUserId: string) {
    try {
        connectToDB();
        const followUser = await User.findOne({ id: followUserId });
        if (!followUser) throw new Error('Follow User Not Found');
        const currentUser = await User.findOne({ id: currentUserId });
        if (!currentUser) throw new Error('User Not Found');
        const filter = await currentUser.following.includes(followUser._id);
        return filter;
    } catch (error: any) {
        throw new Error('Error: ' + error.message);
    }
};

export async function filterUserFollowing(currentUserId: string) {
    try {
        connectToDB();
        const user = await User.findOne({ _id: currentUserId });
        if (!user) throw new Error('User Not Found');
        const followingIds = user.following;
        const currentUserFollowing = await User.find({ _id: { $in: followingIds } })
            .select('id _id image name');
        return currentUserFollowing;
    } catch (error: any) {
        throw new Error('Error: ' + error.message);
    }
};

export async function filterUserFollowers(currentUserId: string) {
    try {
        connectToDB();
        const user = await User.findOne({ _id: currentUserId });
        if (!user) throw new Error('User Not Found');
        const followersIds = user.followers;
        const currentUserFollowers = await User.find({
            _id: {
                $in: followersIds
            }
        });
        return currentUserFollowers;
    } catch (error: any) {
        throw new Error('Error: ' + error.message);
    }
};

export async function getRequests() {
    try {
        connectToDB();
        const userData= await currentUser();
        if (!userData) throw new Error("user not Found");
        const user = await User.findOne({ id: userData.id })
            .populate({
                path: 'followRequests',
                model: User,
                select: 'id _id image name'
            });
        return user;
    } catch (error: any) {
        throw new Error('Error: ' + error.message);
    }

}

export async function acceptsFriendRequests(currentUserId: string, acceptedId: string) {
    try {
        connectToDB();
        const user = await User.findOne({ _id: currentUserId });
        const AcceptedUser = await User.findOne({ _id: acceptedId });
        if (!user) throw new Error("user not Found");
        console.log(AcceptedUser._id, 'accepts');
        if (user.followRequests.includes(AcceptedUser._id)) {
            await User.updateOne(
                { _id: user._id },
                {
                    $pull: { followRequests: AcceptedUser._id }
                }
            );
        };
        if (!AcceptedUser.following.includes(user._id)) {
            AcceptedUser.following.push(user._id);
            AcceptedUser.save();
        };
        if (!user.followers.includes(AcceptedUser._id)) {
            user.followers.push(AcceptedUser._id);
            user.save();
        };
        revalidatePath('/activity');
        return user;
    } catch (error: any) {
        throw new Error('Error: ' + error.message);
    }

};

export async function unfollowUser(currentUserId: string, followUserId: string) {
    try {
        connectToDB();
        console.log(currentUserId, followUserId, 'werlid')
        const user = await User.findOne({ id: currentUserId });
        const followUser = await User.findOne({ id: followUserId });
        if (!user) throw new Error("user not Found");
        if (!followUser) throw new Error("FollowUser not Found");
        await user.updateOne({ $pull: { following: followUser._id } });
        await followUser.updateOne({ $pull: { followers: user._id } });
        return user;
    } catch (error: any) {
        throw new Error('Error: ' + error.message);
    }

};

export async function getUserConversations(pathName:string) {
    try {
        const user = await currentUser();
        if (!user) throw Error("User not found");
        const userInfo = await User.findOne({ id: user.id });
        if (!userInfo) throw Error("User not found");

        const userConversation = await Message.find({
            $or: [
                { senderId: userInfo._id },
                { receiverId: userInfo._id },
                { communityId: userInfo.communities }
            ]
        });

        //  unique participant ID and community ID
        const uniqueParticipants = new Set<string>();
        const uniqueCommunities = new Set<string>();

        userConversation.forEach((message) => {
            if (message.senderId) uniqueParticipants.add(message.senderId.toString());
            if (message.receiverId) uniqueParticipants.add(message.receiverId.toString());
            if (message.communityId) {
                uniqueParticipants.add(message.communityId.toString());
                uniqueCommunities.add(message.communityId.toString());
            }
        });

        // Remove the user's ids
        uniqueParticipants.delete(userInfo._id.toString());

        //  user data for the remaining participant IDs
        const participantIds = Array.from(uniqueParticipants);
        const participantInfo = await User.find({
            _id: {
                $in: participantIds
            }
        }).select('id image name');

        // list of communities where the user is active
        const activeCommunities = Array.from(uniqueCommunities);

        //  community data for the active 
        const communityInfo = await Community.find({
            _id: {
                $in: activeCommunities
            }
        }).select('_id name image');
        revalidatePath(pathName);
        return {
            participantInfo,
            communityInfo,
        };
    } catch (error: any) {
        throw new Error('Something Went Wrong' + error.message);
    }
}

export async function deleteUsersChats(paramsId: string) {
    try {
        connectToDB();
        const currentUserInfo = await currentUser();
        if (!currentUserInfo) throw Error("Currentuser not found");
        const currnetUserId = await User.findOne({ id: currentUserInfo.id });
        const user = await User.findOne({ id: paramsId });
        if (!user) throw Error("user not found");
        console.log(currnetUserId._id, 'currentuser', user._id, 'user')
        const result = await Message.deleteMany({
            $or: [
                { senderId: currnetUserId._id, receiverId: user._id },
                { senderId: user._id, receiverId: currnetUserId._id }
            ]
        });

        console.log('Deleted Messages:', result);
        console.log('work correctly')
        revalidatePath(`/messages/${paramsId}`);
        return { success: true }
    } catch (error: any) {
        throw new Error("Something went wrong" + error.message);
    }
}

export default async function searchUser(searchQuery: string) {
    try {
        connectToDB();
        const userData = await currentUser();
        const userId = userData?.id;
        const user = await User.find({
            id:{$ne:userId}
        });
        const filterSearch = user.filter((user) =>
            user.name.split(' ').join('').toLowerCase().includes(searchQuery.split(' ').join('').toLowerCase())
        )
        return filterSearch;
    } catch (error) {
        throw new Error('Soemthing went wrong')
    }
}