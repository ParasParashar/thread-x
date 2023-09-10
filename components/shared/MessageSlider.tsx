import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import Link from "next/link";
import ProfileHeader from "./ProfileHeader";
import SliderBox from "./SliderBox";

const MessageSlider = () => {
  return (
    <>
      <SheetContent className="bg-dark-1 max-sm:h-full w-full">
        <SheetHeader>
          <SheetTitle className="head-text bg-dark-1 text-xl">
            Message
          </SheetTitle>
        </SheetHeader>
        <SheetDescription>
        <SliderBox />
        </SheetDescription>
      </SheetContent>
    </>
  );
};

export default MessageSlider;
