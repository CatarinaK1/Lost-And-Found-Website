<script setup>
import MainNavbar from '@/components/organisms/MainNavbar.vue';
import YourProfileView from '@/views/YourProfileView.vue';
import Footer from '@/components/organisms/Footer.vue'
import { RouterView } from 'vue-router';
import { ref, computed } from 'vue';
import * as jwtDecode from 'jwt-decode';



const isAdmin = ref(false)

const logged = ref(false)


const handleLogin = () => {
  logged.value = true
  const token = localStorage.getItem('token');
  if (token) {
    try {
      const decodedToken = jwtDecode.jwtDecode(token);
      const roles = decodedToken.roles || [];
      isAdmin.value = roles.includes('ADMIN');
    } catch (error) {
      console.error('Token could not be decoded:', error);

      isAdmin.value = false;
    }
  } else {
    isAdmin.value = false;
  }
};

const handleLogout = () => {
  logged.value = false
  isAdmin.value = false
  localStorage.removeItem('token');
}

</script>


<template>
  <MainNavbar :logged = "logged"/>
  <RouterView :logged="logged" :admin="isAdmin" @login="handleLogin" @logout = "handleLogout"/> 
  <Footer></Footer>
</template>

