import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const FormSchema = z.object({
  name: z.coerce
    .string()
    .min(2, {
      message: "name must be at least 2 characters.",
    })
    .refine((x) => x !== undefined, { message: "Name is required" }),
  level: z.coerce
    .number()
    .int()
    .max(99, { message: "Level cannot be greater than 99" })
    .min(1, { message: "Level must be at least 1" })
    .refine((x) => x !== undefined, { message: "Level is required" }) // Agrega un mensaje de error si el valor no existe
    .transform((x) => (x === undefined ? x : x || 1)),
  description: z.coerce
    .string()
    .min(10, { message: "Description is to short" })
    .max(200, { message: "description is to long" }),
});

interface FormProps {
  onSubmit: any;
}

export const FormNewRolUser = ({ onSubmit }: FormProps) => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      level: 1,
      description: "",
    },
  });

  return (
    <Form {...form}>
      <form
        className="space-y-3"
        onSubmit={form.handleSubmit((data) => onSubmit(data))}
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel className="px-2">Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="Name"
                  {...field}
                  type="text"
                  className="py-5 focus-visible:ring-0 focus:border-sky-800"
                />
              </FormControl>
              <FormMessage className="px-2" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel className="px-2">Description</FormLabel>
              <FormControl>
                <Input
                  placeholder="Description"
                  {...field}
                  type="text"
                  className="py-5 focus-visible:ring-0 focus:border-sky-800"
                />
              </FormControl>
              <FormMessage className="px-2" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="level"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel className="px-2">Level</FormLabel>
              <FormControl>
                <Input
                  placeholder="1"
                  type="number"
                  {...field}
                  className="py-5 focus-visible:ring-0 focus:border-sky-800"
                />
              </FormControl>
              <FormMessage className="px-2" />
            </FormItem>
          )}
        />
        <DialogFooter>
          <div className="w-full flex justify-center">
            <Button type="submit" variant={"blueOutline"}>
              Save
            </Button>
          </div>
        </DialogFooter>
      </form>
    </Form>
  );
};
