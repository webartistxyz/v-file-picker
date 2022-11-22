import "./style.css";
import VFilePicker from "./components/VFilePicker.vue";

export default {
    install:(app, options) => {
        app.component("VFilePicker", VFilePicker);
    },
};

export {VFilePicker};
