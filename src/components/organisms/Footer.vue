<script setup>
import logo from '@/assets/images-webp/logo.webp';

</script>

<template>
    <section class="bg-my-white lg:px-72 sm:px-24 py-8">
        <div class="flex flex-col bg-my-gray px-8 py-8 rounded-top-3xl">
            <div class="flex justify-between items-center px-12 sm:px-4">
                <div class="flex items-center ml-8 mr-4 mb-2">
                <picture>
                    <source :srcset="logo" type="image/webp" />
                    <img class="max-h-36 h-auto w-auto" :src="logo" alt="Logo" loading="lazy" width="250" height="150"/>
                </picture>
                </div>
                <div class="flex flex-col">
                    <div class="bg-my-green rounded-xl text-my-white py-1 px-3 self-start">
                        <p class="text-sm text-my-white">Contact us:</p>
                    </div>
                    <div class="mb-4 mt-2 ml-1 space-y-1">
                        <p class="text-sm text-my-white">Email: contact@lostandfound.pl</p>
                        <p class="text-sm text-my-white">Phone: +48 12 345 67 89</p>
                        <p class="text-sm text-my-white">Address: Rynek Główny 1, 30-001 Kraków</p>
                    </div>
                </div>
            </div>
            <div class="w-full h-0.5 bg-my-white mt-4 mb-2"></div>
            <div class="mt-2 text-sm text-my-white px-12">© 2025 Lost and found. All Rights Reserved.</div>
        </div>
        
    </section>

</template>