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
      <div v-if="isErrorUser" class="flex items-center">
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
        <p class="text-red-500 text-xs">Invalid password</p>
      </div>
      <ErrorModal :isOpen="isModalOpen" :message="modalError" @close="closeModal" />
      <button type="submit" @click.prevent="handleSubmit" class="bg-my-green text-my-white py-2 mt-4 rounded w-full hover:bg-gray-900 hover:text-white transition duration-300">Login</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
import mark from '@/assets/images/exc_mark.png';
import { useToast } from 'vue-toastification';
import ErrorModal from '@/components/molecules/ErrorModal.vue';
import { useAuthStore } from '@/stores/AuthStore';
import * as jwtDecode from 'jwt-decode';
import { useRouter } from 'vue-router';
import * as yup from "yup";

const schema = yup.object({
  username: yup.string().required("Username is required"),
  password: yup.string().required("Password is required")
})

const authStore = useAuthStore();
const router = useRouter(); 
const isModalOpen = ref(false); 
const modalError = ref(''); 
  
const toast = useToast();

const closeModal = () => {
  isModalOpen.value = false;
  modalError.value = '';
}


const username = ref('');
const password = ref('');
const isError = ref(false);
const isErrorUser = ref(false);
const errors = ref({});

const handleSubmit = async () => {
  
  try {
    const formData = {
    username: username.value,
    password: password.value
    };
    await schema.validate(formData, { abortEarly: false });
    const newLogin = {
      username: username.value,
      password: password.value 
    }
    const response =  await axios.post('/api/auth/login', newLogin);

    toast.success('Successfully logged in.')
    const token = response.data.accessToken;
    authStore.setToken(token);
    authStore.setUser(username.value);

    const decodedToken = jwtDecode.jwtDecode(token);
    const roles = decodedToken.roles || [];
    if(roles.includes('ADMIN')){
      authStore.setRole('ADMIN');
    }else{
      authStore.setRole('USER');
    };
    router.push('/profile');
    }catch (error) {
      if (error instanceof yup.ValidationError) {
        const validationErrors = {};
        error.inner.forEach((error) => {
          validationErrors[error.path] = error.message;
        });
        errors.value = validationErrors;
        for (const key in errors.value) {
          modalError.value += `${errors.value[key]}` + `<br>`;
          isModalOpen.value = true;
        }
      }
      else if (axios.isAxiosError(error)) {
        if (error.response.status === 401) {
          modalError.value = "Wrong username or password";
        }else {
          modalError.value = `Error: ${error.message}`;
        }
      } else {
        modalError.value = `Error: ${error.message}`;
      }
      isModalOpen.value = true;
  }
};
</script>
