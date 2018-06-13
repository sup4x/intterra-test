import { createStore } from 'vuex'
import Operation from '@/models/Operation'
import { LocaleLanguage } from '@/models/Locale'
import TranslationService from '@/services/TranslationService'
import FieldService from '@/services/FieldService'

export enum VuexMutations {
  SET_OPERATIONS = 'SET_OPERATIONS'
}

export enum VuexActions {
  SET_LOCALE = 'SET_LOCALE',
  GET_OPERATIONS = 'GET_OPERATIONS'
}

interface State {
  locale: LocaleLanguage,
  operations: Array<Operation>
}

export default createStore<State>({
  state: {
    locale: LocaleLanguage.RU,
    operations: []
  },
  mutations: {
    [VuexMutations.SET_OPERATIONS] (state, operations: Array<Operation>) {
      state.operations = operations
    }
  },
  actions: {
    async [VuexActions.SET_LOCALE] ({ state: { locale } }) {
      return TranslationService.setLocale(locale)
    },

    async [VuexActions.GET_OPERATIONS] ({ commit }) {
      const operations = await new FieldService().getOperations()
      commit(VuexMutations.SET_OPERATIONS, operations)
    }
  },
  modules: {}
})
