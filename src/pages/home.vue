<template>
  <f7-page name="news">
    <f7-navbar>
      <f7-nav-title style="color: white">
        Hacker News
      </f7-nav-title>
    </f7-navbar>
    <div style="background-color: #FF6B21; " class="subnavbar">
      <div class="subnavbar-inner">
        <div class="segmented">
          <a style="color: white" class="button tab-link tab-link-active" href="#tab1">News</a>
          <a style="color: white" class="button tab-link" href="#tab2">Top</a>
          <a style="color: white" class="button tab-link" href="#tab3">Best</a>
        </div>
      </div>
    </div>
    <div style="padding-top: 20px" class="tabs">
      <div class="tab tab-active" id="tab1">
        <div class="block">
          <f7-list-item class="news" style="list-style: none"
                        :link="'/story/'+story.id"
                        v-for="(story, index) in this.storiesNews"
                        :title="story.title"
          >
          </f7-list-item>
        </div>
      </div>
      <div class="tab" id="tab2">
        <div class="block">
          <f7-list-item class="news" style="list-style: none"
                        :link="'/story/'+story.id"
                        v-for="(story, index) in this.storiesTop"
                        :title="story.title"
          >
          </f7-list-item>
        </div>
      </div>
      <div class="tab" id="tab3">
        <div class="block">
          <f7-list-item class="news" style="list-style: none"
                        :link="'/story/'+story.id"
                        v-for="(story, index) in this.storiesBest"
                        :title="story.title"
          >
          </f7-list-item>
        </div>
      </div>
    </div>
  </f7-page>
</template>

<style>
  .block {
    background-color: white !important;
  }

  .item-title {
    color: black !important;
  }

  .news {
    padding: 15px;
    border-bottom: 1px solid lightgray;
  }

  .button {
    padding-top: 10px;
    height: 50px;
  }

  .navbar-bg {
    background-color: #FF6B21 !important;
    box-shadow: none !important;
  }

  .navbar-bg:before {
    background: #FF6B21;
  }

  .tab-link-active {
    background-color: white;
    color: #FF6B21 !important;
  }

  .navbar {
    box-shadow: none !important;
  }
</style>
<script>
    export default {
        data() {
            return {
                storiesTop: [],
                storiesNews: [],
                storiesBest: []
            }
        },

        mounted() {
            this.$f7ready(f7 => {
                f7.request.get('https://hacker-news.firebaseio.com/v0/topstories.json', data => {
                    let topStory = JSON.parse(data)
                    topStory = topStory.slice(0, 10)

                    topStory.forEach(top => {
                        f7.request.get('https://hacker-news.firebaseio.com/v0/item/' + top + '.json', data => {
                            this.storiesTop.push(JSON.parse(data))
                        })
                    })
                })

                f7.request.get('https://hacker-news.firebaseio.com/v0/newstories.json', data => {
                    let topStory = JSON.parse(data)
                    topStory = topStory.slice(0, 10)

                    topStory.forEach(top => {
                        f7.request.get('https://hacker-news.firebaseio.com/v0/item/' + top + '.json', data => {
                            this.storiesNews.push(JSON.parse(data))
                        })
                    })
                })

                f7.request.get('https://hacker-news.firebaseio.com/v0/beststories.json', data => {
                    let topStory = JSON.parse(data)
                    topStory = topStory.slice(0, 10)

                    topStory.forEach(top => {
                        f7.request.get('https://hacker-news.firebaseio.com/v0/item/' + top + '.json', data => {
                            this.storiesBest.push(JSON.parse(data))
                        })
                    })
                })
            })
        }
    }


    // {
    //     "by": "eindiran",
    //     "id": 21818074,
    //     "kids":[21818300, 21818889, 21819925, 21818493, 21818670, 21818412, 21818572, 21818843, 21818850, 21818284],
    //     "parent":21817656,
    //     "text":"Can anyone who has been to an electronics market in Shenzhen (or visited Shenzhen in general) comment on what their experience was like
</script>