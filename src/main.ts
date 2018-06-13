import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import TranslationService from '@/services/TranslationService'
import { LocaleLanguage } from '@/models/Locale'

TranslationService.setLocale(LocaleLanguage.RU).then(
  () =>
    createApp(App).use(store).use(router).mount('#app')
)
