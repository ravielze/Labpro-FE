<template>
    <el-card class="card" shadow="always" @click="handleClick">
        <img :src="image" />
        <div :style="{ position: 'inherit' }">
            <p class="content-title">{{ name }}</p>
            <div class="card-container">
                <p class="content description">{{ processedDescription }}</p>
                <el-tooltip
                    :content="processedTasteDescription"
                    placement="top"
                    v-if="processedTasteDescription != ''"
                >
                    <el-tag type="primary" class="content">{{ tasteName }}</el-tag>
                </el-tooltip>
                <el-tag v-else class="content" type="info">{{ tasteName }}</el-tag>
            </div>
        </div>
        <Modal v-if="isModalVisible" @close="onClose" :dorayakiId="dorayakiId" />
    </el-card>
</template>

<script>
import _ from "lodash";
import Modal from "components/Dorayaki/Modal.vue";

export default {
    components: {
        Modal,
    },
    computed: {
        processedDescription() {
            return _.truncate(this.description, {
                length: 100,
            });
        },
        processedTasteDescription() {
            return _.truncate(this.tasteDescription, {
                length: 50,
            });
        },
    },
    methods: {
        handleClick() {
            this.isModalVisible = true;
        },
        onClose() {
            this.isModalVisible = false;
            this.$emit("reload");
        },
    },
    data() {
        return {
            isModalVisible: false,
        };
    },
    props: {
        dorayakiId: {
            type: Number,
            default: 1,
        },
        image: {
            type: String,
            default:
                "https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png",
        },
        name: {
            type: String,
            default: "Yummy Dorayaki",
        },
        tasteName: {
            type: String,
            default: "Yummy Dorayaki",
        },
        description: {
            type: String,
            default:
                "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        },
        tasteDescription: {
            type: String,
            default:
                "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        },
    },
};
</script>

<style lang="scss" scoped>
* {
    text-align: center;
}

img {
    width: 100px;
    height: 100px;
}

.card {
    word-wrap: normal;
    height: 300px;
    width: 250px;
    background: #767b91;
    cursor: none;
}

.card:hover {
    cursor: pointer;
    background: #a0a4b3;
}

.content {
    text-align: left;
    font-size: 12px;
}

.content-title {
    text-align: center;
    font-weight: bold;
    font-size: 15px;
}

.description {
    text-align: justify;
    font-size: 12px;
}
</style>
