<template>
    <div v-for="operation in operations"
        :key="operation.id"
         class="it-operations-list-item"
    >
      <ITDate class="it-operations-list-item__date uppercase" :date="operation.date" />
      <ITOperation class="it-operations-list-item__operation-type" :operation-type="operation.type" />
      <div>{{operation.comment}}</div>
      <ITQuality class="it-operations-list-item__quality" :assessment="operation.assessment" />
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import Operation from '../models/Operation'
import ITDate from './ITDate.vue'
import ITOperation from '@/components/ITOperation.vue'
import ITQuality from '@/components/ITQuality.vue'

export default defineComponent({
  name: 'ITOperationsList',
  components: { ITQuality, ITOperation, ITDate },
  props: {
    operations: {
      type: Array as PropType<Array<Operation>>,
      required: true
    }
  }
})
</script>

<style lang="scss">
@import "~@/style/components/it-operations-list";
</style>
