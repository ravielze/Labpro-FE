<template lang="html">
    <div>
        <el-button class="button" type="success" @click="handleClick" icon="el-icon-plus"
            >Add Dorayaki</el-button
        >
        <el-button icon="el-icon-ship" type="warning" @click.prevent="transfer">
            Transfer Dorayaki
        </el-button>
        <DorayakiTable :key="k" />
        <Modal v-if="isModalVisible" @close="onClose" :shopId="shopId" @reload="onReload"/>
        <TSM
            v-if="isTransferStockModalVisible"
            @close="onCloseViewTransferStock"
            :shopId="shopId"
            @reload="onReload"
        />
    </div>
</template>

<script>
import DorayakiTable from "components/Shop/DorayakiTable.vue";
import Modal from "components/Shop/StockModal.vue";
import TSM from "components/Shop/TransferStockModal.vue";
export default {
	components: {
		DorayakiTable,
		Modal,
		TSM,
	},
	data() {
		return {
			k: 0,
			isModalVisible: false,
			isTransferStockModalVisible: false,
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
		transfer() {
			this.isTransferStockModalVisible = true;
		},
		onCloseViewTransferStock() {
			this.isTransferStockModalVisible = false;
			this.k += 1;
		},
		onReload() {
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
