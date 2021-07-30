import API from "./base";

const GetDorayakiByID = (id) => {
    return API.get("/dorayaki/" + id).then((resp) => resp.data.data);
};

const GetAllDorayaki = (page) => {
    return API.get("/dorayaki", { params: { page } }).then((resp) => resp.data.data);
};

const UploadFile = (data) => {
    const formData = new FormData();
    formData.append("file", data);
    return API.post("/file", formData).then((resp) => resp.data.data);
};

const CreateDorayaki = (data) => {
    return API.post("/dorayaki", data).then((resp) => resp.data.data);
};

const UpdateDorayaki = (id, data) => {
    return API.patch("/dorayaki", { ...data, id }).then((resp) => resp.data.data);
};

const DeleteDorayaki = (id) => {
    return API.delete("/dorayaki/" + id).then((resp) => resp.data.data);
};

export {
    GetDorayakiByID,
    UploadFile,
    CreateDorayaki,
    UpdateDorayaki,
    GetAllDorayaki,
    DeleteDorayaki,
};
