<script setup>
import LoginForm from '@/components/organisms/LoginForm.vue';
import RegisterButton from '@/components/molecules/RegisterButton.vue'


</script>

<template>
    <div class="w-full bg-my-white py-10 flex flex-col items-center">
      <div class="w-full">
        <div class="login-caption text-my-gray text-2xl text-center mb-6">
          Log in to our service
        </div>
        <LoginForm />
        <div class="register-big-caption text-my-gray text-xl text-center mt-6 mb-3">
          You don't have the account yet?
        </div>
        <div class="register-caption text-my-gray text-sm text-center">
          Register using the button below
        </div>
        <div class="flex justify-center items-center mt-4">
            <RegisterButton />
        </div>
        
      </div>
    </div>
  </template>
  
