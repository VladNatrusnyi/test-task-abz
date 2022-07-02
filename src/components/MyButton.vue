<template>
  <button :disabled="disabled" class="btn" :class="{ disabled: disabled }">
    <a :href="linkTo">{{title}}</a>
  </button>
</template>

<script>
export default {
  name: 'MyButton',
  props: {
    title: String,
    linkTo: String,
    disabled: Boolean
  }
}
</script>

<style lang="scss" scoped>
.btn{
  height: 34px;
  width: 100px;
  background: #F4E041;
  border-radius: 80px;
  border: none;
  font-family: 'Nunito', sans-serif;
  font-weight: 400;
  color: rgba(0, 0, 0, 0.87);
  font-size: 16px;
  &:hover{
    background: #FFE302;
    cursor: pointer;
  }
}
.disabled{
  background: #B4B4B4;
  a{
    color: #ffffff!important;
  }
  &:hover{
    background: #B4B4B4;
  }
}
</style>
