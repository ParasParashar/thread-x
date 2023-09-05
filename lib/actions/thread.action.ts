'use server'
import { revalidatePath } from "next/cache";
import Thread from "../models/thread.model";
import User from "../models/user.model";
import { connectToDB } from "../mongoose";
import Community from "../models/community.model";
import { promise } from "zod";

interface params {
    text: string;
    author: string;
    communityId: string | null | Array<string>;
    path: string;
    image?: string;

}
export async function createthread({ text, communityId, author, path ,image }: params) {
    try {
        connectToDB();
        const communityIdObject = await Community.findOne(
            { _id: communityId },
            { _id: 1 }
        );
        const createThread = await Thread.create({
            text,
            author,
            community: communityIdObject,
            image
        });

        if (communityIdObject) {
            await Community.findByIdAndUpdate(communityIdObject, {
                $push: { threads: createThread._id },
            });
        };
        await User.findByIdAndUpdate(
            author, {
            $push: {
                threads: createThread._id
            }
        }
        );
        revalidatePath('/');
    } catch (error: any) {
        throw new Error(error);
    }


}
export async function fetchPosts(pageNumber = 1, pageSize = 20) {
    connectToDB();
    const skipAmount = (pageNumber - 1) * pageSize;
    //fetch posts with no parentsId
    const postsquery = Thread.find({
        parentId:
            { $in: [null, undefined] }
    })
        .sort({ createdAt: 'desc' })
        .skip(skipAmount)
        .limit(pageSize)
        .populate({ path: 'author', model: 'User' })
        .populate({
            path: 'children',
            populate: {
                path: 'author',
                model: User,
                select: '_id ,name,parentId,image'
            }
        })
        .populate({ path: 'community', model: 'Community' })
        ;
    //  This is how pagination work
    const totolPostCount = await Thread.countDocuments(
        {
            parentId: { $in: [null, undefined] }
        })
    const posts = await postsquery.exec();
    const isNext = totolPostCount > skipAmount + posts.length;
    return { posts, isNext }

}
export async function fetchThreadById(id: string) {
    try {
        connectToDB();
        const thread = await Thread.findById(id)
            .populate({
                path: 'community',
                model: Community,
                select: '_id id name image'
            })
            .populate({
                path: 'author',
                model: User,
                select: "_id id name image"
            })
            .populate({
                path: 'children',
                populate: [
                    {
                        path: 'author',
                        model: User,
                        select: "_id id name image"
                    },
                    {
                        path: 'children',
                        model: Thread,
                        populate: {
                            path: 'author',
                            model: User,
                            select: "_id id name image"
                        }
                    }
                ]
            }).exec();
        return thread;

    } catch (error: any) {
        throw new Error(error)
    }
}
export async function addCommentToThread(
    threadId: string,
    commentText: string,
    userId: string,
    path: string
) {
    connectToDB();
    try {
        const originalThread = await Thread.findById(threadId);
        if (!originalThread) {
            throw new Error('Comment Not Found');
        }
        const commentThread = new Thread({
            text: commentText,
            author: userId,
            parentId: threadId
        });
        const savedCommentThread = await commentThread.save();
        originalThread.children.push(savedCommentThread);
        await originalThread.save();
        revalidatePath(path)
    } catch (error: any) {
        throw new Error(error);
    }


}
export async function deleteThread(currentUserId: string, threadId: string) {
    try {
        connectToDB();
        const user = await User.findOne({ _id: currentUserId });
        if (!user) {
            throw new Error("User not Found")
        }
        const threadFind = await Thread.findOne({
            _id: threadId,
            author: user._id
        });
        if (!threadFind) {
            throw new Error("Thread not Found")
        }
        await Thread.deleteOne(threadFind._id);
        await User.updateOne({ _id: user._id },
            { $pull: { threads: threadFind._id } }
        );
        if (threadFind.community) {
            const communityFind = await Community.findOne({ _id: threadFind.community });
            if (!communityFind) {
                throw new Error("Community Not Found")
            }
            await Community.updateOne(
                { _id: communityFind._id },
                { $pull: { threads: threadFind._id } }
            );
        }
        revalidatePath('/profile');
        return { success: true };
    } catch (error: any) {
        throw new Error(error);

    }
}