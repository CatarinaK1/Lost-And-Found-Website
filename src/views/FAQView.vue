<script setup>
import FAQTable from '@/components/organisms/FAQTable.vue';
import AskQuestionButton from '../components/molecules/AskQuestionButton.vue';
</script>

<template>
  <div class="w-full bg-my-white py-10 flex flex-col space-y-6 items-center">
    <div class="w-full">
      <div class="font-bold text-my-green text-2xl text-center mb-4">
        Get help
      </div>
      <div class="text-my-green text-lg text-center mb-6">
        Check Out Our FAQs for Assistance!
      </div>
      <FAQTable />
    </div>
    <AskQuestionButton />
  </div>
</template>