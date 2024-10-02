<script setup>
import {useRoute} from 'vue-router';
import { RouterLink } from 'vue-router';

const isActiveLink = (routePath) =>{
  const route = useRoute();
  return route.path === routePath;
}


</script>

<template>
    <div class="md:ml-auto">
        <div class="flex space-x-8">
            <div
            class="flex flex-1 space-x-4 items-center justify-center md:items-stretch md:justify-start">
        <RouterLink
            to="/about"
            :class="[isActiveLink('/about') ? 'bg-green-900' : 'hover:bg-gray-900 hover:text-white','text-white','text-sm','px-3','py-2','rounded-md']"
            >About</RouterLink
        >
        <RouterLink
            to="/howto"
            :class="[isActiveLink('/howto') ? 'bg-green-900' : 'hover:bg-gray-900 hover:text-white','text-white','text-sm','px-3','py-2','rounded-md']"
            >How does it work?</RouterLink
        >
        <RouterLink
            to="/offices"
            :class="[isActiveLink('/offices') ? 'bg-green-900' : 'hover:bg-gray-900 hover:text-white','text-white','text-sm','px-3','py-2','rounded-md']"
            >Our offices</RouterLink
        >
        <RouterLink
            to="/found"
            :class="[isActiveLink('/found') ? 'bg-green-900' : 'hover:bg-gray-900 hover:text-white','text-white','text-sm','px-3','py-2','rounded-md']"
            >Found items</RouterLink
        >
        </div>
    </div>
</div>
</template>