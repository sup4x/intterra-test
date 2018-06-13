<template>
  <div class="it-quality" :class="{'it-quality_no-assessment': assessment === null}">
      <div class="it-quality__mark" :class="markClasses"></div>
      <div class="it-quality__label">
        {{label}}
      </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue'
import { Assessment } from '@/models/Operation'
import TranslationService from '@/services/TranslationService'

type AssessmentProp = Assessment | null

export default defineComponent({
  name: 'ITQuality',
  props: {
    assessment: {
      type: Number as PropType<AssessmentProp>,
      default: () => null
    }
  },
  setup (props) {
    const label = computed(() => {
      if (props.assessment !== null) {
        return TranslationService.trans(Assessment[props.assessment])
      } else {
        return TranslationService.trans('NO_ASSESSMENT')
      }
    })

    const markClasses = computed(() => {
      const classes = ['it-quality-mark']
      if (props.assessment !== null) {
        classes.push(`it-quality-mark_${Assessment[props.assessment].toLowerCase()}`)
      }
      return classes
    })

    return {
      label,
      markClasses
    }
  }
})
</script>

<style lang="scss">
@import "~@/style/components/it-quality";
</style>
