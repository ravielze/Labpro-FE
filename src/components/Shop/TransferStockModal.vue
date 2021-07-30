<template>
	<el-dialog
		@closed="$emit('close')"
		:model-value="true"
		class="dialogContainer"
		close-on-press-escape
		close-on-click-modal
	>
		<TransferStock
			:shopId="shopId"
			@close="$emit('close')"
			@reload="$emit('reload')"
		/>
	</el-dialog>
</template>

<script>
import TransferStock from "templates/TransferStock.vue";
export default {
	components: {
		TransferStock,
	},
	props: {
		shopId: {
			type: Number,
		},
	},
};
</script>

<style lang="scss" scoped>
.dialogContainer {
	text-align: left;
	justify-content: center;
}
</style>
