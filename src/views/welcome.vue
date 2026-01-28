<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

const goToLogin = () => router.push('/login');
const goToRegister = () => router.push('/register');


</script>

<template>
    <header id="header">
        <div class="header__logo">
            <a href="/welcome">
                 <img src="../../public/logo.png" alt="logo knowntain" class="img-res">
            </a>
        </div>

        <div class="header__buttons">
            <button class="button" id="login" @click="goToLogin"><a href="#">Accedi</a></button>
            <button class="button" id="register" @click="goToRegister"><a href="#">Registarti</a></button>
        </div>
    </header>

    <div class="cover">
        <div class="cover__content">
            <h1>Knowntain </h1>
            <p class="intro">A biodiversity Map</p>
            <a class="arrow-button" href="#footer">
                Scopri di più
            </a>
        </div>
    </div>

    
    <footer id="footer">
        <div class="footer__content">
            <a href="https://github.com/andreaNardin2005/Knowntain" target="_blank">
                <img src="../../public/github.svg" alt="github" class="img-res">
            </a>
            <div class="authors">
                <span>Andrea Nardin</span>
                <span>Nicolas Aresu</span>
                <span>Gabriele D'Incà</span>
            </div>
        </div>
        
    </footer>
</template>

<style scoped>
    /* Home Page ******************************************* */
    #header {
        background-color: var(--knt-white);
        height: 14vh;
        position: fixed;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        max-width: 100vw;
        top: 0;
        left: 0;
        z-index: 1;
        width: 100%;
        padding: 0px 50px;
        transition: all 0.5s cubic-bezier(.215, .61, .355, 1);
        /*border-bottom: 2px solid var(--knt-green);*/
    }

    .header__logo img {
        width: 90px;
        height: auto;
        transition: all 0.5s cubic-bezier(.215, .61, .355, 1);
        cursor: pointer;
        /*border: 1px solid blue;*/
    }

    .header__buttons {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    #login {
        margin-right: 30px;
        background-color: var(--knt-white);
    }

    #login a {
        color: var(--knt-green);
    }

    .cover {
        background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.6)), url('../../public/cover.jpg');
        text-align: left;
        color: var(--knt-abs-white);
        padding: 10px;
        margin: 0px;
        padding: 10%;
        margin-top: 14vh;
        min-height: 100vh;
        width: 100%;
        display: flex;
        flex-direction: column;
        background-position: center center;
        background-size: cover;
        border-bottom: 5px solid var(--limana-blue);
        position: relative;
        box-shadow: 0px 0px 1000px var(--limana-blue);
        transition: all 0.5s cubic-bezier(.215, .61, .355, 1);
    }

    @media (max-width: 600px) {
        #header {padding: 5%;}
        #register {display: none;}
        #login {margin: 0;}
        .cover {padding-top: 25%;}
        .cover h1 {font-size: 60px;}
    }

    /*Footer **************+*/

    #footer {
        padding: 3%;
        background-color: rgb(15, 15, 15);
        color: var(--knt-white);
    }

    .footer__content {
        display: flex;
        flex-direction: column;
        justify-content: start;
        gap: 40px;
        align-items: center;
    }

    .footer__content img {
        background-color: var(--knt-white);
        border-radius: 10px;
        width: 60px;
        height: auto;
    }

    .authors span {
        font-size: 25px;
        font-weight: 100;
        padding: 0 20px;
    }

    @media (max-width: 600px) {
        .authors span {
            display: block;
            text-align: center;
            margin-bottom: 20px;
            width: 100%;
            font-size: 20px;
            font-weight: 100;
            padding: 0 10px;
        }
    }

    /* Utility *********************** */
    .img-res {
        width: 100%;
        height: auto;
    }

    .show-nav {
        transform: translateY(-14vh);
    }
</style>