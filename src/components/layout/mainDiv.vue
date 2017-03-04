<template>
    <div class="mainCls">
        <div class="suitescontent">
            <router-view></router-view>
        </div>
        <div class="zhanwei"></div>
    </div>
</template>
<script>
import suitelist from '../suitelist/suitelist'

export default {
    components :{
        suitelist
    }
}
</script>
<style>
/*说明：利用flexbox布局的特性，制作垂直方向的列表，设置垂直方向之后，当item不设置指定宽度的时候，将会自动填充一行*/
.mainCls{
    height: 100%;
    width: 100%;
    background-color:brown;
    display: flex;
    flex-direction: column;
}
.suitescontent{
    flex: 1 0 auto;/*设置自动占满除了“占位的30px之外的所有位置”*/
    background-color:#EFEFEF;
}
.zhanwei{
    flex: 0 0 30px;
}

</style>