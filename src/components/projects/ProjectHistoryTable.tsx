import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import { DailyStats } from "@/types";
const ProjectHistoryTable = ({ history }: { history: DailyStats[] }) => {
  return (
    <div className="m-1 col-span-2">
      <Card>
        <CardHeader className="m-0">
          <CardTitle>
            <div className="flex justify-between items-center h-10">
              Installs History
            </div>
          </CardTitle>
          <Separator />
        </CardHeader>
        <CardContent className="">
          <ScrollArea className="h-96 w-full">
            <Table className="p-0 m-0">
              <TableHeader>
                <TableRow>
                  <TableHead className="text-center">Date</TableHead>
                  <TableHead className="text-center">Installs</TableHead>
                  <TableHead className="text-center">Rating</TableHead>
                  <TableHead className="text-center">Reviews</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {history.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className=" text-center">{item.date}</TableCell>
                    <TableCell className="text-center ">
                      {item.installCount}
                    </TableCell>
                    <TableCell className="text-center ">
                      {item.ratingCount}
                    </TableCell>
                    <TableCell className="text-center">
                      {item.reviewCount}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProjectHistoryTable;
