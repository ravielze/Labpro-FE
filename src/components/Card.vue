<template>
  <el-card class="card" shadow="always">
    <img :src="image" />
    <div :style="{ position: 'inherit' }">
      <p class="content-title">{{ name }}</p>
      <div class="bottom">
        <p class="content description">{{ processedDescription }}</p>
        <p class="content">{{ price }}</p>
        <p class="content">{{ stock }}</p>
        <p class="content">{{ soldBy }}</p>
        <!-- <el-button type="text" class="button">Operating</el-button> -->
      </div>
    </div>
  </el-card>
</template>

<script>
import _ from "lodash";

export default {
  computed: {
    processedDescription() {
      return _.truncate(this.description, {
        length: 250,
      });
    },
  },
  props: {
    image: {
      type: String,
      default:
        "https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png",
    },
    name: {
      type: String,
      default: "Yummy Dorayaki",
    },
    description: {
      type: String,
      default:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    },
    price: {
      type: Number,
      default: 50000,
    },
    soldBy: {
      type: String,
      default: "Unknown Store",
    },
    stock: {
      type: Number,
      default: 5,
    },
  },
};
</script>

<style lang="scss" scoped>
* {
  background: white;
  text-align: center;
}

img {
  min-width: 150px;
  min-height: 150px;
  max-width: 200px;
  max-height: 200px;
}

.card {
  word-wrap: normal;
  max-height: 600px;
  max-width: 300px;
}

.content {
  text-align: left;
}

.content-title {
  text-align: center;
  font-weight: bold;
}

.description {
  text-align: justify;
}
</style>