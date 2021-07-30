<template>
    <el-dialog
        @closed="$emit('close')"
        :model-value="true"
        class="dialogContainer"
        close-on-press-escape
        close-on-click-modal
    >
        <Dorayaki :rawData="dorayaki" @close="$emit('close')" />
    </el-dialog>
</template>

<script>
import { GetDorayakiByID } from "api/dorayaki";
import Dorayaki from "templates/Dorayaki.vue";
export default {
    components: {
        Dorayaki,
    },
    props: {
        dorayakiId: {
            type: Number,
        },
    },
    data() {
        return {
            dorayaki: {},
        };
    },
    mounted() {
        if (this.dorayakiId > 0) {
            GetDorayakiByID(this.dorayakiId)
                .then((data) => {
                    const {
                        id = 0,
                        name = "",
                        description = "",
                        taste_name = "",
                        taste_description = "",
                        created_at = "",
                        updated_at = "",
                    } = data;
                    this.dorayaki = {
                        id,
                        name,
                        description,
                        taste_name,
                        taste_description,
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
