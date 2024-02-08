import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect, useRef, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { UserContext } from "../../context/UserContext";
import { app } from "../../firebase";
import { UpdateUserProfile, queryClient } from "../../utils/http";

import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";

function EditAdminAccount() {
  const userCtx = useContext(UserContext);
  const fileRef = useRef();
  const id = userCtx.current_user._id;
  const navigate = useNavigate();

  const [file, setFile] = useState(undefined);
  const [filePercent, setFilePercent] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});

  const { mutate, data, isError, error, status } = useMutation({
    mutationFn: () => UpdateUserProfile(id, formData),
    onSuccess: () => {
      // queryClient.invalidateQueries({ queryKey: ["user"] });
      userCtx.login(data);
      navigate("/account");
    },
  });

  useEffect(() => {
    if (file) {
      handleFileChange(file);
    }
  }, [file]);

  const handleFileChange = (file) => {
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
      () => {
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFormData({
            ...formData,
            imageUrl: downloadURL,
          });
        });
      }
    );
  };

  const handleChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate();
  };

  return (
    <div className="mt-8 max-w-3xl mx-auto flex flex-col items-center md:w-[60rem] h-full shadow-lg">
      <p>Edit Account Details</p>
      <form
        onSubmit={handleSubmit}
        className="mt-2 w-full h-full flex flex-col items-center gap-5 p-3"
      >
        <input
          type="file"
          ref={fileRef}
          hidden
          accept="image/*"
          onChange={handleChange}
        />
        <img
          onClick={() => fileRef.current.click()}
          src={formData.imageUrl || userCtx.current_user.imageUrl}
          alt="profile picture"
          className="rounded-full h-24 w-24 object-cover cursor-pointer self-center "
        />
        <p className="text-sm self-center">
          {fileUploadError ? (
            <span className="text-red-700">Error image uploaded</span>
          ) : filePercent > 0 && filePercent < 100 ? (
            <span className="text-slate-700">{`uploading: ${filePercent}%`}</span>
          ) : filePercent === 100 ? (
            <span className="text-green-700">Image successfully uploaded</span>
          ) : (
            ""
          )}
        </p>

        <label className="text-slate-500">*Full Name</label>
        <input
          type="text"
          id="name"
          defaultValue={userCtx.current_user.name}
          className="border p-3 rounded-md w-[70%]"
          onChange={handleInputChange}
        />

        <label className="text-slate-500">*Email</label>
        <input
          type="email"
          id="email"
          defaultValue={userCtx.current_user.email}
          className="border p-3 rounded-md w-[70%]"
          onChange={handleInputChange}
        />
        <label className="text-slate-500">
          Mobile Number
        </label>
        <input
          type="number"
          className="border p-3 rounded-md w-[70%]"
          id="phone"
        />
        {isError && <p className="text-red-500">{error.info?.message}</p>}
        <div className="flex items-center justify-around w-full">
          <Link
            to={"/profile"}
            className="border p-3 rounded-lg bg-slate-200 hover:bg-slate-100"
          >
            Back to Profile
          </Link>
          <button
            disabled={status === "pending"}
            className="border p-3 rounded-lg bg-slate-800 text-white hover:shadow-xl disabled:cursor-not-allowed"
          >
            {status === "pending" ? "loading..." : "Update Profile"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditAdminAccount;
