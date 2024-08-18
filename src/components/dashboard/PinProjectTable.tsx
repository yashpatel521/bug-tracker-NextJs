import { getPinProjectData } from "@/action/dashboard";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Separator } from "../ui/separator";
import { PinProject } from "@/types";
import PinProjectCard from "./PinProjectCard";

const PinProjectTable = async () => {
  const pinProjects = await getPinProjectData();
  return (
    <div className="m-1">
      <Card className="col-span-6 md:col-span-5 shadow-2xl dark:shadow-none">
        <CardHeader>
          <CardTitle>Pin Projects</CardTitle>
          <CardDescription>
            You have {pinProjects.length} pin projects
          </CardDescription>
          <Separator />
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            {pinProjects.map((item: PinProject, index: number) => {
              return (
                item.project && (
                  <PinProjectCard data={item.project} key={index} />
                )
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PinProjectTable;
