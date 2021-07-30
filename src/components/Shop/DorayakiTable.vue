<template>
    <div>
        <el-table :data="dorayakis" style="width: 98%">
            <el-table-column fixed label="Name" width="200" prop="name" />
            <el-table-column label="Stock" width="350" prop="stock" />
            <el-table-column label="Modify Stock" width="300">
                <template #default="props">
                    <div class="stock-container">
                        <el-input-number v-model="props.row.stock" :min="0"></el-input-number>
                        <el-button
                            type="primary"
                            icon="el-icon-set-up"
                            @click.prevent="modifyStock(props.row.id, props.row.stock)"
                            size="small"
                            class="item"
                        >
                            Modify
                        </el-button>
                    </div>
                </template>
            </el-table-column>
            <el-table-column fixed="right" label="Operations" width="400">
                <template #default="props">
                    <div>
                        <el-button
                            type="info"
                            icon="el-icon-document"
                            circle
                            @click.prevent="infoDorayaki(props.row.id)"
                        />
                        <el-button
                            type="danger"
                            icon="el-icon-close"
                            circle
                            @click.prevent="removeStock(props.row.id)"
                        />
                    </div>
                </template>
            </el-table-column>
        </el-table>
        <Modal
            v-if="isViewDorayakiModalVisible"
            @close="onCloseViewDorayakiModal"
            :dorayakiId="dorayakiId"
            readOnly
        />
        <TSM
            v-if="isTransferStockModalVisible"
            @close="onCloseViewTransferStock"
            :shopId="shopId"
            :dorayakiId="dorayakiId"
        />
    </div>
</template>

<script>
import { UpdateStock, GetSoldByShop } from "api/stock";
import Modal from "components/Dorayaki/Modal.vue";
import TSM from "components/Shop/TransferStockModal.vue";
export default {
    components: {
        Modal,
        TSM,
    },
    data() {
        return {
            value: 0,
            shopId: 0,
            dorayakiId: 0,
            isViewDorayakiModalVisible: false,
            isTransferStockModalVisible: false,
            dorayakis: [],
            isModalVisible: false,
        };
    },
    methods: {
        reload() {
            GetSoldByShop(this.shopId).then((resp) => {
                this.dorayakis = resp;
            });
        },
        infoDorayaki(id) {
            this.dorayakiId = id;
            this.isViewDorayakiModalVisible = true;
        },
        transfer(id) {
            this.dorayakiId = id;
            this.isTransferStockModalVisible = true;
        },
        onCloseViewDorayakiModal() {
            this.isViewDorayakiModalVisible = false;
            this.reload();
        },
        onCloseViewTransferStock() {
            this.isTransferStockModalVisible = false;
            this.reload();
        },
        modifyStock(id, stock) {
            UpdateStock(this.shopId, id, stock)
                .catch((err) => {
                    var msg = "unknown error";
                    if (err.response.status == 422) {
                        msg = err.response.data.error[0].message;
                    } else {
                        msg = err.response.data.error;
                    }
                    this.$notify.error({
                        title: "Error",
                        message: msg,
                    });
                })
                .then(() => {
                    this.reload();
                });
        },
        removeStock(id) {
            this.modifyStock(id, 0);
        },
    },
    mounted() {
        this.shopId = parseInt(this.$route.params.id);
        this.reload();
    },
};
</script>

<style lang="scss" scoped>
.stock-container {
    flex-direction: row;
    display: flex;
}

.item {
    margin: 0 10px;
}
</style>
