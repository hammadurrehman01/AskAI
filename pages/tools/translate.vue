<template>
  <main class="main overflow-auto ai-translate">
    <div class="p-4">
      <div class="code-title mb-3 inline-block">
        <h2>
          在线翻译 | Translate Online
        </h2>
        <span>通过AI识别语言转换需求语言翻译</span>
      </div>
      <div class="select-choose-translate mb-2">
        <a-space>
          <a-select placeholder="被翻译语言" v-model="transOne">
            <a-option v-for="item in language_arr" :key="item.value" :value="item.value">{{item.label}}</a-option>
          </a-select>
          <svg t="1710312941470" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="31419" width="24" height="24"><path d="M871.24 443.3H120.56a32 32 0 0 1 0-64h750.68a32 32 0 0 1 0 64z" p-id="31420" fill="#707070"></path><path d="M875.42 443.3a31.86 31.86 0 0 1-21.24-8L627.72 234a32 32 0 1 1 42.52-48l226.46 201.38a32 32 0 0 1-21.28 56zM875.44 646.7H124.76a32 32 0 1 1 0-64h750.68a32 32 0 0 1 0 64z" p-id="31421" fill="#707070"></path><path d="M347.02 848a31.88 31.88 0 0 1-21.26-8L99.3 638.62a32 32 0 1 1 42.52-47.84L368.28 792a32 32 0 0 1-21.26 56z" p-id="31422" fill="#707070"></path></svg>

          <a-select placeholder="翻译语言" v-model="transTwo">
            <a-option v-for="item in language_filter(transOne)" :key="item.value" :value="item.value">{{item.label}}</a-option>
          </a-select>
        </a-space>

      </div>
      <div class="bg-white rounded-md ai-tool-translate-content shadow-sm ">
        <h5 class="ai-translate-header border-b p-4 pb-2 mb-0">
          当前由 <span class="text-blue-400"> AI大模型翻译</span>为您翻译
        </h5>
        <a-row>
          <a-col :xs="24" :lg="12" class="border-r">
            <a-textarea :auto-size="{
    minRows:20,
    maxRows:50
  }" v-model="input" show-word-limit
                        placeholder="请输入需要翻译的内容" />
            <div class="ai-translate-footer flex justify-between p-2">
              <div class="translate-tool-small">
                <a-tooltip content="播放语音">
                  <a-button type="text"  size="small" @click="speak(input)">
                    <template #icon>
                      <svg t="1710313616073" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="8247" width="24" height="24"><path d="M725.333333 298.666667v426.666666h-85.333333V298.666667h85.333333zM384 298.666667v426.666666H298.666667V298.666667h85.333333z m-170.666667 128v170.666666H128v-170.666666h85.333333z m682.666667 0v170.666666h-85.333333v-170.666666h85.333333z m-341.333333-256v682.666666h-85.333334V170.666667h85.333334z" fill="#444444" p-id="8248"></path></svg>
                    </template>
                  </a-button>
                </a-tooltip>
                <a-tooltip content="复制内容">
                  <a-button type="text"  size="small" @click="copy_info(input)">
                    <template #icon>
                      <svg t="1710313580103" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="8045" width="24" height="24"><path d="M682.666667 341.333333h128v469.333334H341.333333v-128H213.333333V213.333333h469.333334v128z m0 85.333334v256h-256v42.666666h298.666666v-298.666666h-42.666666zM298.666667 298.666667v298.666666h298.666666V298.666667H298.666667z" fill="#444444" p-id="8046"></path></svg>
                    </template>
                  </a-button>
                </a-tooltip>

              </div>
              <div class="translate-go">
                <a-button type="primary" class="w-full" :loading="send_loading" @click="go_translate">开始翻译</a-button>
              </div>

            </div>
          </a-col>

          <a-col :xs="24" :lg="12" class="h-full p-2" >
              <div class="trans-lies"  v-if="trans_down">
                <div v-html="renderMarkdown(trans_down).replace(/\\n/g, '\n')">
                </div>
                <div class="translate-tool-small">
                  <a-tooltip content="播放语音">
                    <a-button type="text"  size="small" @click="speak(trans_down)">
                      <template #icon>
                        <svg t="1710313616073" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="8247" width="24" height="24"><path d="M725.333333 298.666667v426.666666h-85.333333V298.666667h85.333333zM384 298.666667v426.666666H298.666667V298.666667h85.333333z m-170.666667 128v170.666666H128v-170.666666h85.333333z m682.666667 0v170.666666h-85.333333v-170.666666h85.333333z m-341.333333-256v682.666666h-85.333334V170.666667h85.333334z" fill="#444444" p-id="8248"></path></svg>
                      </template>
                    </a-button>
                  </a-tooltip>
                  <a-tooltip content="复制内容">
                    <a-button type="text"  size="small" @click="copy_info(trans_down)">
                      <template #icon>
                        <svg t="1710313580103" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="8045" width="24" height="24"><path d="M682.666667 341.333333h128v469.333334H341.333333v-128H213.333333V213.333333h469.333334v128z m0 85.333334v256h-256v42.666666h298.666666v-298.666666h-42.666666zM298.666667 298.666667v298.666666h298.666666V298.666667H298.666667z" fill="#444444" p-id="8046"></path></svg>
                      </template>
                    </a-button>
                  </a-tooltip>

                </div>
              </div>
              <div class="flex justify-center items-center" v-else>
                <img src="@/assets/images/trans.gif" class="w-50" alt="">
              </div>

          </a-col>
        </a-row>
      </div>


    </div>
    <Login :login_dialog="login_dialog" @handleCancel="handleCancel"/>
  </main>
</template>
<script setup lang="ts">
import {ref} from "vue";
import {Message} from "@arco-design/web-vue";
import {IconCode, IconDelete, IconDown, IconPlus} from "@arco-design/web-vue/es/icon";
import markdownIt from "markdown-it";
import hljs from "highlight.js";
import markdownItMatch from "markdown-it-math";
import mermaid from "mermaid";
import Speech from 'speak-tts'
import {useCounter} from "~/store/counter";

const counter = useCounter()
useHead({
  title: '在线翻译 - '+counter.setting.title,
  meta: [
    { name: 'description', content: counter.setting.description},
    { name: 'keywords', content: counter.setting.keywords}
  ]
})
const login_dialog = ref(false)
const input = ref('')
const token = useCookie('token');
const transOne = ref('zh')
const transTwo = ref('en')
const send_loading = ref(false)
const trans_down = ref('')
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
  }).use(markdownItMatch,{
    inlineOpen: '$',
    inlineClose: '$',
    blockOpen: '$$$',
    blockClose: '$$$',
    renderingOptions: {},
  });

  const renderedMarkdown = md.render(markdown);

  return renderedMarkdown;
}
const up_stop = ref('start')
const is_done = ref(false)

const language_arr = [
  {
    value: 'zh',
    label: '中文'
  },
  {
    value: 'en',
    label: '英文'
  },
  {
    value: 'jp',
    label: '日文'
  },
  {
    value: 'kor',
    label: '韩文'
  },
  {
    value: 'fra',
    label: '法文'
  },
  {
    value: 'spa',
    label: '西班牙文'
  },
  {
    value: 'ara',
    label: '阿拉伯文'
  },
  {
    value: 'ru',
    label: '俄文'
  },
  {
    value: 'pt',
    label: '葡萄牙文'
  },
  {
    value: 'de',
    label: '德文'
  },
  {
    value: 'it',
    label: '意大利文'
  },
  {
    value: 'nl',
    label: '荷兰文'
  },
  {
    value: 'el',
    label: '希腊文'
  },
  {
    value: 'pl',
    label: '波兰文'
  },
  {
    value: 'bul',
    label: '保加利亚文'
  },
  {
    value: 'est',
    label: '爱沙尼亚文'
  },
  {
    value: 'dan',
    label: '丹麦文'
  },
  {
    value: 'fin',
    label: '芬兰文'
  },
  {
    value: 'cs',
    label: '捷克文'
  },
  {
    value: 'rom',
    label: '罗马尼亚文'
  },
  {
    value: 'slo',
    label: '斯洛文尼亚文'
  },
  {
    value: 'swe',
    label: '瑞典文'
  },
  {
    value: 'hu',
    label: '匈牙利文'
  },
  {
    value: 'cht',
    label: '繁体中文'
  },
  {
    value: 'vie',
    label: '越南文',
  },
]
// 监听transOne的数据实现transTwo的过滤变化
watch(transOne, (val) => {
  transTwo.value = language_filter(val)[0].value

})

const language_filter = (input: string) => {
  // 要不包含的语言
  return language_arr.filter(item => !item.value.includes(input))
}
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
const isInvalidJSON = (data:string)=> {
  try {
    JSON.parse(data);
    return true; // 解析成功，是错误的 JSON 数据
  } catch (error) {
    return false; // 解析失败，不是错误的 JSON 数据
  }
}

// 根据transOne的value获取language_arr的label
const get_transOne_label = (value: string) => {
  return language_arr.filter(item => item.value == value)[0].label
}

const go_translate = async () => {
  if (!token.value) {
    login_dialog_click()
    return false
  }

  if (input.value == '') {
    Message.error('请输入需要翻译的内容')
    return false
  }

  if (send_loading.value) {
    Message.warning('请等待翻译完成')
    return false
  }

  send_loading.value = true


  const res = await fetch(`${window.APP_CONFIG.baseUrl}send_translate`, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify({
      info: input.value,
      trans_one: get_transOne_label(transOne.value),
      trans_two: get_transOne_label(transTwo.value)
    }),

  })

  if (res){
    trans_down.value=''
  }
  if (res.status == 500 || res.status == 401 || res.status == 405 || res.status == 402 || res.status == 403) {

    const responseData = await res.json();
    send_loading.value = false
    Message.error(responseData.message)
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
        trans_down.value = json.error.message;
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
                trans_down.value += content;
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
    if (up_stop.value == 'end') {
      console.log('end')
      up_stop.value = 'start'
      stream?.cancel()
      return false;
    }
    if (result?.done) {
      console.log('done')
      is_done.value = true
      send_loading.value = false
    } else {
      send_loading.value = true
      is_done.value = false
      onData(result!);
      await read();
    }
  };
  await read();


}

const copy_info = (info: string) => {
  const input = document.createElement('input');
  document.body.appendChild(input);
  input.setAttribute('value', info);
  input.select();
  if (document.execCommand('copy')) {
    document.execCommand('copy');
    Message.success('复制成功')
  }
  document.body.removeChild(input);
}
onMounted(async () => {

  // 先获取数据
  // nextTick保证你的获取到的已转成html的markdown内容已经更新到HTML的DOM结构中了。
  await nextTick()
  //  然后执行高亮即可
  speechInit()

})
const speech = ref()
const speak = (info: any) => {
  speech.value.cancel()
  speech.value.speak({text: info,
    listeners: {
      onend: () => {
        speech.value.cancel()
      },
    }}).then(() => {
    Message.success('语音播放完成')

  })

}
const speechInit = () => {
  speech.value = new Speech();
  speech.value.setLanguage('zh-CN');
  speech.value.init().then(() => {
  })
}
</script>
<style scoped>

</style>
