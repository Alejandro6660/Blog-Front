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
import { useEffect } from "react";
import { AsideComponent } from "../../components/AsideComponent";
import { Link, useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "@/hooks/use-toast";
import { ESTATUS } from "@/store/auth/authSlice";
import { ToastAction } from "@/components/ui/toast";
import { getAllPostsThunk } from "@/store/posts/thunks";

export const HomePage = () => {
  const navigate = useNavigate();
  const { status } = useSelector((state: RootState) => state.auth);
  const { posts } = useSelector((state: RootState) => state.posts);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getAllPostsThunk());
  }, []);

  const onCreate = () => {
    if (status === ESTATUS.AUTHENTICATED) {
      navigate("/createpost");
    } else {
      toast({
        title: "No has iniciado sesión",
        description: "Por favor, inicia sesión para crear una publicación.",
        action: (
          <ToastAction
            altText="Ir a la página de inicio de sesión"
            onClick={() => navigate("/auth/login")}
          >
            Iniciar sesión
          </ToastAction>
        ),
        variant: "topCenter", // Cambia esto al estilo que prefieras, si usas variantes personalizadas.
      });
    }
  };

  return (
    <LayoutClient>
      <div className="flex-1 flex md:space-x-4">
        <AsideComponent />
        <section className="flex-1 space-y-3">
          <article className="w-full flex justify-end min-h-10">
            <Button variant={"blueOutline"} onClick={onCreate}>
              Create Post
            </Button>
          </article>
          <article className="flex flex-col space-y-4">
            {posts.map((post) => (
              <Card key={post.id}>
                <CardHeader>
                  <div className="flex gap-3 items-center">
                    <Avatar>
                      <AvatarImage
                        className="w-9 h-9 rounded-full"
                        src={post.userCreator.imgAvatar}
                        alt="@shadcn"
                      />
                      <AvatarFallback>
                        {post.userCreator.name[0]}
                        {post.userCreator.lastName[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <Link to={`/user/${post.userCreator.id}`}>
                        <span className="leading-[1.30] text-[.80rem] font-semibold">
                          {post.userCreator?.userName}
                        </span>
                      </Link>
                      <span className="text-[.69rem] text-opacity-50 leading-[1.30]">
                        {post.dateCreate?.toString()}
                      </span>
                    </div>
                  </div>
                </CardHeader>
                <div className="px-14">
                  <CardContent>
                    <Link to={`/post/${post.id}`}>
                      <CardTitle className="text-3xl px-0 py-0 ">
                        {post.title}
                      </CardTitle>
                    </Link>
                  </CardContent>
                  <CardFooter>
                    <div className="flex justify-between items-center w-full">
                      <div className="flex space-x-1">
                        {post.tags.map((tag) => (
                          <Button variant={"tag"} size={"min"} key={tag.id}>
                            #{tag.name}
                          </Button>
                        ))}
                      </div>
                    </div>
                  </CardFooter>
                </div>
              </Card>
            ))}
          </article>
        </section>
      </div>
    </LayoutClient>
  );
};
