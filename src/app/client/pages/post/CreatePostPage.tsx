import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { LayoutClient } from "../../layout/LayoutClient";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { HandleTagComponent } from "../../components/post/HandleTagComponent";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useActiveFetch } from "@/app/hooks/useActiveFetch";
import { useNavigate } from "react-router-dom";

const FormSchema = z.object({
  title: z.coerce
    .string()
    .min(1, { message: "Name is to short" })
    .max(200, { message: "name us to long" }),
  content: z.coerce
    .string()
    .min(1, { message: "Name is to short" })
    .max(500, { message: "name us to long" }),
});

export const CreatePostPage = () => {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: "",
      content: "",
    },
  });

  const { fetchData, isRejected, isSucces } = useActiveFetch({
    url: "post/create",
    method: "POST",
  });

  const onCreateNewUser = async (data: any) => {
    let tags = [];
    if (selectedTags.length >= 1) {
      for (let selectedTag of selectedTags) {
        let tag = {
          name: selectedTag,
        };
        tags.push(tag);
      }
    }

    const obj = {
      titlePost: data.title,
      contentPost: data.content,
      tags: tags,
    };

    await fetchData(obj);
  };

  useEffect(() => {
    if (!isRejected && isSucces) {
      navigate("/");
    }
  }, [isSucces, isRejected]);

  return (
    <LayoutClient>
      <section className="w-full">
        <Form {...form}>
          <form
            action=""
            onSubmit={form.handleSubmit((data) => onCreateNewUser(data))}
          >
            <Card>
              <CardHeader className="px-7 py-1">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <Input
                          placeholder="New post title here..."
                          {...field}
                          type="text"
                          className="py-1 focus-visible:ring-0 focus:border-sky-800 text-5xl h-auto font-bold shadow-none border-none"
                        />
                      </FormControl>
                      <FormMessage className="px-2" />
                    </FormItem>
                  )}
                />
                <HandleTagComponent
                  setSelectedTags={setSelectedTags}
                  selectedTags={selectedTags}
                />
                <hr />
              </CardHeader>
              <CardContent>
                <FormField
                  control={form.control}
                  name="content"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <Textarea
                          placeholder="Write your post content here..."
                          className="border-none focus-visible:ring-0 md:text-md h-64"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="px-2" />
                    </FormItem>
                  )}
                />
              </CardContent>
              <CardFooter>
                <article className="px-7">
                  <Button variant={"blue"} type="submit">
                    Publish
                  </Button>
                </article>
              </CardFooter>
            </Card>
          </form>
        </Form>
      </section>
    </LayoutClient>
  );
};
