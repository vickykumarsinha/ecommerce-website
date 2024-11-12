import { useRef } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { FileIcon, UploadCloudIcon, XIcon } from "lucide-react";

function ProductImageUpload({
    imageFile, setImageFile, imageUploadURL, setImageUploadURL,
}){
    const inputRef = useRef(null);

    function handleImageChange(event){
        console.log(event.target.files);
        const selectedFile = event.target.files?.[0];
        if(selectedFile) setImageFile(selectedFile); 
    }

    function handleDrag(event){
        event.preventDefault();
    }
    
    function handleDrop(event){
        event.preventDefault();
        const dropFile = event.dataTransfer.files?.[0];
        if(dropFile) setImageFile(dropFile);
    }

    function handleRemove(event){
        setImageFile(null)
        if(inputRef.current){
            inputRef.current.value = "";
        }
    }

    return(
        <div className="w-full mt-3 max-w-md mx-auto">
            <Label className="text-base font-semibold mb-2 block">
                Upload Image
            </Label>

            <div onDrag={handleDrag} onDrop={handleDrop} className=" border-2 py-4 rounded-xl border-dashed">
                <Input type="file" id="image-upload" className=" hidden" ref={inputRef} onChange={handleImageChange} />
                 {
                    !imageFile ? 
                    (<Label htmlFor="image-upload" className=" flex flex-col items-center text-xs">
                        <UploadCloudIcon className="w-10 h-10 text-muted-foreground  mb-2 cursor-pointer"/>
                        <span>Drag & Drop</span>
                        <span>OR</span>
                        <span>Click to upload</span>
                    </Label>) : (
                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <FileIcon className="w-8 h-8 ml-2"/>
                            </div>
                            <p className="text-sm font-medium"> {imageFile.name}</p>

                            <XIcon className="border-2 mr-2 rounded-md text-muted-foreground hover:text-foreground " onClick={handleRemove}/>
                        </div>)
                 }
            </div>
        </div>
    );
}

export default ProductImageUpload;