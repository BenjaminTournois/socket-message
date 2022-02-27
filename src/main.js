import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App)
import io from "socket.io-client";
app.config.globalProperties.$io = io("http://127.0.0.1:3000", { transports: ["websocket"] }),
app.mount('#app')
