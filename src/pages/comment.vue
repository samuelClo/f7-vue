<template>
  <f7-page name="Comment">
    <div class="block-header">Commentaires : ({{commentUser.length}})</div>

    <div style="background: white; margin: 1rem 0;list-style: none" v-for="comment in commentUser"
         class="card-content card-content-padding">
      <span style="text-align: right; color: black;font-size: 10px; margin-left: 10px">{{moment(comment.time, "YYYYMMDD").locale('fr').fromNow()}}</span>
      <p v-html="comment.text" v-if="comment.text">{{comment.text.replace(/(<([^>]+)>)/ig, '')}}</p>
      <f7-list-item v-if="comment.hasKids" :link="`/comment/${comment.kids}`">
        <span  style="color: mediumseagreen">see more comment</span>
      </f7-list-item>
    </div>
  </f7-page>
</template>

<script>
    export default {
        data() {
            return {
                commentUser: []
            }
        },
        mounted() {
            this.$f7ready((f7) => {
                    const allComment = this.$f7route.params.child.split(',')

                    allComment.forEach(item => {
                        f7.request.get('https://hacker-news.firebaseio.com/v0/item/' + item + '.json', data => {
                            let comment = JSON.parse(data)
                            comment.time = new Date(comment.time * 1000)
                            if ('kids' in comment){
                                comment = {
                                    ...comment,
                                    hasKids: true,
                                }
                            }
                            this.commentUser.push(comment)
                        })
                    })
                }
            )
        }
    }
</script>