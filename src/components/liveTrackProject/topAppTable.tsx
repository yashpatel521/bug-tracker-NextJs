import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
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
  return (
    <ScrollArea className="h-[500px] border">
      <Table className="table-auto w-full">
        <TableHeader>
          <TableRow>
            <TableHead className="text-center hidden lg:table-cell">
              Index
            </TableHead>
            <TableHead className="text-center hidden lg:table-cell">
              Type
            </TableHead>
            <TableHead className="text-left">Title</TableHead>
            <TableHead className="text-center">App Id</TableHead>
            <TableHead className="text-center hidden lg:table-cell">
              Developer
            </TableHead>
            <TableHead className="text-center hidden lg:table-cell">
              Rating
            </TableHead>
            <TableHead className="text-center">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {suggestedData.map((item: ProjectDetails, index: number) => (
            <TableRow key={index}>
              <TableCell className="capitalize text-center hidden lg:table-cell">
                {++index}
              </TableCell>
              <TableCell className="capitalize text-center hidden lg:table-cell">
                {item.appType === "google" ? (
                  <Icons.android className="w-6 h-6" />
                ) : item.appType === "apple" ? (
                  <Icons.apple className="w-6 h-6" />
                ) : (
                  <span className="text-red-600">Unknown</span>
                )}
              </TableCell>
              <TableCell className="text-left">
                <Link
                  href={item.url}
                  className="text-center font-medium flex items-center justify-start align-middle gap-2 capitalize"
                  target="_blank"
                >
                  <Avatar className="h-9 w-9">
                    <AvatarImage src={item.icon} alt={item.icon} />
                    <AvatarFallback>{item.title}</AvatarFallback>
                  </Avatar>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground flex gap-2 ">
                      {item.title}
                    </p>
                  </div>
                </Link>
              </TableCell>
              <TableCell className="capitalize text-center break-all">
                {item.appId}
              </TableCell>
              <TableCell className="capitalize text-center hidden lg:table-cell">
                {item.developer}
              </TableCell>
              <TableCell className="capitalize text-center hidden lg:table-cell">
                {item.scoreText}
              </TableCell>
              <TableCell className="capitalize text-center">
                <AddProjectDailog app={item} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
};

export default TopAppTable;
