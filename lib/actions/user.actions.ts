"use server"

import { revalidatePath } from "next/cache";
import User from "../models/user.model";
import { connectToDB } from "../mongoose"
import Thread from "../models/thread.model";
import { FilterQuery, SortOrder } from "mongoose";
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
    connectToDB();
    try {
        return await User
            .findOne({ id: userId })
        // .populate({path:'communities',model:Community})
    } catch (error: any) {
        throw new Error(error);
    };
}
export async function fetchUserPosts(userId: string) {
    try {
        connectToDB();
        const threads = await User.findOne({ id: userId })
            .populate({
                path: 'threads',
                model: Thread,
                populate: {
                    path: 'children',
                    model: Thread,
                    populate: {
                        path: 'author',
                        model: User,
                        select: 'name image id'
                    }
                }
            })
        return threads;
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
}){
    try {
        connectToDB();
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
export async function getActivity(userId:string) {
    try {
        connectToDB();
        const userThread = await Thread.find({author:userId});
        const childThreadsId = userThread.reduce((acc,userThread)=>{
            return  acc.concat(userThread.children)
            },[]);
       const replies  =  await Thread.find({
        _id:{$in:childThreadsId},
        author:{$ne:userId}
       })
       .populate({
        path:'author',
        model:User,
        select:'name image _id'
       });
       return replies;
    } catch (error:any) {
        throw new Error(error)
    }
    
}
