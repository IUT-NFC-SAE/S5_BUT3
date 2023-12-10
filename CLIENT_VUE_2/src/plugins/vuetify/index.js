import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

// Import Material Design Icons (MDI) font
import '@mdi/font/css/materialdesignicons.min.css';
import lightTheme from "@/plugins/vuetify/themes/lightTheme";
import darkTheme from "@/plugins/vuetify/themes/darkTheme";

const vuetify = createVuetify({
    components,
    directives,
    theme: {
        defaultTheme: localStorage.getItem('theme') || 'darkTheme',
        themes: {
            lightTheme,
            darkTheme,
        },
    },
});

export default vuetify;