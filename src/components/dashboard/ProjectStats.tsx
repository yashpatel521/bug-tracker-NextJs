import { getProjectStatsData } from "@/action/dashboard";
import { ContentProps } from "@/types";
import { Icons } from "../ui/icons";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

const ProjectStats = async () => {
  const projectStats = await getProjectStatsData();
  const reportCardData: ContentProps[] = [
    {
      title: "Completed Projects",
      value: projectStats.complete,
      description: "Projects that have been completed",
      svg: "Checked",
    },
    {
      title: "In Progress Projects",
      value: projectStats.inprogress,
      description: "Projects that are currently in progress",
      svg: "Clock",
    },
    {
      title: "On Hold Projects",
      value: projectStats.onhold,
      description: "Projects that are currently on hold",
      svg: "Pause",
    },
    {
      title: "In Review Projects",
      value: projectStats.inreview,
      description: "Projects that are currently in review",
      svg: "Eye",
    },
  ];
  return (
    <>
      {reportCardData.map((data, index) => {
        const Icon: any = Icons[data.svg];
        return (
          <Card
            className="border rounded-xl shadow-2xl dark:shadow-none"
            key={index}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xl font-medium">
                <span>{data.title}</span>
              </CardTitle>
              <div>
                <Icon />
              </div>
            </CardHeader>
            <CardContent className="pl-3">
              <span className="text-sm mr-2">{data.value}</span>
              <span className="text-xs text-muted-foreground">
                {data.description}
              </span>
            </CardContent>
          </Card>
        );
      })}
    </>
  );
};

export default ProjectStats;
