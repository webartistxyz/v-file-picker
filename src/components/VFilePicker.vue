<template>
    <div>
        <label :for="id" class="flex-design">
            <slot/>
            <span v-if="optional" class="text-secondary">(Optional)</span>
        </label>
        <input v-if="!fileName"
               :id="id"
               ref="filePicker"
               type="file"
               class="form-control"
               :class="{'is-invalid' : errorMsz || internalError}"
               v-bind="$attrs"
               @change="onChange"
               :value="modelValue"
        />

        <div class="input-group" v-if="fileUrl && fileName">
            <a class="form-control" style="display: inline-block; width: 110px; white-space: nowrap; overflow: hidden !important; text-overflow: ellipsis;" 
            :href="fileUrl" target="_blank">{{ fileName }}</a>
            <label @click="$emit('removeDoc')"
                   class="btn btn-danger">Remove</label>
        </div>

        <div class="invalid-feedback" v-if="errorMsz || internalError">
            {{ errorMsz || internalError }}
        </div>
    </div>
</template>

<script>
export default {
    name: "FileInput",
    props: {
        size: {
            type: Number,
            default: 2097152,
        },
        errorMsz: {
            type: String,
            default: '',
        },
        id: {
            type: String,
            default: ""
        },
        modelValue: {
            type: [String],
            default: ""
        },
        fileUrl: {
            type: String,
            default: ""
        },
        fileName: {
            type: String,
            default: ""
        },
        validExtension: {
            type: Array,
            default: ['jpg', 'jpeg', 'png', 'svg', 'txt', 'xlx', 'pdf', 'docx', 'doc', 'csv']
        },
        extValidation: {
            type: Boolean,
            default: true
        },
        sizeValidation: {
            type: Boolean,
            default: true
        },
        extValidationMsg: {
            type: String,
            default: ""
        },
        sizeValidationMsg: {
            type: String,
            default: ""
        },
        optional: false
    },
    data() {
        return {
            internalError: '',
          timeout: ''
        }
    },
    watch: {
        internalError(){
          if (this.timeout) {
              clearTimeout(this.timeout);
          }
            this.timeout = setTimeout(() => {
                this.internalError = ''
            }, 3000)
        }
    },
    methods: {
        formatBytes(bytes, decimals = 2) {
            if (!+bytes) return '0 Bytes'

            const k = 1024
            const dm = decimals < 0 ? 0 : decimals
            const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']

            const i = Math.floor(Math.log(bytes) / Math.log(k))

            return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`
        },
        onChange(e) {
            let fileName = e.target.files[0].name;
            let ext = fileName.split('.').pop();
            let file = e.target.files[0];
            if (this.extValidation) {
                if (!this.validExtension.includes(ext)) {
                    this.internalError = this.extValidationMsg || "File extension not supported!"
                    this.$refs.filePicker.value = null;
                    return false;
                }
            }3
            if (this.sizeValidation){
                if (file.size > this.size) {
                    this.internalError = this.sizeValidationMsg || "File size is more than "+ this.formatBytes(this.size) + "!"
                    this.$refs.filePicker.value = null;
                    return false;
                }
            }
            this.$emit('update:modelValue', e.target.files[0])
            this.$emit('fileUploaded', e.target.files[0])
        }
    },
};
</script>