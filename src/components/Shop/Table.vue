<template>
    <div>
        <el-table :data="shops" style="width: 98%">
            <el-table-column fixed label="Name" width="200" prop="name" />
            <el-table-column label="Description" width="350" prop="description" />
            <el-table-column label="Street" width="200" prop="street" />
            <el-table-column label="District" width="200" prop="district" />
            <el-table-column label="City" width="130" prop="city" />
            <el-table-column label="Province" width="130" prop="province" />
            <el-table-column fixed="right" label="Operations" width="250">
                <template #default="props">
                    <div>
                        <el-button
                            icon="el-icon-s-operation"
                            type="warning"
                            circle
                            @click.prevent="moveTo(props.row.id)"
                        />
                        <el-button
                            type="primary"
                            icon="el-icon-edit"
                            circle
                            @click.prevent="editShop(props.row.id)"
                        />
                        <el-button
                            type="danger"
                            icon="el-icon-delete"
                            circle
                            @click.prevent="deleteShop(props.row.id)"
                        />
                    </div>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination
            background
            layout="prev, pager, next"
            :page-count="totalPage"
            :hide-on-single-page="isSinglePage"
            :current-page="currentPage"
            :page-size="10"
            @current-change="pageChange"
            class="pagination"
        >
        </el-pagination>
        <Modal v-if="isModalVisible" @close="onClose" :shopId="shopId" />
    </div>
</template>

<script>
import Modal from "components/Shop/Modal.vue";
import { GetAllShop, DeleteShop } from "api/shop";
export default {
    components: {
        Modal,
    },
    mounted() {
        this.pageChange(this.currentPage);
    },
    methods: {
        pageChange(newPage) {
            this.currentPage = newPage;
            GetAllShop(this.currentPage)
                .then((resp) => {
                    this.totalPage = resp.total_page;
                    this.shops = resp.shops;
                })
                .catch((err) => {
                    var msg = "unknown error";
                    if (err.response.status >= 400) {
                        msg = err.response.data.error;
                    }
                    this.shops = [];
                    this.totalPage = 0;
                    this.$notify.error({
                        title: "Error",
                        message: msg,
                    });
                });
        },
        moveTo(shopId) {
            this.$router.push("/shop/detail/" + shopId);
        },
        editShop(shopId) {
            this.shopId = shopId;
            this.isModalVisible = true;
        },
        deleteShop(shopId) {
            if (shopId === 0) {
                return;
            }
            DeleteShop(shopId)
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
                .then(() => this.pageChange(this.currentPage));
        },
        onClose() {
            this.isModalVisible = false;
            this.shopId = 0;
            this.pageChange(this.currentPage);
        },
    },
    computed: {
        isSinglePage() {
            return this.totalPage <= 1;
        },
    },
    data() {
        return {
            shopId: 0,
            currentPage: 1,
            shops: [],
            totalPage: 1,
            isModalVisible: false,
        };
    },
};
</script>

<style></style>
