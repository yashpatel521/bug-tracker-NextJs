import ProjectStatsSkeleton from "@/skeletons/ProjectStatsSkeleton";

const ProjectStats = () => {
  const loading = true;

  if (loading) {
    return <ProjectStatsSkeleton />;
  }
  return <div>ProjectStats</div>;
};

export default ProjectStats;
