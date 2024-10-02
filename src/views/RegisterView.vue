<script setup>
import RegisterForm from '@/components/organisms/RegisterForm.vue';
import { defineEmits } from 'vue';
import { useRouter } from 'vue-router';

const emit = defineEmits(['register']);
const router = useRouter(); 

const handleRegister = () => {
  emit('register');
  router.push('/')
};
</script>

<template>
    <div class="w-full bg-my-white py-10 flex flex-col items-center">
      <div class="w-full">
        <div class="login-caption text-my-gray text-2xl text-center mb-4">
          Register
        </div>
        <RegisterForm @register="handleRegister" />
      </div>
    </div>
  </template>
  
