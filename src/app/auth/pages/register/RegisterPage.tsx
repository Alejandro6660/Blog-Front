import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { FormAuthRegister } from "../../components/FormAuthRegisterComponent";

export const RegisterPage = () => {
  return (
    <>
      <main className="flex w-full px-3 py-3 h-screen">
        <section className="hidden lg:block w-[40%] -full">
          <div className="w-full h-full bg-sky-200 rounded-sm"></div>
        </section>
        <section className="w-full lg:w-[60%] px-3 flex flex-col justify-between items-center">
          <div>
            <h1>Blog</h1>
          </div>
          <div className="w-[80%] px-5 flex-1 flex flex-col items-center justify-center gap-4">
            <div className="flex flex-col items-center mb-7">
              <h1 className="font-bold text-4xl leading-tight">Welcome Back</h1>
              <span>Create your account</span>
            </div>
            <div className="w-full mb-20">
              <div>
                <FormAuthRegister />
              </div>
            </div>
          </div>
          <div>
            <div>
              <span>Don't have an account?</span>
              <Link to={"/auth/login"} className="text-slate-900">
                <Button variant={"link"}>Sing In</Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};
