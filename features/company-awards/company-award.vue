<template>
  <div
    :class="['flex items-center snap-center', {
      'gap-size-3': size === 'small',
      'gap-size-6': size === 'large',
    }]"
  >
    <NuxtImg
      v-if="typeof icon === 'string'"
      :src="icon"
      alt="Award"
      :class="['shrink-0', {
        'w-[48px] h-[48px]': size === 'small',
        'w-[64px] h-[64px]': size === 'large',
      }]"
    />

    <component
      :is="icon"
      v-else
      key="desktop"
      :class="['shrink-0', {
        'w-[48px] h-[48px]': size === 'small',
        'w-[64px] h-[64px]': size === 'large',
      }]"
    />

    <div
      :class="['flex flex-col max-xl:w-max', {
        'max-w-[15.8rem] text-[1.6rem] leading-[2.2rem]': size === 'small',
        'max-w-[22rem] t1': size === 'large',
      }]"
    >
      <template v-if="mobileTitle">
        <span
          class="only-desktop"
          v-html="title"
        />
        <span
          class="only-mobile"
          v-html="mobileTitle"
        />
      </template>

      <span
        v-else
        v-html="title"
      />

      <span
        v-if="description"
        class="text-white/50"
      >
        {{ description }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: 'CompanyAward'
})

const props = withDefaults(defineProps<{
  icon: any,
  title: string,
  mobileTitle?: string,
  description?: string,
  size?: 'small' | 'large'
}>(), {
  size: 'small',
})

const {
  icon,
  title,
  mobileTitle,
  description,
  size,
} = toRefs(props)
</script>
