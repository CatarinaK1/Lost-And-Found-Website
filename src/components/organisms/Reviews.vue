<script setup>
import ReviewCard from '@/components/molecules/ReviewCard.vue';
import AddOpinionButton from '@/components/molecules/AddOpinionButton.vue'
import left from '@/assets/images/left.png';
import right from '@/assets/images/right.png';

import {ref, onMounted,computed } from 'vue';
import axios from 'axios';

const reviews = ref([]);

const currentPage = ref(0)

const cutReviews = computed(() => {
  const startIndex = currentPage.value * 4;
  const endIndex = startIndex + 4;
  return reviews.value.slice(startIndex, endIndex);
});

onMounted(async () => {
    try{
        const response = await axios.get('/api/reviews');
        reviews.value = response.data
    }catch(error){
        console.error('Error fetching reviews',error);
    }
})

const prevPage = () => {
  if (currentPage.value > 0) {
    currentPage.value--;
  }
};

const nextPage = () => {
  const totalPages = Math.ceil(reviews.value.length / 4);
  if (currentPage.value < totalPages - 1) {
    currentPage.value++;
  }
};


</script>
<template>
    <section class="bg-my-gren px-20 py-10">
      <div class="m-auto">
        <div class="flex justify-between mt-6">
          <button aria-label="left arrow"
            @click="prevPage" 
            class="flex-shrink-0 bg-my-green hover:bg-my-dark-green text-my-white w-16 py-2 px-4 mr-6 rounded"
          >
            <img :src="left">
          </button>
          <div class="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <ReviewCard v-for="review in cutReviews" :key="review.id" :details="review"/>
          </div>
          <button 
            @click="nextPage" 
            class="flex-shrink-0 bg-my-green hover:bg-my-dark-green text-my-white w-16 py-2 px-4 ml-6 rounded"
          >
            <img :src="right">
          </button>
        </div>
      </div>
    </section>
    <div class="flex justify-center items-center">
      <AddOpinionButton/>            
    </div>
</template>