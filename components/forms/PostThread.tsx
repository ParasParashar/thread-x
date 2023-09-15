"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import ImageUpload from "../shared/ImageUpload";
import { createthread } from "@/lib/actions/thread.action";

interface Props {
  userId: string;
  userCommunityId: string[];
}

const PostThread = ({ userId, userCommunityId }: Props) => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    thread: "",
    community: "",
  });
  const [image, setImage] = useState("");

  const handleInputChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = (selectedImage: any) => {
    setImage(selectedImage);
  };

  const onSubmit = async () => {
    await createthread({
      text: formData.thread,
      author: userId,
      communityId: formData.community !== "" ? formData.community : null,
      image: image,
    });
    router.push("/");
  };

  return (
    <div className="mt-10 flex flex-col justify-start gap-10">
      <form onSubmit={onSubmit} className="flex flex-col gap-6">
        <div className="flex flex-col gap-3 w-full">
          <label className="font-semibold text-gray-400" htmlFor="thread">
            Content
          </label>
          <textarea
            id="thread"
            name="thread"
            required
            rows={6}
            className="account-form-input no-focus p-2"
            value={formData.thread}
            onChange={(e:any)=>handleInputChange(e)}
          />
        </div>

        <div>
          <label
            className="text-gray-400 text-sm font-bold"
            htmlFor="community"
          >
            For Community
          </label>
          <select
            id="community"
            name="community"
            className="bg-dark-1 bg-gray-300 p-3"
            value={formData.community}
            onChange={(e:any)=>handleInputChange(e)}
            placeholder=" Select where you want to create Thread."
            style={{ width: "100%" }}
          >
            {userCommunityId.length === 0 ? (
              <>
              <option value="">Personal Thread</option>
              </>
            ) : (
              userCommunityId.map((community: any) => (
                <>
                <option
                  key={community._id}
                  value={community._id}
                  className="bg-dark-2 text-white p-3"
                  style={{ cursor: "pointer" }}
                  >
                  {community.name}
                </option>
              <option className="p-3" value="">Personal Thread</option>
                  </>
              ))
            )}
          </select>
          {userCommunityId.length === 0 && (
              <span className="text-gray-700 p-1 text-sm">You Dont't have any community to create thread. </span>
          )}
        </div>

        <div className="flex flex-col gap-3 w-full">
          <label className="font-semibold text-gray-400">Upload Image</label>
          <ImageUpload value={image} onChange={handleImageChange} />
        </div>

        <button
          type="submit"
          className="mt-10 bg-blue-500 w-full p-2 rounded-lg"
        >
          Create
        </button>
      </form>
    </div>
  );
};

export default PostThread;
