import { useParams } from "react-router-dom";
import { LayoutAdmin } from "../../layout/LayoutAdmin";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Toaster } from "@/components/ui/toaster";
import { AvatarImage, Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useFetch } from "@/app/hooks/useFetch";

export const UserPage = () => {
  const { id, ...rest } = useParams();

  const { data, error } = useFetch({
    url: `user/getByIdAdmin/${id !== undefined ? id : 0}`,
    method: "GET",
  });

  console.log(error);

  return (
    <LayoutAdmin>
      <Card className="w-full">
        <CardHeader className="p-2">
          <section className="relative w-full h-[200px] md:h-[300px] lg:h-[400px]">
            <img
              src="../public/ai-generated-8630602_1280.png"
              alt="Hero Image"
              className="absolute inset-0 w-full h-full object-cover rounded-sm"
              loading="lazy"
            />
            <div className="absolute bottom-[-40px] left-1/2 transform -translate-x-1/2">
              <Avatar className="w-24 h-24 border-4 border-white rounded-full">
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="@shadcn"
                  loading="lazy"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </div>
          </section>
        </CardHeader>
        <CardContent className="py-12 space-y-4"></CardContent>
        <Toaster />
      </Card>
    </LayoutAdmin>
  );
};
