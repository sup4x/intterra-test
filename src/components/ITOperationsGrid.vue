<template>
  <div class="it-operations-grid">
    <ITGrid :settings="settings" :data="operations">
      <template #date="{item}">
        <ITDate :date="item.date" class="it-operations-grid__type" />
      </template>
      <template #type="{item}">
        <ITOperation :operation-type="item.type" class="it-operations-grid__type"/>
      </template>
      <template #assessment="{item}">
        <ITQuality :assessment="item.assessment"/>
      </template>
    </ITGrid>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, watch } from 'vue'
import ITGrid from '@/components/grid/ITGrid.vue'
import Operation from '@/models/Operation'
import { GridColumnType, GridSettings } from '@/models/Grid'
import { dateFromTDate } from '@/models/TDate'
import ITDate from '@/components/ITDate.vue'
import ITOperation from '@/components/ITOperation.vue'
import ITQuality from '@/components/ITQuality.vue'

export default defineComponent({
  name: 'ITOperationsGrid',
  components: {
    ITQuality,
    ITOperation,
    ITDate,
    ITGrid
  },
  props: {
    operations: {
      type: Array as PropType<Array<Operation>>,
      required: true
    }
  },
  setup () {
    const settings : GridSettings<Operation> = {
      columns: [
        {
          label: 'Дата',
          key: 'date',
          type: GridColumnType.DATE,
          parseToTypeFunc: dateFromTDate
        },
        {
          label: 'Операция',
          key: 'type',
          type: GridColumnType.NUMBER
        },
        {
          label: 'Комментарий',
          key: 'comment',
          type: GridColumnType.STRING
        },
        {
          label: 'Качество',
          key: 'assessment',
          type: GridColumnType.NUMBER
        }
      ],
      filters: [
        {
          label: 'PLANNED_OPERATIONS',
          key: 'planned',
          isItemAccurate: (item: Operation) => {
            return new Date() < dateFromTDate(item.date)
          }
        },
        {
          label: 'DONE_OPERATIONS',
          key: 'done',
          isItemAccurate: (item: Operation) => {
            return new Date() > dateFromTDate(item.date)
          }
        }
      ]
    }

    return {
      settings
    }
  }
})
</script>

<style lang="scss">
@import "~@/style/components/it-operations-grid";
</style>
