<script setup>
import MainNavbar from '@/components/organisms/MainNavbar.vue';
import YourProfileView from '@/views/YourProfileView.vue';
import { RouterView } from 'vue-router';
import { ref } from 'vue';

const username = ref("");

const handleLogin = (user) => {
  username.value = user;
};

const handleLogout = () => {
  username.value = "";
};


</script>


<template>
  <MainNavbar :logged="username"/>
  <RouterView :logged="username" @login="handleLogin" @logout="handleLogout"/> 
</template>

