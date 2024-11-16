import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { createUserThunk } from "@/store/users/thunks";

const FormSchema = z
  .object({
    name: z.coerce
      .string()
      .min(1, { message: "Name is to short" })
      .max(20, { message: "name us to long" }),
    lastName: z.coerce
      .string()
      .min(1, { message: "Name is to short" })
      .max(20, { message: "name us to long" }),
    userName: z.coerce
      .string()
      .min(1, { message: "Name is to short" })
      .max(20, { message: "name us to long" }),
    email: z.coerce.string().email("Not is email"),
    userRol: z.coerce.string(),
    description: z.coerce.string().optional(),
    password: z.coerce
      .string()
      .min(1, { message: "password is to short" })
      .max(20, { message: "password is to long" }),
    confirmPassword: z.coerce
      .string()
      .min(1, { message: "password is to short" })
      .max(20, { message: "password is to long" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

interface formProps {
  onClose: any;
}

export const FormNewUserComponent = ({ onClose }: formProps) => {
  const dispatch = useDispatch<AppDispatch>();

  const { catalogRol } = useSelector((state: RootState) => state.rolUsers);
  const { status } = useSelector((state: RootState) => state.Users);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      lastName: "",
      userName: "",
      email: "",
      userRol: "",
      password: "",
      description: "",
      confirmPassword: "",
    },
  });

  const onCreateNewUser = (data: any) => {
    dispatch(createUserThunk(data));
    if (status === "success") {
      onClose();
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit((data) => onCreateNewUser(data))}>
        <div className="flex flex-col justify-center items-stretch space-y-3">
          <div className="flex justify-around space-x-1">
            <div className="w-1/2">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="w-full space-y-1">
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
            </div>
            <div className="w-1/2">
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem className="w-full space-y-1">
                    <FormLabel className="px-2">Lastname</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Lastname"
                        {...field}
                        type="text"
                        className="py-5 focus-visible:ring-0 focus:border-sky-800"
                      />
                    </FormControl>
                    <FormMessage className="px-2" />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="flex justify-around space-x-1">
            <div className="w-2/3">
              <FormField
                control={form.control}
                name="userName"
                render={({ field }) => (
                  <FormItem className="w-full space-y-1">
                    <FormLabel className="px-2">UserName</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="UserName"
                        {...field}
                        type="text"
                        className="py-5 focus-visible:ring-0 focus:border-sky-800"
                      />
                    </FormControl>
                    <FormMessage className="px-2" />
                  </FormItem>
                )}
              />
            </div>
            <div className="w-1/3">
              <FormField
                control={form.control}
                name="userRol"
                render={({ field }) => (
                  <FormItem className="w-full space-y-1">
                    <FormLabel className="px-2">Rol</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger className="w-full py-5 focus-visible:ring-0 focus:border-sky-800">
                          <SelectValue placeholder="Select Rol" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Rol Users</SelectLabel>
                            <hr />
                            {catalogRol.map((rol) => (
                              <SelectItem
                                value={rol.id.toString()}
                                key={rol.id}
                              >
                                {rol.name}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage className="px-2" />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="flex justify-around space-x-1">
            <div className="w-full">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="w-full space-y-1">
                    <FormLabel className="px-2">Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Email"
                        {...field}
                        type="text"
                        className="py-5 focus-visible:ring-0 focus:border-sky-800"
                      />
                    </FormControl>
                    <FormMessage className="px-2" />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="flex justify-around space-x-1">
            <div className="w-full">
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem className="w-full space-y-1">
                    <FormLabel className="px-2">Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Tell us a little bit about yourself"
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="px-2" />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="flex justify-around space-x-1">
            <div className="w-1/2">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="w-full space-y-1">
                    <FormLabel className="px-2">Password</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Password"
                        {...field}
                        type="password"
                        autoComplete="new-password"
                        className="py-5 focus-visible:ring-0 focus:border-sky-800"
                      />
                    </FormControl>
                    <FormMessage className="px-2" />
                  </FormItem>
                )}
              />
            </div>
            <div className="w-1/2">
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem className="w-full space-y-1">
                    <FormLabel className="px-2">Confirm password</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Confirm password"
                        {...field}
                        type="password"
                        autoComplete="new-password"
                        className="py-5 focus-visible:ring-0 focus:border-sky-800"
                      />
                    </FormControl>
                    <FormMessage className="px-2" />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="flex justify-around space-x-1 py-3">
            <div className="w-full flex justify-center">
              <div className="w-1/3">
                <Button
                  variant={"blueOutline"}
                  className="w-full"
                  type="submit"
                >
                  Save
                </Button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </Form>
  );
};
