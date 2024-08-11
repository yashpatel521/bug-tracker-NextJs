import { UserProject } from "@/types";
import { Icons } from "../ui/icons";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import { checkRoleAccess, getInitials } from "@/lib/utils";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authConfig } from "@/lib/authConfig";

const ProjectTeamMemberTable = async ({
  teamMember,
  projectId,
}: {
  teamMember: UserProject[];
  projectId: number;
}) => {
  const data = await getServerSession(authConfig);
  const user = data?.user;
  const Pencil2Icon = Icons["pencil2"];
  return (
    <div className="m-1 col-span-2">
      <Card>
        <CardHeader className="m-0">
          <CardTitle>
            <div className="flex justify-between items-center min-h-10">
              Team Members
              {checkRoleAccess(user, ["admin", "manager"]) && (
                <Link href={`./${projectId}/editMember`}>
                  <Pencil2Icon className="w-6 h-6" stroke="var(--themeColor)" />
                </Link>
              )}
            </div>
          </CardTitle>
          <Separator />
        </CardHeader>
        <CardContent className="">
          {teamMember.length === 0 ? (
            <div className="text-center text-gray-400">
              No team members found
            </div>
          ) : (
            <ScrollArea className="h-96 w-full">
              <Table className="p-0 m-0">
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-center">Index</TableHead>
                    <TableHead className="">Name</TableHead>
                    <TableHead className="text-center">Email</TableHead>
                    <TableHead className="text-center">Role</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {teamMember.map((member, index) => (
                    <TableRow key={member.id}>
                      <TableCell className="capitalize text-center">
                        {++index}
                      </TableCell>
                      <TableCell className="text-center font-medium flex items-center align-middle gap-2 capitalize">
                        <Avatar className="h-6 w-6 my-2 ">
                          <AvatarImage src={member.user.profile} alt="Avatar" />
                          <AvatarFallback>
                            {getInitials(
                              member.user.firstName,
                              member.user.lastName
                            )}
                          </AvatarFallback>
                        </Avatar>
                        {member.user.firstName} {member.user.lastName}
                      </TableCell>
                      <TableCell className="capitalize text-center">
                        {member.user.email}
                      </TableCell>
                      <TableCell className="capitalize text-center">
                        {member.user.subRole?.name}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </ScrollArea>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ProjectTeamMemberTable;
