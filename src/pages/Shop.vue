<template lang="html">
    <div>
        <el-button type="success" icon="el-icon-plus" class="item" @click="onCreate">
            New Shop
        </el-button>
        <Table :key="k" />
        <Modal v-if="isModalVisible" @close="onClose" @reload="onReload" :shopId="0" />
    </div>
</template>

<script>
import Table from "components/Shop/Table.vue";
import Modal from "components/Shop/Modal.vue";
export default {
	components: {
		Table,
		Modal,
	},
	data() {
		return {
			isModalVisible: false,
			k: 0,
		};
	},
	methods: {
		onCreate() {
			this.isModalVisible = true;
		},
		onClose() {
			this.isModalVisible = false;
			this.k++;
		},
		onReload() {
			this.k += 1;
		},
	},
};
</script>

<style lang="scss" scoped>
.item {
	margin-bottom: 10px;
}
</style>
