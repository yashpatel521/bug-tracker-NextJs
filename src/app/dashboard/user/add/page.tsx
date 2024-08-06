import { getAllRole, getAllSubRole } from "@/action/role";
import BreadCrumb from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import CreateUserForm from "@/components/user/CreateUserForm";

const AddUserPage = async () => {
  const breadcrumbItems = [
    { title: "Users", link: "/dashboard/user" },
    { title: "Create New User", link: "/dashboard/user/add" },
  ];
  const roles = await getAllRole();
  const subRoles = await getAllSubRole();

  return (
    <div className="min-h-screen ">
      <div className="space-y-4 p-4 pt-6 md:p-8">
        <BreadCrumb items={breadcrumbItems} />
        <Separator />
        <CreateUserForm roles={roles} subRoles={subRoles} />
      </div>
    </div>
  );
};

export default AddUserPage;
