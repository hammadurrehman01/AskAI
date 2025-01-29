

<template>
    <a-spin :loading="create_load">
      <main class="main overflow-auto px-4 py-4 ai-knowledge-bg">
        <div class="flex flex-col md:flex-row items-center bg-white p-10 rounded-lg shadow-md">
          <!-- Text Section -->
          <div class="md:w-1/2 text-left md:text-left mb-8 md:mb-0">
            <h1 class="text-3xl font-bold mb-4 leading-loose">
              新一代知识管理平台
              <br/>
              助力组织全面升级
            </h1>
            <p class="text-lg mb-6">
              知识库是一个面向组织的知识管理系统。通过结构化沉淀高价值信息，形成完整的知识体系。此外，明确的内容分类，层级式的页面树，还能够轻松提升知识的流转和传播效率，更好地成就组织和个人。
            </p>
            <div class="flex justify-center md:justify-start space-x-4">
              <button @click="create_knowledge('new')" class="bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded-full">
                立即创建
              </button>

            </div>
          </div>
          <!-- Image Section -->
          <div class="md:w-1/2 flex justify-center">
            <div class="relative">
              <img alt="知识库图标" class="rounded-lg w-80" src="@/assets/images/knowledge-1.png"/>
            </div>
          </div>

        </div>
        <div class="content_tencent shadow-sm border bg-white my-6">
          <h3 class="mb-3">知识库管理</h3>
          <div class="content_card mb-4">
            <a-row :gutter="20">
              <a-col :xs="{span: 24}" :lg="{span:6}" class="cursor-pointer mb-2" @click="create_knowledge('new')">
                <a-card hoverable class="bg-white rounded-3">
                  <div class="flex items-center justify-between">
                                      <span class="flex items-center">
                                        <img src="@/assets/images/knowledge.png" alt="新建文稿" class="mr-3 w-14">
                                        <a-typography-text>
                                            <h5>创建知识库</h5>
                                            <p>新建空白知识库进行导入文档数据</p>
                                        </a-typography-text>
                                      </span>
                  </div>
                </a-card>
              </a-col>
              <a-col :xs="{span: 24}" :lg="{span:6}" class="cursor-pointer mb-2" v-for="(item,index) in publist" :key="index">
                <a-card hoverable class="bg-white rounded-3" @click="create_knowledge(item.know_uid)">
                  <div class="flex items-center justify-between">
                                      <span class="flex items-center">
                                        <a-image :src="item.avatar" class="mr-3 w-14 h-14" />

                                        <a-typography-text>
                                            <h5>{{ item.title }}</h5>
                                            <p>{{ item.description }}</p>
                                        </a-typography-text>
                                      </span>
                    <a-tag class="absolute right-2 top-1" :color="item.is_public?'green':'red'">
                      {{ item.is_public ? '公开' : '私有'}}
                    </a-tag>
                    <a-dropdown trigger="hover">
                      <icon-more/>
                      <template #content>
                        <a-doption @click.native="send_public(item.know_uid)"><icon-rotate-right class="mr-1" />公开知识库</a-doption>
                        <a-doption @click.native="send_name(item.know_uid)"><icon-edit class="mr-1" />重命名</a-doption>
                        <a-doption @click.native="delete_this(item.know_uid)"><icon-delete class="mr-1" />删除</a-doption>
                      </template>
                    </a-dropdown>
                  </div>
                </a-card>
              </a-col>
            </a-row>
          </div>

        </div>

        <a-modal v-model:visible="name_info" title="修改名称" @ok="rename">
              <a-input v-model="beizhu" placeholder="输入新的名称"/>
            </a-modal>

        <Nfooter/>
    </main>
    </a-spin>
</template>

<script setup lang="ts">
import {ref} from "vue";
import {
    IconDelete,
    IconEdit,
    IconMore,
    IconRotateRight,
    IconShareInternal,
    IconSwap
} from "@arco-design/web-vue/es/icon";
import {useCounter} from "~/store/counter";
import {get_all_knowledge} from "~/utils/api";
import {Message} from "@arco-design/web-vue";
const counter = useCounter()
useHead({
    title: '知识库 - '+counter.setting.title,
    meta: [
        { name: 'description', content: counter.setting.description},
        { name: 'keywords', content: counter.setting.keywords}
    ]
})
definePageMeta({
    middleware: ['mustlogin']
})
const router = useRouter();
const token = useCookie('token');
const create_load = ref(false)
const create_knowledge = (type: string) => {
    if (type === 'new') {
        create_load.value = true
        create_know().then((res:any) => {
            create_load.value = false
            router.push('/know/'+res._rawValue.data)
        }).catch((err:any) => {
            create_load.value = false
            console.log(err)
        })
    }
    router.push('/know/'+type)

}
const publist = ref([])
const get_knowledge = () => {
    get_all_knowledge().then((res:any) => {
        publist.value = res._rawValue.data
    }).catch((err:any) => {
        console.log(err)
    })
}
if (token.value) {
    get_knowledge()
}
const now_id  =ref(0)
const name_info = ref(false)
const beizhu = ref('')
const send_name = (id:any)=>{
  now_id.value = id
  name_info.value = true
}
const delete_this = (id:any) =>{
  delete_knowledge({
    know_uid: id
  }).then((res: any) => {
    Message.success('删除成功')
    get_knowledge()
  }).catch((err: any) => {
    console.log(err)
  })
}
const rename = ()=>{
  rename_knowledge({
    know_uid:now_id.value,
    title:beizhu.value
  }).then((res:any)=>{
    Message.success('修改成功')
    get_knowledge()
  }).catch((err:any)=>{
    console.log(err)
  })
}

const send_public = (id:any)=>{
  public_knowledge({
    know_uid:id
  }).then((res:any)=>{
    Message.success(res._rawValue.message)
    get_knowledge()
  }).catch((err:any)=>{
    console.log(err)
  })
}
</script>
<style scoped>

</style>
