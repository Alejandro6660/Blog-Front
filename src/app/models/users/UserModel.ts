import { CatalogoRolUser } from "../rolUsers/CatalogoRolUserModel";

export type UserModel = {
  id: number;
  name: string;
  lastName: string;
  email: string;
  userName: string;
  description: string;
  rolUser: CatalogoRolUser;
};
