<template>
	<div class="container">
		<div class="section">
			<span>To Shop:</span>
			<el-select v-model="toShopId" filterable placeholder="Select">
				<el-option
					v-for="item in shopOptions"
					:key="item.value"
					:label="item.label"
					:value="item.value"
				>
				</el-option>
			</el-select>
		</div>
		<div class="section">
			<span>Dorayaki:</span>
			<el-select v-model="dorayakiId" filterable placeholder="Select">
				<el-option
					v-for="item in options"
					:key="item.value"
					:label="item.label"
					:value="item.value"
				>
				</el-option>
			</el-select>
		</div>
		<div class="section">
			<span>Stock:</span>
			<el-input-number v-model="stock" :min="1"></el-input-number>
		</div>
		<div class="section submit">
			<el-button type="success" round class="submit" @click="onSubmit"
				>Create</el-button
			>
		</div>
	</div>
</template>

<script>
import { GetAllShop } from "api/shop";
import { GetSoldByShop, TransferStock } from "api/stock";
export default {
	props: {
		shopId: {
			type: Number,
			default: 0,
		},
	},
	data() {
		return {
			dorayakiId: undefined,
			toShopId: undefined,
			stock: 1,
			soldDorayaki: [],
			allShops: [],
			options: [],
			shopOptions: [],
		};
	},
	mounted() {
		GetSoldByShop(this.shopId)
			.then((resp) => {
				this.soldDorayaki = resp;
				const mapping = {};

				this.soldDorayaki.forEach((x) => {
					mapping[x.id] = x.name;
				});

				const opt = [];
				for (var i in mapping) {
					if (
						mapping[i] === "" ||
						mapping[i] === undefined ||
						mapping[i] === null
					) {
						continue;
					}
					opt.push({
						label: mapping[i],
						value: i,
					});
				}
				this.options = opt;

				GetAllShop(0).then((resp) => {
					this.allShops = resp.shops;
					console.log(resp);
					const opt = [];
					this.allShops.forEach((x) => {
						opt.push({
							label: x.name,
							value: x.id,
						});
					});
					this.shopOptions = opt;
				});
			})
			.catch((err) => {
				var msg = "unknown error";
				if (err.response.status == 422) {
					msg = err.response.data.error[0].message;
				}
				this.$notify.error({
					title: "Error",
					message: msg,
				});
			})
			.finally(() => this.$emit("reload"));
	},
	methods: {
		onSubmit() {
			TransferStock(
				this.shopId,
				this.toShopId,
				parseInt(this.dorayakiId),
				this.stock
			)
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
				.then(() => this.$emit("close"))
				.finally(() => this.$emit("reload"));
		},
	},
};
</script>

<style lang="scss" scoped>
.container {
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	padding: 5px;
}

.button {
	margin: 10px 0;
}

.input {
	margin: 5px 0;
}

.section {
	width: 90%;
	font-size: 15px;
	display: flex;
	flex-direction: row;
	align-items: center;
	margin: 5px 0;

	span {
		margin-left: 30px;
		width: 60%;
	}
}

.submit {
	margin: 10px 0;
	justify-content: center;
	display: flex;
	align-content: space-around;
}
</style>
