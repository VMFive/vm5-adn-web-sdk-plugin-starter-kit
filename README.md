ADN web SDK plugin starter kit
==============================

## 什麼? SDK 可以寫 plugin?!

yup.

## 等等，plugin 是做什麼用的?

製作廣告格式。

## 說人話。

就是拿 proxy server 吐回來的資料 (包含影片 url, 影片長寬, 背景圖 url 等各種參數) 去組出你想要的版面啦!

什麼, 你說很麻煩? 最麻煩的 player 都已經寫成 component, 甚至連 vm5 logo 跟 CTA button 都幫你寫成 component 了,
只要設定大小、位置, 基本的版型不用 50 行就能搞定.

順帶一提, 現有的 native, top, impressive, interstitial, portrait interstitial 全都是這樣寫出來的.
以功能較簡單的 interstitial 為例, 連同共用元件一併計算, 也不超過 220 行.

## 有點意思. 互動的部份是怎麼處理的? 要跟 SDK 溝通吧?

這裡要先解釋一下, 其實一個 plugin 就是一個 [Vue component](https://vuejs.org/v2/guide/single-file-components.html), 而 SDK 本身也是 Vue component.

而 Vue component Vue component 之間的溝通方式是 "props down, events up". 也就是說 SDK 會把參數用 props 傳給 plugin, 而 plugin 則必須使用 event 告知 SDK 版型的狀態變化.

詳細的文件請見[傳送門](https://github.com/VMFive/vm5-adn-web-sdk-plugin-starter-kit/blob/master/API.md).

## 大概了解了. 所以要寫 Vue component 對吧? 很難嗎?

Vue single file component 由 `<template>`, `<style>`, `<script>` 三個區塊組成, 其實只要會寫 HTML/CSS/JS, 你就會寫 vue component 了.

## 那我該怎麼開始?

首先你的電腦要安裝 git 和 node.js, 照以下指令準備開發環境:

```
git clone https://github.com/VMFive/vm5-adn-web-sdk-plugin-starter-kit.git
cd vm5-adn-web-sdk-plugin-starter-kit/
npm install
npm run dev
```

接著用你喜歡的文字編輯器修改 HelloPlugin.vue 吧! 用瀏覽器打開 http://localhost:9455 即可看到成果. 需要看 log 的話，打開 http://localhost:9455/?enable-log 即可. 順帶一提, 編輯 HelloPlugin.vue 的改動會即時反映在網頁上喔!

starter kit 也包含幾個 demo, 也用以下指令跑起來:

```
npm run demo
```

用瀏覽器打開 http://localhost:9455/demos/ , 點選 demo1.html 或 demo2.html 即可看到.
