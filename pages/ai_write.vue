<template>
  <main class="main overflow-auto">
    <div class="px-4 my-2 rounded-xl ai-write-banner">
      <div class="flex justify-between items-center mb-4">
        <div class="text-lg font-semibold text-gray-700">
          主页
        </div>
        <div class="space-x-2">
          <a-space>
            <a-button type="primary" @click="get_last_id('new')">新建文稿</a-button>
            <a-button type="primary" status="success" @click="get_last_id('ai_write')">AI功能稿</a-button>
          </a-space>
        </div>
      </div>
      <div class="ai-write-content-banner rounded-lg border p-8 flex items-center space-x-6">
        <div class="w-1/2">
          <div class="mb-4">
            <h1 class="text-4xl font-bold text-blue-600">
              AI帮助您快速写作
            </h1>
            <p class="text-gray-500 mt-2">
              通过人工智能技术，帮助您快速写作，提高写作效率
            </p>
          </div>
          <div class="grid grid-cols-2 gap-4">
            <button class="flex items-center justify-between bg-white border border-gray-200 rounded-md py-3 px-4">
              <div class="flex items-center space-x-2">
                <img alt="An icon representing meeting notes" class="w-6 h-6" height="24" src="@/assets/images/write-1.png" width="24"/>
                <span class="text-gray-700">
         自动刷新存档
        </span>
              </div>
              <icon-right-circle/>
            </button>
            <button class="flex items-center justify-between bg-white border border-gray-200 rounded-md py-3 px-4">
              <div class="flex items-center space-x-2">
                <img alt="An icon representing a project meeting" class="w-6 h-6" height="24" src="@/assets/images/write-2.png" width="24"/>
                <span class="text-gray-700">
         AI写作编撰
        </span>
              </div>
              <icon-right-circle/>
            </button>
            <button class="flex items-center justify-between bg-white border border-gray-200 rounded-md py-3 px-4">
              <div class="flex items-center space-x-2">
                <img alt="An icon representing sign-in sheet" class="w-6 h-6" height="24" src="@/assets/images/write-3.png" width="24"/>
                <span class="text-gray-700">
         Word文件格式
        </span>
              </div>
              <icon-right-circle/>
            </button>
            <button class="flex items-center justify-between bg-white border border-gray-200 rounded-md py-3 px-4">
              <div class="flex items-center space-x-2">
                <img alt="An icon representing a team meeting" class="w-6 h-6" height="24" src="@/assets/images/write-4.png" width="24"/>
                <span class="text-gray-700">
         多模型体验写作
        </span>
              </div>
              <icon-right-circle/>
            </button>
          </div>
        </div>
        <div class="w-1/2 flex justify-end text-right">
          <img alt="write" class="w-80 h-auto" src="@/assets/images/write_banner.png"/>
        </div>
      </div>
      <h3 class="my-3 text-xl">热门模版</h3>
      <div class="content_mode mb-4">
        <a-row :gutter="20">
          <a-col :xs="{span: 24}" :lg="{span:6}" class="cursor-pointer mb-2">
            <a-card hoverable class="bg-white rounded-3" @click="get_last_id('content_change')">
              <div class="flex items-center justify-between">
                                  <span class="flex item-center">
                                    <img src="@/assets/images/write/content.png" alt="内容修改" class="mr-3 w-14">
                                    <a-typography-text>
                                        <h5>内容修改</h5>
                                        <p>修改某段文章段落内容，保留原意操作</p>
                                    </a-typography-text>
                                  </span>
              </div>
            </a-card>
          </a-col>
          <a-col :xs="{span: 24}" :lg="{span:6}" class="cursor-pointer mb-2">
            <a-card hoverable class="bg-white rounded-3" @click="get_last_id('content_long')">
              <div class="flex items-center justify-between">
                                      <span class="flex items-center">
                                                <img src="@/assets/images/write/content_set.png" alt="句子续写"
                                                     class="mr-3 w-14">

                                        <a-typography-text>
                                            <h5>句子续写</h5>
                                            <p>根据上下文句子延续写作创新</p>
                                        </a-typography-text>
                                      </span>
              </div>
            </a-card>
          </a-col>
          <a-col :xs="{span: 24}" :lg="{span:6}" class="cursor-pointer mb-2">
            <a-card hoverable class="bg-white rounded-3" @click="get_last_id('content_color')">
              <div class="flex items-center justify-between">
                                      <span class="flex items-center">
                                                <img src="@/assets/images/write/style.png" alt="风格润色"
                                                     class="mr-3 w-14">

                                        <a-typography-text>
                                            <h5>风格润色</h5>
                                            <p>修改当前内容的整体写作风格</p>
                                        </a-typography-text>
                                      </span>
              </div>
            </a-card>
          </a-col>
          <a-col :xs="{span: 24}" :lg="{span:6}" class="cursor-pointer mb-2">
            <a-card hoverable class="bg-white rounded-3" @click="get_last_id('content_think')">
              <div class="flex items-center justify-between">
                                      <span class="flex items-center">
                                                <img src="@/assets/images/write/gousi.png" alt="创意故事"
                                                     class="mr-3 w-14">

                                        <a-typography-text>
                                            <h5>创意故事</h5>
                                            <p>帮你构思一个创意</p>
                                        </a-typography-text>
                                      </span>
              </div>
            </a-card>
          </a-col>
        </a-row>
      </div>
      <div class="w-full bg-white shadow-md border rounded-lg">
        <div class="flex items-center border-b px-4 py-3">
          <span class="text-lg font-semibold">最近</span>
          <div class="ml-auto flex space-x-4">
            <div class="relative mr-2">
              <button class="flex items-center text-gray-600 hover:text-gray-800">
                最近打开
                <icon-clock-circle/>
              </button>
            </div>
            <div class="relative">
              <button class="flex items-center text-gray-600 hover:text-gray-800">
                操作
                <icon-down/>
              </button>
            </div>
          </div>

        </div>
        <div class="divide-y" v-if="all_content.length>0">
          <div class="flex items-center px-4 py-3 cursor-pointer mb-2 list-animation-leftIn"
               :class="'delay-'+index" v-for="(item,index) in all_content"
                :key="index"
                @click="go_now(item.id,'in')"
                >
            <svg t="1717320282650" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4677" width="48" height="48"><path d="M506.88 257.024H321.024c-25.6 0-46.08 20.992-46.08 46.592v371.2c0 25.6 20.48 46.592 46.08 46.592h279.04c25.6 0 46.592-20.992 46.592-46.592V396.288L506.88 257.024z m46.08 371.2H367.616v-46.592H552.96v46.592z m0-92.672H367.616v-46.592H552.96v46.592zM483.328 419.328V291.84l127.488 127.488H483.328z" fill="#AAD4FF" p-id="4678"></path><path d="M599.552 314.88H413.696c-25.6 0-46.08 20.992-46.08 46.592v371.2c0 25.6 20.48 46.592 46.08 46.592h279.04c25.6 0 46.592-20.992 46.592-46.592V454.144l-139.776-139.264z m46.592 371.2H460.288v-46.08h185.856v46.08z m0-92.672H460.288v-46.592h185.856v46.592z m-69.632-116.224V349.696l127.488 127.488h-127.488z" fill="#2B95FF" p-id="4679"></path><path d="M827.904 233.472H798.72v-29.696c0-6.656-5.12-11.776-11.776-11.776-6.656 0-11.776 5.12-11.776 11.776v29.696h-29.696c-6.656 0-11.776 5.12-11.776 11.776s5.12 11.776 11.776 11.776h29.696V286.72c0 6.656 5.12 11.776 11.776 11.776 6.656 0 11.776-5.12 11.776-11.776v-29.696h29.696c6.656 0 11.776-5.12 11.776-11.776s-5.632-11.776-12.288-11.776z" fill="#A8D4FF" p-id="4680"></path><path d="M805.66272 620.4416l46.336-46.336 46.34624 46.336-46.34112 46.336zM786.944 831.488l34.816-34.816h-69.632z" fill="#D9EDFF" p-id="4681"></path><path d="M216.064 234.496m-32.768 0a32.768 32.768 0 1 0 65.536 0 32.768 32.768 0 1 0-65.536 0Z" fill="#D9EDFF" p-id="4682"></path><path d="M281.088 794.112l-89.088-89.088c-3.072-3.072-8.192-4.096-12.8-2.56-4.096 2.048-7.168 6.144-7.168 10.752v89.088c0 3.072 1.536 6.144 3.584 8.192 2.048 2.048 5.12 3.584 8.192 3.584h89.088c4.608 0 8.704-3.072 10.752-7.168 1.536-4.096 0.512-9.216-2.56-12.8z m-86.016-3.072v-49.152l49.152 49.152h-49.152z" fill="#A8D4FF" p-id="4683"></path></svg>

            <span class="ml-3 flex-1 text-gray-800">{{ item.title ? item.title : '未命名' }}</span>
            <span class="ml-8 mr-8 text-gray-500">{{ item.created_at }}</span>
            <a-dropdown trigger="hover">
              <icon-more class="mr-4"/>
              <template #content>
                <a-doption @click.native="go_now(item.id,'in')">
                  <icon-rotate-right class="mr-1"/>
                  当前标签页打开
                </a-doption>
                <a-doption @click.native="go_now(item.id,'out')">
                  <icon-share-internal class="mr-1"/>
                  新建标签页打开
                </a-doption>
                <a-doption @click.native="send_name(item.id)">
                  <icon-edit class="mr-1"/>
                  重命名
                </a-doption>
                <a-doption @click.native="export_word(item.title,item.content)">
                  <icon-swap class="mr-1"/>
                  导出word
                </a-doption>
                <a-doption @click.native="delete_this(item.id)">
                  <icon-delete class="mr-1"/>
                  删除
                </a-doption>
              </template>
            </a-dropdown>

          </div>
        </div>
        <a-empty v-else></a-empty>
      </div>
    </div>
    <a-modal v-model:visible="name_info" title="修改名称" @ok="rename">
      <a-input v-model="beizhu" placeholder="输入新的名称"/>
    </a-modal>
    <Nfooter/>
  </main>
</template>
<script setup lang="ts">
import {ref} from 'vue';
import {
    IconMore,
    IconRotateRight,
    IconShareInternal,
    IconEdit,
    IconSwap,
    IconDelete,

} from "@arco-design/web-vue/es/icon"
import {Message} from "@arco-design/web-vue";
import {asBlob} from "html-docx-js-typescript";
import fileSaver from 'file-saver';
import {useCounter} from "~/store/counter";
const counter = useCounter()
useHead({
    title: 'AI写作 - '+counter.setting.title,
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
const get_content_id = ref(0);
const all_content = ref([]);
const get_last_id = (type:any)=>{
    get_nowContent().then((res:any)=>{
        get_content_id.value = res._rawValue.data
        if (type=='new'){
            router.push({path: '/editor/'+get_content_id.value.id})
        }else if (type=='ai_write'){
            router.push({path: '/editor/'+get_content_id.value.id,query:{ai_write:'true'}})
        }
        if (type === 'content_change' || type === 'content_long' || type === 'content_color' || type === 'content_think') {
            router.push({
                path: '/editor/' + get_content_id.value.id,
                query: {
                    ai_write: 'true',
                    ai_write_type: type
                }
            });
        }
    }).catch((err:any)=>{
        console.log(err)
    })
}
const go_now = (id:any,type:any)=>{
    if (type=='in'){
        router.push({path: '/editor/'+id})
    }else{
        window.open('/editor/'+id)
    }

}
const now_id  =ref(0)
const name_info = ref(false)
const beizhu = ref('')
const send_name = (id:any)=>{
    now_id.value = id
    name_info.value = true
}
const export_word = (title:any,content:any)=>{
    if (content == null || content == ''){
        Message.error('内容为空')
        return
    }
    asBlob(content).then((blob: any) => {
        fileSaver.saveAs(blob, title?title:'未命名'+'.docx');
    });
}
const delete_this = (id:any) =>{
    delete_content({
        id: id
    }).then((res: any) => {
        Message.success('删除成功')
        get_all_content()
    }).catch((err: any) => {
        console.log(err)
    })
}
const rename = ()=>{
    rename_content({
        id:now_id.value,
        title:beizhu.value
    }).then((res:any)=>{
        Message.success('修改成功')
        get_all_content()
    }).catch((err:any)=>{
        console.log(err)
    })
}
const contentLoad = ref(false)
const get_all_content = ()=>{
  contentLoad.value = true
    get_allContent().then((res:any)=>{
        all_content.value = res._rawValue.data
      contentLoad.value = false
    }).catch((err:any)=>{
      contentLoad.value = false
        console.log(err)
    })
}
if (token.value){
    get_all_content()
}
</script>

