"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { useOrganization } from "@clerk/nextjs";
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
import { ThreadValidation } from "@/lib/validations/thread";
import { createthread } from "@/lib/actions/thread.action";
interface Props {
    userId: string;
  }
  
const PostThread = ({ userId }: Props) => {
    const router = useRouter();
    const pathname = usePathname();
    const form = useForm<z.infer<typeof ThreadValidation>>({
        resolver: zodResolver(ThreadValidation),
        defaultValues: {
          thread: "",
          accountId: userId,
        },
      });
  const onSubmit=async(values:z.infer<typeof ThreadValidation>)=>{
    await createthread({
      text:values.thread,
      author:userId,
      communityId:null,
      path:pathname
    });
    router.push('/');
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mt-10 flex flex-col justify-start gap-10"
      >
        <FormField
          control={form.control}
          name="thread"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-3 w-full">
              <FormLabel className="font-semibold">Content</FormLabel>
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
          Create
        </Button>
      </form>
    </Form>
  );
};

export default PostThread;
