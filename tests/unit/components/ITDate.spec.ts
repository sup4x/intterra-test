import { mount } from '@vue/test-utils'
import ITDate from '@/components/ITDate.vue'
import TDate, { DEFAULT_DATE_FORMAT } from '@/models/TDate'
import { format } from 'date-fns'
import TranslationService from '@/services/TranslationService'
import { LocaleLanguage } from '@/models/Locale'

describe('ITDate:', () => {
  beforeAll(async () => {
    await TranslationService.setLocale(LocaleLanguage.RU)
  })

  it('renders date with default format in upper case', () => {
    const year = 2007
    const month = 3
    const day = 23
    const date: TDate = { year, month, day }
    const wrapper = withProps(date)
    const renderedDate = wrapper.text()
    expect(renderedDate).toBe(
      defaultDateFormat(new Date(year, month, day)).toUpperCase()
    )
  })
})

function withProps (date: TDate, format?: string) {
  const options : any = {
    propsData: { date }
  }
  if (format) {
    options.propsData.format = format
  }
  return mount(ITDate as any, options)
}

function defaultDateFormat (date: Date) {
  return format(date, DEFAULT_DATE_FORMAT, {
    locale: TranslationService.getDateLocale()
  })
}
