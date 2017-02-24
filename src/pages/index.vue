<template>
    <div class="indexCls">
        <main-div></main-div>
        <footer-div></footer-div>
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
        }
    }
</script>
<style>
.indexCls{
    height: 100%;
    width: 100%;
}
</style>