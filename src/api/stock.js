import API from "./base";

const UpdateStock = (id_shop, id_dorayaki, stock) => {
    id_shop = parseInt(id_shop);
    return API.patch("/stock", { id_shop, id_dorayaki, stock }).then((resp) => resp.data.data);
};

const GetSoldByShop = (id_shop) => {
    id_shop = parseInt(id_shop);
    return API.get("/stock/" + id_shop).then((resp) => resp.data.data);
};

const TransferStock = (id_from_shop, id_to_shop, id_dorayaki, stock) => {
    id_from_shop = parseInt(id_from_shop);
    id_to_shop = parseInt(id_to_shop);
    id_dorayaki = parseInt(id_dorayaki);
    return API.post("/stock/transfer", { id_from_shop, id_to_shop, id_dorayaki, amount: stock });
};

export { UpdateStock, GetSoldByShop, TransferStock };
