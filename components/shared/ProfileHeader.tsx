import Image from "next/image";

interface props {
  accountId: string;
  authUserId: string;
  name: string;
  username: string;
  imgUrl: string;
  bio: string;
  type?:'User' |'Community'
}
const ProfileHeader = ({
  accountId,
  authUserId,
  name,
  username,
  imgUrl,
  bio,
  type
}: props) => {
  return (
    <div className="flex flex-col w-full justify-start">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
            <div className="relative h-20 w-20 object-cover">
                <Image
                src={imgUrl}
                fill
                alt="Profile Image"
                className="rounded-full object-cover shadow-2xl"
                />
            </div>
            <div className="flex-2">
                <h2 className="text-left text-lg font-semibold">{name}</h2>
                <p className="text-gray-700">@{username}</p>
            </div>
        </div>
      </div>

        <p className="mt-6 max-w-lg text-sm">{bio}</p>
        <div className="mt-12 h-0 5 w-full"/>
    </div>
  );
};

export default ProfileHeader;
