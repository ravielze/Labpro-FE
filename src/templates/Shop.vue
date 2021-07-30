<template>
    <div class="container">
        <div class="section">
            <span>Name:</span>
            <el-input
                placeholder="Dorababi"
                v-model="formData.name"
                size="medium"
                class="input"
                maxlength="256"
                show-word-limit
            />
        </div>
        <div class="section">
            <span>Description:</span>
            <el-input
                placeholder="Dorayaki isi babi"
                v-model="formData.description"
                class="input"
                rows="4"
                type="textarea"
                maxlength="1024"
                show-word-limit
            />
        </div>
        <div class="section">
            <span>Street:</span>
            <el-input
                placeholder="Jln. Gang Tuah No. 666"
                v-model="formData.street"
                class="input"
                rows="4"
                type="textarea"
                maxlength="256"
                show-word-limit
            />
        </div>
        <div class="section">
            <span>District:</span>
            <el-input
                placeholder="Kepala Daging"
                v-model="formData.district"
                class="input"
                maxlength="128"
                show-word-limit
            />
        </div>
        <div class="section">
            <span>City:</span>
            <el-input
                placeholder="Hakarta"
                v-model="formData.city"
                class="input"
                maxlength="128"
                show-word-limit
            />
        </div>
        <div class="section">
            <span>Province:</span>
            <el-input
                placeholder="IKD Hakarta"
                v-model="formData.province"
                class="input"
                maxlength="128"
                show-word-limit
            />
        </div>
        <div class="section" v-if="created_at != ''">
            <span>Created At:</span>
            <el-input v-model="created_at" class="input" readonly />
        </div>
        <div class="section" v-if="updated_at != '' && updated_at != created_at">
            <span>Updated At:</span>
            <el-input v-model="updated_at" class="input" readonly />
        </div>
        <div class="section submit">
            <el-button type="success" round class="submit" v-if="formData.id != 0" @click="onSubmit"
                >Update</el-button
            >
            <el-button type="success" round class="submit" v-else @click="onSubmit"
                >Create</el-button
            >
        </div>
    </div>
</template>

<script>
import { CreateShop, UpdateShop } from "api/shop";
export default {
    props: {
        rawData: {
            type: Object,
            default() {
                return {};
            },
        },
    },
    watch: {
        rawData() {
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
            } = this.rawData;
            this.formData = {
                name,
                description,
                city,
                district,
                province,
                street,
                id,
            };
            this.created_at = created_at;
            this.updated_at = updated_at;
        },
    },
    data() {
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
        } = this.rawData;

        return {
            formData: {
                name,
                description,
                city,
                district,
                province,
                street,
                id,
            },
            created_at,
            updated_at,
        };
    },
    methods: {
        onSubmit() {
            if (this.formData.id === 0) {
                CreateShop(this.formData).catch((err) => {
                    var msg = "unknown error";
                    if (err.response.status == 422) {
                        msg = err.response.data.error[0].message;
                    }
                    this.$notify.error({
                        title: "Error",
                        message: msg,
                    });
                });
            } else {
                UpdateShop(this.formData.id, this.formData).catch((err) => {
                    var msg = "unknown error";
                    if (err.response.status == 422) {
                        msg = err.response.data.error[0].message;
                    }
                    this.$notify.error({
                        title: "Error",
                        message: msg,
                    });
                });
            }
            this.$emit("close");
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
