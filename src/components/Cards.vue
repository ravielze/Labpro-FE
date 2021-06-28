<template>
  <div class="home">
    <el-scrollbar max-height="90vh">
      <div class="container" style="padding-left: 20px">
        <el-row type="flex" style="text-align: center">
          <el-col :span="64" v-for="o in 25" :key="o">
            <Card style="margin: 10px" />
          </el-col>
        </el-row>
        <el-pagination
          background
          layout="prev, pager, next"
          :page-count="totalPage"
          :hide-on-single-page="isSinglePage"
          :current-page="currentPage"
          :page-size="25"
          @current-change="pageChange"
          class="pagination"
        >
        </el-pagination>
      </div>
    </el-scrollbar>
  </div>
</template>

<script>
import Card from "../components/Card.vue";
export default {
  components: {
    Card,
  },
  data() {
    return {
      currentPage: 1,
    };
  },
  computed: {
    isSinglePage() {
      return this.totalPage <= 1;
    },
  },
  methods: {
    pageChange(newPage) {
      this.currentPage = newPage;
    },
  },
  props: {
    totalPage: {
      type: Number,
      default: 50,
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  max-height: 90vh;
  max-width: 200vh;
}

.pagination {
  text-align: center;
  margin-top: 20px;
}
</style>