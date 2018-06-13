import { mount, VueWrapper } from '@vue/test-utils'
import ITGridHeader from '@/components/grid/ITGridHeader.vue'
import { SortingDirection } from '@/models/Grid'

describe('ITGridHeader:', () => {
  it('renders passed label', () => {
    const label = 'Дата'
    const wrapper = withProps({ label })
    const labelEl = wrapper.find('.it-grid-header__label')
    expect(labelEl.text()).toBe(label)
  })

  it('renders sorting icon', () => {
    const wrapper = withProps({ label: 'Время' })
    expect(wrapper.find('.it-grid-header-icon').exists()).toBeTruthy()
  })

  it('shows if sorting is enabled', () => {
    const wrapper = withProps({ label: 'Время', active: true })
    iconHasClass(wrapper, 'it-grid-header-icon_active')
  })

  it('shows sorting direction', () => {
    const wrapperAsc = withProps({ label: 'Время', direction: SortingDirection.ASC })
    iconHasClass(wrapperAsc, 'it-grid-header-icon_asc')
    const wrapperDesc = withProps({ label: 'Время', direction: SortingDirection.DESC })
    iconHasClass(wrapperDesc, 'it-grid-header-icon_desc')
  })
})

function withProps (props: any) {
  return mount(ITGridHeader as any, {
    propsData: props
  })
}

function iconHasClass (wrapper: VueWrapper<any>, className: string) {
  const icon = wrapper.find('.it-grid-header-icon')
  expect(icon.classes().includes(className)).toBeTruthy()
}
