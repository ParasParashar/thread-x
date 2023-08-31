'use server'
import { revalidatePath } from "next/cache";
import Thread from "../models/thread.model";
import User from "../models/user.model";
import { connectToDB } from "../mongoose";

interface params {
    text: string;
    author: string;
    communityId: string | null;
    path: string;

}
export async function createthread({ text, communityId, author, path }: params) {
    try {
        connectToDB();
        const createThread = await Thread.create({
            text,
            author,
            community: null,
        });
        await User.findByIdAndUpdate(
            author, {
            $push: {
                threads: createThread._id
            }
        }
        );
        revalidatePath(path);
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
        });
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