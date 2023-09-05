"use client";
import {
  DialogContent,
  DialogHeader
} from "@/components/ui/dialog";
import DialogForm from "./DialogForm";
interface ModelProps {
  imageUrl: string;
  name: string;
  username: string;
  userId: string;
}
const Model = ({ imageUrl, name, username, userId }: ModelProps) => {
  return (
    <DialogContent className="bg-[#1d1c1c]">
      <DialogHeader>
        <DialogForm
        name={name}
        imageUrl={imageUrl}
        userId={userId}
        username={username}
        />
      </DialogHeader>
    </DialogContent>
  );
};

export default Model;
