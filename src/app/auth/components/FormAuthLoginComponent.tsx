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
import { useDispatch, useSelector } from "react-redux";
import { checkignAuthentication } from "@/store/auth/thunks";
import { AppDispatch, RootState } from "@/store/store";
import { LoaderCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useEffect } from "react";
import { ESTATUS } from "@/store/auth/authSlice";
import { useNavigate } from "react-router-dom";

const FormSchema = z.object({
  password: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  email: z.string().email({ message: "Please enter a valid email address." }),
});

export const FormAuthLoginComponent = () => {
  const { toast } = useToast();
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const { status, errorMessage } = useSelector(
    (state: RootState) => state.auth
  );

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      password: "",
      email: "",
    },
  });

  const onSubmit = (data: z.infer<typeof FormSchema>, ev: React.FormEvent) => {
    ev.preventDefault();

    dispatch(checkignAuthentication(data.email, data.password));
  };

  useEffect(() => {
    if (errorMessage) {
      toast({
        variant: "destructiveTopCenter",
        title: "Uh oh! Something went wrong.",
        description: errorMessage,
        duration: 2000,
      });
    }
  }, [errorMessage, toast]);

  useEffect(() => {
    if (status === ESTATUS.AUTHENTICATED) {
      navigate("/");
    }
  }, [status, navigate]);

  return (
    <Form {...form}>
      <form
        className="flex flex-col space-y-4 justify-start items-center"
        onSubmit={(ev) => form.handleSubmit((data) => onSubmit(data, ev))(ev)}
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
        {status !== "checking" ? (
          <Button type="submit" variant="blue" className="w-full">
            Submit
          </Button>
        ) : (
          <Button disabled variant={"blue"} className="w-full">
            <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
            Please wait
          </Button>
        )}
      </form>
    </Form>
  );
};
