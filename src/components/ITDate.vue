<template>
  <div class="it-date">
    {{formattedDate}}
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue'
import TDate, { DEFAULT_DATE_FORMAT } from '@/models/TDate'
import { format } from 'date-fns'
import TranslationService from '@/services/TranslationService'

export default defineComponent({
  name: 'ITDate',
  props: {
    date: {
      type: Object as PropType<TDate>,
      required: true
    },
    format: {
      type: String,
      default: () => DEFAULT_DATE_FORMAT
    }
  },
  setup (props) {
    const formattedDate = computed(() => {
      const { day, month, year } = props.date
      const formattedDate = format(
        new Date(year, month, day),
        DEFAULT_DATE_FORMAT,
        { locale: TranslationService.getDateLocale() })
      return formattedDate.toUpperCase()
    })
    return { formattedDate }
  }
})
</script>
