# VFilePicker Plugin for Vue 3

A simple Vue 3 file picker including basic file validation. Such as file size and file type validation.

### Install Plugin

```shell
npm i v-file-picker
```

---

#### How to use !!!

## Method 1

### Import within a specific component to use only in a component

After installing import the component in your desired file.

```js
import { VFilePicker } from "v-file-picker";

export default {
  name: "YourComponentName",
  data() {
    return {
      document: "",
    };
  },
};
```

```html
<!-- Component.vue template -->
<template>
  <v-file-picker
    @fileUploaded="(file) => document = file"
    name="document"
    id="docFile"
    class="col-md-6"
  >
    Document
    <!-- Input label -->
  </v-file-picker>
</template>
```

## Method 2

### Import in main.js file to use globally

After installing import the component in your main.js file.

```js
import VFilePicker from "v-file-picker";

createApp(App).use(VFilePicker).mount("#app");
```

```html
<!-- Component.vue template -->
<template>
  <v-file-picker
    @fileUploaded="(file) => document = file"
    name="document"
    id="docFile"
    class="col-md-6"
  >
    Document
    <!-- Input label -->
  </v-file-picker>
</template>
```

---

## Attention:

#### VFilePicker is using bootstrap 5 CSS file. If you have already included a bootstrap CSS file in your project you don't need to import the VFilePicker CSS file. Otherwise, you need to import the CSS file.

```html
<!-- Import css file -->
<style>
  @import "v-file-picker/dist/style.css";
</style>
```

---

## Example 1

![VFilePickerFileEXtValidation](https://webartist.xyz/file_extension_validation.png)

```js
import VFilePicker from "v-file-picker";

export default {
  name: "YourComponentName",
  data() {
    return {
      document: "",
      extensions: ["jpg", "png", "pdf", "doc"],
    };
  },
};
```

```html
<template>
  <v-file-picker
    @fileUploaded="(file) => document = file"
    :validExtension="extensions"
    name="document"
    id="docFile"
    class="col-md-6"
  >
    Document
  </v-file-picker>
</template>
```

## Example 2

![VFilePickerFileSizeValidation](https://webartist.xyz/file_size_validation.png)

```js
import VFilePicker from "v-file-picker";

export default {
  name: "YourComponentName",
  data() {
    return {
      document: "",
      extensions: ["jpg", "png", "pdf", "doc"],
    };
  },
};
```

```html
<template>
  <v-file-picker
    @fileUploaded="(file) => document = file"
    :validExtension="extensions"
    :size="2097152"
    name="document"
    id="docFile"
    class="col-md-6"
  >
    <!-- Difine size in bytes -->
    Document
  </v-file-picker>
</template>
```

## Example 3

![VFilePickerFileSizeValidation](https://webartist.xyz/with_file_name_and_url_new.png)

```js
import VFilePicker from "v-file-picker";

export default {
  name: "YourComponentName",
  data() {
    return {
      document: "",
      extensions: ["jpg", "png", "pdf", "doc"],
      fileName: "https://webartist.xyz/with_file_name_and_url.png",
      fileURL: "with_file_name_and_url.png",
    };
  },
  methods: {
    removeDoc() {
      this.fileName = "";
      this.fileURL = "";
    },
  },
};
```

```html
<template>
  <v-file-picker
    @fileUploaded="(file) => document = file"
    @removeDoc="removeDoc"
    :validExtension="extensions"
    :size="2097152"
    name="document"
    id="docFile"
    class="col-md-6"
  >
    <!-- Difine size in bytes -->
    Document
  </v-file-picker>
</template>
```

---

## Configuration

### Props

| Name                  | Type      | Default                                                                    | Description                                                                                                        |
| --------------------- | --------- | -------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| **size**              | `Number`  | `2097152`                                                                  | To validate the file size pass a number in bytes.                                                                  |
| **validExtension**    | `array`   | `['jpg', 'jpeg', 'png', 'svg', 'txt', 'xlx', 'pdf', 'docx', 'doc', 'csv']` | To validate the file type pass an Array of extensions.                                                             |
| **extValidation**     | `boolean` | `true`                                                                     | Use to enable or disable file type validation.                                                                     |
| **sizeValidation**    | `boolean` | `true`                                                                     | Use to enable or disable file size validation.                                                                     |
| **extValidationMsg**  | `string`  | `File extension not supported!`                                            | Use string to customize extension validation message.                                                              |
| **sizeValidationMsg** | `string`  | `File size is more than 2 MB`                                              | Use string to customize file size validation message.                                                              |
| **optional**          | `boolean` | `false`                                                                    | Use to show optional word beside the label if your field is optional.                                              |
| **errorMsz**          | `string`  | `''`                                                                       | Use it if you want to show the user any custom error message.                                                      |
| **id**                | `string`  | `''`                                                                       | Use it to set input id                                                                                             |
| **fileUrl**           | `string`  | `''`                                                                       | Use a file URL to show the file that the user previously uploaded. We normally use this when we are updating data. |
| **fileName**          | `string`  | `''`                                                                       | Show the file name that the user previously uploaded. We normally use this when we are updating data.              |

### Events

| Name             | Description                                                                                                                                                                  |
| ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **fileUploaded** | This event will emit when the user uploads a file.                                                                                                                           |
| **removeDoc**    | This event will emit when the user presses the remove button to remove the previous file and upload a new one. Normally we need this event when a user tries to update data. |
