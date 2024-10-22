<script>
import AboutSection from '@/components/organisms/AboutSection.vue';
import AboutMissionSection from '@/components/organisms/AboutMissionSection.vue';
import RegisterNowLink from '@/components/molecules/RegisterNowLink.vue';


// Images
import ImagesStephansplatz from '@/assets/images/stephansplatz.jpg';
import ImageLostAndFoundBox from '@/assets/images/LostAndFoundBox4.jpg';





export default {
  components: {
    AboutSection,
    AboutMissionSection,
    RegisterNowLink
  },
  data() {
    return {
      ImageLostAndFoundBox,
      ImagesStephansplatz
    };
  }
}
</script>

<style scoped>
.about-page {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;

}



</style>


<template>
  <div class="about-page">
    <!-- First section: Image on the left, text on the right -->
    <AboutSection
      :image="ImagesStephansplatz"
      header="Our Mission"
      :text="[
        'Welcome to Vienna\'s premier Lost and Found service! Located in the heart of this historic city, we are dedicated to helping both locals and visitors reconnect with their lost belongings.',
        'Whether you\'ve misplaced something on the bustling streets of Vienna or found an item while exploring its iconic landmarks, we\’re here to make the process of reporting and recovering lost items as simple and efficient as possible.'
      ]"
    />

    <!-- Second section: Image on the right, text on the left -->
    <AboutMissionSection
      :image= "ImageLostAndFoundBox"
      header="How It Works"
      :text="[
        'Too often, lost items lead to unnecessary replacements, adding to the strain on our planet.',
        'Our platform helps prevent this by helping people find their items, using modern technology to maintain a comprehensive catalog of lost and found items, available to search at any time.' 
        ]"
    />

    <!-- Final section: Text with a sign-up link -->
    <RegisterNowLink
      text="Ready to get started? Create an account today and make a difference!"
      linkText="Create an account"
      linkTo="/register"
    />
  </div>
</template>



