<script setup>
import {defineProps, ref, computed} from 'vue';
import { RouterLink } from 'vue-router';

const props = defineProps({
    details: Object,
});

</script>

<template>
    <div class="bg-my-white rounded-xl shadow-md relative min-h-56 min-w-36 ">
            <div class="mb-2 p-4 flex flex-col  items-center">
              <p class="text-my-green font-bold text-base mb-2">{{details.username}}</p>
              <div class="w-full h-0.5 bg-my-green mb-2"></div>
              <p class="text-my-green font-bold text-sm text-center mt-2">{{details.opinion}}</p>
            </div>
    </div>
</template>