<template lang="jade">
  .interstitial-layout
    .content-box
      .vm5-ad-card-interstitial-card(ref="interstitialWrapper")
        .vm5-ad-card-interstitial-card-outer(:style="{ width: cardWidthStyle, height: cardHeightStyle }")
          .vm5-ad-card-interstitial-card-inner(:style="{ width: innerCardWidthStyle, height: innerCardHeightStyle }")
            .vm5-ad-card-interstitial-card-content(v-on:click="onCardTapped", :style="{ backgroundImage: backgroundImage }")
              .vm5-ad-card-interstitial-video-player
                slot(name="player")
                  'This will only be displayed if there is no content to be distributed.'
            .vm5-ad-card-interstitial-card-close-button(v-if="cardWidth>0 && cardHeight>0" v-on:click="onCloseTapped")
          slot(name="vm5-logo", size="27px", icon-size="24px", align-right, align-bottom, v-if="cardWidth>0 && cardHeight>0")
</template>

<style lang="sass" scoped>
  .interstitial-layout {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 999999;

    .content-box {
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      padding-top: 0;
    }
  }

  .vm5-ad-card-interstitial-card {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-color: rgba(#444, 1);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .vm5-ad-card-interstitial-card-outer {
    position: relative;
  }

  .vm5-ad-card-interstitial-card-inner {
    position: relative;
    width: 100%;
    height: 100%;
  }

  .vm5-ad-card-interstitial-card-content {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(#000, 1);
    background-position: center center;
    background-repeat: no-repeat;
    background-size: cover;
    border-radius: 5px;
    overflow: hidden;
  }

  .vm5-ad-card-interstitial-video-player {
    position: absolute;
    top: percentage(100/530);
    width: 100%;
    height: 50%;
  }

  .vm5-ad-card-interstitial-card-close-button {
    position: absolute;
    right: 0;
    bottom: 100%;
    width: 30px;
    height: 28px;
    background: url(./assets/icon_act_close.png) center center no-repeat;
    background-size: 22px 22px;
  }
</style>

<script>
  import raf from 'raf';

  export default {
    pluginConfig: {
      adType: 'demo2',
      campaignType: 'video',
      creativeType: 'web_interstitial',
    },

    props: {
      isPrepared: {
        type: Boolean,
        required: true,
      },
      placeholderImage: {
        type: String,
        required: true,
      },
    },

    data() {
      return {
        cardWidth: 0,
        cardHeight: 0,
        containerElem: null,
      };
    },

    computed: {
      backgroundImage() {
        return this.placeholderImage ? `url(${this.placeholderImage})` : 'none';
      },
      cardWidthStyle() {
        return `${this.cardWidth}px`;
      },
      cardHeightStyle() {
        return `${this.cardHeight}px`;
      },
      innerCardWidthStyle() {
        return `${this.cardWidth}px`;
      },
      innerCardHeightStyle() {
        return `${this.cardHeight}px`;
      },
    },

    methods: {
      onCloseTapped() {
        this.containerElem.style.transform = 'rotateY(0deg)';
        setTimeout(() => this.$emit('close'), 1000);
      },

      onCardTapped() {
        logMessage('onCardTapped');
        this.$emit('cta');
      },

      checkCardContainerSize() {
        const vm = this;
        const wrapper = vm.$refs.interstitialWrapper;
        if (!wrapper) return;
        const viewportW = wrapper.clientWidth;
        const viewportH = wrapper.clientHeight;

        const minHorizontalMargin = 11;
        const minVerticalMargin = 28;

        let cardWidth = viewportW - (minHorizontalMargin * 2);
        let cardHeight = cardWidth / (2/3);

        if (cardHeight > viewportH - (minVerticalMargin * 2)) {
          cardHeight = viewportH - (minVerticalMargin * 2);
          cardWidth = cardHeight * (2/3);
        }

        vm.cardWidth = cardWidth;
        vm.cardHeight = cardHeight;
      },

      prepareFlipCard() {
        console.warn('flip card start')
        var container = document.getElementsByTagName('body')[0];
        container.className += ' flipcard-container';
        var originalContent = document.getElementsByClassName('page-container')[0];
        originalContent.className += ' flipcard-original-content';
        var adContent = this.$el.parentNode.parentNode.parentNode
        adContent.className += ' flipcard-ad-content';

        setContainerStyle(container);
        setFlipCardStyle(originalContent);
        setFlipCardStyle(adContent);
        setFlipCardBackSideStyle(adContent);

        function setContainerStyle(elem) {
          elem.style.position = 'relative';
          elem.style.width = screen.width + 'px';
          elem.style.height = screen.height + 'px';
          elem.style.transformStyle = 'preserve-3d';
          elem.style.transition = 'all 1.0s linear';
        }

        function setFlipCardStyle(elem) {
          elem.style.position = 'absolute';
          elem.style.width = '100%';
          elem.style.height = '100%';
          elem.style.backfaceVisibility = 'hidden';
        }

        function setFlipCardBackSideStyle(elem) {
          elem.style.display = 'block';
          elem.style.transform = 'rotateY(180deg)';
          elem.style.boxSizing = 'border-box';
        }

        console.warn('flip card done')
        return container;
      },
    },

    watch: {
      isPrepared() {
        this.$emit('videoEnterViewport');
        const containerElem = this.prepareFlipCard();
        this.containerElem = containerElem;
        setTimeout(() => {
          containerElem.style.transform = 'rotateY(180deg)';
        }, 1000);
      },
    },

    mounted() {
      const vm = this;

      raf(function checkCardSize() {
        vm.checkCardContainerSize();
        raf(checkCardSize);
      });
    },
  };
</script>
