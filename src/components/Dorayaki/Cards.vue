<template>
    <div class="home">
        <div class="container">
            <el-row type="flex" style="text-align: center; max-width: 1500px">
                <el-col :span="48" v-for="o in dorayakis" :key="o.id">
                    <Card
                        style="margin: 7px"
                        :dorayakiId="o.id"
                        :name="o.name"
                        :description="o.description"
                        :tasteName="o.taste_name"
                        :tasteDescription="o.taste_description"
                        @reload="pageChange(currentPage)"
                    />
                </el-col>
            </el-row>
            <el-pagination
                background
                layout="prev, pager, next"
                :page-count="totalPage"
                :hide-on-single-page="isSinglePage"
                :current-page="currentPage"
                :page-size="10"
                @current-change="pageChange"
                class="pagination"
            >
            </el-pagination>
        </div>
    </div>
</template>

<script>
import Card from "components/Dorayaki/Card.vue";
import { GetAllDorayaki } from "api/dorayaki";
export default {
    components: {
        Card,
    },
    data() {
        return {
            currentPage: 1,
            dorayakis: [],
            totalPage: 1,
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
            GetAllDorayaki(this.currentPage)
                .then((resp) => {
                    this.totalPage = resp.total_page;
                    this.dorayakis = resp.dorayakis;
                })
                .catch((err) => {
                    var msg = "unknown error";
                    if (err.response.status >= 400) {
                        msg = err.response.data.error;
                    }
                    this.dorayakis = [];
                    this.totalPage = 0;
                    this.$notify.error({
                        title: "Error",
                        message: msg,
                    });
                });
        },
    },
    mounted() {
        GetAllDorayaki(1)
            .then((resp) => {
                this.totalPage = resp.total_page;
                this.dorayakis = resp.dorayakis;
            })
            .catch((err) => {
                var msg = "unknown error";
                if (err.response.status >= 400) {
                    msg = err.response.data.error;
                }
                this.dorayakis = [];
                this.totalPage = 0;
                this.$notify.error({
                    title: "Error",
                    message: msg,
                });
            });
    },
};
</script>

<style lang="scss" scoped>
.container {
    max-height: 90%;
    max-width: 100%;
}

.pagination {
    text-align: center;
    margin-top: 20px;
}
</style>
