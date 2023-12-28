import request from "@/utils/request";
import { Table } from "react-bootstrap";
import toast from "react-hot-toast";
import { MdDelete } from "react-icons/md";
import { useSelector } from "react-redux";
import Loading from "../loading/Loding";
import { useState } from "react";

const AdminsTable = ({ fetchData, setFetchData }) => {
  const { admin } = useSelector((state) => state.admin);
  const [loading, setLoading] = useState(false);

  // delete admin function
  const deleteAdminFunction = async (adminId) => {
    if (adminId) {
      setLoading(true);
      try {
        const { data } = await request.delete(`/api/admins/delete/${adminId}`, {
          headers: {
            Authorization: "bearer " + admin?.token,
          },
        });
        if (data.ok) {
          toast.success(data.message);
          setLoading(false);
          const updatedAdmins = fetchData?.admins?.filter(
            (admin) => admin._id !== adminId
          );
          const updatedfetchData = {
            ...fetchData,
            admins: updatedAdmins,
          };
          setFetchData(updatedfetchData);
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
            <th>Name</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {fetchData?.admins?.map((ad, index) => (
            <tr key={ad?._id}>
              <td>{index + 1}</td>
              <td>{ad?.name}</td>
              <td>{ad?.email}</td>
              <td>
                {ad?._id !== admin.id ? (
                  <div className="d-flex align-items-center justify-content-center">
                    <span
                      onClick={() => deleteAdminFunction(ad?._id)}
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
                ) : (
                  ""
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      {loading ? <Loading /> : ""}
    </>
  );
};

export default AdminsTable;
