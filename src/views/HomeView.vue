<script setup>
import Reviews from '@/components/organisms/Reviews.vue';
import AboutHome from '@/components/organisms/AboutHome.vue';

// Images
// import sadImage from '@/assets/images/sad-man.png';
// import happyImage from '@/assets/images/happy-man.jpeg';

// WebP images
import sadImage from '@/assets/images-webp/sad-man.webp';
import happyImage from '@/assets/images-webp/happy-man.webp';


</script>


<template>
  <meta name="Home page for Krakow's lost and found website">
  <AboutHome
    tabindex="0"
    :image= "sadImage"
    header="Have you lost something in Kraków?"
    text="Misplaced something in Kraków? We specialize in reconnecting lost items with their owners. Search through our catalog of found items!"
    linkTo="/found"
    linkText="Browse found items"
    />

    <AboutHome
    tabindex="0"
    :image= "happyImage"
    header="Or maybe you’ve found something?"
    text="Be a part of our community! Found something? Submit a report and make it easier for the owner to locate their lost item by 
          browsing through your listing."
    linkTo="/report"
    linkText="Report found item"
    :reverse="true"
    />

 


    <div class="w-full bg-my-white">
      <div tabindex="0" aria-label="User reviews">
        <div class="bg-my-green flex flex-col justify-center items-center py-6 px-40">
        <div class="text-my-white font-bold text-2xl text-center mb-4">
          Discover how we helped others reclaim their lost items
        </div>
        <Reviews/>
      </div>
      </div>
    </div>
  </template>
  