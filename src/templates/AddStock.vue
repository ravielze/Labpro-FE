<template>
	<div class="container">
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
import { GetAllDorayaki } from "api/dorayaki";
import { GetSoldByShop, UpdateStock } from "api/stock";
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
			stock: 1,
			allDorayaki: [],
			soldDorayaki: [],
			options: [],
		};
	},
	mounted() {
		GetAllDorayaki(0)
			.then((resp) => (this.allDorayaki = resp.dorayakis))
			.then(() => {
				GetSoldByShop(this.shopId)
					.then((resp) => {
						this.soldDorayaki = resp;
						const mapping = {};

						this.allDorayaki.forEach((x) => {
							mapping[x.id] = x.name;
						});

						this.soldDorayaki.forEach((x) => {
							mapping[x.id] = "";
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
			});
	},
	methods: {
		onSubmit() {
			UpdateStock(this.shopId, parseInt(this.dorayakiId), this.stock)
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
