import { Link } from "react-router-dom";
import { useState } from "react";
import CommonForm from "@/components/common/form";
import { loginFormControl, registerFormControl } from "@/config";
import AuthRegister from "./register";

const initialState = {
  email : 'xyz@abc.com',
  password : '',
}

function AuthLogin () {

  const [formData, setFormData] = useState(initialState)

  function onSubmit(){}
  
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