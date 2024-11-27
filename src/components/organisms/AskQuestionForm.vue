<script setup>
import { ref, defineEmits } from 'vue';
import axios from 'axios';
import mark from '@/assets/images/exc_mark.png'

const emit = defineEmits(['addedQuestion']);
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
      const newQuestion = {
        Question: body.value,
        Answer: "Wait for our staff to provide the answer"
      };
      console.log(newQuestion); // Log the incoming request
      await axios.post('/api/faqs/ask', newQuestion,
      {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      }
      );
      emit('addedQuestion');
    }
  } catch (error) {
      console.error('Error adding question:', error.response?.data || error);

  }
};

</script>



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
            placeholder="Place your question here"
            required
          ></textarea>
          <div v-if="errorBody" class="flex items-center mb-3">
          <img class="max-h-3 h-auto w-auto mr-2" :src="mark" alt="exclamation-mark" />
          <p class="text-red-500 text-xs">Body cannot be over 200 characters</p>
        </div>
        </div>
        <button type="submit" class="bg-my-green text-my-white py-2 mt-4 rounded w-full hover:bg-gray-900 hover:text-white transition duration-300">
          Submit question
        </button>
      </form>
    </div>
  </template>
  

  