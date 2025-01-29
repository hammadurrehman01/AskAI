<template>
    <main class="main overflow-auto ai-img-code">
      <div class="p-4">
        <div class="code-title mb-3 inline-block">
          <h2>
            图转代码 | Code To Image
          </h2>
          <span>通过图片生成HTML界面</span>
        </div>

        <a-row :gutter="20">
          <a-col :xs="24" :lg="12" class="mb-4">
            <a-card hoverable class="bg-white">
              <template #cover>
                <div
                    :style="{
          height: '650px',
          overflow: 'hidden',
        }"
                >
                  <div class="code-head-model p-2 border-bottom border-gray-500 flex justify-between">
                    <h4 class="mb-0">模式选择</h4>
                    <a-dropdown @select="handleSelect" :popup-max-height="false">
                      <a-button type="primary">{{ model_list.find(item => item.value === model_select).label }}<icon-down/></a-button>

                      <template #content>
                        <a-doption :value="item.value" v-for="(item,index) in model_list" :key="index">{{ item.label }}</a-doption>
                      </template>
                    </a-dropdown>
                  </div>
                  <a-upload
                      class="avatar-uploader"
                      :action="actions"
                      :show-file-list="false"
                      :headers="{'Authorization': 'Bearer ' + token}"
                      @before-upload="beforeUpload"
                      @success="picSuccess"
                      draggable
                  >
                    <template #upload-button>
                      <div
                      >
                        <div
                            class="arco-upload-list-picture arco-upload-list-picture-hight w-100 custom-upload-avatar"
                            v-if="imageUrl"
                        >

                          <div class="upload-file">
                            <div class="upload-file__upload w-full h-full upload-file__upload--white gda-dropdown-trigger"
                            >
                              <img class="w-auto" :src="imageUrl"/>
                            </div>
                          </div>

                          <div class="arco-upload-list-picture-mask" >
                            <IconPlus />
                          </div>

                        </div>
                        <div class="upload-file">
                          <div class="upload-file__upload flex-col arco-upload-list-picture-hight upload-file__upload--white gda-dropdown-trigger"
                            >
                            <svg role="img" width="50" height="50" aria-label="cloud-upload" focusable="false" data-icon="cloud-upload"
                                 aria-hidden="true" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
                                 class=" gd_design_icon-cloud-upload">
                              <path
                                  d="M12 3.25C9.23322 3.25 6.85685 4.91427 5.81432 7.29442C3.23861 7.63053 1.25 9.83289 1.25 12.5C1.25 15.3995 3.60051 17.75 6.5 17.75H8V16.25H6.5C4.42893 16.25 2.75 14.5711 2.75 12.5C2.75 10.4736 4.35756 8.82234 6.36655 8.75232L6.87754 8.73451L7.04768 8.25236C7.76807 6.211 9.71438 4.75 12 4.75C14.2856 4.75 16.2319 6.211 16.9523 8.25236L17.1225 8.73451L17.6334 8.75232C19.6424 8.82234 21.25 10.4736 21.25 12.5C21.25 14.5711 19.5711 16.25 17.5 16.25H16V17.75H17.5C20.3995 17.75 22.75 15.3995 22.75 12.5C22.75 9.83289 20.7614 7.63052 18.1857 7.29442C17.1431 4.91427 14.7668 3.25 12 3.25Z"
                                  fill="currentColor"></path>
                              <path
                                  d="M12.75 13.1013V20.5H11.25V13.1013L9.48014 14.5762L8.51986 13.4238L12 10.5237L15.4801 13.4238L14.5199 14.5762L12.75 13.1013Z"
                                  fill="currentColor"></path>
                            </svg>
                            <div class="flex">上传网站截图，仅支持PNG|JPG </div>
                          </div>
                        </div>
                      </div>
                    </template>
                  </a-upload>

                </div>
              </template>
              <a-button @click="submitForm()" :loading="send_loading" type="primary"  class="w-full mb-2">
                <template #icon>
                  <icon-code  />
                </template>
                生成代码
              </a-button>
              <a-button type="primary" status="danger" @click="deletePic" class="w-100"  v-if="imageUrl">
                <template #icon>
                  <icon-delete  />
                </template>
                删除图片
              </a-button>

            </a-card>

          </a-col>

          <a-col :xs="24" :lg="12">
              <div class="code-right-image shadow-sm border bg-white">
                  <a-tabs default-active-key="1" class="w-full h-full">
                      <a-tab-pane key="1" title="界面展示">
                          <div v-html="codeContent" v-if="codeContent"></div>
                          <a-empty description="暂无数据" v-else />
                      </a-tab-pane>
                      <a-tab-pane key="2" title="代码">
                          <div class="p-2" v-if="codeContent">
                              <a-button class="copy" type="primary" @click="handleClick(codeContent)">复制代码</a-button>
                              <pre>
                                  <code  v-html="renderMarkdown(codeContent).replace(/\\n/g, '\n')"></code>
                              </pre>
                          </div>
                          <a-empty description="暂无数据" v-else />
                      </a-tab-pane>
                  </a-tabs>
              </div>

          </a-col>
        </a-row>

      </div>
      <Login :login_dialog="login_dialog" @handleCancel="handleCancel"/>
    </main>
</template>
<script setup lang="ts">
import {ref} from "vue";
import {IconDelete, IconPlus,IconCode,IconDown} from "@arco-design/web-vue/es/icon";
import {useCounter} from "~/store/counter";
import {Message} from "@arco-design/web-vue";
import markdownIt from "markdown-it";
import hljs from "highlight.js";
import markdownItKatex from "markdown-it-katex";
import mermaid from "mermaid";

const counter = useCounter()
useHead({
  title: '图转代码 - '+counter.setting.title,
  meta: [
    { name: 'description', content: counter.setting.description},
    { name: 'keywords', content: counter.setting.keywords}
  ]
})
const token = useCookie('token')

const actions = counter.setting.APP_URL + '/api/upload_miji'

const imageUrl = ref('')
const deletePic = () => {
  imageUrl.value = ''
}
const is_done = ref(false)
const renderMarkdown = (markdown: any) => {
    const md = markdownIt({
        linkify: true,
        highlight: (str: string, lang: string) => {
            if (lang === 'mermaid') {
                return `<pre class="mermaid">${markdownIt().utils.escapeHtml(str)}</pre>`;
            }

            if (lang && hljs.getLanguage(lang)) {
                try {
                    return `<pre class="hljs"><span ref="preCopy" class="pre_copy">Copy</span><code>${hljs.highlight(str, {
                        language: lang,
                        ignoreIllegals: true
                    }).value}</code></pre>`;
                } catch (__) {}
            }

            return `<pre class="hljs"><span ref="preCopy" class="pre_copy">Copy</span><code>${markdownIt().utils.escapeHtml(str)}</code></pre>`;
        },
        breaks: true
    }).use(markdownItKatex);

    const renderedMarkdown = md.render(markdown);

    mermaid.initialize({ startOnLoad: true });
    // 判断是否有闭合</pre>


    if (is_done.value){
        mermaid.initialize({ startOnLoad: true });
        mermaid.init(undefined, document.querySelectorAll('.mermaid'));
    }

    return renderedMarkdown;
}
const beforeUpload = (file:any) => {
  const isJPG = file.type === 'image/jpeg';
  const isPNG = file.type === 'image/png';
  const isLt2M = file.size / 1024 / 1024 < 15;

  if (!isJPG && !isPNG) {
    Message.error('上传图片只能是 JPG/PNG 格式!')
    return false
  }
  if (!isLt2M) {
    Message.error('上传图片大小不能超过 15MB!')
    return false
  }
  return true
};
const picSuccess = (currentFile:any) => {
  // 获取currentFile里的response的data值
  if (currentFile.response.status != 200) {
    Message.error('上传失败!')
    return
  }
  Message.success('上传成功!')
  imageUrl.value = currentFile.response.data;
};

const send_loading = ref(false)
const login_dialog = ref(false)
const login_dialog_click = () => {
  login_dialog.value = true
}
const handleCancel = () => {
  login_dialog.value = false
}
const {public: {baseUrl}} = useRuntimeConfig()
const headers = {
  'Authorization': `Bearer ${token.value}`,
  'Accept': 'text/event-stream',
}
const handleClick = (command: any) => {
    const textarea = document.createElement('textarea');
    textarea.value = command.replace(/&nbsp;/g, ' ');
    textarea.setAttribute('readonly', '');
    textarea.style.position = 'absolute';
    textarea.style.left = '-9999px';
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    Message.success('复制成功');
}
const isInvalidJSON = (data:string)=> {
  try {
    JSON.parse(data);
    return true; // 解析成功，是错误的 JSON 数据
  } catch (error) {
    return false; // 解析失败，不是错误的 JSON 数据
  }
}
const codeContent = ref('')
const submitForm = async () => {
  if (imageUrl.value == '') {
    Message.warning('请上传图片')
    return false
  }
  if (send_loading.value == true) {
    Message.warning('请等待上一条消息发送完成')
    return false
  }
  if (!token.value) {
    Message.warning('请先登录')
    login_dialog_click()
    return false
  }
  codeContent.value = ''


  send_loading.value = true

  const res = await fetch(`${window.APP_CONFIG.baseUrl}code_image`, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify({
      image_url: imageUrl.value,
      model_select: model_select.value
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
  if (res.status == 405) {
    send_loading.value = false
    console.log(res)
    Message.error('提交信息有误')
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
  let reply_in = false;

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
                codeContent.value += content;
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
        is_done.value = true
      console.log('done')
      send_loading.value = false
    } else {
      send_loading.value = true
      onData(result!);
      await read();
    }
  };
  await read();



}
const model_select = ref('tailwind')
const model_list = ref([
  {
    label:'HTML+Tailwind',
    value:'tailwind'
  },
  {
    label:'React+Tailwind',
    value:'react'
  },
  {
    label:'Vue+Tailwind',
    value:'vue'
  },
  {
    label:'Boostrap',
    value:'boostrap'
  }
])
const handleSelect = (v:string) => {
  model_select.value = v
};
</script>

<style scoped>

</style>
