<template>
  <div ref="card" class="user_info_wrapper">
    <div class="img_wrapper">
      <img :src="userData.photo" alt="avatar" class="avatar" @click="foo">
    </div>
    <p ref="name" class="name" :class="{add_tooltip: messageIdentifyName}" >
      {{userData.name}}
    </p>
    <p class="other_data">{{userData.position}}</p>
    <p ref="email" class="email other_data" :class="{add_tooltip: messageIdentifyEmail}" >
      {{userData.email}}
    </p>
    <p class="other_data">{{phoneNumber}}</p>
  </div>
</template>

<script >
export default {
  name: 'UserCard',
  data () {
    return {
      card: null,
      name: null,
      email: null
    }
  },
  props: {
    userData: {
      type: Object,
      required: true,
      default () {
        return {}
      }
    }
  },
  methods: {
    foo () {
      console.log(this.email)
    }
  },
  computed: {
    messageIdentifyName () {
      if (this.name > this.card) {
        return true
      } else {
        return false
      }
    },
    messageIdentifyEmail () {
      if (this.email > this.card) {
        return true
      } else {
        return false
      }
    },
    phoneNumber () {
      return `${this.userData.phone.slice(0, 3)} (${this.userData.phone.slice(3, 6)}) ${this.userData.phone.slice(6, 9)} ${this.userData.phone.slice(9, 11)} ${this.userData.phone.slice(11)}`
    }
  },
  mounted () {
    this.card = this.$refs.card.clientWidth
    this.name = this.$refs.name.scrollWidth
    this.email = this.$refs.email.scrollWidth
    if (this.messageIdentifyName) {
      this.$refs.name.title = this.userData.name
      this.$refs.name.style.cursor = 'pointer'
    }
    if (this.messageIdentifyEmail) {
      this.$refs.email.title = this.userData.email
      this.$refs.email.style.cursor = 'pointer'
    }
  }
}
</script>

<style scoped lang="scss">
.user_info_wrapper {
  height: 214px;
  text-align: center;
  background: #ffffff;
  border-radius: 10px;
  padding: 20px;

  .img_wrapper {
    margin: 0 auto;
    width: 70px;
    height: 70px;

    .avatar {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 50%;
      margin-bottom: 20px;
    }
  }

  .name {
    margin-bottom: 20px;
    white-space: nowrap;
  }

  .email {
    overflow: hidden;
    text-overflow: ellipsis;
    width: 100%;
  }

  .other_data {
    margin: 0px;
  }

  .add_tooltip {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
</style>
