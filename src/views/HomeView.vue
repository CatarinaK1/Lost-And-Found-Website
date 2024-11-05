<script setup>
import Reviews from '@/components/organisms/Reviews.vue';


const props = defineProps({
    logged: Boolean
});
</script>


<template>
    <div class="w-full bg-my-white">
      <div>
        <div class="bg-my-green flex flex-col justify-center items-center py-6 px-40">
        <div class="text-my-white font-bold text-2xl text-center mb-4">
          Discover how we helped others reclaim their lost items
        </div>
        <Reviews :logged="props.logged"/>
      </div>
      </div>
    </div>
  </template>
  