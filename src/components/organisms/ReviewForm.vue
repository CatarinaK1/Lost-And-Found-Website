<template>
    <div class="flex items-center justify-center bg-gray-100">
      <form @submit.prevent="handleSubmit" class="bg-my-white pb-6 rounded shadow-md w-full max-w-xl px-10">
        <div class="mb-2 mt-3">
          <textarea
            id="body"
            v-model="body"
            @input="validateBody"
            v-bind:class="{'border-red-500': errorBody}"
            class="border border-gray-300 p-2 w-full h-32 rounded focus:outline-none focus:ring-2 focus:ring-my-green placeholder-my-gray text-sm resize-none"
            placeholder="Express your opinion"
            required
          ></textarea>
          <div v-if="errorBody" class="flex items-center mb-3">
          <img class="max-h-3 h-auto w-auto mr-2" :src="mark" alt="exclamation-mark" />
          <p class="text-red-500 text-xs">Body cannot be over 200 characters</p>
        </div>
        </div>
        <button type="submit" class="bg-my-green text-my-white py-2 mt-4 rounded w-full hover:bg-gray-900 hover:text-white transition duration-300">
          Add review
        </button>
      </form>
    </div>
  </template>
  
  <script setup>
  import { ref, defineEmits } from 'vue';
  import axios from 'axios';
  import mark from '@/assets/images/exc_mark.png'
  import { useRouter } from 'vue-router';
  
  const router = useRouter();
  const emit = defineEmits(['addedReview']);
  const body = ref("")
  const errorBody = ref(false);

  const validateBody = () => {
    if(body.value.length > 200){
        errorBody.value = true;
    }
    else{
        errorBody.value = false;
    }
  };
  
  const handleSubmit = async () => {
    try {
      if (errorBody.value === false) {
        const newReview = {
          opinion: body.value
        };
  
        await axios.post('/api/reviews', newReview, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        }
    });
        router.push('/');
      }
    } catch (error) {
      console.error('Error adding review:', error);
    }
  };

  </script>
  
  