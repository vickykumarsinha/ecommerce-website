import { Link } from "react-router-dom";
import { useState } from "react";
import CommonForm from "@/components/common/form";
import { loginFormControl } from "@/config";
import AuthRegister from "./register";
import { loginUser } from "@/store/auth-slice";
import { useDispatch } from "react-redux";
import { toast } from "@/hooks/use-toast";

const initialState = {
  email : 'abc@xyz.com',
  password : '',
}

function AuthLogin () {

  const dispatch = useDispatch();
  const [formData, setFormData] = useState(initialState)

  function onSubmit(event){
    event.preventDefault();
    dispatch(loginUser(formData)).then( (data) => {
      if(data?.payload?.success){
        toast({
          title: data?.payload?.message,
        })
      }else{
        toast({
          title: data?.payload?.message,
          variant: 'destructive',
        })

      }
    })
  }
  
    return(
      <div className="mx-auto w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Sign in to your Account
        </h1>
        <p className="mt-2 ">Did'nt have an account?
          <Link to="/auth/register" className="font-medium  text-primary hover:underline ml-2"> Sign up </Link>
        </p>
      </div>
      <CommonForm 
        formControls ={loginFormControl}
        buttonText = {'Log In'}
        formData = {formData}
        setFormData = {setFormData}
        onSubmit = {onSubmit}
      />
    </div>
    );
}

export default AuthLogin;