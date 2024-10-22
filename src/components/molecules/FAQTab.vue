<script setup>
import { ref, defineProps } from 'vue';
import plus from "@/assets/images/plus.png"
import plusg from "@/assets/images/plusg.png"
import minus from "@/assets/images/minus.png"
import minusg from "@/assets/images/minusg.png"
import plusw from "@/assets/images/plusw.png"
import minusw from "@/assets/images/minusw.png"
const hover = ref(false)

const props = defineProps({
    data: Object
})

const showAnswer = ref(false);

const toggle = () =>{
    showAnswer.value = !showAnswer.value;
}

</script>
<template>
    <div :class="showAnswer ? 'max-w-lg flex flex-col border-2 rounded-lg border-my-green text-my-white p-2 mb-4 bg-my-green' : 'max-w-lg flex flex-col border-2 rounded-lg border-my-green p-2 mb-4'">
        <div class="flex justify-equal items-center space-x-4 ">
            <div :class="showAnswer ? 'font-bold flex-1' : 'flex-1'">{{ props.data.question }}</div>
            <button @mouseover="hover = true" @mouseleave="hover = false" @click="toggle">
                <img class="w-5" :src="showAnswer ? hover ? minus : minusw : hover ? plusg : plus">
            </button>   
        </div>
        <div class="max-w-full">
            <div class="mt-4 text-my-white inline-block max-w-full" v-if="showAnswer">
                {{ props.data.answer }}
            </div>
        </div>
        
    </div>
    
</template>