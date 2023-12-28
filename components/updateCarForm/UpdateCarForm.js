import { useEffect, useState } from "react";
import classes from "./updateCarForm.module.css";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import request from "@/utils/request";
import dynamic from "next/dynamic";
import { IoImageOutline } from "react-icons/io5";
import { AiOutlineDelete } from "react-icons/ai";
import toast from "react-hot-toast";
import Loading from "../loading/Loding";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const updateCarForm = () => {
  const [categoriesData, setCategoriesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [files, setFiles] = useState([]);
  const [field, setField] = useState({
    name: "",
    model: "",
    category: "",
    color: "",
    price: "",
  });
  const [description, setDescription] = useState("");
  const [specifications, setSpecifications] = useState("");
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

  // fetch car data
  useEffect(() => {
    const fetchCarData = async () => {
      if (admin.token) {
        try {
          const { data } = await request.get(
            `/api/cars/get/single/${router.query.carname}`
          );
          if (data.ok) {
            setField({
              name: data?.data?.name,
              model: data?.data?.model,
              category: data?.data?.category,
              color: data?.data?.color,
              price: data?.data?.price,
            });
            setDescription(data?.data?.description);
            setSpecifications(data?.data?.specifications);
            const carFiles = data?.data?.files;
            if (!files.length > 0) {
              for (let i = 0; carFiles && i < carFiles.length; i++) {
                files.push({
                  url: carFiles[i]?.url,
                  publicId: carFiles[i]?.publicId,
                  place: i,
                });
              }
            }
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
    fetchCarData();
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

  //   update car function
  const updateCarFunction = async (e) => {
    e.preventDefault();
    if (
      field.name === "" ||
      field.model === "" ||
      field.category === "" ||
      field.color === "" ||
      field.price === "" ||
      description === "" ||
      specifications === ""
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
    formData.append("description", description);
    formData.append("specifications", specifications);
    for (let i = 0; i < files.length; i++) {
      if (
        typeof files[i].url === "string" &&
        files[i].url.includes("cloudinary")
      ) {
        formData.append("existingFiles", JSON.stringify(files[i])); // Serialize the object
      } else {
        formData.append("file", files[i].filename);
        formData.append("place", files[i].place);
      }
    }
    try {
      const { data } = await request.put(
        `/api/cars/update/${router.query.carname}`,
        formData,
        {
          headers: {
            Authorization: "bearer " + admin?.token,
          },
        }
      );
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
      <div className={classes.updateCarForm}>
        <form onSubmit={updateCarFunction}>
          <div className="mb-3">
            <label htmlFor="name">Name</label>
            <input
              onChange={(e) =>
                setField({
                  ...field,
                  name: e.target.value,
                })
              }
              value={field.name}
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
              value={field.model}
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
              value={field?.category}
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
            <select
              onChange={(e) =>
                setField({
                  ...field,
                  color: e.target.value,
                })
              }
              id="color"
              value={field?.color}
            >
              <option disabled selected>
                Choose color
              </option>
              {[
                "red",
                "black",
                "white",
                "blue",
                "green",
                "yellow",
                "orange",
                "silver",
                "brown",
              ]?.map((color) => (
                <>
                  <option value={color} key={color}>
                    {color}
                  </option>
                </>
              ))}
            </select>
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
            <ReactQuill
              onChange={setDescription}
              value={description}
              id="description"
              theme="snow"
              key={"description-quill"}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="Specifications">Specifications</label>
            <ReactQuill
              value={specifications}
              onChange={setSpecifications}
              id="Specifications"
              theme="snow"
              key={"specifications-quill"}
            />
          </div>
          <div className="mb-3">
            <label>Files</label>
            <div className="d-flex justify-content-between gap-2">
              {[1, 2, 3]?.map((_, index) => (
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
                        src={
                          files.find((file) => file.place === index)?.url &&
                          typeof files.find((file) => file.place === index)
                            ?.url === "string" &&
                          files
                            .find((file) => file.place === index)
                            ?.url.includes("cloudinary")
                            ? files.find((file) => file.place === index)?.url
                            : URL.createObjectURL(
                                files.find((file) => file.place === index)
                                  ?.filename
                              )
                        }
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
          <button className="orangetoblack d-block mt-4 w-100">Update</button>
        </form>
      </div>
      {loading ? <Loading /> : ""}
    </>
  );
};

export default updateCarForm;
