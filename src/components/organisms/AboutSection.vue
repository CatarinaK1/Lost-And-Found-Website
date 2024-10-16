<script>
    export default {
    props: {
        image: {
        type: String,
        required: true
        },
        header: {
        type: String,
        required: true
        },
        text: {
        // type: String,
        type: Array,
        required: true
        }
    }
    }
</script>



<style scoped>
.about-section {
  display: flex;
  flex-direction: row; /* Default: display elements side by side */
  align-items: center;
  justify-content: space-between;
  margin-top: 10%;
  margin-bottom: 10%;
  flex-wrap: wrap; /* Ensure content wraps if necessary */
}

/* Image section */
/* Wrapper to position the box and image */
.image-wrapper {
  position: relative;
  width: 50%; /* Adjust to fit */
}

/* The box behind the image */
.image-background {
  position: absolute;
  top: -30px; /* Adjust to move it slightly up */
  left: -50px; /* Adjust to move it slightly left */
  width: 100%;
  height: 100%;
  background-color: #56B040; /* Background color for the box */
  z-index: 1; /* Box goes below the image */
  border-radius: 5px; /* Optional: Add rounded corners */
}

/* The image itself */
.about-image {
  position: relative;
  width: 100%; /* Make image fit its container */
  height: auto;
  z-index: 2; /* Image goes above the background box */
}

/* Text section */
.text-section {
  width: 45%; /* Takes up remaining space */
  /* text-align: left; Align text to the left */
  padding: 0 20px;
}

h2 {
    font-size: 60px;
  margin-bottom: 10px;
}

hr {
  /* width: 100px; */
  border: 4px solid #56B040;
  margin-bottom: 10px;
}

p{
    margin-top: 4%;

}

</style>



<template>
    <div class="about-section">
        <div class="image-wrapper">
      <div class="image-background"></div> <!-- Box behind the image -->
      <img :src="image" alt="About Section Image" class="about-image" />
        </div>
      <div class="text-section">
        <h2>{{ header }}</h2>
        <hr />
        <!-- <p>{{ text }}</p> -->
        <p v-for="(paragraph, index) in text" :key="index">{{ paragraph }}</p>
      </div>
    </div>
  </template>

  
