// "use client";

// import * as z from "zod";
// import User from "@/lib/models/user.model";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { usePathname, useRouter } from "next/navigation";

// import {
//   Form,
//   FormControl,
//   FormDescription,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Button } from "@/components/ui/button";
// import { Textarea } from "@/components/ui/textarea";
// import { ThreadValidation } from "@/lib/validations/thread";
// import { createthread } from "@/lib/actions/thread.action";
// interface Props {
//   userId: string;
//   userCommunityId: string[];
// }

// const PostThread = ({ userId, userCommunityId }: Props) => {
//   const router = useRouter();
//   const pathname = usePathname();
//   const form = useForm<z.infer<typeof ThreadValidation>>({
//     resolver: zodResolver(ThreadValidation),
//     defaultValues: {
//       thread: "",
//       community:"",
//       accountId: userId,
//     },
//   });
//   const onSubmit = async (values: z.infer<typeof ThreadValidation>) => {
//     await createthread({
//       text: values.thread,
//       author: userId,
//       communityId: values.community !=="" ? values.community : null,
//       path: pathname,
//     });
//     router.push("/");
//   };
//   return (
//     <Form {...form}>

//       <form
//         onSubmit={form.handleSubmit(onSubmit)}
//         className="mt-10 flex flex-col justify-start gap-10"
//       >
//         <FormField
//           control={form.control}
//           name="thread"
//           render={({ field }) => (
//             <FormItem className="flex flex-col gap-3 w-full">
//               <FormLabel className="font-semibold text-gray-400">Content</FormLabel>
//               <FormControl>
//                 <Textarea
//                 required
//                   rows={10}
//                   className="account-form-input no-focus"
//                   {...field}
//                 />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//        <FormField
//           control={form.control}
//           name="community"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel className="text-gray-400 text-sm font-bold">
//                 For Community
//                 </FormLabel>
//               <Select onValueChange={field.onChange} defaultValue={field.value}>
//                 <FormControl>
//                   <SelectTrigger className="bg-dark-1">
//                     <SelectValue placeholder="Select where you want to create Thread." className="bg-gray-300" />
//                   </SelectTrigger>
//                 </FormControl>
//                   {userCommunityId.length === 0?(
//                     <>
//                     <p>Currently You don't Join or have your own communiy.</p>
//                     <SelectContent className="bg-dark-2 text-white">
//                   <SelectItem value="">Personal Thread</SelectItem>
//                   </SelectContent>
//                        </>
//                   ):(
//                     <>
//                     <SelectContent className="bg-dark-2 text-white">
//                      {userCommunityId.map((community:any)=>(
//                   <SelectItem aria-required value={community._id}>{community.name}</SelectItem>
//                     ))}
//                   <SelectItem value="">Personal Thread</SelectItem>
//                   </SelectContent>
//                     </>
//                   )}

//                   </Select>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//         <Button type="submit" className="bg-blue-500">
//           Create
//         </Button>
//       </form>
//     </Form>
//   );
// };

// export default PostThread;
"use client";
import React, { useState } from "react";
import * as z from "zod";
import { usePathname, useRouter } from "next/navigation";
import ImageUpload from "../shared/ImageUpload";
import { createthread } from "@/lib/actions/thread.action";

interface Props {
  userId: string;
  userCommunityId: string[];
}

const PostThread = ({ userId, userCommunityId }: Props) => {
  const router = useRouter();
  const pathname = usePathname();
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
      path: pathname,
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
            className="account-form-input no-focus"
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
                <option
                  key={community._id}
                  value={community._id}
                  className="bg-dark-2 text-white p-3"
                  style={{ cursor: "pointer" }}
                >
                  {community.name}
                </option>
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
