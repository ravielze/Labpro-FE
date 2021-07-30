import API from "./base";

const GetShopByID = (id) => {
    return API.get("/shop/" + id).then((resp) => resp.data.data);
};

const GetAllShop = (page) => {
    return API.get("/shop", { params: { page } }).then((resp) => resp.data.data);
};

const CreateShop = (data) => {
    return API.post("/shop", data).then((resp) => resp.data.data);
};

const UpdateShop = (id, data) => {
    return API.patch("/shop", { ...data, id }).then((resp) => resp.data.data);
};

const DeleteShop = (id) => {
    return API.delete("/shop/" + id).then((resp) => resp.data.data);
};

export { GetShopByID, GetAllShop, CreateShop, UpdateShop, DeleteShop };
