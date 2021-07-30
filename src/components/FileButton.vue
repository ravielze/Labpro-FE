<template>
	<div class="fcontainer">
		<el-button
			type="info"
			plain
			@click="handleClick"
			size="medium"
			:loading="loading"
			class="button"
		>
			Upload File
		</el-button>
		<div class="preview">
			<img :src="src" v-if="src !== ''" />
		</div>
		<p v-if="modelValue !== null" class="filename">
			Filename: {{ modelValue.name }}
		</p>
	</div>
</template>

<script>
const createInputElement = (acceptType) => {
	const inputElement = document.createElement("input");
	inputElement.setAttribute("type", "file");
	inputElement.setAttribute("accept", acceptType);
	return inputElement;
};

const pickImage = () => {
	const imageInputElement = createInputElement(".png, .jpg, .jpeg");
	return new Promise((resolve, reject) => {
		imageInputElement.click();
		imageInputElement.addEventListener("change", () => {
			if (imageInputElement.files.length !== 1) {
				reject("No file selected");
				return;
			}
			resolve(imageInputElement.files[0]);
		});
	});
};

const convertToString = (file) => {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = () => {
			if (reader.result !== null) {
				resolve(reader.result.toString());
				return;
			}
			reject("Error Occured");
		};
		reader.onerror = () => reject("Error Occured");
	});
};

export default {
	methods: {
		handleClick() {
			pickImage().then((data) => this.$emit("update:modelValue", data));
		},
	},
	watch: {
		modelValue() {
			if (this.modelValue === null) {
				this.src = "";
				return;
			}
			convertToString(this.modelValue)
				.then((res) => (this.src = res))
				.catch(() => (this.src = ""));
		},
	},
	data() {
		return {
			src: "",
		};
	},
	props: {
		modelValue: {
			type: File,
		},
		loading: {
			type: Boolean,
		},
	},
};
</script>

<style lang="scss" scoped>
.fcontainer {
	display: flex;
	flex-direction: row;
	align-items: center;
}

.button {
	height: 50%;
}

.filename {
	font-size: 12px;
}

.preview {
	height: 100px;
	width: 100px;
	margin: 0 10px;

	img {
		object-fit: contain;
		width: 100%;
		height: 100%;
	}
}
</style>