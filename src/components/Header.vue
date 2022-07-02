<template>
  <div class="header">
    <img class="logo" src="./../assets/img/Logo.svg" alt="Logo">
    <div class="nav_wrapper">
      <MyButton class="users-btn" :title="'Users'" :disabled="false" :link-to="'#users'"/>
      <MyButton v-if="!IS_USER_REGISTERED" class="sign-btn" :title="'Sign up'" :disabled="false" :link-to="'#registration'"/>
    </div>
  </div>
</template>

<script>
import MyButton from './MyButton'
import { mapGetters } from 'vuex'
export default {
  name: 'Header',
  components: {
    MyButton
  },
  computed: {
    ...mapGetters([
      'IS_USER_REGISTERED'
    ])
  }
}
</script>

<style lang="scss" scoped>
.header{
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #ffffff;
  height: 60px;
  @media (max-width: 1200px) {
    padding: 0px 60px;
  }
  @media (max-width: 780px) {
    padding: 0px 32px;
  }
  @media (max-width: 600px) {
    padding: 0px 16px;
  }
  .users-btn{
    margin-right: 10px;
  }
}
</style>
