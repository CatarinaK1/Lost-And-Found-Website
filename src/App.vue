<script setup>
import MainNavbar from '@/components/organisms/MainNavbar.vue';
import Footer from '@/components/organisms/Footer.vue'
import { RouterView } from 'vue-router';
</script>


<template>
  <MainNavbar/>
  <RouterView /> 
  <Footer></Footer>
</template>

