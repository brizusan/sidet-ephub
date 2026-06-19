import Link from "next/link";
import { CommunityPermissions } from "../types/community.types";

type Props = {
  permissions: CommunityPermissions;
  communityId: string;
};

export default function CommunityActionsPanel({
  permissions,
  communityId,
}: Props) {
  return (
    <>
      <div className="flex justify-end">
        {permissions.canEdit && (
          <Link
            target="_blank"
            href={`/dashboard/communities/${communityId}/edit`}
            className="text-white bg-amber-600 p-2 rounded shadow hover:bg-amber-500 uppercase font-semibold transition-colors hover:shadow-none"
          >
            Editar Comunidad
          </Link>
        )}
      </div>
    </>
  );
}
