import { UserModel } from "@/app/models/users/UserModel";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SidebarMenuButton } from "@/components/ui/sidebar";
import { AppDispatch, RootState } from "@/store/store";
import { deleteUserThunk, getAllUsersThunk } from "@/store/users/thunks";

import { Ellipsis } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

interface modalActionProps {
  itemId: number;
}

export const ModalActionComponent = ({ itemId }: modalActionProps) => {
  const navigate = useNavigate();

  const [user, setUser] = useState<UserModel | null>(null);
  const { users } = useSelector((state: RootState) => state.Users);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    let user1 = users.findIndex((user) => user.id === itemId);
    setUser(users[user1]);
  }, []);

  const onDeleted = async () => {
    await dispatch(deleteUserThunk(user?.id));
    console.log("se elimino");
    await dispatch(getAllUsersThunk());
    console.log("se busco");
  };

  const onViewUser = async () => {
    console.log(`user/${user?.id}`);
    navigate(`../user/${user?.id}`);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <SidebarMenuButton
          className="w-[60%] h-6 text-center py-1"
          variant={"default"}
        >
          <span className="w-full flex justify-center">
            <Ellipsis size={18} />
          </span>
        </SidebarMenuButton>
      </DropdownMenuTrigger>
      <DropdownMenuContent side="bottom" align="end" className="w-full">
        <SidebarMenuButton onClick={onViewUser}>
          <span>View</span>
        </SidebarMenuButton>
        <SidebarMenuButton>
          <span>Edit</span>
        </SidebarMenuButton>
        <Dialog>
          <DialogTrigger asChild>
            <SidebarMenuButton>
              <span>Delete</span>
            </SidebarMenuButton>
          </DialogTrigger>
          <DialogContent className="sm:w-[450px]">
            <DialogHeader>
              <DialogTitle className="text-xl">
                Delete user {user?.userName}
              </DialogTitle>
              <DialogDescription>
                This is a description for the modal.
              </DialogDescription>
            </DialogHeader>
            <section className="flex flex-col items-center space-y-9">
              <div className="w-full text-center text-2xl">
                <p>Are you sure?</p>
              </div>
              <div className="w-full flex justify-evenly items-center">
                <Button variant={"destructive"} onClick={onDeleted}>
                  Acept
                </Button>
                <Button variant={"blueOutline"}>Cancel</Button>
              </div>
            </section>
          </DialogContent>
        </Dialog>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
