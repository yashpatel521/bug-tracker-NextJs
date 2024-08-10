import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ProjectDetails } from "@/types";
import { Icons } from "../ui/icons";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import Link from "next/link";
import AddProjectDailog from "./AddProjectDailog";

const TopAppTable = async ({
  suggestedData,
}: {
  suggestedData: ProjectDetails[];
}) => {
  const PlayStoreIcon = Icons["PlayStore"];
  return (
    <ScrollArea className="h-[500px]  border">
      <Table className="p-0 m-0 border">
        <TableHeader>
          <TableRow>
            <TableHead className="text-center">Index</TableHead>
            <TableHead>Title</TableHead>
            <TableHead className="text-center">App Id</TableHead>
            <TableHead className="text-center">Devloper</TableHead>
            <TableHead className="text-center">Rating</TableHead>
            <TableHead className="text-center">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {suggestedData.map((item: ProjectDetails, index: number) => (
            <TableRow key={index}>
              <TableCell className="capitalize text-center">
                {++index}
              </TableCell>
              <TableCell className="text-center font-medium flex items-center align-middle gap-2 capitalize">
                <Avatar className="h-9 w-9">
                  <AvatarImage src={item.icon} alt={item.icon} />
                  <AvatarFallback>{item.title}</AvatarFallback>
                </Avatar>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground flex gap-2 ">
                    {item.title}
                    <Link href={item.url} className="mr-2" target="_blank">
                      <PlayStoreIcon className="w-4 h-4" />
                    </Link>
                  </p>
                </div>
              </TableCell>
              <TableCell className="capitalize text-center">
                {item.appId}
              </TableCell>
              <TableCell className="capitalize text-center">
                {item.developer}
              </TableCell>
              <TableCell className="capitalize text-center">
                {item.scoreText}
              </TableCell>
              <TableCell className="capitalize text-center">
                <AddProjectDailog app={item} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </ScrollArea>
  );
};

export default TopAppTable;
