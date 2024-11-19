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
import { onRegisterThunk } from "@/store/auth/thunks";
import { AppDispatch, RootState } from "@/store/store";
import { LoaderCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useEffect } from "react";
import { ESTATUS } from "@/store/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { RegisterUserModel } from "@/app/models/users/RegisterUserModel";

const FormSchema = z.object({
  name: z.coerce.string().min(2, { message: "Name is to short" }),
  lastName: z.coerce.string().min(2, { message: "Lastname is to short" }),
  userName: z.coerce.string().min(2, { message: "User Name is to short" }),
  password: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  confirmPassword: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
});

export const FormAuthRegister = () => {
  const { toast } = useToast();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { status, errorMessage } = useSelector(
    (state: RootState) => state.auth
  );

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      password: "",
      email: "",
      name: "",
      lastName: "",
      userName: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (
    data: z.infer<typeof FormSchema>,
    ev: React.FormEvent
  ) => {
    ev.preventDefault();
    const obj: RegisterUserModel = await {
      name: data.name,
      lastName: data.lastName,
      userName: data.userName,
      email: data.email,
      password: data.password,
      confirmPassword: data.confirmPassword,
    };

    dispatch(onRegisterThunk(obj));
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
        className="flex flex-col space-y-2 justify-start items-center"
        onSubmit={(ev) => form.handleSubmit((data) => onSubmit(data, ev))(ev)}
      >
        <div className="w-full flex space-x-1 ">
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
                    className="py-0 focus-visible:ring-0 focus:border-sky-800"
                  />
                </FormControl>
                <FormMessage className="px-2" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="px-2">Lastname</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Lastname"
                    {...field}
                    type="text"
                    className="py-0 focus-visible:ring-0 focus:border-sky-800"
                  />
                </FormControl>
                <FormMessage className="px-2" />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="userName"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel className="px-2">User Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="User Name"
                  {...field}
                  type="text"
                  className="py-0 focus-visible:ring-0 focus:border-sky-800"
                />
              </FormControl>
              <FormMessage className="px-2" />
            </FormItem>
          )}
        />
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
                  className="py-0 focus-visible:ring-0 focus:border-sky-800"
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
              <FormLabel className="px-2">Password</FormLabel>
              <FormControl>
                <Input
                  placeholder="password"
                  autoComplete="current-password" // Añadido para accesibilidad
                  {...field}
                  type="password"
                  className="py-0 focus-visible:ring-0 focus:border-sky-800"
                />
              </FormControl>
              <FormMessage className="px-2" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel className="px-2">Confirm Password</FormLabel>
              <FormControl>
                <Input
                  placeholder="password"
                  autoComplete="current-password" // Añadido para accesibilidad
                  {...field}
                  type="password"
                  className="py-0 focus-visible:ring-0 focus:border-sky-800"
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
