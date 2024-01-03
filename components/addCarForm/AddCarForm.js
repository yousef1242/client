import { useEffect, useState } from "react";
import classes from "./addCarForm.module.css";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import request from "@/utils/request";
import dynamic from "next/dynamic";
import { IoImageOutline } from "react-icons/io5";
import { AiOutlineDelete } from "react-icons/ai";
import toast from "react-hot-toast";
import Loading from "../loading/Loding";
import { colorsArray } from "@/utils/colorsarray";

const AddCarForm = () => {
  const [categoriesData, setCategoriesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [files, setFiles] = useState([]);
  const [field, setField] = useState({
    name: "",
    model: "",
    category: "",
    color: "",
    price: "",
    specifications: "",
    description: "",
  });
  const { admin } = useSelector((state) => state.admin);
  const router = useRouter();

  // fetch categories data
  useEffect(() => {
    const fetchCategoriesData = async () => {
      if (admin.token) {
        try {
          const { data } = await request.get("/api/categories/get/all");
          if (data.ok) {
            setCategoriesData(data.data);
          }
        } catch (error) {
          console.log(error);
          if (error?.response?.data?.message) {
            toast.error(error.response?.data?.message);
          }
        }
      } else {
        router.push("/");
      }
    };
    fetchCategoriesData();
  }, []);

  // check if token exist
  useEffect(() => {
    if (!admin.token) {
      router.push("/");
    }
  }, []);

  // set loading the page
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  }, []);

  //   add car function
  const addCarFunction = async (e) => {
    e.preventDefault();
    if (
      field.name === "" ||
      field.model === "" ||
      field.category === "" ||
      field.color === "" ||
      field.price === "" ||
      field.description === "" ||
      field.specifications === ""
    ) {
      return toast.error("The required field cannot be empty.");
    }
    if (files.length < 3) {
      return toast.error("Please choose files");
    }
    setLoading(true);

    const formData = new FormData();
    formData.append("name", field.name);
    formData.append("model", field.model);
    formData.append("price", field.price);
    formData.append("category", field.category);
    formData.append("color", field.color);
    formData.append("description", field.description);
    formData.append("specifications", field.specifications);
    for (let i = 0; i < files.length; i++) {
      formData.append("file", files[i].filename);
    }
    try {
      const { data } = await request.post(`/api/cars/add`, formData, {
        headers: {
          Authorization: "bearer " + admin?.token,
        },
      });
      if (data.ok) {
        toast.success(data.message);
        setLoading(false);
        router.push("/dashboard/cars");
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      if (error?.response?.data?.message) {
        toast.error(error?.response?.data?.message);
      }
    }
  };

  return (
    <>
      <div className={classes.addCarForm}>
        <form onSubmit={addCarFunction}>
          <div className="mb-3">
            <label htmlFor="name">Name</label>
            <input
              onChange={(e) =>
                setField({
                  ...field,
                  name: e.target.value,
                })
              }
              value={field?.name}
              type="text"
              id="name"
              placeholder="BMW x6"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="model">Model</label>
            <input
              onChange={(e) =>
                setField({
                  ...field,
                  model: e.target.value,
                })
              }
              value={field?.model}
              type="text"
              id="model"
              placeholder="2023"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="category">Category</label>
            <select
              onChange={(e) =>
                setField({
                  ...field,
                  category: e.target.value,
                })
              }
              id="category"
            >
              <option disabled selected>
                Choose category
              </option>
              {categoriesData?.map((cat) => (
                <>
                  <option value={cat?.title} key={cat?._id}>
                    {cat?.title}
                  </option>
                </>
              ))}
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="color">Color</label>
            <input
              type="text"
              id="color"
              placeholder="Red"
              list="colorOptions"
              value={field?.color}
              name="color"
              onChange={(e) =>
                setField({
                  ...field,
                  color: e.target.value,
                })
              }
            />

            <datalist id="colorOptions">
              {colorsArray?.map((color, index) => (
                <option
                  value={color?.name}
                  key={index + 1}
                  className="text-capitalize"
                />
              ))}
            </datalist>
          </div>
          <div className="mb-3">
            <label htmlFor="price">Price</label>
            <input
              onChange={(e) =>
                setField({
                  ...field,
                  price: e.target.value,
                })
              }
              value={field.price}
              type="number"
              id="price"
              placeholder="15000000"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="description">Description</label>
            <textarea
              onChange={(e) =>
                setField({
                  ...field,
                  description: e.target.value,
                })
              }
              id="description"
              className="w-100 border border-1 p-2"
              style={{ background: "none", outline: "none" }}
            ></textarea>
          </div>
          <div className="mb-3">
            <label htmlFor="Specifications">Specifications</label>
            <textarea
              onChange={(e) =>
                setField({
                  ...field,
                  specifications: e.target.value,
                })
              }
              id="Specifications"
              className="w-100 border border-1 p-2"
              style={{ background: "none", outline: "none" }}
            ></textarea>
          </div>
          <div className="mb-3">
            <label>Files</label>
            <div className="d-flex w-100 justify-content-center justify-content-md-start gap-3">
              {[1, 2, 3, 4]?.map((_, index) => (
                <div key={index} className={classes.fileInput}>
                  <input
                    onChange={(e) => {
                      const newFile = {
                        filename: e.target.files[0],
                        place: index,
                      };

                      setFiles((prevFiles) => {
                        const updatedFiles = [...prevFiles];

                        // Check if a file with the corresponding place exists
                        const existingFileIndex = updatedFiles.findIndex(
                          (file) => file.place === index
                        );

                        if (existingFileIndex !== -1) {
                          // If a file exists, replace it with the new file
                          updatedFiles[existingFileIndex] = newFile;
                        } else {
                          // If no file exists, add the new file to the array
                          updatedFiles.push(newFile);
                        }

                        // Sort the array based on the 'place' property
                        updatedFiles.sort((a, b) => a.place - b.place);

                        return updatedFiles;
                      });
                    }}
                    accept=".jpeg,.jpg,.webp,.png"
                    type="file"
                    className="d-none"
                    id={`imageInput_${index}`}
                  />

                  {files?.find((file) => file.place === index) ? (
                    <div className="position-relative h-100">
                      <img
                        loading="lazy"
                        className="w-100 h-100"
                        src={URL.createObjectURL(
                          files.find((file) => file.place === index).filename
                        )}
                        alt={`Image ${index}`}
                        key={index}
                      />
                      <span
                        onClick={() => {
                          const deleteFile = files?.filter(
                            (file) => file.place !== index
                          );
                          setFiles(deleteFile);
                        }}
                        className="position-absolute top-0 text-white p-1"
                        style={{
                          background: "var(--orange)",
                          right: "0",
                          cursor: "pointer",
                        }}
                      >
                        <AiOutlineDelete />
                      </span>
                    </div>
                  ) : (
                    <label
                      htmlFor={`imageInput_${index}`}
                      className="d-flex fs-5 align-items-center flex-column justify-content-center d-block h-100 w-100 mb-0"
                      style={{ cursor: "pointer" }}
                      key={index}
                    >
                      <span>
                        <IoImageOutline />
                      </span>
                      {index === 0 && (
                        <span className="d-block mt-1">Cover</span>
                      )}
                    </label>
                  )}
                </div>
              ))}
            </div>
          </div>
          <button className="orangetoblack d-block mt-4 w-100">Add</button>
        </form>
      </div>
      {loading ? <Loading /> : ""}
    </>
  );
};

export default AddCarForm;
