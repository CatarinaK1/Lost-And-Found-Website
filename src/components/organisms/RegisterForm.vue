<template>
    <div class="flex items-center justify-center bg-gray-100 ">
      <form @submit.prevent="handleSubmit" class="bg-my-white pb-6 rounded shadow-md w-80 px-10">
        <div class="mb-2 mt-3">
          <label for="name" class="block text-my-gray text-xs">Name</label>
          <input
            type="text"
            id="name"
            v-model="name"
            class="border border-gray-300 p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-my-green placeholder-my-gray text-xs"
            placeholder="Enter your name" required
          />
        </div>
        <div class="mb-3 mt-3">
          <label for="surname" class="block text-my-gray text-xs">Surname</label>
          <input
            type="text"
            id="surname"
            v-model="surname"
            class="border border-gray-300 p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-my-green placeholder-my-gray text-xs"
            placeholder="Enter your surname" required
          />
        </div>
        <div class="mb-3 mt-3">
          <label for="username" class="block text-my-gray text-xs">Username</label>
          <input
            type="text"
            id="username"
            v-model="username"
            v-bind:class="{'border-red-500': usernameFailed}"
            class="border border-gray-300 p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-my-green placeholder-my-gray text-xs"
            placeholder="Enter your username" required
          />
        </div>
        <div v-if="usernameFailed" class="flex items-center mb-3">
          <img class="max-h-3 h-auto w-auto mr-2" :src="mark" alt="exclamation-mark" />
          <p class="text-red-500 text-xs">This username is already taken</p>
        </div>
        <div class="mb-3 mt-3">
          <label for="mail" class="block text-my-gray text-xs">Email</label>
          <input
            type="email"
            id="mail"
            v-model="mail"
            @input="validatemail"
            v-bind:class="{'border-red-500': ismailError, 'border-red-500': mailFailed}"
            class="border border-gray-300 p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-my-green placeholder-my-gray text-xs"
            placeholder="Enter your email" required
          />
        </div>
        <div v-if="ismailError" class="flex items-center mb-3">
          <img class="max-h-3 h-auto w-auto mr-2" :src="mark" alt="exclamation-mark" />
          <p class="text-red-500 text-xs">Email is invalid</p>
        </div>
        <div v-if="mailFailed" class="flex items-center mb-3">
          <img class="max-h-3 h-auto w-auto mr-2" :src="mark" alt="exclamation-mark" />
          <p class="text-red-500 text-xs">This email is already registered</p>
        </div>
        <div class="mt-3 mb-3">
          <label for="password" class="block text-my-gray text-xs">Password</label>
          <input
            type="password"
            id="password"
            v-model="password"
            v-bind:class="{'border-red-500': errorPassword}"
            class="border border-gray-300 p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-my-green placeholder-my-gray text-xs"
            placeholder="Enter your password" required
          />
        </div>
        <div class="mt-3 mb-2">
          <label for="repeat_password" class="block text-my-gray text-xs">Repeat Password</label>
          <input
            type="password"
            id="repeat_password"
            v-model="repeat_password"
            @input="validatePassword"
            v-bind:class="{'border-red-500': errorPassword}"
            class="border border-gray-300 p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-my-green placeholder-my-gray text-xs"
            placeholder="Repeat your password" required
          />
        </div>
        <div v-if="errorPassword" class="flex items-center mb-3">
          <img class="max-h-3 h-auto w-auto mr-2" :src="mark" alt="exclamation-mark" />
          <p class="text-red-500 text-xs">Passwords should match</p>
        </div>
        <div class="mt-4 mb-3 flex items-center">
          <input type="checkbox" id="consent" name="consent" value="Consent" required>
          <label for="consent" class="block text-my-gray text-xs flex items-center mr-1 ml-2"> I have read and understood the </label>
          <RouterLink
            to="/rules"
            class="block text-my-gray text-xs hover:text-blue-700 text-decoration: underline;"
          >rules</RouterLink>
        </div>
        <button type="submit" class="bg-my-green text-my-white py-2 mt-4 rounded w-full hover:bg-gray-900 hover:text-white transition duration-300">Register</button>
      </form>
    </div>
  </template>
  
  <script setup>
  import { ref, defineEmits } from 'vue';
  import axios from 'axios';
  import mark from '@/assets/images/exc_mark.png';
  
  const emit = defineEmits(['register']);
  
  const username = ref('');
  const name = ref('');
  const surname = ref('');
  const mail = ref('');
  const password = ref('');
  const repeat_password = ref('');
  const errorPassword = ref(false);
  const ismailError = ref(false);
  const usernameFailed = ref(false);
  const mailFailed = ref(false);
  
  const validatemail = () => {
    const mailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    ismailError.value = !mailRegex.test(mail.value);
  };
  
  const validatePassword = () => {
    errorPassword.value = password.value !== repeat_password.value;
  };
  
  const handleSubmit = async () => {
    try {
      const userResponse = await axios.get(`/api/users?username=${username.value}`);
      const user = userResponse.data;
  
      const mailResponse = await axios.get(`/api/users?mail=${mail.value}`);
      const userMail = mailResponse.data;
  
      usernameFailed.value = user.length > 0;
      mailFailed.value = userMail.length > 0;
  
      if (!usernameFailed.value && !mailFailed.value) {
        const newUser = {
          name: name.value,
          surname: surname.value,
          username: username.value,
          mail: mail.value,
          password: password.value,
        };
  
        await axios.post('/api/users', newUser);
        emit('register');
      }
    } catch (error) {
      console.error('Error registering user:', error);
    }
  };
  </script>
  
  