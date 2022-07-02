<template>
  <form class="form" @submit.prevent="checkForm">
    <div class="text-field__wrapper">
      <div class="text-field text-field_floating-2">
        <input v-model.trim="name"
               class="text-field__input"
               :class="{'text-field__input_invalid':v$.name.$error}"
               type="text"
               name="name"
               id="name"
               placeholder="Your name">
        <label
          class="text-field__label"
          for="name"
          :class="{'text-field__label_invalid':v$.name.$error}"
        >Your name</label>
      </div>
      <div v-if="!v$.name.$error"
           class="text-field__message">
        Ведіть ваше ім'я
      </div>
      <div class="text-field__message text-field__message_invalid"
           v-if="v$.name.$errors.length">
        {{v$.name.$errors[0].$message}}
      </div>
    </div>
    <div class="text-field__wrapper">
      <div class="text-field text-field_floating-2">
        <input v-model.trim="email"
               class="text-field__input"
               :class="{'text-field__input_invalid':v$.email.$error}"
               type="text"
               name="email"
               id="email"
               placeholder="Email">
        <label
          class="text-field__label"
          for="email"
          :class="{'text-field__label_invalid':v$.email.$error}"
        >Email</label>
      </div>
      <div v-if="!v$.email.$error"
           class="text-field__message">
        Ведіть ваш Email
      </div>
      <div class="text-field__message text-field__message_invalid"
           v-if="v$.email.$errors.length">
        {{v$.email.$errors[0].$message}}
      </div>
    </div>
    <div class="text-field__wrapper" style="margin-bottom: 25px">
      <div class="text-field text-field_floating-2">
        <input v-model.trim="number"
               v-mask="'+38 (###) ###-##-##'"
               class="text-field__input"
               :class="{'text-field__input_invalid':phoneNumberError}"
               type="text"
               name="phone"
               id="phone"
               placeholder="Phone">
        <label
          class="text-field__label"
          for="phone"
          :class="{'text-field__label_invalid':phoneNumberError}"
        >Phone
        </label>
      </div>
      <div class="text-field__message text-field__message_invalid"
           v-if="phoneNumberError">
        Value is not a valid phone number
      </div>
      <div v-else
           class="text-field__message">
        +38 (XXX) XXX - XX - XX
      </div>
    </div>
    <p class="position_title">Select your position</p>
    <Preloader v-if="POSITION_PRELOADER"/>
    <div v-else class="positions_wrapper">
      <MyRadioButton
        class="my_radio_btn"
        v-for="data in POSITIONS.positions"
        :key="data.id"
        :radio-data="data"
        @click="chooseRadio(data.id)"
      />
    </div>
    <UploadField @changeUploadData="changeUploadData" :error="errorUpload"/>
    <MyButton class="sing_up_btn" :title="'Sing up'" :disabled="isBtnActive"/>
  </form>
</template>

<script>
import useVuelidate from '@vuelidate/core'
import { required, minLength, maxLength, email } from '@vuelidate/validators'
import MyButton from './MyButton'
import MyRadioButton from './MyRadioButton'
import { mapActions, mapGetters } from 'vuex'
import Preloader from './Preloader'
import UploadField from './UploadField'
import { imageSize } from '../filters/imageSize'

export default {
  name: 'RegisterForm',
  setup () {
    return {
      v$: useVuelidate()
    }
  },
  data () {
    return {
      name: null,
      email: null,
      number: '',
      position: 1,
      file: [],
      inputPhoneModel: '',
      phoneNumberError: false,
      errorUpload: '',
      isValidateStart: false
    }
  },
  validations: {
    name: { required, minLength: minLength(2), maxLength: maxLength(60) },
    email: { required, email }
  },
  components: {
    MyButton,
    MyRadioButton,
    Preloader,
    UploadField
  },
  methods: {
    ...mapActions([
      'POST_NEW_USER',
      'GET_NEW_TOKEN'
    ]),
    chooseRadio (id) {
      this.position = id
    },
    async checkForm () {
      this.isValidateStart = true
      this.v$.name.$touch()
      this.v$.email.$touch()
      this.checkUploadData(this.file)
      if (this.phoneNumber.length < 13 || this.phoneNumber[3] !== '0') {
        this.phoneNumberError = true
      } else {
        this.phoneNumberError = false
      }
      if (!this.v$.name.$error && !this.v$.email.$error && !this.phoneNumberError && !this.errorUpload) {
        await this.GET_NEW_TOKEN()
        await this.POST_NEW_USER({
          name: this.name,
          email: this.email,
          phone: this.phoneNumber,
          position_id: this.position,
          photo: this.file[0]
        })
      }
    },
    changeUploadData (file) {
      this.file = file
    },
    checkUploadData (file) {
      this.errorUpload = ''
      if (file.length === 0) {
        this.errorUpload = 'Value is required'
      }
      if (file.size >= 5242880) {
        this.errorUpload = 'Size must not exceed 5MB'
      }
      const mainThis = this;
      (async function () {
        if (file.length !== 0) {
          const _URL = window.URL || window.webkitURL
          const objectUrl = _URL.createObjectURL(file[0])
          const imageDimensions = await imageSize(objectUrl)
          _URL.revokeObjectURL(objectUrl)
          if (imageDimensions.width <= 70 || imageDimensions.height <= 70) {
            mainThis.errorUpload = 'The resolution must be at least 70x70 pixels'
          }
        }
      })()
    }
  },
  computed: {
    ...mapGetters([
      'POSITIONS',
      'POSITION_PRELOADER',
      'CHECK_NUMBER_AND_EMAIL'
    ]),
    phoneNumber () {
      return '+' + this.number.split('').filter((item) => {
        if (+item || item === '0') {
          return item
        }
      }).join('')
    },
    isBtnActive () {
      return !(this.name && this.email && this.number && this.file.length)
    }
  },
  watch: {
    file (newVal) {
      if (this.isValidateStart) {
        this.checkUploadData(newVal)
      }
    },
    CHECK_NUMBER_AND_EMAIL (newVal) {
      if (newVal) {
        alert('Користувач із цим телефоном або електронною поштою вже існує')
      }
    }
  }
}
</script>

<style scoped lang="scss">
.sing_up_btn{
  display: block;
  margin: 0 auto;
}
.positions_wrapper{
  margin-bottom: 47px;
}
.my_radio_btn{
  margin-bottom: 7px;
}
.position_title{
  margin-bottom: 11px;
  line-height: 26px;
}
.form{
  width: 380px;
  margin: 0 auto;
  @media (max-width: 400px) {
    width: 328px;
  }
}
.text-field__label_invalid {
  color: #CB3D40!important;
}
.text-field {
  width: 361px;
  @media (max-width: 400px) {
    width: 328px;
  }
}

.text-field__input {
  display: block;
  width: calc(100% - 19px);
  color: #212529;
  background-color: #F8F8F8;
  border: 1px solid #D0CFCF;
  border-radius: 4px;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  appearance: none;
  padding-left: 16px;
}

.text-field__input:focus {
  color: #212529;
  background-color: #F8F8F8;
  border-color: #7E7E7E;
  outline: 0;
}

.text-field_floating-2 {
  position: relative;
}
.text-field_floating-2 .text-field__input {
  height: 50px;
  padding-right: 0;
}

.text-field_floating-2 .text-field__label {
  position: absolute;
  top: 50%;
  left: 0.3125rem;
  display: flex;
  transform: translateY(-50%);
  pointer-events: none;
  border: none;
  background-color: #F8F8F8;
  color: #7E7E7E;
  padding-left: 14px;
  padding-right: 5px;
  transition: top 0.1s ease-in-out;
}

.text-field_floating-2 .text-field__input::-moz-placeholder {
  color: transparent;
}

.text-field_floating-2 .text-field__input::placeholder {
  color: transparent;
}

.text-field_floating-2 .text-field__input:focus~.text-field__label,
.text-field_floating-2 .text-field__input:not(:placeholder-shown)~.text-field__label {
  top: 0;
  transform: translateY(-50%) scale(0.75);
  padding-left: 5px;
}

/* validation */
.text-field__wrapper {
  margin-bottom: 32px;
  width: 100%;
  @media (max-width: 400px) {
    width: 328px;
  }
}

.text-field__wrapper .text-field {
  margin-bottom: 0;
}

.text-field__input_invalid{
  border: 2px solid #CB3D40!important;
}

/*.text-field__input_invalid:focus {*/
/*  border-color: #CB3D40;*/
/*  box-shadow: 0 0 0 0.25rem rgba(220, 53, 69, 0.25);*/
/*}*/

.text-field__message {
  display: block;
  width: 100%;
  margin-top: 4px;
  font-size: 12px;
  line-height: 14px;
  color: #7E7E7E;
}

.text-field__message_invalid{
  display: block;
  color: #CB3D40;
}
</style>
