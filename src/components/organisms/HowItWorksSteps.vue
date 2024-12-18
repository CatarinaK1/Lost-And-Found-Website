<script>
export default {

  props: {
    title:{
    type: String,
    required: true
    },
    stepTitle:{
      type: Array,
      required: true
    },
    images: {
      type: Array,
      required: true,
    },
    steps: {
      type: Array,
      required: true,
    },
  },
};
</script>


<style scoped>
.how-it-works-section {
  display: flex;
  flex-direction: column; /* Stack each step vertically */
  align-items: center;
  padding: 20px;
}

.step {
  width: 100%;
  max-width: 600px; /* Control the max width of each step block */
  margin-bottom: 40px;
  text-align: center;
}

.step-image {
  display: inline;
  width: 30%;
  max-width: 400px;
  height: auto;
  margin-bottom: 20px;
}


.how-it-works-section h2 {
  font-size: 2em;
  margin-bottom: 10%;
  font-style: bold;
}

.step h3 {
  font-size: 1.5em;
  margin-bottom: 10px;
}

.step p {
  font-size: 1.1em;
}


</style>



<template>
    <div class="how-it-works-section">
        <h2>{{ title }}</h2>
        <div class="step" v-for="(step, index) in steps" :key="index">
        <img :src="images[index]" alt="Step image" class="step-image" aria-hidden="true"/>
          <h3>{{ stepTitle[index] }}</h3>
          <p>{{ step }}</p>
      </div>
    </div>
  </template>


  
  