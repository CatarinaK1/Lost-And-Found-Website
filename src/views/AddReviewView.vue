<script setup>
import ReviewForm from '@/components/organisms/ReviewForm.vue';
import { defineEmits, defineProps } from 'vue';
import { useRouter } from 'vue-router';

const emit = defineEmits(['addedReview']);
const router = useRouter(); 

const props = defineProps({
    logged: String
});

const handleAddedReview = () => {
  router.push('/')
};

</script>

<template>
    <div class="w-full bg-my-white py-10 flex flex-col items-center">
      <div class="w-full">
        <div class="login-caption text-my-gray text-2xl text-center mb-4">
          Add Review
        </div>
        <ReviewForm :logged="props.logged"  @addedReview="handleAddedReview"/>
      </div>
    </div>
</template>
  
