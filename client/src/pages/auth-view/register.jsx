import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import CommonForm from "@/components/common/form";
import { registerFormControl } from "@/config";
import { useDispatch } from "react-redux";
import { registerUser } from "@/store/auth-slice";
import { toast } from "@/hooks/use-toast";

const initialState = {
  userName : 'vicky',
  email : 'abc@xyz.com',
  password : '',
}

function AuthRegister () {

  const [formData, setFormData] = useState(initialState)

  const dispatch = useDispatch();
  const navigate = useNavigate();
  function onSubmit(event){
    event.preventDefault()    // prevent reloading
    // dispath data && on success navigate to login page
    dispatch(registerUser(formData)).then( (data)=> {

      // if success send a toast with mssg
      if(data?.payload?.success) {
        toast({
          title: data?.payload?.message,
        });
        navigate("/auth/login");
      }
      else {toast({
        title: data?.payload?.message,
        variant : 'destructive',
      });
    }
    })
  }
  
    return(
      <div className="mx-auto w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Create new account
        </h1>
        <p className="mt-2 ">Already have an Account?
          <Link to="/auth/login" className="font-medium  text-primary hover:underline ml-2"> Login </Link>
        </p>
      </div>
      <CommonForm 
        formControls ={registerFormControl}
        buttonText = {'Sign Up'}
        formData = {formData}
        setFormData = {setFormData}
        onSubmit = {onSubmit}
      />
    </div>
    );
}

export default AuthRegister;