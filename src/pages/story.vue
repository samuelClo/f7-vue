<template>
  <f7-page name="story">
    <f7-navbar style="color: white" :title="title" back-link="Back"></f7-navbar>
    <div class="card">
      <div class="card-header">{{title}}</div>
      <div class="card-header">
        <a class="link external" style="width: 100%" :href="url" target="_blank">{{url}}</a>
      </div>
      <div class="card-content card-content-padding" v-if="content">
        {{content}}
      </div>
      <div v-if="comments.length > 0" class="card-content card-content-padding">
        <article v-for="(comment, index) in comments" style="list-style: none">
          <div class="card-footer">
            <f7-list-item :link="'/user/'+comment.by" style="color: dodgerblue!important;">{{comment.by}}</f7-list-item>
            <span>{{moment(comment.time * 1000).startOf(1,'hour').fromNow()}}</span>
          </div>
          <p>{{comment.text.replace(/<[^>]*>?/gm, '')}}</p>
          <f7-list-item v-if="comment.hasKids" :link="`/comment/${comment.kids}`">
            <span  style="color: mediumseagreen">see more comment</span>
          </f7-list-item>
        </article>
      </div>
      <div v-else class="card-content card-content-padding">
        No comments at this moment
      </div>
    </div>
  </f7-page>
</template>

<style>
  .card-footer {
    list-style: none;
  }

  .link, .external {
    display: block;
    overflow: hidden;
  }

  .back {
    color: white !important;
  }

  p {
    overflow: hidden;
  }

  .external {
    text-align: left !important;
  }
</style>

<script>
    export default {
        data() {
            return {
                title: '',
                content: false,
                time: '',
                url: '',
                commentsId: [],
                comments: []
            }
        },

        mounted() {
            this.$f7ready((f7) => {
                f7.request.get('https://hacker-news.firebaseio.com/v0/item/' + this.$f7route.params.id + '.json', data => {
                    let datas = JSON.parse(data)
                    this.title = datas.title
                    this.content = datas.text
                    this.url = datas.url
                    this.commentsId = datas.kids

                    this.commentsId.forEach(comment => {
                        f7.request.get('https://hacker-news.firebaseio.com/v0/item/' + comment + '.json', data => {
                            let comment = JSON.parse(data)
                            if ('kids' in comment){
                                comment = {
                                    ...comment,
                                    hasKids: true,
                                }
                            }
                            this.comments.push(comment)
                        })
                    })
                })
            })
        },
    }
</script>