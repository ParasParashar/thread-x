import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { createCommunity } from "@/lib/actions/community.action";

// Define the initial form state
const initialFormState = {
  communityName: "",
  communityBio: "",
};
interface props {
    imageUrl: string;
    name: string;
    username: string;
    userId: string;
  }

const DialogForm = ({ imageUrl, name, username, userId }:props) => {
  const router = useRouter();
  const [formData, setFormData] = useState(initialFormState);

  const handleInputChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const onSubmit = async (e:React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    await createCommunity(
        formData.communityName,
        imageUrl,
        formData.communityBio,
        userId,
      );
    setFormData({communityBio:'',communityName:''});
    router.push('/communities')
    router.refresh();
  };

  return (
    <>
      <h1 className="text-xl font-bold text-center ">
        Create Community
      </h1>
      <div className="flex shadow-md gap-5 p-3 mt-5 bg-dark-2 rounded-lg">
        <Image
          src={imageUrl}
          alt="Profile Photo"
          width={50}
          height={50}
          className="rounded-full object-cover"
        />
        <div className="flex flex-col ">
          <h1 className="head-text text-start  ">{name}</h1>
          <p className="text-gray-200 text-sm">{username}</p>
        </div>
      </div>
      <div className="p-1">
        <form
          onSubmit={(e) => onSubmit(e)}
          className="mt-10 flex flex-col justify-start gap-2"
        >
          <div className="flex flex-col gap-1 w-full">
            <label className="font-semibold text-left ">
              Community Name
            </label>
            <input
              type="text"
              name="communityName"
              placeholder="Enter your Community Name"
              className="p-2 account-form-input rounded-md "
              value={formData.communityName}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="flex flex-col gap-1 w-full">
            <label className="font-semibold text-left">Bio</label>
            <input
              type="text"
              name="communityBio"
              placeholder=" Enter your Bio (minimum 3 characters)"
              className="p-2 account-form-input rounded-md "
              value={formData.communityBio}
              onChange={handleInputChange}
              required
            />
          </div>
          <button type="submit" className="bg-dark-2 p-2 rounded-lg shadow-lg hover:bg-slate-800">
            Create
          </button>
        </form>
      </div>
    </>
  );
};

export default DialogForm;
