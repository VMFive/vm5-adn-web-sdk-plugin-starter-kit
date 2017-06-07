<template lang="jade">
  .layout(:style="layoutStyle")
    .content-box(:style="contentBoxStyle")
      slot(name="player")
    .kanban(:style="kanbanStyle", @click="onCTA")
</template>

<style lang="sass" scoped>
  .layout {
    position: relative;
  }
  .content-box {
    position: absolute;
  }
  .kanban {
    background-position: center center;
    background-repeat: no-repeat;
    background-size: cover;
  }
</style>

<script>
  export default {

    pluginConfig: {
      adType: 'demo1',
      campaignType: 'video',
      creativeType: 'web_native',
    },

    props: {
      isPrepared: {
        type: Boolean,
      },
      adInfo: {
        type: Object,
      },
      videoWidth: {
        type: Number,
        required: true,
      },
      videoHeight: {
        type: Number,
        required: true,
      },
    },

    data() {
      return {
        initVisiblePercent: 30,
        visiblePercent: 30,
      }
    },

    computed: {
      layoutStyle() {
        return { height: `${this.adHeight + this.kanbanTop}px` };
      },
      contentBoxStyle() {
        var expanded = false;
        var ratio = this.videoHeightToWidthRatio * 100;
        if (expanded) {
          return { paddingTop: `${ratio}%` };
        }

        return {
          width: `${this.adWidth}px`,
          height: `${this.adHeight}px`,
          clipPath: `polygon(${this.visibleLeft}% 0%, ${this.visibleLeft}% 100%, ${this.visibleRight}% 100%, ${this.visibleRight}% 0%)`,
          left: `-${(this.adWidth * (100 - this.visiblePercent) / 100) / 2}px`,
        };
      },
      adWidth() { return screen.width; },
      adHeight() { return this.adWidth * this.videoHeightToWidthRatio; },
      visibleLeft() { return (100 - this.visiblePercent) / 2; },
      visibleRight() { return this.visibleLeft + this.visiblePercent; },
      videoHeightToWidthRatio() {
        if (!this.videoWidth) return 0;
        return this.videoHeight / this.videoWidth;
      },
      kanbanStyle() {
        return {
          backgroundImage: this.kanbanImageUrl ? `url(${this.kanbanImageUrl})` : null,
          position: 'absolute',
          width: `${screen.width * (0.7 + 0.3 * (this.visiblePercent - this.initVisiblePercent) / (100 - this.initVisiblePercent))}px`,
          height: `${this.adHeight}px`,
          right: 0,
          top: `${this.kanbanTop}px`,
        };
      },
      kanbanTop() {
        if (!this.adHeight || !this.visiblePercent) return 0;
        return this.adHeight * (this.visiblePercent - this.initVisiblePercent) / (100 - this.initVisiblePercent);
        return this.adHeight * this.visiblePercent / 100;
      },
      kanbanImageUrl() {
        if (!this.adInfo) return null;
        return this.adInfo.resources.image.url;
      },
    },

    methods: {
      expandAd() {
        const vm = this;
        setTimeout(function grow() {
          if (vm.visiblePercent >= 100) return;
          vm.visiblePercent++;
          setTimeout(grow, 5);
        }, 0);
      },

      onCTA() {
        this.$emit('cta');
      },
    },

    watch: {
      isPrepared(prepared) {
        if (prepared) {
          setTimeout(() => this.expandAd(), 1000);
        }
      }
    },

    mounted() {
      this.$emit('videoEnterViewport');
    }
  };
</script>
