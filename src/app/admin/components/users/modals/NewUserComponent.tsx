import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { getCatalogRolUser } from "@/store/rolUser/thunks";
import { AppDispatch } from "@/store/store";
import { FormNewUserComponent } from "../forms/FormNewUserComponent";

export const NewUserComponent = () => {
  const [isDialogOpen, setDialogOpen] = useState(false);

  const closeDialog = () => setDialogOpen(false);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getCatalogRolUser());
  }, []);

  return (
    <Dialog open={isDialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <Button variant={"blue"} className="mx-2">
          New User
        </Button>
      </DialogTrigger>
      <DialogContent className="md:max-w-3xl max-w-sm">
        <DialogHeader>
          <DialogTitle>New User</DialogTitle>
          <DialogDescription>
            This is a description for the modal.
          </DialogDescription>
        </DialogHeader>
        <section>
          <FormNewUserComponent onClose={closeDialog} />
        </section>
      </DialogContent>
    </Dialog>
  );
};
