import TranslationService from '@/services/TranslationService'
import { LocaleLanguage } from '@/models/Locale'

describe('TranslationService:', () => {
  it('loads locale from json file', async () => {
    await TranslationService.setLocale(LocaleLanguage.RU)
    expect(TranslationService.trans('WATERING')).toBe('Полив')
    expect(TranslationService.trans('NO_ASSESSMENT')).toBe('Нет оценки')
  })
})
