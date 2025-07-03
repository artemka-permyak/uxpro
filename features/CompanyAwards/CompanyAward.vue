<template>
  <div class="flex gap-mbGap items-center snap-center">
    <NuxtImg
      v-if="typeof icon === 'string'"
      :src="icon"
      alt="Award"
      class="shrink-0 w-[48px] h-[48px]"
    />

    <component
      :is="icon"
      v-else
      key="desktop"
      class="shrink-0 w-[48px] h-[48px]"
    />

    <div class="max-w-[15.8rem] flex flex-col text-[1.6rem] leading-[2.2rem] mb:w-max">
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

const props = defineProps<{
  icon: any,
  title: string,
  mobileTitle?: string,
  description?: string,
}>()

const {
  icon,
  title,
  mobileTitle,
  description,
} = toRefs(props)
</script>
