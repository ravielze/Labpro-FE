<template>
    <el-aside width="75px">
        <el-menu
            default-active="1"
            class="el-menu-vertical-demo nav"
            :collapse="true"
            :router="true"
        >
            <div class="logo-container">
                <img class="logo" alt="Dorayaki" src="../assets/logo.png" />
            </div>
            <el-menu-item index="/">
                <i class="el-icon-s-home"></i>
                <template #title>Home</template>
            </el-menu-item>
            <el-menu-item index="/shop">
                <i class="el-icon-menu"></i>
                <template #title>Shop</template>
            </el-menu-item>
            <el-menu-item index="/dorayaki">
                <i class="el-icon-document"></i>
                <template #title>Dorayaki</template>
            </el-menu-item>
            <el-menu-item index="4">
                <i class="el-icon-setting"></i>
                <template #title>Settings</template>
            </el-menu-item>
        </el-menu>
    </el-aside>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
$bg-color: #2a324b;
.nav {
    min-height: 95vh;
    background: $bg-color;
}

.logo-container {
    text-align: center;
    padding-top: 15px;
}

.logo {
    height: 48px;
    width: 64px;
}
</style>
