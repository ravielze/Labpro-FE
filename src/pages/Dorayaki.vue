<template>
    <div class="container">
        <el-button class="button" type="success" @click="handleClick" icon="el-icon-plus"
            >Create Dorayaki</el-button
        >
        <Cards :key="k" />
        <Modal v-if="isModalVisible" @close="onClose" dorayakiId="0" />
    </div>
</template>

<script>
import Cards from "components/Dorayaki/Cards.vue";
import Modal from "components/Dorayaki/Modal.vue";

export default {
    components: {
        Cards,
        Modal,
    },
    data() {
        return {
            k: 0,
            isModalVisible: false,
        };
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
.container {
    padding-left: 20px;
}

.button {
    margin: 7px;
}
</style>
