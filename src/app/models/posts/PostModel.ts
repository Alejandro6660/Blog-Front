export type PostModel = {
  id: number;
  title: string;
  tags: TagModel[];
  dateCreate: Date | null;
  userCreator: UserCreatorModel;
};

export type TagModel = {
  id: number;
  name: string;
};

export type UserCreatorModel = {
  id: number;
  name: string;
  lastName: string;
  userName: string;
  email: string;
  imgAvatar: string;
};
