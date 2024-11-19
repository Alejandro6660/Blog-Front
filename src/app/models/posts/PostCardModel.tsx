import { TagModel, UserCreatorModel } from "./PostModel";

export type PostCardModel = {
  id: number;
  title: string;
  tags: TagModel[];
  dateCreate: Date | null;
  userCreator: UserCreatorModel;
  content: string;
};
