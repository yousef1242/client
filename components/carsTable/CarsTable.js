import Table from "react-bootstrap/Table";
import { MdDelete } from "react-icons/md";
import { AiFillEdit } from "react-icons/ai";
import { useRouter } from "next/router";
import { useState } from "react";
import Loading from "../loading/Loding";
import toast from "react-hot-toast";
import request from "@/utils/request";
import { useSelector } from "react-redux";
import { FaEye } from "react-icons/fa6";

function CarsTable({ setCarsData, carsData }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { admin } = useSelector((state) => state.admin);

  // delete car function
  const deleteCarFunction = async (carId) => {
    if (admin) {
      try {
        if (!carId) {
          return toast.error("Car id not found");
        }
        setLoading(true);
        const { data } = await request.delete(`/api/cars/delete/${carId}`, {
          headers: {
            Authorization: "bearer " + admin.token,
          },
        });
        if (data.ok) {
          toast.success(data.message);
          const filterDeleteCar = carsData?.filter((car) => car?._id !== carId);
          setCarsData(filterDeleteCar);
          setLoading(false);
        }
      } catch (error) {
        console.log(error);
        if (error?.response?.data?.message) {
          toast.error(error?.response?.data?.message);
        }
        setLoading(false);
      }
    } else {
      toast.error("Invalid token");
    }
  };

  return (
    <>
      <Table className="text-center" striped bordered hover>
        <thead>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Image</th>
            <th>Model</th>
            <th>Category</th>
            <th>Color</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {carsData?.map((car, index) => (
            <tr key={car?._id}>
              <td>{index + 1}</td>
              <td>{car?.name}</td>
              <td>
                <img
                loading="lazy"
                  style={{
                    width: "70px",
                    objectFit: "contain",
                    height: "70px",
                  }}
                  src={car?.files[0]?.url}
                  alt="car_image"
                />
              </td>
              <td>{car?.model}</td>
              <td>{car?.category}</td>
              <td>{car?.color}</td>
              <td>EGP {car?.price}</td>
              <td>
                <div className="d-flex align-items-center justify-content-center gap-2">
                  <span
                    onClick={() => {
                      router.push(`/dashboard/cars/update/${car?.name}`);
                    }}
                    className="d-flex align-items-center justify-content-center text-white"
                    style={{
                      width: "30px",
                      height: "30px",
                      background: "var(--orange)",
                      cursor: "pointer",
                      borderRadius: "50%",
                    }}
                  >
                    <AiFillEdit />
                  </span>
                  <span
                    onClick={() => deleteCarFunction(car?._id)}
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
                  <span
                    onClick={() => {
                      router.push(`/cars/${car?.name}`);
                    }}
                    className="d-flex align-items-center justify-content-center text-white"
                    style={{
                      width: "30px",
                      height: "30px",
                      background: "var(--orange)",
                      cursor: "pointer",
                      borderRadius: "50%",
                    }}
                  >
                    <FaEye />
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

export default CarsTable;
