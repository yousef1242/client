import request from "./request";

const fetchOpinions = async () => {
  const { data } = await request.get("/api/opinions/get/all");

  if (data) {
    return data.data;
  } else {
    throw new Error("Faild fetching data");
  }
};

export default fetchOpinions;
