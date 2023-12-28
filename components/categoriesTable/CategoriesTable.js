import { useState } from "react";
import Table from "react-bootstrap/Table";
import { MdDelete } from "react-icons/md";
import { useSelector } from "react-redux";
import Loading from "../loading/Loding";
import toast from "react-hot-toast";
import request from "@/utils/request";

function CategoriesTable({ categoriesData, setCategoriesData }) {
  const { admin } = useSelector((state) => state.admin);
  const [loading, setLoading] = useState(false);

  // delete category function
  const deleteCategoryFunction = async (categoryId) => {
    if (categoryId) {
      setLoading(true);
      try {
        const { data } = await request.delete(
          `/api/categories/delete/${categoryId}`,
          {
            headers: {
              Authorization: "bearer " + admin?.token,
            },
          }
        );
        if (data.ok) {
          toast.success(data.message);
          setLoading(false);
          const updatedAdmins = categoriesData?.filter(
            (category) => category._id !== categoryId
          );
          setCategoriesData(updatedAdmins);
        }
      } catch (error) {
        console.log(error);
        setLoading(false);
        if (error.response?.data?.message) {
          toast.error(error.response?.data?.message);
        }
      }
    } else {
      toast.error("Somthing went wrong");
    }
  };

  return (
    <>
      <Table className="text-center" striped bordered hover>
        <thead>
          <tr>
            <th></th>
            <th>Title</th>
          </tr>
        </thead>
        <tbody>
          {categoriesData?.map((category, index) => (
            <tr key={category?._id}>
              <td>{index + 1}</td>
              <td>{category?.title}</td>
              <td>
                <div className="d-flex align-items-center justify-content-center">
                  <span
                    onClick={() => deleteCategoryFunction(category?._id)}
                    className="d-flex align-items-center justify-content-center text-white"
                    style={{
                      width: "30px",
                      height: "30px",
                      background: "var(--orange)",
                      cursor: "pointer",
                      borderRadius: "50%",
                    }}
                  >
                    <MdDelete />
                  </span>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      {loading ? <Loading /> : ""}
    </>
  );
}

export default CategoriesTable;
