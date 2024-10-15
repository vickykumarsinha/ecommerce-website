import { Label } from "@radix-ui/react-label";
import { Input } from "../ui/input";
import { Select } from "../ui/select";
import { Textarea } from "../ui/textarea";
import { SelectContent, SelectItem, SelectTrigger, SelectValue } from "@radix-ui/react-select";
import { Button } from "../ui/button";

// Dynamic form template 
// FormControl: Array/K-V Pairs passed from config/index.js file
// formData && SetFD = empty at start
function CommonForm({formControls, formData, setFormData, onSubmit, buttonText}) {

    const types = {
        INPUT : 'input',
        SELECT : 'select',
        TEXTAREA : 'textarea'
    }

    // tells which UI compo to render based on componentType
    // formItems -> object representing a single form control & has properties like name, key, compType

    function inputByCompType(formItems){
        let element = null;     // that will be rendered for each element

        // to give initial value check initialState in 'auth-view/register.jsx'
        const value = formData[formItems.name] || ''

        switch (formItems.componentType) {
            // for simple Label & Input box
            case types.INPUT:
                element = <Input
                    name = {formItems.name}
                    placeholder = {formItems.placeholder}
                    id = {formItems.name}
                    type = {formItems.type} 
                    value = {value}
                    onChange = {event=> setFormData({
                        ...formData, [formItems.name] : event.target.value,
                    })}
                />
                break;
            // for options menu to select from
            case types.SELECT:
                element = (<Select value={value} onValueChange={(value) => setFormData({
                    ...formData, [formItems.name] : value
                })}>
                        <SelectTrigger className="w-full">
                            <SelectValue  placeholder={formItems.placeholder}  />

                        </SelectTrigger>
                        <SelectContent>
                            {
                                formItems.options && formItems.options.length > 0 ?
                                formItems.options.map(optionitem => <SelectItem key={optionitem.id} value={optionitem.id}>
                                </SelectItem>) : null
                            }
                        </SelectContent>
                    </Select>
                );
                break;

            case types.TEXTAREA:
                element = <Textarea
                    name = {formItems.name}
                    placeholder = {formItems.placeholder}
                    id = {formItems.id}
                    value = {value}
                    onChange = {event=> setFormData({
                        ...formData, [formItems.name] : event.target.value,
                    })}
                />
                break;
        
            default:
                element = <Input
                    name = {formItems.name}
                    placeholder = {formItems.placeholder}
                    id = {formItems.name}
                    type = {formItems.type} 
                    onChange = {event=> setFormData({
                        ...formData, [formItems.name] : event.target.value,
                    })}
                />
                break;
        }
        return element;
    }

    return (
        <form onSubmit={onSubmit}>
            <div className="flex flex-col gap-3">
                {   
                    // maps formcontrol array to render input element
                    // print label from Array Value
                    formControls.map((controlItems) => (<div className="grid w-full gap-1.5" key = {controlItems.name}>
                        <Label className="mb-1"> {controlItems.label} </Label>
                        {
                            inputByCompType(controlItems)
                        }
                    </div>
                ))}
            </div>
            <Button type ="submit" className="mt-5 w-full">{buttonText || 'Submit'}</Button>
        </form>
    );
}

export default CommonForm;