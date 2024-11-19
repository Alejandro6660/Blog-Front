import { iconType } from "@/types/Icon.type";

export type LinkModel = {
  id: bigint;
  title: string;
  href: string;
  icon: iconType;
};
