'use client'
import { useEffect, useState } from "react";
import { Channel, Members } from "pusher-js";
import useActiveList from "./useActiveList";
import { pusherClient } from "@/lib/pusher";

const useActiveChannel = () => {
  const { set, add, remove } = useActiveList();
  const [activeChannel, setActiveChannel] = useState<Channel | null>(null);

  useEffect(() => {
    let channel = activeChannel;

    if (!channel) {
      channel = pusherClient.subscribe('presence-messenger');
      setActiveChannel(channel);
      console.log(channel)
    }

    channel.bind("pusher:subscription_succeeded", (members: Members) => {
      const initialMembers: string[] = [];
      members.each((member: Record<string, any>) => initialMembers.push(member.id));
      set(initialMembers);
    });
    console.log(channel,'after subscribed')
    channel.bind("pusher:member_added", (member: Record<string, any>) => {
      console.log(member.id,'memberId ');
      add(member.id)
    });
    console.log(channel,'after subscribed added')

    channel.bind("pusher:member_removed", (member: Record<string, any>) => {
      remove(member.id);
    });

    return () => {
      if (activeChannel) {
        pusherClient.unsubscribe('presence-messenger');
        setActiveChannel(null);
      }
    }
  }, [activeChannel, set, add, remove]);
}

export default useActiveChannel;