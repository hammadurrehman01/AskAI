<template>

    <main class="main overflow-auto ai-write">
        <Head>
            <Title>{{ title }} - {{counter.setting.title}}</Title>
        </Head>
        <div class="write_content m-4 pb-10">
            <div class="write_header flex justify-content-between">
                <div class="left_write_header flex align-center">
                    <NuxtLink to="/ai_write">
                        <a-button type="text">
                            <template #icon>
                                <icon-arrow-left class="cursor-pointer v-2 text-black-50" />
                            </template>

                        </a-button>
                    </NuxtLink>
                    <div class="cloud_save cursor-pointer">
                        <a-button type="text" @click="saveContent()" class="text-black-50">
                            <template #icon>
                                <icon-cloud size="" class="mr-1" />
                            </template>
                            <span>{{save_loading?'自动保存中....':'自动保存完成'}}</span>
                        </a-button>
                    </div>
                </div>
                <div class="right_write_header">
                    <a-tooltip :content="ai_write?'关闭AI写作':'开启AI写作'">
                        <a-button class="mr-4 text-black-50" type="text" @click="ai_write_open()">
                            <template #icon>
                              <icon-pen />
                            </template>
                        </a-button>
                    </a-tooltip>
                    <a-tooltip content="下载Word文档" @click="export_word()">
                        <a-button class="mr-4 text-black-50" type="text">
                            <template #icon>
                                <icon-download />
                            </template>
                        </a-button>
                    </a-tooltip>
                    <a-tooltip content="删除当前文档">
                        <a-popconfirm content="此操作将永久删除当前文档,确定要删除吗?"
                                      @ok="delete_this()" type="warning">
                            <a-button class="mr-4 text-black-50" type="text">
                                <template #icon>
                                    <icon-delete />
                                </template>
                            </a-button>
                        </a-popconfirm>

                    </a-tooltip>
                </div>
            </div>
            <div class="ai_write_wrap">
                <a-row :gutter="40" class="mt-40">
                    <div class="sticky" style="top: 95%;z-index: 10" :style="ai_write?'left:25%':'left:50%'">
                        <div class="absolute write_bottom">
                            <a-space>
                                <a-button :loading="send_loading" type="primary" @click="write_set('content_long')">
                                    <template #icon>
                                        <icon-edit />
                                    </template>
                                    写内容
                                </a-button>
                                <a-button :loading="send_loading" type="primary" @click="write_set('content_outline')">
                                    <template #icon>
                                        <icon-find-replace />
                                    </template>
                                    写大纲
                                </a-button>
                            </a-space>

                            <a-space>
                                <a-tooltip content="生成400字以下内容">
                                    <a-button @click="change_font_length(400)" :type="write_content_font==400?'primary':'secondary'">
                                        短
                                    </a-button>
                                </a-tooltip>
                                <a-tooltip content="生成1000字以下内容">
                                    <a-button @click="change_font_length(1000)" :type="write_content_font==1000?'primary':'secondary'">
                                        中
                                    </a-button>
                                </a-tooltip>
                                <a-tooltip content="生成2000字以下内容">
                                    <a-button @click="change_font_length(2000)" :type="write_content_font==2000?'primary':'secondary'">
                                        长
                                    </a-button>
                                </a-tooltip>

                            </a-space>
                        </div>
                    </div>
                    <a-col :xs="{span: 24}" :lg="{span:ai_write?12:24}">
                        <div class="container_w mb-2 bg-white relative pb-10">
                            <a-input v-model="title" placeholder="标题" size="large"></a-input>
                            <TEditor :ai_write_type="ai_write_type" :select_text="select_text" :content="content" :disabled="false" @getContent="getContent" @selectText="selectText"  @aiType="aiType"/>


                        </div>

                    </a-col>

                    <a-col :xs="{span: 24}" :lg="{span:12}" v-if="ai_write && ai_write_type==''">
                        <div class="right_ai_content">
                            <h3>AI模版</h3>
                            <!--ai all list-->
                            <a-row :gutter="20" :style="{ marginBottom: '20px' }">
                                <a-col :xs="{span: 24}" :lg="{span:12}">
                                        <a-card hoverable class="bg-white  mb-2 rounded-3" @click="ai_write_change('content_change')">
                                            <div class="flex items-center justify-between">
                                      <span class="flex flex-column">
                                    <img src="@/assets/images/write/content.png" alt="内容修改" class="mr-3 w-14">
                                    <a-typography-text>
                                        <h5>内容修改</h5>
                                        <p>修改某段文章段落内容，保留原意操作</p>
                                    </a-typography-text>
                                  </span>
                                            </div>
                                        </a-card>
                                </a-col>
                                <a-col :xs="{span: 24}" :lg="{span:12}">
                                        <a-card hoverable class="bg-white  mb-2 rounded-3" @click="ai_write_change('content_long')">
                                            <div class="flex items-center justify-between">
                                      <span class="flex flex-column">
                                                <img src="@/assets/images/write/content_set.png" alt="句子续写" class="mr-3 w-14">

                                        <a-typography-text>
                                            <h5>句子续写</h5>
                                            <p>根据上下文句子延续写作创新</p>
                                        </a-typography-text>
                                      </span>
                                            </div>
                                        </a-card>
                                </a-col>
                                <a-col :xs="{span: 24}" :lg="{span:12}">
                                        <a-card hoverable class="bg-white  mb-2 rounded-3" @click="ai_write_change('content_color')">
                                            <div class="flex items-center justify-between">
                                      <span class="flex flex-column">
                                                <img src="@/assets/images/write/style.png" alt="风格润色" class="mr-3 w-14">

                                        <a-typography-text>
                                            <h5>风格润色</h5>
                                            <p>修改当前内容的整体写作风格</p>
                                        </a-typography-text>
                                      </span>
                                            </div>
                                        </a-card>
                                </a-col>
                                <a-col :xs="{span: 24}" :lg="{span:12}">
                                        <a-card hoverable class="bg-white   mb-2 rounded-3" @click="ai_write_change('content_think')">
                                            <div class="flex items-center justify-between">
                                      <span class="flex flex-column">
                                                <img src="@/assets/images/write/gousi.png" alt="创意故事" class="mr-3 w-14">

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
                    </a-col>
                    <a-col :xs="{span: 24}" :lg="{span:12}" v-if="ai_write && ai_write_type!=''">
                        <!--ai content-->
                        <div class="content_sel" v-if="ai_write_type=='content_change'">
                            <div class="info_title flex justify-content-between">
                                <h4>内容</h4>
                                <a-button type="text" @click="res_up()">
                                    <template #icon>
                                        <icon-arrow-left class="cursor-pointer v-2 text-black-50" />
                                    </template>
                                </a-button>
                            </div>
                            <a-textarea
                                    v-model="right_content"
                                    :disabled="false"
                                    :placeholder="'请输入内容'"
                                    :autoSize="{ minRows: 4, maxRows: 4 }"
                            >

                            </a-textarea>
                            <a-button :loading="send_loading" type="primary" class="w-100" @click="send_ai_content()">
                                <template #icon>
                                    <icon-edit />
                                </template>
                                生成内容
                            </a-button>
                        </div>
                        <div class="content_sel" v-if="ai_write_type=='content_long'">
                            <div class="info_title flex justify-content-between">
                                <h4>续写的句子信息</h4>
                                <a-button type="text" @click="res_up()">
                                    <template #icon>
                                        <icon-arrow-left class="cursor-pointer v-2 text-black-50" />
                                    </template>

                                </a-button>
                            </div>


                            <a-textarea
                                v-model="right_content"
                                :disabled="false"
                                :placeholder="'请输入内容'"
                                :autoSize="{ minRows: 4, maxRows: 4 }"
                            >

                            </a-textarea>
                            <a-button :loading="send_loading" type="primary" class="w-100" @click="send_ai_content()">
                                <template #icon>
                                    <icon-edit />
                                </template>
                                生成内容
                            </a-button>
                        </div>
                        <div class="content_sel" v-if="ai_write_type=='content_color'">
                            <div class="info_title flex justify-content-between">
                                <h4>关键词或中心句</h4>
                                <a-button type="text" @click="res_up()">
                                    <template #icon>
                                        <icon-arrow-left class="cursor-pointer v-2 text-black-50" />
                                    </template>
                                </a-button>
                            </div>
                            <a-textarea
                                v-model="right_content"
                                :disabled="false"
                                :placeholder="'请输入内容'"
                                :autoSize="{ minRows: 4, maxRows: 4 }"
                            >

                            </a-textarea>
                            <h4 class="mt-2">风格</h4>
                            <a-select v-model="select_style" class="mb-4">
                                <a-option :value="w.value" v-for="(w,w_index) in write_style" :key="w_index">{{ w.name }}</a-option>
                            </a-select>
                            <a-button :loading="send_loading" type="primary" class="w-100" @click="send_ai_content()">
                                <template #icon>
                                    <icon-edit />
                                </template>
                                生成内容
                            </a-button>
                        </div>
                        <div class="content_sel" v-if="ai_write_type=='content_think'">
                            <div class="info_title flex justify-content-between">
                                <h4>剧情描述</h4>
                                <a-button type="text" @click="res_up()">
                                    <template #icon>
                                        <icon-arrow-left class="cursor-pointer v-2 text-black-50" />
                                    </template>

                                </a-button>
                            </div>


                            <a-textarea
                                v-model="right_content"
                                :disabled="false"
                                :placeholder="'例如：黑暗魔王是一位令人闻风丧胆的恶魔，他在传说中被描绘为邪恶和强大的存在。无论是在古老的神话故事还是现代的电影和小说中，黑暗魔王都扮演着一个恐怖而具有威胁性的角色。'"
                                :autoSize="{ minRows: 4, maxRows: 4 }"
                            >

                            </a-textarea>
                            <a-button :loading="send_loading" type="primary" class="w-100" @click="send_ai_content()">
                                <template #icon>
                                    <icon-edit />
                                </template>
                                生成内容
                            </a-button>
                        </div>
                        <div class="content_result bg-white shadow-sm p-4 mt-4" v-if="last_content">
                            <div class="content_info">
                                {{last_content}}
                            </div>
                            <a-row :gutter="20" class="mt-4">
                                <a-col :span="12">
                                    <a-button type="primary" class="w-100" @click="send_to_content()">
                                        <template #icon>
                                            <icon-rotate-left />
                                        </template>
                                        加入到内容
                                    </a-button>
                                </a-col>
                                <a-col :span="12">
                                    <a-button type="primary" status="success" class="w-100" @click="copy_last_content()">
                                        <template #icon>
                                            <icon-copy />
                                        </template>
                                        复制内容
                                    </a-button>
                                </a-col>
                            </a-row>
                        </div>
                    </a-col>
                </a-row>


            </div>

        </div>
    </main>
</template>
<script setup lang="ts">
import {ref} from "vue";


import {
    IconArrowLeft,
    IconCloud,
    IconCodepen,
    IconDownload,
    IconDelete,
    IconEdit,
    IconCopy,
    IconRotateLeft,
    IconFindReplace,
    IconPen
} from '@arco-design/web-vue/es/icon'
import {Message} from "@arco-design/web-vue";
import {asBlob} from "html-docx-js-typescript";
import fileSaver from 'file-saver';
const route = useRoute()
const token = useCookie('token');
const router = useRouter();
import {useCounter} from "~/store/counter";
const counter = useCounter()
definePageMeta({
    middleware: ['islogin']
})
const title = ref('');
const content = ref('');
const getContent = (v: string) => {
    content.value = v
}
const select_text = ref('')
const selectText = (v: string) => {
    select_text.value = v
}
const aiType = (v: string) => {
    ai_write_type.value = v
    right_content.value = select_text.value
    send_ai_content_c()
}

const write_set = (v: string) => {
    ai_write_type.value = v
    if (content.value==null || content.value==''){
        Message.error('请先输入内容')
        return
    }
    select_text.value = content.value
    send_ai_content_c()
}

const save_loading = ref(false)
const ai_write = ref(route.query.ai_write?route.query.ai_write:false)
const ai_write_type = ref(route.query.ai_write_type?route.query.ai_write_type:'')
const right_content = ref('')
const get_the_content=()=>{
    get_content({
        id: route.params.writeid
    }).then((res: any) => {
        title.value = res._rawValue.data.title
        content.value = res._rawValue.data.content
    }).catch((err: any) => {
        console.log(err)
    })
}
if (token.value){
    get_the_content()
}
const ai_write_change = (type: string) =>{
    ai_write_type.value = type
}
const saveTimeout = ref('');
watch(content, (v) => {
    clearTimeout(saveTimeout.value);
    saveTimeout.value = String(setTimeout(function () {
        saveContent();
    }, 3000));
})
watch (title, (v) => {
    clearTimeout(saveTimeout.value);
    saveTimeout.value = String(setTimeout(function () {
        saveContent();
    }, 3000));
})
const headers = {
    'Authorization': `Bearer ${token.value}`,
    'Accept': 'text/event-stream',
}
const saveContent = async () => {
    save_loading.value = true
    const res = await fetch(`${window.APP_CONFIG.baseUrl}save_content`, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({
            title: title.value,
            content: content.value,
            id:route.params.writeid
        }),

    })
    if (res.status!=200){
        Message.error('保存失败')
        save_loading.value = false
        return
    }
    save_loading.value = false
}
const ai_write_open = () =>{
    ai_write.value = !ai_write.value
    Message.success(ai_write.value?'已开启AI写作':'已关闭AI写作')
}
const send_to_content = () =>{
    content.value += last_content.value
}

const copy_last_content = () =>{
    navigator.clipboard.writeText(last_content.value).then(() => {
        Message.success('复制成功')
    }, () => {
        Message.error('复制失败')
    });
}
const res_up = () =>{
    last_content.value = ''
    ai_write_type.value = ''
}
const send_loading = ref(false)
const {public: {baseUrl}} = useRuntimeConfig()

const streams = ref('')
const last_content = ref('')
const select_style = ref(1)
const write_content_font = ref(400)
const change_font_length = (v: number) =>{
    write_content_font.value = v
}
const write_style = ref([
    {
        name:'专业',
        value:1
    },
    {
        name:'学术的',
        value:2
    },
    {
        name:'活泼的',
        value:3
    },
    {
        name:'幽默的',
        value:4
    },{
        name:'吐槽',
        value:5
    },

])
const delete_this = () =>{
    delete_content({
        id: route.params.writeid
    }).then((res: any) => {
        Message.success('删除成功')
        router.push('/ai_write')
    }).catch((err: any) => {
        console.log(err)
    })
}
const export_word = ()=>{

    asBlob(content.value).then((blob: any) => {
        fileSaver.saveAs(blob, title.value+'.docx');
    });
}
const isInvalidJSON = (data:string)=> {
  try {
    JSON.parse(data);
    return true; // 解析成功，是错误的 JSON 数据
  } catch (error) {
    return false; // 解析失败，不是错误的 JSON 数据
  }
}
// 右侧功能
const send_ai_content = async () => {
    if (right_content.value == '') {
        Message.error('请输入内容')
        return false
    }
    last_content.value = ''

    send_loading.value = true
    const res = await fetch(`${window.APP_CONFIG.baseUrl}generate_content`, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({
            title: title.value,
            content: right_content.value,
            type: ai_write_type.value,
            style: select_style.value,
        }),

    })

    if (res.status == 500) {
        send_loading.value = false
        Message.error('服务器错误')
        return false
    }
    if (res.status == 401) {
        send_loading.value = false
        Message.error('请先登录')
        return false
    }
    if (res.status == 402) {
        send_loading.value = false
        Message.error('发送次数已达上限或余额不足')
        return false
    }
    if (res.status == 403) {
        send_loading.value = false
        Message.error('禁止发送违禁词')
        return false
    }
  let partialData = '';

  const stream = res.body?.getReader();
  const onData = ({value}: { value: Uint8Array }) => {
    const chunk = new TextDecoder().decode(value);
    if (isInvalidJSON(chunk)) {
      const json = JSON.parse(chunk);
      if (json.error && json.error.message) {
        Message.error(json.error.message);
        return; // 或者进行其他错误处理
      }
      return;
    }
    const lines = (partialData + chunk).split('\n');

    partialData = lines.pop() || '';

    for (const line of lines) {
      if (line.trim() === 'data: [DONE]') {
        // 如果是最后一行，跳过处理
        continue;
      }

      try {
        const trimmedLine = line.trim(); // 去除行首尾的空格
        if (trimmedLine.startsWith('data:')) {
          const jsonData = trimmedLine.slice(5); // 去除 "data:" 前缀
          const json = JSON.parse(jsonData);
          if (json.choices) {
            for (const choice of json.choices) {
              const content = choice.delta?.content;
              if (content) {
                last_content.value += content;
              }
              if (choice.finish_reason === 'stop') {
                break;
              }
            }
          }
        }
      } catch (e) {
        console.error(e);
      }
    }
    };


    const read = async () => {
        const result = await stream?.read();
        if (result?.done) {
            send_loading.value = false
            right_content.value = ''
        } else {
            onData(result!);
            await read();
        }
    };
    await read();
}

// 文章中操作
const send_ai_content_c = async () => {
    if (select_text.value == '') {
        Message.error('请选择内容')
        return false
    }
    if (content.value == '') {
        Message.error('请输入内容')
        return false
    }

    send_loading.value = true
    const res = await fetch(`${window.APP_CONFIG.baseUrl}generate_content_c`, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({
            title: title.value,
            content: select_text.value,
            type: ai_write_type.value,
            write_content_font: write_content_font.value,
        }),

    })

    if (res.status == 500) {
        send_loading.value = false
        Message.error('服务器错误')
        return false
    }
    if (res.status == 401) {
        send_loading.value = false
        Message.error('请先登录')
        return false
    }
    if (res.status == 402) {
        send_loading.value = false
        Message.error('发送次数已达上限或余额不足')
        return false
    }
    if (res.status == 403) {
        send_loading.value = false
        Message.error('禁止发送违禁词')
        return false
    }
  let partialData = '';

  const stream = res.body?.getReader();
  const onData = ({value}: { value: Uint8Array }) => {
    const chunk = new TextDecoder().decode(value);
    if (isInvalidJSON(chunk)) {
      const json = JSON.parse(chunk);
      if (json.error && json.error.message) {
        Message.error(json.error.message);
        return; // 或者进行其他错误处理
      }
      return;
    }
    const lines = (partialData + chunk).split('\n');

    partialData = lines.pop() || '';

    for (const line of lines) {
      if (line.trim() === 'data: [DONE]') {
        // 如果是最后一行，跳过处理
        continue;
      }

      try {
        const trimmedLine = line.trim(); // 去除行首尾的空格
        if (trimmedLine.startsWith('data:')) {
          const jsonData = trimmedLine.slice(5); // 去除 "data:" 前缀
          const json = JSON.parse(jsonData);
          if (json.choices) {
            for (const choice of json.choices) {
              const last_content = choice.delta?.content;
              if (last_content) {
                content.value += last_content
              }
              if (choice.finish_reason === 'stop') {
                break;
              }
            }
          }
        }
      } catch (e) {
        console.error(e);
      }
    }
    };


    const read = async () => {
        const result = await stream?.read();
        if (result?.done) {
            send_loading.value = false
            select_text.value = ''
        } else {
            onData(result!);
            await read();
        }
    };
    await read();
}
</script>
<style scoped>

</style>
