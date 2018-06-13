import { mount } from '@vue/test-utils'
import ITQuality from '@/components/ITQuality.vue'
import { Assessment } from '@/models/Operation'
import TranslationService from '@/services/TranslationService'
import { LocaleLanguage } from '@/models/Locale'

describe('ITQuality:', () => {
  beforeAll(async () => {
    await TranslationService.setLocale(LocaleLanguage.RU)
  })

  it('renders assessment label', () => {
    const wrapper = withAssessment(Assessment.EXCELLENT)
    const label = wrapper.find('.it-quality__label')
    expect(label.text()).toBe(TranslationService.trans(Assessment[Assessment.EXCELLENT]))
  })

  it('renders quality mark', () => {
    const assessment = Assessment.EXCELLENT
    const wrapper = withAssessment(assessment)
    const mark = wrapper.find('.it-quality__mark')
    expect(mark.classes()).toStrictEqual([
      'it-quality__mark',
      'it-quality-mark',
      `it-quality-mark_${Assessment[assessment].toLowerCase()}`
    ])
  })

  it('shows no assessment message if it\'s not passed', () => {
    const wrapper = withAssessment(null)
    const mark = wrapper.find('.it-quality__label')
    expect(mark.text()).toBe(TranslationService.trans('NO_ASSESSMENT'))
  })
})

function withAssessment (assessment: Assessment | null) {
  return mount(ITQuality as any, {
    propsData: { assessment }
  })
}
