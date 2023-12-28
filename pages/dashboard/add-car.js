import AddCarForm from "@/components/addCarForm/AddCarForm";
import Head from "next/head";


const AddCarDashboardPage = () => {
    return ( 
        <>
            <Head>
                <title>Dashboard</title>
            </Head>
            <div className="addCarPage pt-5 pb-5">
                <div className="container" style={{width:"50%"}}>
                    <h2 className="fw-bold mb-5">Add car</h2>
                    <AddCarForm key={"addCarForm"}/>
                </div>
            </div>
        </>
     );
}
 
export default AddCarDashboardPage;