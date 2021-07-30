<template>
    <el-container class="containerhome" >
        <div style="text-align: center;">
            <h1>Manajemen Toko Dorayaki sebagai Seleksi Tahap 2 Ca-Labpro</h1>
            <h3>Steven Nataniel - 13519002</h3>
        </div>
        <div style="display: flex; justify-content: center; padding: 10px;">
            <img :src="`${publicPath}doraemon.png`" />
        </div>
        <p style="text-align: justify; padding: 10px;">
            Doremonangis, robot dari masa depan sedang mencoba untuk membuka suatu bisnis pada bidang
            F&B, yaitu membuat dorayaki kekinian (rasa pempek, rasa KFC, rasa nasi padang, dan
            lain-lain) di tahun 2021 ini. Mobita, teman baiknya membantunya untuk mendirikan usaha
            dorayakinya dengan menjadi Co-Founder sekaligus CTO dari usaha Doremonangis yang bernama
            “Stand with Dorayaki”. Selaku CTO, Mobita tentu dipekerjakan oleh Doremonangis untuk membuat
            sebuah sistem untuk memanajemen tokonya. Akan tetapi, karena Mobita adalah anak yang
            pemalas, toko Doremonangis sudah memiliki banyak franchise di berbagai tempat. Sehingga,
            sistem yang dibuat harus menyesuaikan kebutuhan bisnis dari tokonya, apalagi sekarang banyak
            toko yang mulai kehabisan stok Dorayaki rasa pempek! Oleh karena itu, sebagai teman Mobita
            yang berkuliah di バンドン工科大学 (ITB) cabang Shinjuku, kalian akan dipekerjakan oleh
            Mobita untuk membuat sistem ini.
        </p>
        <p style="text-align: justify; padding: 10px;">
            Backend Documentation: https://api-labpro.ravielze.com/docs
        </p>
        <p style="text-align: justify; padding: 10px;">
            Github:
            <ul>
                <li>Backend: https://github.com/ravielze/Labpro-BE</li>
                <li>Frontend: https://github.com/ravielze/Labpro-FE</li>
            </ul>
        </p>
    </el-container>
</template>

<script>
export default {
	data() {
		return {
			publicPath: process.env.BASE_URL,
		};
	},
};
</script>

<style lang="scss">
.containerhome {
	width: 97%;
	height: 100%;
	flex-direction: column;
}
</style>