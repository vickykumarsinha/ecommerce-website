import ProductImageUpload from "@/components/admin-view/image-upload";
import CommonForm from "@/components/common/form";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { addProductFormElements } from "@/config";

import { Fragment, useState } from "react";

const initialData = {
    image: null,
    title: "",
    description: "",
    category: '',
    brand: '',
    price: '',
    salePrice: '',
    totalStock: '',
}

function onSubmimt(){}

function AdminProducts() {

    const [openAddProdSheet, setOpenAddProdSheet] = useState(false);
    const [formData, setFormData] = useState(initialData);
    const [imageFile, setImageFile] = useState(null);
    const [imageUploadURL, setImageUploadURL] = useState("");

    return (
        <Fragment>
            <div className="mb-4 flex justify-end">
                <Button className="bg-blue-600 hover:bg-blue-800" onClick={() => setOpenAddProdSheet(true)}>
                    Add New Product
                </Button>
            </div>
            <div className=" grid gap-4 md:grid-cols-3 lg:grid-cols-4">

            </div>

            <Sheet
                open={openAddProdSheet}
                onOpenChange={() => {
                    setOpenAddProdSheet(false);
                }}>
                    <SheetContent className=" overflow-auto">
                        <SheetHeader>
                            <SheetTitle className="text-xl">Add New Product</SheetTitle>
                        </SheetHeader>
                        <ProductImageUpload 
                            imageFile={imageFile}
                            setImageFile={setImageFile}
                            imageUploadURL={imageUploadURL}
                            setImageUploadURL={setImageUploadURL}    
                        />
                        <div className="py-8">
                            <CommonForm
                                onSubmit={onSubmimt}
                                setFormData={setFormData}
                                formData={formData}
                                formControls = {addProductFormElements}
                                buttonText='Add Product'
                            />
                        </div>
                    </SheetContent>
                   
            </Sheet>
        </Fragment>
    );
}

export default AdminProducts;