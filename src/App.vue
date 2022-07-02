<template>
  <header class="container">
    <Header />
  </header>
  <div style="background: #F8F8F8; padding-bottom: 100px">
    <div class="container">
      <section class="main">
        <div class="main-info">
          <h1 class="title">Test assignment for <br> front-end developer</h1>
          <p class="subtitle">What defines a good front-end developer is one that has skilled knowledge of HTML, CSS, JS with a vast understanding of User design thinking as they'll be building web interfaces with accessibility in mind. They should also be excited to learn, as the world of Front-End Development keeps evolving.</p>
          <MyButton v-if="!IS_USER_REGISTERED" :title="'Sing up'" :disabled="false" :link-to="'#registration'"/>
        </div>
      </section>
      <section id="users" class="users">
        <h2 class="title">Working with GET request</h2>
        <Preloader v-if="PRELOADER"/>
        <div v-else class="users_list">
          <UserCard class="users_card"
                    v-for="user in USERS"
                    :key="user.id"
                    :user-data="user" />
        </div>
        <MyButton @click="showMore" v-if="!PRELOADER" class="show_more" :class="{hide_btn: HIDE_SHOW_BTN}" :title="'Show more'" :disabled="HIDE_SHOW_BTN"/>
      </section>
      <section id="registration" class="registration">
        <h2 v-if="IS_USER_REGISTERED" class="title">User successfully registered</h2>
        <h2 v-else class="title">Working with POST request</h2>
        <img class="success_img" v-if="IS_USER_REGISTERED" src="./assets/img/success-image.svg" alt="success_img">
        <RegisterForm v-else/>
      </section>
    </div>
  </div>
</template>

<script>
import Header from './components/Header'
import MyButton from './components/MyButton'
import { mapActions, mapGetters } from 'vuex'
import Preloader from './components/Preloader'
import UserCard from './components/UserCard'
import RegisterForm from './components/RegisterForm'
export default {
  name: 'App',
  data () {
    return {
      page: 1,
      count: 6
    }
  },
  components: {
    Header,
    MyButton,
    Preloader,
    UserCard,
    RegisterForm
  },
  methods: {
    ...mapActions([
      'GET_USERS_FROM_API',
      'GET_POSITIONS_FROM_API'
    ]),
    showMore () {
      this.page++
      this.GET_USERS_FROM_API({ page: this.page, count: this.count })
    }
  },
  computed: {
    ...mapGetters([
      'USERS',
      'PRELOADER',
      'HIDE_SHOW_BTN',
      'IS_USER_REGISTERED'
    ])
  },
  mounted () {
    this.GET_USERS_FROM_API({ page: this.page, count: this.count })
    this.GET_POSITIONS_FROM_API()
  }
}
</script>

<style lang="scss">
html {
  scroll-behavior: smooth;
}
body{
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
#app {
  font-family: 'Nunito', sans-serif;
  font-weight: 400;
  color: rgba(0, 0, 0, 0.87);
  font-size: 16px;
  line-height: 26px;
}
.container{
  max-width: 1170px;
  margin: 0 auto;
}
a{
  text-decoration: none;
  color: rgba(0, 0, 0, 0.87);
}
h1, h2{
  font-size: 40px;
  line-height: 40px;
  font-weight: 400;
}
h2{
  margin-top: 140px;
  text-align: center;
  margin-bottom: 50px;
}
.main{
  background: linear-gradient(0deg, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("assets/img/pexels-alexandr-podvalny-1227513.jpeg");
  width: 100%;
  height: 650px;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
  .main-info{
    max-width: 380px;
    text-align: center;
    color: #ffffff;
    @media (max-width: 400px) {
      max-width: 328px;
    }
    .title{
      margin-bottom: 21px;
      margin-top: 0;
      @media (max-width: 400px) {
        max-width: 328px;
        font-size: 36px;
      }
    }
    .subtitle{
      line-height: 26px;
      margin-bottom: 32px;
    }
  }
}
.users{
  display: flex;
  justify-content: center;
  flex-direction: column;
  .title{
    @media (max-width: 380px) {
      width: 300px;
      margin: 140px auto 50px;
    }
  }
  .users_list{
    display: grid;
    grid-template-columns: repeat(3, minmax(auto, 370px));
    grid-gap: 29px 29px;
    margin-bottom: 50px;
    @media (max-width: 1200px) {
      padding: 0px 60px;
      grid-template-columns: repeat(3, 33.3%);
      margin: 0 auto 50px;
    }
    @media (max-width: 1025px) {
      grid-template-columns: repeat(3, minmax(auto, 282px));
    }
    @media (max-width: 1000px) {
      grid-template-columns: repeat(2, 50%);
      grid-gap: 16px 16px;
    }
    @media (max-width: 780px) {
      grid-template-columns: repeat(2, 344px);
      grid-gap: 16px 16px;
      padding: 0px 32px;
    }
    @media (max-width: 760px) {
      grid-template-columns: repeat(2, 1fr);
    }
    @media (max-width: 600px) {
      grid-template-columns: 1fr;
      align-items: center;
    }
    @media (max-width: 560px) {
      grid-template-columns: 328px;
      padding: 0px 16px;
    }
  }
  .show_more{
    display: block;
    margin: 0 auto;
    width: 120px!important;
  }
  .hide_btn{
    display: none;
  }
}
.success_img{
  display: block;
  margin: 0 auto;
}
.registration{
  .title{
    @media (max-width: 380px) {
      width: 328px;
      margin: 140px auto 50px;
    }
  }
}
</style>
