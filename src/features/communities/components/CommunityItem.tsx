import Image from "next/image";
import { CommunityWithPermisions } from "../types/community.types";
import Link from "next/link";
import CommunityDropdownMenu from "./CommunityDropMenu";

type CommunityItemProps = {
  community: CommunityWithPermisions;
};

export default function CommunityItem({ community }: CommunityItemProps) {
  const { name, description, imageUrl } = community.data;
  return (
    <li className="flex justify-between gap-x-6 py-5">
      <div className="flex items-start min-w-0 gap-x-4">
        <div className="size-32 flex-none overflow-hidden">
          <Image
            alt={`Imagen Comunidad ${name}`}
            className="object-cover w-full h-full"
            width={250}
            height={250}
            src={imageUrl}
            priority
          />
        </div>
        <div className="min-w-0 flex-auto">
          <Link href={`/`} className="hover:underline font-bold text-lg">
            {name}
          </Link>
          <p className="text-gray-700 text-sm line-clamp-2">{description}</p>
          <p className="text-slate-400 text-sm">{4} miembros</p>
        </div>
      </div>
      <div className="flex shrink-0 items-center gap-x-6">
        {/* DROPDOWN MENU */}

        {community.context.isAdmin && (
          <CommunityDropdownMenu community={community.data} />
        )}
      </div>
    </li>
  );
}
