import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { FormAuthLoginComponent } from "../../components/FormAuthLoginComponent";
import { Toaster } from "@/components/ui/toaster";

export const LoginPage = () => {
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
              <span>Enter your email and a password to acces your account</span>
            </div>
            <div className="w-1/2 mb-20">
              <FormAuthLoginComponent />
            </div>
          </div>
          <div>
            <div>
              <span>Don't have an account?</span>
              <Link to={"/auth/register"} className="text-slate-900">
                <Button variant={"link"}>Sing Up</Button>
              </Link>
            </div>
          </div>
        </section>
        <Toaster />
      </main>
    </>
  );
};
