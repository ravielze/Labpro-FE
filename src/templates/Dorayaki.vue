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
                :readonly="readOnly"
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
                :readonly="readOnly"
            />
        </div>
        <div class="section">
            <span>Taste:</span>
            <el-input
                placeholder="Manis Asin"
                v-model="formData.taste_name"
                class="input"
                maxlength="128"
                show-word-limit
                :readonly="readOnly"
            />
        </div>
        <div class="section">
            <span>Taste Description:</span>
            <el-input
                placeholder="Manis kecap, asin garem, tapi haram :("
                v-model="formData.taste_description"
                class="input"
                rows="4"
                type="textarea"
                maxlength="1024"
                show-word-limit
                :readonly="readOnly"
            />
        </div>
        <div class="section" v-if="!readOnly">
            <span>Image:</span>
            <FileButton v-model="file" class="button" />
        </div>
        <div class="section" v-if="created_at != ''">
            <span>Created At:</span>
            <el-input v-model="created_at" class="input" readonly />
        </div>
        <div class="section" v-if="updated_at != '' && updated_at != created_at">
            <span>Updated At:</span>
            <el-input v-model="updated_at" class="input" readonly />
        </div>
        <div class="section submit" v-if="!readOnly">
            <el-button type="success" round class="submit" v-if="formData.id != 0" @click="onSubmit"
                >Update</el-button
            >
            <el-button type="success" round class="submit" v-else @click="onSubmit"
                >Create</el-button
            >

            <el-button type="danger" round class="delete" @click="onDelete" v-if="formData.id != 0"
                >Delete</el-button
            >
        </div>
    </div>
</template>

<script>
import FileButton from "components/FileButton.vue";
import { CreateDorayaki, UpdateDorayaki, DeleteDorayaki } from "api/dorayaki";
export default {
    components: {
        FileButton,
    },
    props: {
        rawData: {
            type: Object,
            default() {
                return {};
            },
        },
        readOnly: {
            type: Boolean,
            default: false,
        },
    },
    watch: {
        rawData() {
            const {
                name = "",
                description = "",
                taste_name = "",
                taste_description = "",
                id = 0,
                created_at = "",
                updated_at = "",
            } = this.rawData;
            this.formData = {
                name,
                description,
                taste_name,
                taste_description,
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
            taste_name = "",
            taste_description = "",
            id = 0,
            created_at = "",
            updated_at = "",
        } = this.rawData;

        return {
            formData: {
                name,
                description,
                taste_name,
                taste_description,
                id,
            },
            created_at,
            updated_at,
            file: null,
        };
    },
    methods: {
        onDelete() {
            if (this.formData.id === 0) {
                return;
            }
            DeleteDorayaki(this.formData.id).catch((err) => {
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
            });
            this.$emit("close");
        },
        onSubmit() {
            if (this.formData.id === 0) {
                CreateDorayaki(this.formData).catch((err) => {
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
                UpdateDorayaki(this.formData.id, this.formData).catch((err) => {
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
