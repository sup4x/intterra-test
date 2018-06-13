import { LocaleLanguage, LocaleMap } from '@/models/Locale'
import { ru } from 'date-fns/locale'
import { Locale } from 'date-fns'

export default class TranslationService {
    private static localeMap : LocaleMap
    private static dateLocal: Locale
    private static dateLocales = {
      [LocaleLanguage.RU]: ru
    }

    static async setLocale (locale: LocaleLanguage) : Promise<boolean> {
      this.localeMap = await import(`@/locales/${locale}.json`)
      this.dateLocal = this.dateLocales[locale]
      return true
    }

    static trans (key: string) : string {
      return this.localeMap[key] || key
    }

    static getDateLocale () : Locale {
      return this.dateLocal
    }
}
