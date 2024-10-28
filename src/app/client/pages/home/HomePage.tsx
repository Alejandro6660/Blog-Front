import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LayoutClient } from "../../layout/LayoutClient";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Button } from "@/components/ui/button";
import { Heart, MessageCircle } from "lucide-react";
import { useState } from "react";

export const HomePage = () => {
  const [isPressed, setIsPressed] = useState(false);
  return (
    <LayoutClient>
      <Card>
        <CardHeader>
          <div className="flex gap-3 items-center">
            <Avatar>
              <AvatarImage
                className="w-9 h-9 rounded-full"
                src="https://github.com/shadcn.png"
                alt="@shadcn"
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="leading-[1.30] text-[.80rem] font-semibold">
                Alejandro Fuentes
              </span>
              <span className="text-[.69rem] text-opacity-50 leading-[1.30]">
                2 hours
              </span>
            </div>
          </div>
        </CardHeader>
        <div className="px-14">
          <CardContent>
            <CardTitle className="text-3xl px-0 py-0 ">Hola mundo</CardTitle>
          </CardContent>
          <CardFooter>
            <div className="flex justify-between items-center w-full">
              <div className="flex space-x-1">
                <Button variant={"tag"} size={"min"}>
                  #hastaglardo
                </Button>
              </div>
              <div className="flex space-x-4">
                <Heart
                  size={22}
                  className="cursor-pointer duration-100 transition-all ease-in-out"
                  style={{
                    fill: isPressed ? "#ff0000" : "transparent", // Cambia el color de fill
                    stroke: isPressed ? "#ff0000" : "#606060", // Cambia el color de stroke
                  }}
                  onClick={(ev) => {
                    ev.preventDefault();
                    setIsPressed(!isPressed);
                  }}
                />
                <MessageCircle size={22} stroke="#606060" />
              </div>
            </div>
          </CardFooter>
        </div>
      </Card>
    </LayoutClient>
  );
};
