import { TableCell, TableRow } from "@/components/ui/table";
import { NotebookPen, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { RolUserModel } from "../../models/RolUserModel";
import { useEffect, useState } from "react";
import { RespuestaModel } from "@/app/models/ResponseModel";
import { useActiveFetch } from "@/app/hooks/useActiveFetch";

interface IProps {
  info: RolUserModel;
  setRole: React.Dispatch<React.SetStateAction<RolUserModel[]>>;
}

export const DataTableComponentRolUser = ({ info, setRole }: IProps) => {
  const [deletedId, setDeletedId] = useState<bigint | null>(null);
  const [deletedOpen, setDeletedOpen] = useState(false);
  const response = useActiveFetch<RespuestaModel>({
    url: "rolUser",
    method: "PUT",
  });

  const onDeletedRol = async (
    ev: React.MouseEvent<HTMLButtonElement>,
    id: bigint
  ) => {
    ev.preventDefault();
    setDeletedId(id); // Almacena el id que deseas eliminar
    try {
      await response.fetchData({ Id: id }); // Ejecuta la llamada a la API
    } catch (error) {
      console.error("Error deleting role:", error);
    }
  };

  const deletedRol = async () => {
    await setDeletedOpen(false);

    await setRole((prevRol: RolUserModel[]) =>
      prevRol.filter((role) => role.id !== deletedId)
    );
  };

  useEffect(() => {
    if (response.data?.ok && response.isSucces && deletedId !== null) {
      deletedRol();
    }
  }, [response.data, response.isSucces, deletedId]);

  return (
    <TableRow className="">
      <TableCell className="font-medium">{info.id.toString()}</TableCell>
      <TableCell className="">{info.name}</TableCell>
      <TableCell>
        <Badge className="w-1/5 justify-center"> {info.level}</Badge>
      </TableCell>
      <TableCell>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="h-[1.8rem]" variant={"outline"}>
              <NotebookPen />
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Edit profile {info.id.toString()}</DialogTitle>
              <DialogDescription>
                Make changes to your profile here. Click save when you're done.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4"></div>
            <DialogFooter>
              <Button type="submit">Save changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </TableCell>
      <TableCell>
        <Dialog open={deletedOpen} onOpenChange={setDeletedOpen}>
          <DialogTrigger asChild>
            <Button className="h-[1.8rem]" variant={"destructive"}>
              <Trash2 />
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[325px]">
            <DialogHeader>
              <DialogTitle className="text-center text-3xl text-destructive">
                Aviso
              </DialogTitle>
              <DialogDescription className="text-center"></DialogDescription>
            </DialogHeader>
            <div>
              <h3 className="text-center text-lg">
                Are you sure deletd Rol {info.name}?
              </h3>
            </div>
            <div className="flex items-center justify-evenly">
              <Button
                className="min-w-32"
                variant={"destructive"}
                onClick={(ev) => onDeletedRol(ev, info.id)}
              >
                Yes
              </Button>
              <DialogClose asChild>
                <Button className="min-w-32" variant={"blue"}>
                  Cancel
                </Button>
              </DialogClose>
            </div>
          </DialogContent>
        </Dialog>
      </TableCell>
    </TableRow>
  );
};
