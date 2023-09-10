import ChatHeader from "@/components/chats/ChatHeader";
import ChatInput from "@/components/chats/ChatInput";
import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import io from "socket.io-client";
import React from "react";
import { redirect } from "next/navigation";
import ChatArea from "@/components/chats/ChatArea";

const Page = async ({ params }: { params: { id: string } }) => {
  let socket: any;
  const user = await currentUser();
  if (!user) redirect("/sign-in");
  const currentUserInfo =await fetchUser(user.id);
  const userInfo = await fetchUser(params.id);

  return (
    <div className="flex flex-col rounded-lg">
      <ChatHeader
        paramId={params.id}
        name={userInfo.name}
        image={userInfo.image}
      />
      <ChatArea currentUserId={currentUserInfo._id} userId={userInfo._id} />
      <ChatInput currentUserId={currentUserInfo._id} userId={userInfo._id} />
    </div>
  );
};

export default Page;

//  'use client'
// import { fetchUser } from "@/lib/actions/user.actions";
// import React, { useEffect, useState } from "react";
// import io from "socket.io-client";

// let socketInstance: any;
// let user:any
// interface Message {
//   username: string;
//   message: string;
// }

// const page= ({params}:{params:{id:string}}) => {
//   const [message, setMessage] = useState<string>("");
//   const [username, setUsername] = useState<string>("");
//   const [allMessages, setAllMessages] = useState<Message[]>([]);

//   useEffect(() => {
//     socketInstance = io(process.env.NEXT_PUBLIC_SITE_URL!, {
//       path: "/api/socket/socket",
//       addTrailingSlash: false,
//     });

//     socketInstance.on("receive-message", (data: Message) => {
//       setAllMessages((prevMessages) => [...prevMessages, data]);
//     });

//     return () => {
//        socketInstance.disconnect();
//     };
//   }, []);

//   function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
//     e.preventDefault();

//     console.log("emitted");
//     socketInstance.emit("send-message", {
//       username,
//       message,
//     });
//     setMessage("");
//   }

//   return (
//     <div>
//       <h1>Chat app</h1>
//       <h1>Enter a username</h1>

//       <input
//         value={username}
//         className="bg-dark-1"
//         placeholder="Enter user name"
//         onChange={(e) => setUsername(e.target.value)}
//       />

//       <br />
//       <br />

//       <div>
//         {allMessages.map(({ username, message }, index) => (
//           <div key={index}>
//             {username}: {message}
//           </div>
//         ))}

//         <br />

//         <form onSubmit={handleSubmit}>
//           <input
//             name="message"
//             className="bg-dark-1"
//             placeholder="enter your message"
//             value={message}
//             onChange={(e) => setMessage(e.target.value)}
//             autoComplete={"off"}
//           />
//         </form>
//       </div>
//     </div>
//   );
// };

// export default page;
