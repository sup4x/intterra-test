<template>
  <div class="it-grid-header">
    <div class="it-grid-header__label">{{label}}</div>
    <div class="it-grid-header__icon" :class="iconClasses"></div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue'
import { SortingDirection } from '@/models/Grid'

export default defineComponent({
  name: 'ITGridHeader',
  props: {
    label: String,
    active: Boolean,
    direction: {
      type: String as PropType<SortingDirection>,
      default: () => SortingDirection.DESC
    }
  },
  setup (props) {
    const iconClasses = computed(() => {
      return {
        'it-grid-header-icon': true,
        'it-grid-header-icon_active': props.active,
        'it-grid-header-icon_asc': props.direction === SortingDirection.ASC,
        'it-grid-header-icon_desc': props.direction === SortingDirection.DESC
      }
    })
    return {
      iconClasses
    }
  }
})
</script>

<style lang="scss">
@import "~@/style/const.scss";

.it-grid-header {
  display: flex;
  flex-direction: row;
  align-items: center;
  user-select: none;

  &:hover {
    cursor: pointer;
  }

  &__label {
    margin-right: 5px;
  }

  &-icon {
    &_asc {
      width: 0;
      height: 0;
      border-style: solid;
      border-width: 0 5px 5px 5px;
      border-color: transparent transparent $grey;
    }

    &_desc {
      width: 0;
      height: 0;
      border-style: solid;
      border-width: 5px 5px 0 5px;
      border-color: $grey transparent transparent
    }

    &_active {
      border-top-color: $blue;
      border-bottom-color: $blue;
    }
  }
}
</style>
