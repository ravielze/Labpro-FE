<template lang="html">
    <div>
        <el-button class="button" type="success" @click="handleClick" icon="el-icon-plus"
            >Add Dorayaki</el-button
        >
        <DorayakiTable :key="k" />
        <Modal v-if="isModalVisible" @close="onClose" :shopId="shopId" />
    </div>
</template>

<script>
import DorayakiTable from "components/Shop/DorayakiTable.vue";
import Modal from "components/Shop/StockModal.vue";
export default {
    components: {
        DorayakiTable,
        Modal,
    },
    data() {
        return {
            k: 0,
            isModalVisible: false,
            shopId: 0,
        };
    },
    mounted() {
        this.shopId = parseInt(this.$route.params.id);
    },
    methods: {
        handleClick() {
            this.isModalVisible = true;
        },
        onClose() {
            this.isModalVisible = false;
            this.k += 1;
        },
    },
};
</script>

<style lang="scss" scoped>
.button {
    margin: 10px 0;
}
</style>
