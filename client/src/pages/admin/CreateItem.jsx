import { useMutation } from "@tanstack/react-query";
import { queryClient,createProduct } from "../../utils/http";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { useState } from "react";
import { app } from "../../firebase.js";






function CreateItem() {
  const [formData, setFormData] = useState({
    brand: "",
    name: "",
    description: "",
    maxQuantity: '',
    colors: [],
    featured: false,
    recommended: false,
    price: 0,
    images: []
  });
  const [files, setFiles] = useState([]);

  const [filePercent, setFilePercent] = useState(0);
  const [imageUploadError, setImageUploadError] = useState("");
  const [loading, setLoading] = useState(false);
  const [uploadError, setUploadError] = useState(false);


  const {mutate,status, isError,error, isPending } = useMutation({
    mutationKey: ['products'],
    mutationFn: createProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['products']});
    }
  });

  const handleUpload = () => {
    if (files.length > 0 && files.length < 6) {
      setLoading(true);
      setUploadError(false);
      const promises = [];

      for (let i = 0; i < files.length; i++) {
        promises.push(storeImages(files[i]));
      }

      Promise.all(promises).then((urls) => {
        setFormData({
          ...formData,
          images: formData.images.concat(urls),
        });
        
        setLoading(false);
        setUploadError(false);
      }).catch((err) => {
        setImageUploadError(err);
        setLoading(false);
      });
    } else {
      setImageUploadError("You can only upload upto 6 images per product");
      setLoading(false);
    }
  };

  const storeImages = (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);

      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setFilePercent(Math.round(progress));
        },
        (err) => {
          reject(err);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
            resolve(downloadUrl);
          });
        }
      );
    });
  };

  


  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    })
  };

  const handleColorChange = (e) => {
    const colorArray = (e.target.value).split(',').map((item) => item.trim()).filter((item) => item !== '');
    setFormData({
      ...formData,
      colors: colorArray
    })

  };

  const handleSizeChange = (e) => {
    const storageArray = (e.target.value)
      .split(",")
      .map((item) => item.trim())
      .filter((item) => item !== "");
    setFormData({
      ...formData,
      storage: storageArray,
    });
  };

  const handleRemove = (index) => {
    setFormData({
      ...formData,
      images: formData.images.filter((_, i) => i !== index)
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.images.length < 1) return setImageUploadError("You must upload at least one image");
    mutate(formData);
  };

  if (isError) {
    return <p>{error.info?.message}</p>
  }

  return (
    <div className="w-full mt-1 p-4">
      <h1 className="text-slate-600 font-semibold text-center mb-2">
        Create Product
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-8">
        <div className="flex-1">
          <div className="flex flex-col items-center justify-between border border-slate-500 p-4 gap-2">
            <label className="text-slate-500 font-semibold">Brand</label>
            <input
              type="text"
              id="brand"
              className="p-3 border rounded border-slate-400 w-[80%]"
              required
              onChange={handleChange}
            />
            <label className="text-slate-500 font-semibold">Name</label>
            <input
              type="text"
              id="name"
              className="p-3 border rounded border-slate-400 w-[80%]"
              required
              onChange={handleChange}
            />
            <label className="text-slate-500 font-semibold">Description</label>
            <textarea
              id="description"
              className="p-3 border rounded border-slate-400 w-[80%]"
              required
              onChange={handleChange}
            />
            <label className="text-slate-500 font-semibold">
              Available Product Quantity
            </label>
            <input
              type="number"
              id="maxQuantity"
              className="p-3 border rounded border-slate-400 w-[80%]"
              required
              onChange={handleChange}
            />
            <label className="text-slate-500 font-semibold">
              Available Colors
            </label>
            <input
              type="text"
              onChange={handleColorChange}
              className="p-3 border rounded border-slate-400 w-[80%]"
              required
            />
            <label className="text-slate-500 font-semibold">Storage</label>
            <input
              type="text"
              className="p-3 border rounded border-slate-400 w-[80%]"
              required
              onChange={handleSizeChange}
              defaultValue={formData.storage}
            />
            
            <label className="text-slate-500 font-semibold">Category</label>
            <input
              type="text"
              id="category"
              className="p-3 border rounded border-slate-400 w-[80%]"
              required
              onChange={handleChange}
            />
            <label className="text-slate-500 font-semibold">Price</label>
            <input
              type="number"
              id="price"
              className="p-3 border rounded border-slate-400 w-[80%]"
              required
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="flex-1">
          <div className="flex flex-col items-center border border-slate-500 gap-8 p-4">
            <label className="text-slate-500 font-semibold">
              Upload at least one picture of the product
            </label>
            <div className="flex items-center">
              <input
                type="file"
                onChange={(e) => setFiles(e.target.files)}
                accept="image/*"
                multiple
              />
              <button
                disabled={loading}
                type="button"
                onClick={handleUpload}
                className="p-3 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg disabled:cursor-not-allowed"
              >
                {loading ? "loading..." : "upload"}
              </button>
            </div>
            {loading && <p className="text-slate-500">{filePercent}</p>}

            {!loading && imageUploadError && (
              <p className="text-red-700">{imageUploadError}</p>
            )}

            {formData.images.length > 0 &&
              formData.images.map((url, index) => (
                <div
                  key={url}
                  className="flex justify-between p-3 border items-center w-[80%]"
                >
                  <img
                    src={url}
                    alt="images"
                    className="w-20 h-20 object-contain rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemove(index)}
                    className="text-red-700 uppercase rounded-lg hover:opacity-95"
                  >
                    Delete
                  </button>
                </div>
              ))}
          </div>
          <button
            disabled={loading || isPending}
            className="p-3 bg-slate-800 text-white rounded-lg uppercase hover:opacity-95 disabled:cursor-not-allowed w-full mt-12"
          >
            {loading && isPending ? "creating..." : "create"}
          </button>
          {status === "success" && (
            <p className="text-green-800">product created successfully</p>
          )}
        </div>
      </form>
    </div>
  );
}

export default CreateItem;
