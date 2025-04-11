// ==UserScript==
// @name         Youtube-thumbnail-resizer
// @namespace    http://tampermonkey.net/
// @version      2025-04-10
// @descripon
// @author       m3g4p0n1
// @match        https://www.youtube.com*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=youtube.com
// @grant        none
// ==/UserScript==

(function(){
    
    // vvvvvvvvvvvvvvvvvvvvvvvvvvvv
    // vvvvv | Modify these | vvvvv
    const numOfThumbnails = 8
    const fontSize = '10px'
    const lineHeight = '15px'
    // ^^^^^ | Modify these | ^^^^^
    // ^^^^^^^^^^^^^^^^^^^^^^^^^^^^


    function sleep(ms){
        return new Promise(resolve => setTimeout(resolve, ms));
    }


    async function resizeThumbs(){
        while (true){
            try{
                document.getElementsByClassName('style-scope ytd-two-column-browse-results-renderer')[1].style.setProperty('--ytd-rich-grid-items-per-row', numOfThumbnails);
                document.getElementsByClassName('style-scope ytd-two-column-browse-results-renderer')[1].style.setProperty('--ytd-rich-grid-posts-per-row', numOfThumbnails);
                document.querySelector('ytd-rich-section-renderer').remove() //The first rows don't merge together if I don't remove this thing. Doing this is merely for aesthethics as far as I noticed.

            }catch{}
            await sleep(500)
        }
    }

    var ignoreNum = -1

    async function resizeTitles(){
        while (true){
            try{
                var videoTitles = document.querySelectorAll('#video-title.ytd-rich-grid-media')

                for (let i=0; i < videoTitles.length; i++){
                    if (i > ignoreNum){
                        videoTitles[i].style.fontSize = fontSize
                        videoTitles[i].style.lineHeight = lineHeight
                        ignoreNum++
                    }
                }
            }catch{}
            await sleep(2000)
        }
    }

    resizeThumbs()
    resizeTitles()
    

})();
