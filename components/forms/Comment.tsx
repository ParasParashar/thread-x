"use client";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePathname, useRouter } from "next/navigation";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "../ui/input";
import { CommentValidation } from "@/lib/validations/thread";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { addCommentToThread } from "@/lib/actions/thread.action";
interface props {
  threadId: string;
  currentUserImg: string;
  currentUserId: string;
}
const Comment = ({ threadId, currentUserImg, currentUserId }: props) => {
  const router = useRouter();
  const pathname = usePathname();
  const form = useForm<z.infer<typeof CommentValidation>>({
    resolver: zodResolver(CommentValidation),
    defaultValues: {
      thread: "",
    },
  });
  const onSubmit = async (values: z.infer<typeof CommentValidation>) => {
    await addCommentToThread(
        threadId,
        values.thread,
        JSON.parse(currentUserId),
        pathname
    )
    form.reset();
  };
  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="mt-10 flex flex-row justify-start items-center gap-10 bg-[#232222]  p-2 rounded-lg "
        >
          <FormField
            control={form.control}
            name="thread"
            render={({ field }) => (
              <FormItem className="flex items-center gap-3 w-full ">
                <FormLabel>
                  <div className="relative w-16 h-16 object-cover">
                  <Image
                    src={currentUserImg}
                    alt="Profile Image"
                    className="rounded-full object-cover"
                   fill
                    />
                    </div>
                </FormLabel>
                <FormControl className="border-none bg-transparent">
                  <Input
                    type="text"
                    placeholder="Comment..."
                    className="border text-lg text-white focus:outline-none p-2 focus:border-[#a2b8e0] border-b-[2px]"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <Button type="submit" className="bg-blue-500 rounded-[30px]">
           Reply
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default Comment;
