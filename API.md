Plugin API documentation
========================

## named slots

### player

影片播放器. 支援以下 props:

- onTap: callback function. 當影片(不包含音量鈕或重播鈕)被點擊時被呼叫.


### cta-button

CTA (call to action) 按鈕

### vm5-logo

正方形的 vm5 logo, 點擊會跳轉[官網](http://vmfive.com/). 支援以下 props:

- size: 點選有效範圍的長度. 給定時需要長度加單位, 例如 size="20px"
- icon-size: 圖片的長度. 給定時需要長度加單位, 例如 size="16px"
- align-top: 不必給值. 如果有寫出這個屬性, logo 會貼齊 box 的上緣
- align-bottom: 不必給值. 如果有寫出這個屬性, logo 會貼齊 box 的下緣
- align-left: 不必給值. 如果有寫出這個屬性, logo 會貼齊 box 的左側
- align-right: 不必給值. 如果有寫出這個屬性, logo 會貼齊 box 的右側


## props

### isPrepared: Boolean

影片播放器是否已準備好。初始值會是 `false`，準備好後轉為 `true`



### adInfo: Object

proxy server 回傳的資料，格式如下：

```json
{
  "resources": {
    "image":{
      "height":"168",
      "url":"https://d2v4tz4zvhrua.cloudfront.net/production/image_1494405641706.jpg",
      "width":"300"
    },
  },
  "texts":{
    "cta":"more"
  },
  "urls":{
    "cta":"http://www.vmfive.com",
    "fb_cta":"http://join-vm5.weebly.com/"
  }
}
```



### placeholderImage: String

背景圖 url。等於 adInfo.resources.image.url



### videoWidth: Number

### videoHeight: Number

video tag 在影片準備好後的寬度與高度。初始值皆為 0，準備好後轉為寬度/高度的數值。



### customerBoxWidth: Number

### customerBoxHeight: Number

包住 <vmfive-ad-unit> 的上層元件的寬度與高度。初始值皆為 0，準備好後轉為寬度/高度的數值。

目前的版型中，interstitial-embedded 與 portrait-interstitial-embeded 為了偵測客戶製作的廣告外框有用到。



### width: Number

### height: Number

DFP 廣告外框 (SafeFrame or friendly iframe) 的長寬。在 DFP 的用法會收到。



### scale: Number

介於 0~1之間的整數。表示廣告版面要縮小的比例。

目前的版型中，impressive 為了避免與某些客戶網頁的上方 munu bar 重疊有用到。



### isPlayerFullscreen: Boolean

目前 player 是否在全螢幕模式



### isPlayerFinished: Boolean

目前影片是否播放完畢



## events

### videoEnterViewport

當影片進入可視範圍時發送。目前可視的定義為「影片98%露出」。SDK收到這個事件後會開始播放(如果之前有暫停播放, 從暫停的地方繼續播放)影片。

### videoExitViewport

當影片離開可視範圍時發送。SDK收到這個事件後會暫停播放影片。

### toggleMute

當想要開關聲音時發送。

### cta

當 call to action 被觸發時發送。依不同版型設計有不同觸發方式，例如 native 廣告有 CTA 按鈕，interstitial 則是點擊背景圖觸發。SDK收到這個事件後會將頁面跳轉到 cta url。

### facebookClicked

當 facebook cta 被觸發時發送。目前 native 廣告的 end card 有使用。SDK收到這個事件後會將頁面跳轉到 facebook cta  url。

### close

當廣告被關掉時觸發。目前 interstitial 與 portrait-interstitial 廣告有使用。SDK收到這個事件後會移除頁面上的該則廣告。
