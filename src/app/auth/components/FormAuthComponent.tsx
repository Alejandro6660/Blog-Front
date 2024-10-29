import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useDispatch } from "react-redux";
import { checkignAuthentication } from "@/store/auth/thunks";

const FormSchema = z.object({
  password: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  email: z.string().email({ message: "Please enter a valid email address." }),
});

export const FormAuthComponent = ({ isLogin = true }) => {
  const dispatch = useDispatch();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      password: "",
      email: "",
    },
  });

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    console.log(data);
    dispatch(checkignAuthentication(data.email, data.password));
  };

  return (
    <>
      {isLogin === true ? (
        <Form {...form}>
          <form
            className="flex flex-col space-y-4 justify-start items-center"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="px-2">Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Email"
                      {...field}
                      type="email"
                      autoComplete="email"
                      className="py-5 focus-visible:ring-0 focus:border-sky-800"
                    />
                  </FormControl>
                  <FormMessage className="px-2" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="px-2">Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="password"
                      autoComplete="current-password" // Añadido para accesibilidad
                      {...field}
                      type="password"
                      className="py-5 focus-visible:ring-0 focus:border-sky-800"
                    />
                  </FormControl>
                  <FormMessage className="px-2" />
                </FormItem>
              )}
            />
            <Button type="submit" variant="blue" className="w-full">
              Submit
            </Button>
          </form>
        </Form>
      ) : (
        <div></div>
      )}
    </>
  );
};
