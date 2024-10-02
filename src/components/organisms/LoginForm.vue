<template>
  <div class="flex items-center justify-center bg-gray-100">
    <form class="bg-my-white p-6 rounded shadow-md w-80">
      <div class="mb-2">
        <label for="username" class="block text-my-gray text-sm">Username</label>
        <input
          type="text"
          id="username"
          v-model="username"
          v-bind:class="{'border-red-500 p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-red-500 placeholder-my-gray': isError}"
          class="border border-gray-300 p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-my-green placeholder-my-gray"
          placeholder="Enter your username" required
        />
      </div>
      <div v-if="isError" class="flex items-center">
        <img class="max-h-3 h-auto w-auto mr-2" :src="mark" alt="exclamation-mark" />
        <p class="text-red-500 text-xs">Invalid username</p>
      </div>
      
      <div class="mt-2 mb-2">
        <label for="password" class="block text-my-gray text-sm mb-1">Password</label>
        <input
          type="password"
          id="password"
          v-model="password"
          v-bind:class="{'border-red-500 p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-red-500 placeholder-my-gray': isError}"
          class="border border-gray-300 p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-my-green placeholder-my-gray"
          placeholder="Enter your password" required
        />
      </div>
      <div v-if="isError" class="flex items-center">
        <img class="max-h-3 h-auto w-auto mr-2" :src="mark" alt="exclamation-mark" />
        <p class="text-red-500 text-xs">Invalid username</p>
      </div>
      <button type="submit" @click.prevent="handleSubmit" class="bg-my-green text-my-white py-2 mt-4 rounded w-full hover:bg-gray-900 hover:text-white transition duration-300">Login</button>
    </form>
  </div>
</template>

<script setup>
import { ref, defineEmits } from 'vue';
import axios from 'axios';
import mark from '@/assets/images/exc_mark.png';

const emit = defineEmits(['login']);

const username = ref('');
const password = ref('');
const isError = ref(false);

const handleSubmit = async () => {
  try{
      const response = await axios.get(`/api/users?username=${username.value}`);
      const user = response.data

      if (user.length > 0) {
        if (user[0].username === username.value) {
          emit('login', user[0].username);
        } else {
          isError.value = true;
        }
      } else {
        isError.value = true;
      }}catch(error){
        console.error('Error fetching jobs',error);
      }
};
</script>