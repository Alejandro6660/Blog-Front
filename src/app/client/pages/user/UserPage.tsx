import { useEffect, useState } from "react";
import { LayoutClient } from "../../layout/LayoutClient";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { getByIdThunk } from "@/store/users/thunks";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MessageSquare, Newspaper } from "lucide-react";

export const UserPage = () => {
  const [isMe, setIsMe] = useState<boolean>(false);
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.auth);
  const { user: User } = useSelector((state: RootState) => state.Users);

  const getUserById = async () => {
    const Id = id !== undefined ? await parseInt(id) : 0;
    dispatch(getByIdThunk(Id));
    if (!user) return;

    if (user?.id === User?.id) {
      setIsMe(true);
    }
  };

  useEffect(() => {
    getUserById();
  }, [id]);
  return (
    <LayoutClient>
      <section className="px-1 z-10">
        <figure className="relative w-full h-[100px] md:h-[200px] lg:h-[300px] ">
          <img
            src="../public/ai-generated-8630602_1280.png"
            alt=""
            className="absolute inset-0 w-full h-full object-cover rounded-sm aspect-square"
          />
        </figure>
      </section>
      <section className="absolute top-[20%] px-2 md:px-0 md:-bottom-[15%] md:top-0 inset-0 flex flex-col items-center md:justify-center z-50 space-y-2">
        <Card className="w-full md:w-[75%]">
          <CardHeader>
            <section className="relative w-full h-[40px]">
              <Avatar className="absolute top-[-50px] left-[95%] -translate-x-1/2  w-14 h-14 border md:border-4 md:w-32 md:h-32 md:top-[-90px] md:left-1/2 transform md:-translate-x-1/2 border-gray-100">
                <AvatarImage src={User?.hero} alt="@shadcn" />
                <AvatarFallback className="bg-sky-300 lg:font-normal lg:text-5xl text-2xl">
                  {User?.name[0]}
                  {User?.lastName[0]}
                </AvatarFallback>
              </Avatar>
              {isMe ? (
                <div className="w-full flex md:justify-end">
                  <Button variant={"blue"}>Editar</Button>
                </div>
              ) : null}
            </section>
            <section className="h-full">
              <div>
                <h2 className="text-4xl text-center font-bold">
                  {User?.name} {User?.lastName}
                </h2>
              </div>
              <div className="py-2">
                <h3 className="text-lg text-center text-slate-600">
                  {User?.email}
                </h3>
              </div>
            </section>
          </CardHeader>
          {User?.links.length !== undefined && User?.links.length > 0 ? (
            <CardContent>
              <ul>
                {User.links.map((link) => (
                  <li key={link.id}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {link.title || "Enlace"}
                    </a>
                  </li>
                ))}
              </ul>
            </CardContent>
          ) : null}
          <CardFooter className="md:hidden">
            <article className="w-full flex justify-around items-center">
              <CardTitle className="w-full flex items-center justify-start space-x-3">
                <Newspaper></Newspaper>
                <span>0</span>
                <span>Post</span>
              </CardTitle>
              <CardTitle className="w-full flex items-center justify-start space-x-3">
                <MessageSquare />
                <span>0</span>
                <span>Comments</span>
              </CardTitle>
            </article>
            <article></article>
          </CardFooter>
        </Card>
        <section className="md:w-[75%]">
          <article className="hidden md:block">
            <Card className="w-full md:w-[20%] px-2 py-1">
              <CardHeader className="w-full space-y-6">
                <CardTitle className="w-full flex items-center justify-start space-x-3">
                  <Newspaper></Newspaper>
                  <span>0</span>
                  <span>Post</span>
                </CardTitle>
                <CardTitle className="w-full flex items-center justify-start space-x-3">
                  <MessageSquare />
                  <span>0</span>
                  <span>Comments</span>
                </CardTitle>
              </CardHeader>
            </Card>
          </article>
          <article></article>
        </section>
      </section>
    </LayoutClient>
  );
};
