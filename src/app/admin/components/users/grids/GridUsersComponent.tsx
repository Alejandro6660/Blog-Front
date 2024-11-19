import { useDispatch, useSelector } from "react-redux";
import { getAllUsersThunk } from "@/store/users/thunks";
import { AppDispatch, RootState } from "@/store/store";
import { useEffect } from "react";
import {
  TableHead,
  TableHeader,
  TableRow,
  Table,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { ModalActionComponent } from "../modals/ModalActionComponent";

export const GridUsersComponent = () => {
  const { users, status } = useSelector((state: RootState) => state.Users);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getAllUsersThunk());
  }, []);

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[5%] border-r text-center font-semibold text-black">
            Id
          </TableHead>
          <TableHead className="border-r font-semibold text-black">
            Name
          </TableHead>
          <TableHead className="border-r font-semibold text-black">
            lastname
          </TableHead>
          <TableHead className="border-r font-semibold text-black">
            userName
          </TableHead>
          <TableHead className="border-r font-semibold text-black">
            Email
          </TableHead>
          <TableHead className="border-r text-center font-semibold text-black">
            Rol
          </TableHead>
          <TableHead className="w-[5%] "></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {status === "loading" ? (
          <TableRow>
            <TableCell colSpan={8} className="text-center">
              <h1>...loading</h1>
            </TableCell>
          </TableRow>
        ) : (
          users.map((user) => (
            <TableRow key={user.id} className="py-1">
              <TableCell className="border-r text-center py-1">
                {user.id}
              </TableCell>
              <TableCell className="border-r py-1">{user.name}</TableCell>
              <TableCell className="border-r py-1">{user.lastName}</TableCell>
              <TableCell className="border-r py-1">{user.userName}</TableCell>
              <TableCell className="border-r py-1">{user.email}</TableCell>
              <TableCell className="border-r text-center py-1">
                {user.rolUser?.name}
              </TableCell>
              <TableCell className=" flex justify-center py-1">
                <ModalActionComponent itemId={user.id} />
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
};
