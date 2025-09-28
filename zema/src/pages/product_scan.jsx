import { useState } from "react";

const ProductScanner = () => {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [results, setResults] = useState("");

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
      setResults("");
    }
  };

  const handleUpload = async () => {
    if (!image) {
      alert("Please select an image first.");
      return;
    }

    const formData = new FormData();
    formData.append("file", image);

    try {
      const response = await fetch("http://127.0.0.1:5000/pscan", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      console.log("Response from OCR:", data);
      setResults(data['results']);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen p-6 bg-gradient-to-br from-green-100 via-white to-green-200 pt-14">
      <h1 className="text-2xl font-bold mb-4">Product Ingredient Scanner</h1>
      <p className="text-gray-600 mb-4 max-w-md text-center">
        Upload a nutrition label to check if the product contains ingredients that may cause flare-ups.
      </p>

      {!preview ? (
        <label className="w-80 h-52 flex flex-col items-center justify-center border-2 border-dashed border-green-400 rounded-lg cursor-pointer bg-white shadow-md hover:bg-gray-50">
          <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
          <img src="/nutrition-icon.svg" alt="Nutrition Icon" className="w-12 h-12 mb-2 opacity-60" />
          <span className="text-gray-600">Click to upload a nutrition label</span>
        </label>
      ) : (
        <div className="flex flex-col items-center">
          <img src={preview} alt="Preview" className="w-80 h-52 object-cover rounded-lg shadow-md" />
          <input
                type="file"
                accept="image/*"
                className="hidden"
                id="replace-image-input"
                onChange={handleImageChange}
            />
          <button
            onClick={() => {
              document.getElementById("replace-image-input").click();
            }}
            className="mt-3 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
          >
            Replace Image
          </button>
        </div>
      )}

      {preview && !results && (
        <button 
          onClick={handleUpload}
          className="mt-4 px-6 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700"
        >
          Upload Label
        </button>
      )}
      {results && (
        <h2 className="text-2xl font-bold mt-4 mb-4">This product contains ingredients that can active flare ups: {results}</h2>
      )}
    </div>
  );
};

export default ProductScanner;
