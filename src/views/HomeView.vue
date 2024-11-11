<script setup>
import Reviews from '@/components/organisms/Reviews.vue';
import AboutHome from '@/components/organisms/AboutHome.vue';

// Images
import sadImage from '@/assets/images/sad-man.png';
import happyImage from '@/assets/images/happy-man.jpeg';


</script>


<template>
  <AboutHome

    :image= "sadImage"
    header="Have you lost something in Vienna?"
    text="Misplaced something in Vienna?,We specialize in reconnecting lost items with their owners. Search through our catalog of found items!"
    linkTo="/found"
    linkText="Browse found items"
    />

    <AboutHome

    :image= "happyImage"
    header="Or maybe you’ve found something?"
    text="Be a part of our community! Found something? Submit a report and make it easier for the owner to locate their lost item by 
          browsing through your listing."
    linkTo="/report"
    linkText="Report found item"
    :reverse="true"
    />

 


    <div class="w-full bg-my-white">
      <div>
        <div class="bg-my-green flex flex-col justify-center items-center py-6 px-40">
        <div class="text-my-white font-bold text-2xl text-center mb-4">
          Discover how we helped others reclaim their lost items
        </div>
        <Reviews/>
      </div>
      </div>
    </div>
  </template>
  