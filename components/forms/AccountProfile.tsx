"use client";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUploadThing } from "@/lib/uploadthing";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { UserValidation } from "@/lib/validations/user";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import Image from "next/image";
import { useState } from "react";
import { isBase64Image } from "@/lib/utils";
import { updateUser } from "@/lib/actions/user.actions";
import { usePathname, useRouter } from "next/navigation";

interface accountProfileProps {
  title: string;
  user: {
    id: string;
    objectId: string;
    userName: string;
    name: string;
    bio: string;
    image: string;
  };
}
const AccountProfile: React.FC<accountProfileProps> = ({ title, user }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [file, setFiles] = useState<File[]>([]);
  const { startUpload } = useUploadThing("media");
  const form = useForm({
    resolver: zodResolver(UserValidation),
    defaultValues: {
      profile_photo: user?.image || "",
      name: user?.name || "",
      userName: user?.userName || "",
      bio: user?.bio || "",
    },
  });
  const onSubmit = async (values: z.infer<typeof UserValidation>) => {
    const blob = values.profile_photo;
    const hasImageChanged = isBase64Image(blob);
    if (hasImageChanged) {
      const imgRes = await startUpload(file);
      if (imgRes && imgRes[0].fileUrl) {
        values.profile_photo = imgRes[0].fileUrl;
      }
    }
    await updateUser({
      userId: user.id,
      name: values.name,
      userName: values.userName,
      bio: values.bio,
      image: values.profile_photo,
      path: pathname,
    });
    if(pathname === '/profile/edit'){
      router.back();
    }else{
      router.push('/')
    }
  };
  function handleImage(
    e: React.ChangeEvent<HTMLInputElement>,
    fieldChange: (value: string) => void
  ) {
    e.preventDefault();
    const fileReader = new FileReader();
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setFiles(Array.from(e.target.files));
      if (!file.type.includes("image")) return;
      fileReader.onload = async (event) => {
        const imageDataUrl = event.target?.result?.toString() || "";
        fieldChange(imageDataUrl);
      };
      fileReader.readAsDataURL(file);
    }
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col justify-start gap-10"
      >
        <FormField
          control={form.control}
          name="profile_photo"
          render={({ field }) => (
            <FormItem className="flex items-center gap-4">
              <FormLabel className="account-form_image-label ">
                {field.value ? (
                  <Image
                    src={field.value}
                    alt="Profile Photo"
                    width={96}
                    height={96}
                    className="rounded-full object-contain"
                    priority
                  />
                ) : (
                  <Image
                    src="./assets/profile.svg"
                    alt="Profile Photo"
                    width={24}
                    height={24}
                    objectFit="contain"
                    className=" object-contain"
                  />
                )}
              </FormLabel>
              <FormControl
                className="
            flex flex-1 font-semibold text-gray-200"
              >
                <Input
                  type="file"
                  accept="image/"
                  placeholder="Upload a Image"
                  className="account-form-image-input"
                  onChange={(e) => handleImage(e, field.onChange)}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-3 w-full">
              <FormLabel className="font-semibold">Name</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  className="account-form-input no-focus"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="userName"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-3 w-full">
              <FormLabel className="font-semibold">UserName</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  className="account-form-input no-focus"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-3 w-full">
              <FormLabel className="font-semibold">Bio</FormLabel>
              <FormControl>
                <Textarea
                  rows={10}
                  className="account-form-input no-focus"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button type="submit" className="bg-blue-500">
          {title}
        </Button>
      </form>
    </Form>
  );
};

export default AccountProfile;
