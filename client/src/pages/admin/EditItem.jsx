import { useMutation,useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { editProduct,queryClient,getProductById } from "../../utils/http";
import { useEffect, useState } from "react";

import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../../firebase";

function EditItem() {
  const params = useParams();

   const { data, isError, error, isLoading } = useQuery({
     queryKey: ["products"],
     queryFn: () => getProductById(params.productId),
   });

  const [files, setFiles] = useState([]);
  const [filePercent, setFilePercent] = useState(0);
    const [imageUploadError, setImageUploadError] = useState("");
    const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({});


  useEffect(() => {
    setFormData(data);
  }, [data]);


  const mutation = useMutation({
    mutationKey: ['products'],
    mutationFn: () => editProduct(params.productId, formData),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['products']})
    }
  });

  const handleUpload = () => {
    if (files.length > 0 && files.length < 4) {
      setLoading(true);
      const promises = [];

      for (let i = 0; i < files.length; i++) {
        promises.push(storeImages(files[i]));
      }

      Promise.all(promises)
        .then((url) => {
          setFormData({
            ...formData,
            images: formData.images.concat(url),
          });
          setLoading(false);
        })
        .catch((err) => {
          setImageUploadError(err);
          setLoading(false);
        });
    } else {
      setImageUploadError("You can only upload upto 4 images per product");
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
      [e.target.id]: e.target.value,
    });
  };

  const handleColorChange = (e) => {
    const colorArray = e.target.value
      .split(",")
      .map((item) => item.trim())
      .filter((item) => item !== "");
    setFormData({
      ...formData,
      colors: colorArray,
    });
  };

    const handleSizeChange = (e) => {
      const sizeArray = e.target.value
        .split(",")
        .map((item) => item.trim())
        .filter((item) => item !== "");
      setFormData({
        ...formData,
        sizes: sizeArray,
      });
    };




  const handleRemove = (index) => {
    setFormData({
      ...formData,
      images: formData.images.filter((_,i) => i !== index)
    });
  };

    const handleSubmit = (e) => {
      e.preventDefault();
      mutation.mutate();
    }; 

    if (isLoading) {
      return <p className="text-center">Loading...</p>;
    }

    if (isError) {
      return <p className="text-center text-red-600">{error.info?.message}</p>;
    }




  return (
    <div className="w-full h-full p-4">
      <h1 className="text-slate-600 font-semibold text-center mb-2">
        Edit product
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
              defaultValue={formData.brand}
            />
            <label className="text-slate-500 font-semibold">Name</label>
            <input
              type="text"
              id="name"
              className="p-3 border rounded border-slate-400 w-[80%]"
              required
              onChange={handleChange}
              defaultValue={formData.name}
            />
            <label className="text-slate-500 font-semibold">Description</label>
            <textarea
              id="description"
              className="p-3 border rounded border-slate-400 w-[80%]"
              required
              onChange={handleChange}
              defaultValue={formData.description}
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
              defaultValue={formData.maxQuantity}
            />
            <label className="text-slate-500 font-semibold">
              Available Colors
            </label>
            <input
              type="text"
              onChange={handleColorChange}
              className="p-3 border rounded border-slate-400 w-[80%]"
              required
              defaultValue={formData.colors}
            />
            <label className="text-slate-500 font-semibold">Sizes</label>
            <input
              type="text"
              className="p-3 border rounded border-slate-400 w-[80%]"
              required
              onChange={handleSizeChange}
              defaultValue={formData.sizes}
            />
            <label className="text-slate-500 font-semibold">Featured</label>
            <input
              type="text"
              id="featured"
              className="p-3 border rounded border-slate-400 w-[80%]"
              required
              onChange={handleChange}
              defaultValue={formData.featured}
            />
            <label className="text-slate-500 font-semibold">Recommended</label>
            <input
              type="text"
              id="recommended"
              className="p-3 border rounded border-slate-400 w-[80%]"
              required
              onChange={handleChange}
              defaultValue={formData.recommended}
            />
            <label className="text-slate-500 font-semibold">Price</label>
            <input
              type="number"
              id="price"
              className="p-3 border rounded border-slate-400 w-[80%]"
              required
              onChange={handleChange}
              defaultValue={formData.price}
            />
          </div>
        </div>
        <div className="flex-1">
          <div className="flex flex-col items-center border border-slate-500 gap-8 h-full p-4">
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
            <p className="text-slate-500 font-semibold">Product images</p>
            {loading && <p className="text-slate-500">{filePercent}</p>}

            {!loading && imageUploadError && (
              <p className="text-red-700">{imageUploadError}</p>
            )}

            {formData.images && formData.images.length > 0 &&
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
            disabled={loading || mutation.isPending}
            className="p-3 bg-slate-800 text-white rounded-lg uppercase hover:opacity-95 disabled:cursor-not-allowed w-full mt-6"
          >
            {loading && mutation.isPending ? "updating..." : "Update"}
          </button>
          {mutation.status === "success"? (
            <p className="text-green-800">product updated successfully</p>
          ) : mutation.status === "error" && <p>{mutation.error.info?.message}</p>}
        </div>
      </form>
    </div>
  );
}

export default EditItem