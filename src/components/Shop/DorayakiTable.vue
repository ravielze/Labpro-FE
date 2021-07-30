<template>
    <div>
        <el-table :data="dorayakis" style="width: 100%" max-height="250">
            <el-table-column fixed prop="date" label="Date" width="150"> </el-table-column>
            <el-table-column prop="name" label="Name" width="120"> </el-table-column>
            <el-table-column prop="state" label="State" width="120"> </el-table-column>
            <el-table-column prop="city" label="City" width="120"> </el-table-column>
            <el-table-column prop="address" label="Address" width="600"> </el-table-column>
            <el-table-column prop="zip" label="Zip" width="120"> </el-table-column>
            <el-table-column fixed="right" label="Operations" width="120">
                <template #default="scope">
                    <el-button
                        @click.prevent="deleteRow(scope.$index, tableData)"
                        type="text"
                        size="small"
                    >
                        Remove
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
export default {
    data() {
        return {
            shopId: 0,
            dorayakis: [],
            isModalVisible: false,
        };
    },
    mounted() {
        this.shopId = this.$route.params.id;
        console.log(this.shopId);
    },
};
</script>

<style lang="scss" scoped></style>
