<template>
    <div class="indexCls">
        <main-div></main-div>
        <footer-div v-if="$store.getters.getFooter.isShow"></footer-div>
    </div>
</template>
<script>
    import topDiv from "../components/layout/topDiv";
    import mainDiv from "../components/layout/mainDiv";
    import footerDiv from "../components/layout/footerDiv";

    export default {
        components: {
            topDiv,
            mainDiv,
            footerDiv
        },
        created() {
            console.log(this.$route.path)
            if (this.$route.path == '/initfan') {
                this.$store.commit('setFooter', { isShow: false })
            }
        }
    }

</script>
<style>
    .indexCls {
        height: 100%;
        width: 100%;
    }
</style>