<script setup>
import ReportForm from '@/components/organisms/ReportForm.vue';
</script>

<template>
  <div class="w-full bg-my-white py-10 flex flex-col items-center">
    <div class="w-full">
      <div class="login-caption font-bold text-my-green text-2xl text-center mb-4">
        Report found item
      </div>
      <div class="login-caption font-bold text-my-green text-base text-center mb-4">
        Fill out the form to report found item
      </div>
      <ReportForm />
    </div>
  </div>
</template>