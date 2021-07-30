<template>
    <el-dialog
        @closed="$emit('close')"
        :model-value="true"
        class="dialogContainer"
        close-on-press-escape
        close-on-click-modal
    >
        <AddStock :shopId="shopId" @close="$emit('close')" />
    </el-dialog>
</template>

<script>
import AddStock from "templates/AddStock.vue";
export default {
    components: {
        AddStock,
    },
    props: {
        shopId: {
            type: Number,
        },
    },
    data() {
        return {};
    },
};
</script>

<style lang="scss" scoped>
.dialogContainer {
    text-align: left;
    justify-content: center;
}
</style>
