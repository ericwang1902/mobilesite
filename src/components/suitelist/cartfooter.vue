<template>
       <div class="buy_cart_container">
            <div class="cart_icon">
                <i class="fa fa-shopping-cart fa-2x"></i>
            </div>
            <div class="cart_amout">
                <div class="cart_amount_note">
                    ¥ 188.00
                </div>
            </div>
            <div class="goto_btn">
                <div class="btntitle">
                    去结算
                </div>
            </div>
        </div>
</template>
<script>
</script>
<style lang="scss" scoped> 
@import '../../assets/mixin';
.buy_cart_container{
       display: flex;
       flex-direction: row;
       height: 100%;
       .cart_icon{
           display: flex;
            justify-content: center;
            align-items: center;
            color:#fff;
            position: fixed;
            background-color: #3190e8;
            border: .18rem solid #444;
            border-radius: 50%;
            bottom: 1rem;
            left: 1rem;
            height: 3rem;
            width: 3rem;
       }
       .cart_amout{
           background-color:bisque;
           flex: 1 1 auto;
           background-color: #444;
           display: flex;
            align-items: center;
           .cart_amount_note{
               font-size: 1.2rem;
               color: #fff;
               font-weight: 700;
               margin-left: 5rem;
           }
       }
       .goto_btn{
           background-color:#4cd964;
           flex: 0 1 5rem;
            display: flex;
            justify-content: center;
            align-items: center;
           .btntitle{
                font-size: .7rem;
                color: #fff;
           }
       }
}
</style>