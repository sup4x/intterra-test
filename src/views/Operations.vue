<template>
  <div class="operations">
     <h1>Операции на поле 112</h1>
     <ITOperationsGrid :operations="operations" />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import ITOperationsGrid from '@/components/ITOperationsGrid.vue'
import Operation from '@/models/Operation'
import FieldService from '@/services/FieldService'

export default defineComponent({
  name: 'Home',
  components: {
    ITOperationsGrid
  },
  setup () {
    const operations = ref<Array<Operation>>([])

    onMounted(async () => {
      operations.value = await new FieldService().getOperations()
    })

    return {
      operations
    }
  }
})
</script>

<style lang="scss">
@import "~@/style/views/operations";
</style>
