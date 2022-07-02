<template>
  <div class="form-group">
      <input :checked="isChecked" :id="radioData.name" type="radio" name="payment" :value="radioData.id" class="real-radio-btn">
      <label :for="radioData.name" class="custom-radio-btn"></label>
      <label :for="radioData.name" class="custom-radio-btn_text">{{ radioData.name }}</label>
  </div>
</template>

<script>
export default {
  name: 'MyRadioButton',
  data () {
    return {
      radio: '',
      input: ''
    }
  },
  props: {
    radioData: {
      type: Object,
      required: true,
      default () {
        return {}
      }
    }
  },
  computed: {
    isChecked () {
      return (this.radioData.id === 1)
    }
  }
}
</script>

<style scoped lang="scss">
.form-group {
  display: flex;
  align-items: center;
}

/* Малюємо зовнішнє коло радіокнопки*/
.custom-radio-btn {
  position: relative;
  display: inline-block;
  width: 16px;
  height: 16px;
  background: #fff;
  border: 2px solid #00BDD3;
  border-radius: 50%;
  vertical-align: text-top;
  margin-right: 12px;
  &:hover{
    cursor: pointer;
  }
}
.custom-radio-btn_text:hover{
  cursor: pointer;
}

/* Малюємо внутрішнє коло */
.custom-radio-btn::before {
  content: '';
  display: inline-block;
  width: 8px;
  height: 8px;
  background: #00BDD3;
  border-radius: 50%;

  /* Вирівнюємо по центру відгосно зовнішнього кола */
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%) scale(0);
  transition: 0.2s ease-in;
}
.real-radio-btn:checked + .custom-radio-btn::before {
  transform: translate(-50%, -50%) scale(1);
}
.real-radio-btn {
  /* Ховаємо еальну радіокнопку*/
  width: 0;
  height: 0;
  position: absolute;
  opacity: 0;
  z-index: -1;
}

</style>
