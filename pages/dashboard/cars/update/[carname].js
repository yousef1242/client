import UpdateCarForm from "@/components/updateCarForm/UpdateCarForm";
import Head from "next/head";


const UpdateCarDashboardPage = () => {
    return ( 
        <>
            <Head>
                <title>Dashboard</title>
            </Head>
            <div className="updateCarPage pt-5 pb-5">
                <div className="container" style={{width:"50%"}}>
                    <h2 className="fw-bold mb-5">Update car</h2>
                    <UpdateCarForm />
                </div>
            </div>
        </>
     );
}
 
export default UpdateCarDashboardPage;