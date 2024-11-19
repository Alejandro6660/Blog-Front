import { useParams } from "react-router-dom";
import { LayoutClient } from "../../layout/LayoutClient";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useFetch } from "@/app/hooks/useFetch";
import { PostCardModel } from "@/app/models/posts/PostCardModel";

export const ViewPostPage = () => {
  const { id } = useParams();

  const { data, isLoading } = useFetch<PostCardModel>({
    url: `post/getById/${id}`,
    method: "GET",
  });
  console.log(data, isLoading);
  return (
    <LayoutClient>
      <article className="grid grid-cols-12 gap-2">
        <section className="py-10">
          <aside>
            <Heart />
          </aside>
        </section>
        <section className="col-span-11">
          <Card>
            <CardHeader>
              <CardTitle className="text-6xl">{data?.title}</CardTitle>
              <div className="py-6 space-x-1">
                {data?.tags.map((tag) => (
                  <Button variant={"tag"} size={"min"} key={tag.id}>
                    #{tag.name}
                  </Button>
                ))}
              </div>
            </CardHeader>
            <CardContent>
              <p>{data?.content}</p>
            </CardContent>
          </Card>
        </section>
      </article>
    </LayoutClient>
  );
};
