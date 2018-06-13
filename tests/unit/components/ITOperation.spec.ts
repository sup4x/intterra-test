import { mount } from '@vue/test-utils'
import ITOperation from '@/components/ITOperation.vue'
import { OperationType } from '@/models/Operation'
import TranslationService from '@/services/TranslationService'
import { LocaleLanguage } from '@/models/Locale'

describe('ITOperation:', () => {
  beforeAll(() => {
    TranslationService.setLocale(LocaleLanguage.RU)
  })

  it('renders operation description', () => {
    const wrapper = mount(ITOperation as any, {
      propsData: {
        operationType: OperationType.BOWLING
      }
    })
    const text = wrapper.text()
    expect(text).toBe(TranslationService.trans(OperationType[OperationType.BOWLING]))
  })
})
