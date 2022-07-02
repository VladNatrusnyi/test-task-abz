<template>
  <div class="upload_field_wrapper">
    <div class="input_wrapper">
      <input type="file" id="input_file" class="input input_file"  accept=".jpg, .jpeg" @change="changeUploadData($event)" >
      <label for="input_file" class="input_file_button" :class="{text_field_invalid : error}">
        <span class="input_file_icon_wrapper" :class="{text_field_invalid_btn : error}">Upload</span>
        <span v-if="file.length" class="input_file_button_text " >{{ file[0].name }}</span>
        <span v-else class="input_file_button_text_static">Upload your photo</span>
      </label>
    </div>
    <div class="text_field_message text_field_message_invalid"
         v-if="error">
      {{error}}
    </div>
  </div>
</template>

<script>

export default {
  props: {
    error: {
      type: String
    }
  },
  name: 'UploadField',
  data () {
    return {
      file: []
    }
  },
  methods: {
    changeUploadData (e) {
      this.file = []
      if (e.target.files.length) {
        this.file.push(e.target.files[0])
        this.$emit('changeUploadData', this.file)
      } else {
        this.file = []
        this.$emit('changeUploadData', [])
      }
    }
  }
}
</script>

<style scoped>
.upload_field_wrapper{
  margin-bottom: 50px;
}
.text_field_message {
  display: block;
  width: 100%;
  margin-top: 4px;
  font-size: 12px;
  line-height: 14px;
  color: #7E7E7E;
}

.text_field_invalid{
  border: 2px solid #CB3D40!important;
}
.text_field_invalid_btn{
  border: 2px solid #CB3D40!important;
  border-left: none!important;
}
.text_field_message {
  color: #CB3D40!important;
}
.input_wrapper {
  width: 100%;
  position: relative;
}

.input_file {
  opacity: 0;
  visibility: hidden;
  position: absolute;
}

.input_file_icon_wrapper {
  height: 54px;
  width: 83px;
  margin-right: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(0, 0, 0, 0.87);
  border-radius: 4px 0px 0px 4px;
  color: rgba(0, 0, 0, 0.87);
  }

.input_file_button_text {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 300px;
  color: rgba(0, 0, 0, 0.87);

}
.input_file_button {
  width: 100%;
  height: 54px;
  background: #F8F8F8;
  color: #7E7E7E;
  border: 1px solid #D0CFCF;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  cursor: pointer;
  margin: 0 auto;
  border-radius: 4px;
  border-left: none;
}
</style>
