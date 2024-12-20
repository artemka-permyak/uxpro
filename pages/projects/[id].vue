<template>
  <div class="flex flex-col gap-[12.8rem] mb:gap-[8rem]">
    <div class="flex flex-col">
      <ProjectPageHeader
        :project="project"
      />

      <NuxtImg
        :src="project?.app_image"
        format="webp"
        preload
        alt="Главное изображение"
        class="w-full p-gap object-cover mb:px-0 mb:py-mbGap"
      />
    </div>

    <div
      v-for="block in blocks"
      :key="block.id"
      class="px-gap mb:px-0"
    >
      <div
        v-if="['splitBlock', 'splitBlockDivided'].includes(block.type)"
        class="flex flex-col gap-[16rem] mb:gap-[8rem]"
      >
        <SplitBlock>
          <template #left>
            <h1 class="h1 mb:px-mbGap">
              {{ getSplitBlockTitle(getSplitBlockIndex(block)) }}
            </h1>
          </template>

          <template #right>
            <div class="flex flex-col gap-[6.4rem] mb:gap-gap mb:px-mbGap">
              <div class="flex flex-col gap-[2.4rem]">
                <h1 class="h1">
                  {{ block.title }}
                </h1>

                <p
                  v-if="block.description"
                  class="t1sb"
                >
                  {{ block.description }}
                </p>
              </div>

              <template v-if="block.content?.length">
                <div
                  v-if="block.type === 'splitBlockDivided'"
                  class="flex flex-col border-t border-t-solid border-t-darkGrey"
                >
                  <div
                    v-for="(itemContent, itemContentIndex) in block.content"
                    :key="`divided-content-item-${itemContentIndex}`"
                    class="flex flex-col gap-[2.4rem] border-b border-b-solid border-b-darkGrey py-gap"
                  >
                    <h2 class="h2">
                      {{ itemContent.title }}
                    </h2>

                    <p
                      v-if="itemContent.description"
                      class="t1"
                    >
                      {{ itemContent.description }}
                    </p>
                    <p
                      v-else
                      class="t1 text-grey"
                    >
                      {{ itemContent.dedicatedDescription }}
                    </p>
                  </div>
                </div>

                <div
                  v-if="block.type === 'splitBlock'"
                  class="flex flex-col gap-[12.8rem]"
                >
                  <div
                    v-for="(itemContent, itemContentIndex) in block.content"
                    :key="`content-item-${itemContentIndex}`"
                    class="flex flex-col gap-[2.4rem]"
                  >
                    <p class="t1sb">
                      {{ itemContent.smallTitle }}
                    </p>

                    <div class="t1 flex flex-col gap-[2.4rem] text-grey">
                      <p
                        v-for="(description, descriptionIndex) in itemContent.dedicatedDescription"
                        :key="`split-block-description-${descriptionIndex}`"
                        class="only-desktop"
                      >
                        {{ description }}
                      </p>

                      <p
                        v-for="(description, descriptionIndex) in itemContent.dedicatedDescription.slice(0, 1)"
                        :key="`split-block-description-mobile-${descriptionIndex}`"
                        class="only-mobile"
                      >
                        {{ description }}
                      </p>

                      <template v-if="showedSplitBlocksContentSmallTitleIds.includes(block.id)">
                        <p
                          v-for="(description, descriptionIndex) in itemContent.dedicatedDescription.slice(1)"
                          :key="`split-block-description-mobile-${descriptionIndex + 1}`"
                          class="only-mobile"
                        >
                          {{ description }}
                        </p>
                      </template>

                      <div
                        v-if="itemContent.dedicatedDescription.length - 1 > 0 && !showedSplitBlocksContentSmallTitleIds.includes(block.id)"
                        class="only-mobile t1sb w-max text-white border-b border-b-solid border-b-white"
                        @click="showSplitBlockContentSmallTitle(block.id)"
                      >
                        Еще {{ itemContent.dedicatedDescription.length - 1 }}
                      </div>
                    </div>
                  </div>
                </div>
              </template>
            </div>
          </template>
        </SplitBlock>

        <div
          v-if="block.images?.length"
          :class="['gap-gap only-desktop', {
            'flex flex-col': !block.images_mosaic,
            'grid grid-cols-2': block.images_mosaic,
          }]"
        >
          <NuxtImg
            v-for="(image, imageIndex) in block.images"
            :key="`${block.title}-image-${imageIndex}`"
            :src="image"
            :alt="`${block.title} Изображение`"
            format="webp"
            loading="lazy"
            :class="[{
              'col-span-2': block.images_mosaic === 'top' && imageIndex === 0,
              'row-span-2': block.images_mosaic === 'left' && imageIndex === 1,
            }]"
          />
        </div>

        <div
          v-if="block.images?.length"
          class="flex flex-col gap-mbGap only-mobile"
        >
          <NuxtImg
            v-for="(image, imageIndex) in block.images"
            :key="`${block.title}-image-mobile-${imageIndex}`"
            :src="image"
            :alt="`${block.title} Изображение`"
            format="webp"
            loading="lazy"
          />
        </div>
      </div>

      <div
        v-if="block.type === 'centeredBlock' && block.content?.length"
        class="flex flex-col gap-[15.2rem] mb:gap-gap"
      >
        <div class="w-[89.6rem] mx-auto flex flex-col gap-[9.6rem] mb:w-full mb:gap-[4.8rem] mb:px-mbGap">
          <h1 class="h1">
            {{ block.title }}
          </h1>

          <div
            v-for="(itemContent, itemContentIndex) in block.content"
            :key="`centered-block-content-item-${itemContentIndex}`"
            class="flex flex-col gap-[6.4rem] mb:gap-[3.2rem]"
          >
            <div class="flex flex-col gap-[2.4rem]">
              <h2 class="h2">
                {{ itemContentIndex + 1 }}. {{ itemContent.title }}
              </h2>

              <p class="t1 text-grey">
                {{ itemContent.description }}
              </p>
            </div>
            <div class="flex gap-[2.4rem] mb:overflow-x-auto mb:snap-x">
              <NuxtImg
                v-for="(image, imageIndex) in itemContent.images"
                ref="centeredBlockImages"
                :key="`centered-block-content-item-image-${imageIndex}`"
                :src="image"
                :alt="`${block.title} ${itemContent.title} Контент Изображение`"
                :class="`h-auto flex-1 mb:snap-center`"
                :style="{
                  width: `calc(100% / ${itemContent.images.length}`,
                }"
                format="webp"
                loading="lazy"
                @load="getCenteredBlockImageDimensions(block, itemContentIndex, imageIndex)"
              />
            </div>
          </div>
        </div>

        <div class="flex flex-col gap-[6.4rem]">
          <NuxtImg
            v-for="(image, imageIndex) in block.images"
            :key="`centered-block-image-${imageIndex}`"
            :src="image"
            :alt="`${block.title} Изображение`"
            format="webp"
            loading="lazy"
          />
        </div>
      </div>

      <div
        v-if="block.type === 'review'"
        class="flex flex-col gap-[12.8rem] mb:gap-[6.4rem] mb:px-mbGap"
      >
        <div class="flex justify-between gap-mbGap mb:flex-col">
          <div class="flex flex-col justify-between gap-[2.4rem]">
            <h1 class="h1">
              {{ getSplitBlockTitle(getSplitBlockIndex(block)) }}
            </h1>

            <h1 class="h1">
              Отзыв клиента
            </h1>
          </div>

          <div class="only-desktop h1 w-[121.1rem]">
            <p
              v-for="(itemReview, itemReviewIndex) in block.review"
              :key="`review-item-${itemReviewIndex}`"
            >
              {{ itemReview }}
            </p>
          </div>

          <div class="only-mobile t1sb w-full">
            <p
              v-for="(itemReview, itemReviewIndex) in block.review"
              :key="`review-item-mobile-${itemReviewIndex}`"
            >
              {{ itemReview }}
            </p>
          </div>
        </div>

        <div class="w-full flex gap-[1.6rem] mb:flex-col">
          <div
            v-for="index in 3"
            :key="`review-photo-${index}`"
            class="w-full"
          >
            <ReviewQuotes
              v-if="index === 1"
              width="608"
              height="608"
              class="w-full only-desktop"
            />

            <ReviewQuotes
              v-if="index === 1"
              class="w-full only-mobile"
            />

            <NuxtImg
              v-if="index === 2"
              :src="block.reviewer_photo"
              alt="Клиент"
              class="w-full"
              format="webp"
              loading="lazy"
            />

            <div
              v-if="index === 3"
              class="w-full h-full flex flex-col justify-end gap-[1rem] bg-darkGrey p-gap mb:aspect-square"
            >
              <h2 class="h2">
                {{ block.reviewer_name }}
              </h2>

              <p class="t1sb">
                {{ block.reviewer_job_title }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <SplitBlock v-if="block.type === 'author'">
        <template #right>
          <div class="flex flex-col gap-[6.4rem] mb:gap-mbGap mb:px-mbGap">
            <h1 class="h1">
              {{ block.title }}
            </h1>

            <div class="flex flex-col border-t border-t-solid border-t-darkGrey">
              <div
                v-for="(author, authorIndex) in block.content"
                :key="`author-${authorIndex}`"
                class="flex justify-between py-gap border-b border-b-solid border-b-darkGrey mb:flex-col mb:gap-mbGap"
              >
                <h3 class="h3">
                  {{ author.name }}
                </h3>

                <h3 class="h3 only-desktop">
                  {{ author.job_title }}
                </h3>

                <p class="t1sb only-mobile text-grey">
                  {{ author.job_title }}
                </p>
              </div>
            </div>
          </div>
        </template>
      </SplitBlock>
    </div>

    <SplitBlock>
      <template #right>
        <div class="pt-[12.8rem] flex flex-col gap-[12.8rem] mb:pt-[6.4rem] mb:gap-[6.4rem] mb:px-mbGap">
          <h1 class="h1">
            От идеи до реализации: ваш путь к успешному UX/UI!
          </h1>

          <ContactUsFeature
            size="large"
            without-border
          />
        </div>
      </template>
    </SplitBlock>
  </div>
</template>

<script setup lang="ts">
import { getSplitBlockTitle, SplitBlock } from '@/global/ui'
import { ProjectPageHeader } from '@/widgets/ProjectPage'
import ReviewQuotes from '@/public/svgs/reviewQuotes.svg'
import ContactUsFeature from '@/features/ContactUs.vue'

defineOptions({
  name: 'ProjectPage',
})

const route = useRoute();

const showedSplitBlocksContentSmallTitleIds = ref<string[]>([]);

const centeredBlockImages = ref();

const { data: projectData } = useAsyncData('projects', () => {
  return $fetch(`/api/projects/${route.params.id}`)
})

const project = computed(() => {
  return projectData?.value?.data;
})

const { data: blocksData } = useAsyncData('blocks', () => {
  return $fetch(`/api/projects/${route.params.id}/blocks`)
})

const blocks = computed(() => {
  return [...blocksData?.value?.data || []].sort((a, b) => a.order - b.order);
})

function getSplitBlockIndex(block: object) {
  const splitBlocks = blocks.value.filter(block => ['splitBlock', 'splitBlockDivided', 'review'].includes(block.type))

  const index = splitBlocks.findIndex(splitBlock => splitBlock.id === block.id)

  if (index === -1) {
    return `0`
  } else {
    return `0${index + 1}`
  }
}

function showSplitBlockContentSmallTitle(id: string) {
  showedSplitBlocksContentSmallTitleIds.value.push(id);
}

function getCenteredBlockImageDimensions(block: object, itemContentIndex: number, imageIndex: number) {
  let sum = 0;

  for (let i = itemContentIndex - 1; i >= 0; i--) {
    const prevLength = block.content[i].images.length;

    sum += prevLength
  }

  const img = centeredBlockImages.value[sum + imageIndex].$el;
  const width = img.naturalWidth;
  const height = img.naturalHeight;
  console.log(`Ширина: ${width}, Высота: ${height}`);
}

</script>
