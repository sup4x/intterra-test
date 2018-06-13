<template>
  <div class="it-operation">
    {{operationName}}
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, PropType } from 'vue'
import { OperationType } from '../models/Operation'
import TranslationService from '@/services/TranslationService'

export default defineComponent({
  name: 'ITOperation',
  props: {
    operationType: {
      type: Number as PropType<OperationType>,
      required: true
    }
  },
  setup (props) {
    const operationName = computed(() => {
      return TranslationService.trans(OperationType[props.operationType])
    })
    return {
      operationName
    }
  }
})
</script>
