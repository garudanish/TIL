// 모듈 가져오기
const axios = require("axios");
const cheerio = require("cheerio");

function melonCrawler() {
  const url = `https://www.melon.com/chart/index.htm`;

  // axios로 get 요청 보내기
  axios.get(url).then((res) => {
    if (res.status === 200) {
      // 크롤링하는 코드
      console.log(res.status);
      let crawledMusic = [];

      // res.data에 있는 tag를 cheerio로 검색하여
      const $ = cheerio.load(res.data);
      const $musicList = $("table > tbody > tr");

      $musicList.each(function (i) {
        crawledMusic[i] = {
          title: $(this)
            .find("td > div > div > div.ellipsis.rank01 > span > a")
            .text(),
          artist: $(this)
            .find("td > div > div > div.ellipsis.rank02 > a")
            .text(),
          img: $(this).find("td > div > a > img").attr("src"),
        };
      });
      console.log(crawledMusic);
    }
  });
}

melonCrawler();

// #lst50 > td:nth-child(6) > div > div > div.ellipsis.rank01 > span > a
// #lst50 > td:nth-child(6) > div > div > div.ellipsis.rank02 > a
// #lst50 > td:nth-child(4) > div > a > img
