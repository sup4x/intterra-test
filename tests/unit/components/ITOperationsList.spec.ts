import { mount } from '@vue/test-utils'
import ITOperationsList from '@/components/ITOperationsList.vue'
import FieldService from '@/services/FieldService'
import Operation from '@/models/Operation'
import TranslationService from '@/services/TranslationService'
import { LocaleLanguage } from '@/models/Locale'
import { random } from 'lodash'

describe('ITOperationsList:', () => {
  beforeAll(async () => {
    await TranslationService.setLocale(LocaleLanguage.RU)
  })

  it('renders row per operation', async () => {
    const operations = await new FieldService().getOperations()
    const wrapper = withOperations(operations)
    const rows = wrapper.findAll('.it-operations-list-item')
    expect(rows.length).toBe(operations.length)
  })

  it('any rendered row has main info components', async () => {
    const operations = await new FieldService().getOperations()
    const wrapper = withOperations(operations)
    const rows = wrapper.findAll('.it-operations-list-item')
    const row = rows[random(0, rows.length)]
    expect(wrapper.find('.it-operations-list-item__date')).toBeTruthy()
    expect(wrapper.find('.it-operations-list-item__operation-type')).toBeTruthy()
    expect(wrapper.find('.it-operations-list-item__quality')).toBeTruthy()
  })
})

function withOperations (operations: Array<Operation>) {
  return mount(ITOperationsList as any, {
    propsData: {
      operations
    }
  })
}
