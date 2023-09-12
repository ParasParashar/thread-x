"use client";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import SmallLoader from "../shared/SmallLoader";
import { format } from "date-fns";
import { pusherClient } from "@/lib/pusher";
import { find } from "lodash";
import Image from "next/image";
interface Message {
  userId: string;
  currentUserId: string;
  content?: string;
  image?: string;
  createdAt?: any;
  senderId?: string;
}

const ChatArea = ({ userId, currentUserId }: Message) => {
  const [data, setData] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const messageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const div = messageRef.current;
    div?.scrollTo(0, div.scrollHeight);
  }, [data]);

  useEffect(() => {
    axios
      .post(`/api/conversations`, {
        userId,
        currentUserId,
      })
      .then((res) => {
        setData(res.data);
        setLoading(false);
      });
  }, [userId, currentUserId]);

  useEffect(() => {
    pusherClient.subscribe(userId);
    pusherClient.subscribe(currentUserId);
    const messageHandler = (message: any) => {
      axios.post(`/api/conversations`, {
        userId,
        currentUserId,
      });
      setData((current: any) => {
        if (find(current, { id: message.id })) {
          return current;
        }
        return [...current, message];
      });
      setLoading(false);
    };

    pusherClient.bind("message:new", messageHandler);

    return () => {
      pusherClient.unsubscribe(userId);
      pusherClient.unbind("message:new", messageHandler);
    };
  }, [userId]);

  return (
    <div
      className="flex-grow backdrop:blur-xl p-4
     min-h-[400px] max-h-[450px]
     max-sm:min-h-[300px] max-sm:max-h-[320px]
      border-[#272727] border-[5px]"
    >
      <div
        ref={messageRef}
        className="h-full relative 
        max-sm:max-h-[300px]
        max-h-[400px] 
        overflow-y-auto scrollbar-custom-class overflow-x-hidden px-2 "
      >
        {loading ? (
          <p className="flex justify-center items-center h-[30vh]">
            <SmallLoader />
          </p>
        ) : (
          data.map((id, index) => (
            <div
              key={index}
              className={`flex mb-2 ${
                id.senderId === currentUserId ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`${
                  id.senderId === currentUserId
                    ? "bg-[#1b1a1aef]  "
                    : "bg-[#333232]"
                } text-gray-300 rounded-lg p-2 min-w-[5rem] max-w-xs break-words overflow-wrap`}
              >
                {id.image && (
                  <div className="mb-2">
                    <div
                      className={`relative
                      lg:min-w-[15rem] lg:max-w-[30rem]
                      lg:min-h-[15rem] lg:max-h-[30rem]
                      md:min-w-[13rem] md:max-w-[27rem]
                      md:min-h-[13rem] md:max-h-[27rem]
                       min-w-[10rem] max-w-xs
                        min-h-[10rem] max-h-xs  
                         bg-gray-200 rounded-lg overflow-hidden ${
                        id.senderId === currentUserId
                          ? "float-right"
                          : "float-left"
                      }`}
                    >
                      <Image
                        src={id.image}
                        alt="Image"
                        layout="fill"
                        objectFit="cover"
                        className=" cursor-pointer 
                        hover:scale-110 
                        transition translate"
                      />
                    </div>
                  </div>
                )}
                {id.content}
                <div className="text-xs text-gray-400">
                  {format(new Date(id.createdAt), "p")}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ChatArea;
// "use client";
// import axios from "axios";
// import { useEffect, useRef, useState } from "react";
// import io from "socket.io-client";
// import SmallLoader from "../shared/SmallLoader";

// interface Message {
//   userId: string;
//   currentUserId: string;
//   content?: string;
// }

// let socketInstance: any;
// const ChatArea = ({ userId, currentUserId }: Message) => {
//   const [data, setData] = useState<Message[]>([]);
//   const [loading, setLoading] = useState(true);
//   const messageRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     const div = messageRef.current;
//     div?.scrollTo(0, div.scrollHeight);
//   }, [data]);

//   useEffect(() => {
//     axios
//       .get(`/api/conversationMessages`, {
//         params: {
//           userId,
//           currentUserId,
//         },
//       })
//       .then((res) => {
//         setData(res.data);
//         setLoading(false);
//       });

//     socketInstance = io(process.env.NEXT_PUBLIC_SITE_URL!, {
//       path: "/api/socket/socket",
//       addTrailingSlash: false,
//     });

//     socketInstance.on("receive-message", (newMessages: Message) => {
//       // Filter the data basis on user and currentUser
//       if (
//         (newMessages.currentUserId === currentUserId &&
//           newMessages.userId === userId) ||
//         (newMessages.currentUserId === userId &&
//           newMessages.userId === currentUserId)
//       ) {
//         setData((prevMessages: any) => [...prevMessages, newMessages]);
//       }
//     });

//     return () => {
//       socketInstance.disconnect();
//     };
//   }, [currentUserId, userId]);

//   return (
//     <div
//       className="flex-grow backdrop:blur-xl p-4
//      min-h-[300px] max-h-[350px]
//      max-sm:min-h-[500px] max-sm:max-h-[550px]
//       border-[#272727] border-[5px]"
//     >
//       <div
//         ref={messageRef}
//         className="h-full relative
//         max-sm:max-h-[500px]
//         max-h-[300px]
//         overflow-y-auto scrollbar-custom-class overflow-x-hidden px-2 "
//       >
//         {loading ? (
//           <p className="flex justify-center items-center h-[30vh]">
//             <SmallLoader />
//           </p>
//         ) : (
//           data.map((id, index) => (
//             <div
//               key={index}
//               className={`flex mb-2 ${
//                 id.currentUserId === currentUserId
//                   ? "justify-end"
//                   : "justify-start"
//               }`}
//             >
//               <div
//                 className={`${
//                   id.currentUserId === currentUserId
//                     ? "bg-[#1b1a1aef]  "
//                     : "bg-[#333232]"
//                 } text-gray-300 rounded-lg p-2 min-w-[5rem] max-w-xs break-words overflow-wrap`}
//               >
//                 {id.content}
//               </div>
//             </div>
//           ))
//         )}
//       </div>
//     </div>
//   );
// };

// export default ChatArea;
