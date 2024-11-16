import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LayoutAdmin } from "../../layout/LayoutAdmin";
import { Toaster } from "@/components/ui/toaster";
import { GridUsersComponent } from "../../components/users/grids/GridUsersComponent";
import { NewUserComponent } from "../../components/users/modals/NewUserComponent";

export const UsersPage = () => {
  return (
    <LayoutAdmin>
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-3xl ">Users</CardTitle>
        </CardHeader>
        <hr />
        <CardContent className="py-4 space-y-4">
          <div className="w-full text-end">
            <NewUserComponent />
          </div>
          <div className="rounded-sm border">
            <GridUsersComponent />
          </div>
        </CardContent>
        <Toaster />
      </Card>
    </LayoutAdmin>
  );
};
