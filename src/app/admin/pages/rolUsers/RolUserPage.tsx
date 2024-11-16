import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { TableComponentRolUser } from "../../components/data_table/TableComponentRolUser";
import { LayoutAdmin } from "../../layout/LayoutAdmin";
import { Button } from "@/components/ui/button";
import { FormNewRolUser } from "../../components/Forms/FormNewRolUser";
import { useEffect, useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { useActiveFetch } from "@/app/hooks/useActiveFetch";
import { toast } from "@/hooks/use-toast";
import { RolUserModel } from "../../models/RolUserModel";
import { useFetch } from "@/app/hooks/useFetch";

export const RolUserPage = () => {
  const [open, setOpen] = useState(false);
  const [roles, setRole] = useState<RolUserModel[]>([]);
  const [progress, setProgress] = useState(20);

  const {
    data: getData,
    isLoading: getLoading,
    isSucces: getSuccess,
  } = useFetch<RolUserModel[]>({
    url: "rolUser",
    method: "GET",
  });

  useEffect(() => {
    let newProgress = progress;
    if (getLoading) {
      newProgress = 60; // Cambia a un valor intermedio cuando comienza la carga
    } else if (!getLoading && getSuccess && getData) {
      setRole(getData);
      newProgress = 100; // Establece el progreso completo si la carga fue exitosa
    } else if (!getData && getSuccess) {
      newProgress = 98; // Otro valor si se ha cargado pero no hay datos
    }
    setProgress(newProgress);
  }, [getSuccess, getData, getLoading]);

  const { data, fetchData, error } = useActiveFetch<RolUserModel>({
    url: "rolUser",
    method: "POST",
  });

  const onCreateNewRolUser = async (info: any) => {
    try {
      // Aquí ejecutamos la llamada de fetchData para crear el nuevo rol
      await fetchData({
        name: info.name,
        level: info.level,
        description: info.description,
      });

      if (data) {
        setRole([...roles, data]);
        setOpen(false);
      }
    } catch (error: any) {}
  };

  useEffect(() => {
    if (error) {
      toast({
        variant: "destructiveTopCenter",
        title: "Uh oh! Something went wrong.",
        description:
          error.response?.data?.detail ||
          error.response?.statusText ||
          "Unknown error",
        duration: 2000,
      });
    }
  }, [error]);

  return (
    <>
      <LayoutAdmin>
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="text-3xl ">Rol Users</CardTitle>
          </CardHeader>
          <hr />
          <CardContent className="py-4 space-y-4">
            <div className="flex justify-end px-4">
              <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                  <Button variant={"blue"}>New Rol User</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-lg max-w-sm">
                  <DialogHeader>
                    <DialogTitle>New Rol User</DialogTitle>
                    <DialogDescription>
                      This is a description for the modal.
                    </DialogDescription>
                  </DialogHeader>
                  <FormNewRolUser onSubmit={onCreateNewRolUser} />
                </DialogContent>
              </Dialog>
            </div>
            <TableComponentRolUser
              rol={roles}
              setRole={setRole}
              isLoading={getLoading}
              progress={progress}
            />
          </CardContent>
          <Toaster />
        </Card>
      </LayoutAdmin>
    </>
  );
};
