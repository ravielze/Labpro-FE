<template>
    <el-dialog
        @closed="$emit('close')"
        :model-value="true"
        class="dialogContainer"
        close-on-press-escape
        close-on-click-modal
    >
        <Shop :rawData="shop" @close="$emit('close')" />
    </el-dialog>
</template>

<script>
import { GetShopByID } from "api/shop";
import Shop from "templates/Shop.vue";
export default {
    components: {
        Shop,
    },
    props: {
        shopId: {
            type: Number,
        },
    },
    data() {
        return {
            shop: {},
        };
    },
    mounted() {
        if (this.shopId > 0) {
            GetShopByID(this.shopId)
                .then((data) => {
                    const {
                        name = "",
                        description = "",
                        city = "",
                        district = "",
                        id = 0,
                        province = "",
                        street = "",
                        created_at = "",
                        updated_at = "",
                    } = data.shop;
                    this.shop = {
                        id,
                        name,
                        description,
                        street,
                        district,
                        city,
                        province,
                        created_at,
                        updated_at,
                    };
                })
                .catch((err) => {
                    var msg = "unknown error";
                    if (err.response.status >= 400) {
                        msg = err.response.data.error;
                    }
                    this.$notify.error({
                        title: "Error",
                        message: msg,
                    });
                });
        }
    },
};
</script>

<style lang="scss" scoped>
.dialogContainer {
    text-align: left;
    justify-content: center;
}
</style>
