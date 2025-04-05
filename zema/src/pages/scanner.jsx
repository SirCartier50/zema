import { useState } from "react";
import { Label, Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react'


const Scanner = () => {

    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const [scantype, setScanType] = useState("");

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setImage(file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const handleUpload = async () => {
        if (!image) {
            alert("Please select an image first.");
            return;
        }

        const formData = new FormData();
        formData.append("file", image);

        if (scantype == "escan"){
            try {
                const response = await fetch("http://127.0.0.1:5000/escan", {
                method: "POST",
                body: formData,
                });

                const data = await response.json();
                console.log("Response from AI model:", data);
            } catch (error) {
                console.error("Error uploading image:", error);
            }
        }
        else if(scantype == "pscan"){
            try {
                const response = await fetch("http://127.0.0.1:5000/pscan", {
                method: "POST",
                body: formData,
                });

                const data = await response.json();
                console.log("Response from OCR:", data);
            } catch (error) {
                console.error("Error uploading image:", error);
            }
        }
    };
    return(
        <>
            <div className="flex flex-col">
                <h1>Scan for Flare Ups or Products</h1>
                <Listbox value={scantype} onChange={setScanType}>
                    <Label className="block text-sm font-medium text-gray-900">Select a scan type</Label>
                    <div className="relative mt-2">
                        <ListboxButton className="w-full cursor-pointer rounded-md bg-white py-1.5 pr-2 pl-3 text-left text-gray-900 border border-gray-300 focus:ring-indigo-600 sm:text-sm">
                            <span className="block truncate">{scantype}</span>
                        </ListboxButton>

                        <ListboxOptions className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 sm:text-sm">
                            <ListboxOption key={1} value="escan" className="cursor-pointer py-2 pr-9 pl-3 text-gray-900 hover:bg-indigo-600 hover:text-white">
                                Flare Up Scan
                            </ListboxOption>
                            <ListboxOption key={2} value="pscan" className="cursor-pointer py-2 pr-9 pl-3 text-gray-900 hover:bg-indigo-600 hover:text-white">
                                Product Scan
                            </ListboxOption>
                        </ListboxOptions>
                    </div>
                </Listbox>
                <input type="file" accept="image/*" onChange={handleImageChange} />
                {preview && <img src={preview} alt="Preview" style={{ width: "200px" }} />}
                <button onClick={handleUpload}>Upload Image</button>
            </div>
        </>
    )
};

export default Scanner;