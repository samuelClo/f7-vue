<template>
  <f7-page name="User">
    <f7-navbar style="color: white; font-weight: bold" back-link="Back">
      <span>{{name}}</span>
    </f7-navbar>

    <h3 class="block-header">{{name}} <span><br>Inscrit {{moment(created, "YYYYMMDD").locale('fr').fromNow()}}</span>
    </h3>
    <div v-if="about" class="block-header">A propos de {{name}} :</div>
    <div v-html="about" style="overflow:hidden;" class="card-content card-content-padding">{{about}}</div>

    <div class="block-header">Commentaires : ({{commentUser.length}})</div>

    <div style="background: white; margin: 1rem 0;" v-for="comm in commentUser"
         class="card-content card-content-padding">
      <span style="text-align: right; color: black;font-size: 10px; margin-left: 10px">{{moment(comm.time, "YYYYMMDD").locale('fr').fromNow()}}</span>
      <p v-html="comm.text" v-if="comm.text">{{comm.text.replace(/(<([^>]+)>)/ig, '')}}</p>

    </div>
  </f7-page>
</template>
<script>
    export default {
        data() {
            return {
                name: '',
                about: '',
                created: '',
                commentUser: []
            }
        },
        mounted() {
            this.$f7ready((f7) => {
                f7.request.get('https://hacker-news.firebaseio.com/v0/user/' + this.$f7route.params.id + '.json', data => {
                    let datas = JSON.parse(data)
                    this.name = datas.id
                    this.about = datas.about
                    this.created = new Date(datas.created * 1000)

                    datas.submitted.slice(0, 20).forEach(sub => {
                        f7.request.get('https://hacker-news.firebaseio.com/v0/item/' + sub + '.json', data => {
                            let comment = JSON.parse(data)
                            comment.time = new Date(comment.time * 1000)
                            this.commentUser.push(comment)
                        })
                    })
                })
            })
        }
    }
</script>
<style scoped lang="scss">
  ul {
    background: none !important;
  }

  li {
    background: white !important;
    margin: 1rem 0 !important;
  }
</style>