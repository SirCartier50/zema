import { useState, useEffect } from "react";
import { db, auth } from "../utils/firebase";
import Compressor from "compressorjs";
import { doc, collection, addDoc, arrayUnion, serverTimestamp, updateDoc, getDoc } from "firebase/firestore";

const Scanner = () => {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [prediction, setPrediction] = useState("");
  const [modal, setModal] = useState(false);
  const [collections, setCollections] = useState([]);
  const [selected, setSelected] = useState("new");
  const [newName, setNewName] = useState("");
  const [user, setUser] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
      setPrediction(null);
      setSubmitted(false);
    }
  };

    const handleSave = () => {
        new Compressor(image, {
            quality: 0.6,
            convertSize: 200000,
            async success(compressedFile) {
                if (!user) return;

                const collectionName = selected === "new" ? newName.trim() : selected;
                if (!collectionName) {
                    console.error("Collection name required.");
                    return;
                }
                try{
                    const reader = new FileReader();
                    reader.readAsDataURL(compressedFile);
                    reader.onloadend = async () => {
                        const base64Image = reader.result;
                        const userDocRef = doc(db, "users", user.uid);

                        await addDoc(
                            collection(userDocRef, collectionName),
                            {
                                prediction,
                                image: base64Image,
                                createdAt: serverTimestamp(),
                            }
                        );
                        await updateDoc(userDocRef, {
                            collections: arrayUnion(collectionName),
                        });
                        setCollections((prev) =>
                            prev.includes(collectionName)
                            ? prev
                            : [...prev, collectionName]
                        );
                        setSubmitted(true)
                    };
                } catch (err) {
                    console.error("Save failed:", err);
                    alert("Something went wrong while saving. Please try again.");
                }
            },
            error(err) {
                console.error("Compression error:", err);
            },
        });
    };

  const handleUpload = async () => {
    if (!image) {
      alert("Please select an image first.");
      return;
    }

    const formData = new FormData();
    formData.append("file", image);

    try {
      const response = await fetch("http://127.0.0.1:5000/escan", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      console.log("Response from AI model:", data);
      setPrediction(data['prediction']);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  useEffect(() => {
    const getuser = auth.onAuthStateChanged((user) => {
      setUser(user); 
    });
    return () => getuser();
  }, []);

  useEffect(() => {
    if (!user) return;

    const getcollection = async () => {
        try {
            const userDocRef = doc(db, "users", user.uid);
            const userSnap = await getDoc(userDocRef);
            if (userSnap.exists()) {
                setCollections(userSnap.data().collections || []);
            } else {
                setCollections([]);
            }
        } catch (err) {
            console.error("Error loading collections:", err);
        }
    }

    getcollection();
  }, [user]);

  

  return (
    <div className="flex flex-col items-center min-h-screen p-6 bg-gradient-to-br from-indigo-100 via-white to-indigo-200 pt-14">
      <h1 className="text-2xl font-bold mb-4">Skin Eczema Scanner</h1>

      {!preview ? (
        <label className="w-80 h-52 flex flex-col items-center justify-center border-2 border-dashed border-gray-400 rounded-lg cursor-pointer bg-white shadow-md hover:bg-gray-50">
          <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
          <img src="/upload-icon.svg" alt="Upload Icon" className="w-12 h-12 mb-2 opacity-60" />
          <span className="text-gray-600">Click to upload an image</span>
        </label>
      ) : (
        <div className="flex flex-col items-center">
            <img
                src={preview}
                alt="Preview"
                className="w-80 h-52 object-cover rounded-lg shadow-md"
            />

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

      {preview && !prediction && (
        <button
          onClick={handleUpload}
          className="mt-4 px-6 py-2 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700"
        >
          Upload Image
        </button>
      )}

      {prediction && !modal && (
        <div className="flex flex-col items-center">
            <h2 className="text-2xl font-bold mt-4 mb-4">{prediction}</h2>
        </div>
      )}

      {prediction && !modal && !submitted && (
        <div className="flex flex-col items-center">
            <button
                className="px-6 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700"
                onClick={()=>{
                    setModal(true)
                }}
            >
                Save Result
            </button>
        </div>
      )}
      {prediction && modal && (
        <div className="flex items-center justify-center">
            <div className="bg-white w-96 h-64 mt-4 rounded-lg shadow-lg p-6 flex flex-col justify-between">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Select Collection
                    </label>
                    <select
                        value={selected}
                        onChange={(e) => setSelected(e.target.value)}
                        className="w-full border rounded-lg px-3 py-2"
                    >
                        <option value="new">Create New Collection</option>
                        {collections.map((col) => (
                        <option key={col} value={col}>
                            {col}
                        </option>
                        ))}
                    </select>

                    {selected === "new" && (
                        <input
                        type="text"
                        placeholder="Enter new collection name"
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                        className="mt-3 w-full border rounded-lg px-3 py-2"
                        />
                    )}
                </div>

                <div className="flex justify-between mt-6">
                    <button
                        className="px-6 py-2 bg-gray-400 text-white rounded-lg shadow hover:bg-gray-600"
                        onClick={() => {
                            setNewName("")
                            setModal(false)
                        }}
                    >
                        Cancel
                    </button>
                    <button
                        className="px-6 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700"
                        onClick={() => {
                        if (selected === "new" && !newName.trim()) {
                            alert("Please enter a collection name.");
                            return;
                        }
                        handleSave()
                        setNewName("")
                        setModal(false);
                        }}
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
      )}
    </div>
  );
};

export default Scanner;
