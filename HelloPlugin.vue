<template lang="jade">
  .layout
    .content-box(:style="contentBoxStyle")
      slot(name="player")
        'This will only be displayed if there is no content to be distributed.'
      slot(name="vm5-logo", icon-size="20px", align-right, align-top)
    .cta-button
      slot(name="cta-button")
</template>

<style lang="sass" scoped>
  .content-box {
    position: relative;
  }
  .cta-button {
    position: absolute;
    right: 0;
    bottom: 0;
  }
</style>

<script>
  export default {

    pluginConfig: {
      adType: 'video-hello',
      campaignType: 'video',
      creativeType: 'web_top',
    },

    props: {
      videoWidth: {
        type: Number,
        required: true,
      },
      videoHeight: {
        type: Number,
        required: true,
      },
    },

    computed: {
      contentBoxStyle() {
        var ratio = this.videoHeightToWidthRatio * 100;
        return { paddingTop: `${ratio}%` };
      },
      videoHeightToWidthRatio() {
        if (!this.videoWidth) return 0;
        return this.videoHeight / this.videoWidth;
      },
    },

    mounted() {
      this.$emit('videoEnterViewport')
    }
  };
</script>
