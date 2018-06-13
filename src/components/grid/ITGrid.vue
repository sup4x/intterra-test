<template>
  <div class="it-grid">
    <div class="it-grid-filters">
      <div v-for="filter in settings.filters"
           :key="filter.key"
           class="it-grid-filter-item"
           :class="{'it-grid-filter-item_active': currentFilter === filter.key}"
           @click="filterGrid(filter)"
      >
        {{ trans(filter.label)}}
      </div>
    </div>
    <div class="it-grid-data">
        <div class="it-grid-column it-grid-column_header"
             v-for="column in settings.columns"
             :key="column.key">
          <ITGridHeader
              :label="column.label"
              :active="sortingKey === column.key"
              :direction="sortingDirection"
              @click="sortGrid(column)"
          />
        </div>
      <template v-for="(item, index) in state" :key="index" class="it-grid-row">
        <div class="it-grid-column" v-for="column in settings.columns" :key="column.key">
          <slot
                :name="column.key"
                :item="item"
          >
            {{ item[column.key] }}
          </slot>
        </div>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, ref, watch } from 'vue'
import { GridColumn, GridColumnType, GridFilter, GridSettings, SortingDirection } from '../../models/Grid'
import ITGridHeader from './ITGridHeader.vue'
import TranslationService from '@/services/TranslationService'
import { getSortFunction } from '@/services/GridService'

export default defineComponent({
  name: 'ITGrid',
  components: { ITGridHeader },
  props: {
    settings: {
      type: Object as PropType<GridSettings<any>>,
      required: true
    },
    data: {
      type: Array,
      default: () => []
    }
  },
  setup (props) {
    const currentFilter = ref<string>('')
    const state = ref<Array<any>>(props.data)
    const sortingDirection = ref<SortingDirection>(SortingDirection.DESC)
    const sortingKey = ref<string>('')

    watch(() => props.data, (fresh) => {
      state.value = fresh
    })

    const filterGrid = (filter: GridFilter<any>) => {
      if (currentFilter.value === filter.key) {
        state.value = props.data
        currentFilter.value = ''
      }
      state.value = props.data.filter(filter.isItemAccurate)
      currentFilter.value = filter.key
    }

    const sortGrid = (column: GridColumn<any>) => {
      if (column.key === sortingKey.value) {
        sortingDirection.value = (sortingDirection.value === SortingDirection.DESC)
          ? SortingDirection.ASC : SortingDirection.DESC
      }
      state.value = state.value.sort(getSortFunction(column, sortingDirection.value))
      sortingKey.value = column.key
    }

    const trans = (key: string) => TranslationService.trans(key)

    return {
      currentFilter,
      trans,
      state,
      filterGrid,
      sortingDirection,
      sortingKey,
      sortGrid
    }
  }
})
</script>

<style lang="scss">
@import "~@/style/components/grid/it-grid";
</style>
