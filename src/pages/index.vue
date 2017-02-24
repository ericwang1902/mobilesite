<template>
    <div class="parentdiv">
            <top-div class="topdiv"></top-div>
            <main-div class="maindiv"></main-div>
            <footer-div class="footerdiv"></footer-div>
    </div>
</template>
<script>
import topDiv from "../components/layout/topDiv";
import mainDiv from  "../components/layout/mainDiv";
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
.parentdiv{
    height: 100%;
    display: flex;
    flex-direction: column;
}
.topdiv{
    background-color:aqua;

}
.maindiv{
    flex: 1 0 auto;
}
.footerdiv{
    background-color:blueviolet;
    flex: 0 0 30px;
}
</style>
