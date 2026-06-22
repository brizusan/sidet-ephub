"use client";

import { useState } from "react";
import { CommunityPermissions } from "../types/community.types";
import { toogleMemberAction } from "../actions/mebership-action";
import toast from "react-hot-toast";

type Props = {
  permissions: CommunityPermissions;
  communityId: string;
};

export default function CommunityMembers({ permissions, communityId }: Props) {
  const [join, setJoin] = useState(permissions.canJoin);
  const [leave, setLeave] = useState(permissions.canLeave);

  const handleClick = async () => {
    const result = await toogleMemberAction(communityId);

    if (result?.sucess) {
      toast.success(result.message);
      setJoin(result.newPermissions.canJoin);
      setLeave(result.newPermissions.canLeave);
    }
  };

  return (
    <>
      {join && (
        <button
          onClick={handleClick}
          className="font-bold text-lg w-full lg:w-auto px-5 py-2 text-white cursor-pointer bg-orange-600"
        >
          Incribirse a Comunidad
        </button>
      )}

      {leave && (
        <button
          onClick={handleClick}
          className="font-bold text-lg w-full lg:w-auto px-5 py-2 text-white cursor-pointer bg-red-600"
        >
          Dejar Comunidad
        </button>
      )}
    </>
  );
}
