import { LinkModel } from "../links/LinkModel";
import { CatalogoRolUser } from "../rolUsers/CatalogoRolUserModel";

export type GetUserModel = {
  id: number;
  name: string;
  lastName: string;
  email: string;
  userName: string;
  password: string;
  confirmPassword: string;
  rolUser: CatalogoRolUser;
  avatar: string;
  hero: string;
  links: LinkModel[];
};
