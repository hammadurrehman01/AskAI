<template>
    <main class="main overflow-auto ai-app-product">
        <div class="w-full bg-slate-50 pb-20">
            <div class="mx-auto max-w-7xl px-4 pt-10 sm:px-6 lg:px-8">
                <div>
                    <nav class="flex" aria-label="Breadcrumb">
                        <ol role="list" class="flex items-center space-x-4">
                            <li>
                                <div>
                                    <NuxtLink class="flex items-center gap-2 text-sm text-gray-400 hover:text-gray-500"
                                              to="/ai_application">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                                             aria-hidden="true" class="h-5 w-5 flex-shrink-0">
                                            <path fill-rule="evenodd"
                                                  d="M9.293 2.293a1 1 0 011.414 0l7 7A1 1 0 0117 11h-1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-3a1 1 0 00-1-1H9a1 1 0 00-1 1v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-6H3a1 1 0 01-.707-1.707l7-7z"
                                                  clip-rule="evenodd"></path>
                                        </svg>
                                        <span class="">应用列表</span></NuxtLink>
                                </div>
                            </li>
                            <li>
                                <div class="flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                                         aria-hidden="true" class="h-5 w-5 flex-shrink-0 text-gray-400">
                                        <path fill-rule="evenodd"
                                              d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                                              clip-rule="evenodd"></path>
                                    </svg>
                                    <NuxtLink to="/users/product"
                                              class="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700"
                                              aria-current="page">创建应用
                                    </NuxtLink>
                                </div>
                            </li>
                        </ol>
                    </nav>
                    <div class="bg-slate-50 pt-10">
                        <div class="mx-auto min-h-screen max-w-xl "><h1
                            class="py-10 text-center text-2xl font-semibold text-gray-900">创建应用</h1>
                            <form class=" space-y-6">
                                <div class="bg-white px-4 py-5 shadow sm:rounded-lg sm:p-6">
                                    <div class="mt-5 space-y-6 md:col-span-2 md:mt-0">
                                        <div class="grid grid-cols-3 gap-6">
                                            <div class="col-span-3 sm:col-span-2"><label
                                                class="block text-sm font-medium leading-6 text-gray-900">图标</label>
                                                <div class="relative" data-headlessui-state="">
                                                    <button type="button" aria-expanded="false" data-headlessui-state=""
                                                            id="headlessui-popover-button-:r2f:"><span
                                                        class="inline-flex rounded-lg"><div
                                                        class="flex h-100 w-100 items-center justify-center"
                                                        aria-hidden="true">
                                                        <a-upload
                                                            class="avatar-uploader"
                                                            :action="actions"
                                                            :show-file-list="false"
                                                            :headers="{'Authorization': 'Bearer ' + token}"
                                                            @before-upload="beforeUpload"
                                                            @success="onSuccess"
                                                        >
                                                            <template #upload-button>
                                                                    <div
                                                                    >
                                                                      <div
                                                                          class="arco-upload-list-picture custom-upload-avatar"
                                                                          v-if="imageUrl"
                                                                      >
                                                                        <img :src="imageUrl"/>
                                                                        <div class="arco-upload-list-picture-mask">
                                                                          <IconEdit/>
                                                                        </div>
                                                                      </div>
                                                                      <div class="arco-upload-picture-card" v-else>
                                                                        <div class="arco-upload-picture-card-text">
                                                                          <IconPlus/>
                                                                          <div
                                                                              style="margin-top: 10px; font-weight: 600">Upload</div>
                                                                        </div>
                                                                      </div>
                                                                    </div>
                                                                  </template>
                                                      </a-upload>
                                                    </div></span></button>
                                                </div>
                                                <p class="mt-2 text-sm text-red-500"></p>
                                                <p class="mt-2 text-sm text-gray-500">仅支持PNG/JPG/GIF图片</p>
                                            </div>
                                        </div>
                                        <a-form
                                            ref="ruleFormRef"
                                            :model="ruleForm"
                                            class="demo-ruleForm"
                                            status-icon
                                        >
                                            <a-form-item :hide-label=true field="title">

                                                <div class="grid grid-cols-3 gap-6">
                                                    <div class="col-span-3 sm:col-span-2"><label
                                                        class="block text-sm font-medium leading-6 text-gray-900">应用名称</label>
                                                        <div class="mt-2 flex rounded-md shadow-sm"><a-input
                                                                                                           v-model="ruleForm.title"
                                                                                                           class="block w-full flex-1 bg-white shadow-sm"
                                                                                                           placeholder="智能翻译助手"
                                                                                                           name="name" />
                                                        </div>
                                                        <p class="mt-2 text-sm text-red-500"></p></div>
                                                </div>
                                            </a-form-item>
                                            <a-form-item :hide-label=true field="cate">
                                                <div class="grid grid-cols-3 gap-6">
                                                    <div class="col-span-3 sm:col-span-2"><label
                                                        class="block text-sm font-medium leading-6 text-gray-900">选择分类</label>
                                                        <div class="mt-2 flex">
                                                            <a-select
                                                                v-model="ruleForm.cate"
                                                                multiple
                                                                placeholder="选择分类"
                                                                style="width: 240px"
                                                            >
                                                                <a-option
                                                                    v-for="(item,index) in cate_list"
                                                                    :key="index"
                                                                    :label="item.title"
                                                                    :value="item.id"
                                                                />
                                                            </a-select>
                                                        </div>
                                                    </div>
                                                </div>

                                            </a-form-item>
                                            <a-form-item :hide-label=true field="description">
                                                <div class="grid grid-cols-1 gap-6">
                                                    <div class="col-span-6 sm:col-span-6"><label
                                                        class="block text-sm font-medium leading-6 text-gray-900">应用描述</label>
                                                        <div class="mt-2"><a-textarea :auto-size="{ minRows: 3, maxRows: 5 }"
                                                                                    v-model="ruleForm.description"
                                                                                      class="block w-full flex-1 bg-white shadow-sm"
                                                                                    placeholder="这款 App 可以将任意语言的内容，翻译成中文"
                                                                                    name="description"></a-textarea></div>
                                                        <p class="mt-2 text-sm text-red-500"></p></div>
                                                </div>
                                            </a-form-item>
                                            <a-form-item :hide-label=true field="code">
                                                <div class="grid grid-cols-3 gap-6">
                                                    <div class="col-span-3 sm:col-span-2"><label
                                                        class="block text-sm font-medium leading-6 text-gray-900">指令</label>
                                                        <div class="mt-2 flex rounded-md shadow-sm"><a-textarea :auto-size="{ minRows: 3, maxRows: 5 }"
                                                                                                              v-model="ruleForm.code"
                                                                                                              class="block w-full flex-1 bg-white shadow-sm"
                                                                                                              placeholder="你是一个翻译官，无论接下来输入什么，你都要翻译成中文。内容是："
                                                                                                              name="prompt"></a-textarea>
                                                        </div>
                                                        <p class="mt-2 text-sm text-red-500"></p>
                                                        <p class="mt-2 text-sm text-gray-500">
                                                            指令需清晰易懂，明确且有逻辑。</p></div>
                                                </div>
                                            </a-form-item>
                                            <div class="grid grid-cols-3 gap-6">
                                                <div class="col-span-3 sm:col-span-2"><label
                                                    class="block text-sm font-medium leading-6 text-gray-900">示例输入</label>
                                                    <div class="mt-2 flex rounded-md shadow-sm"><a-input
                                                                                                       v-model="test_input"
                                                                                                       class="block w-full flex-1 bg-white shadow-sm"
                                                                                                       placeholder="你会说中文吗？"
                                                                                                       name="demoInput" />
                                                    </div>
                                                    <p class="mt-2 text-sm text-red-500"></p></div>
                                            </div>

                                        </a-form>
                                    </div>
                                </div>
                                <div class="flex justify-end gap-3 px-4 sm:px-0">
                                    <a-button
                                        @click="test_app()"
                                        :loading="send_loading"
                                        size="large"
                                        type="info"
                                        class="group inline-flex items-center justify-center rounded-full py-2 px-4 text-sm font-semibold focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 bg-slate-900 text-white hover:bg-slate-700 hover:text-slate-100 active:bg-slate-800 active:text-slate-300 focus-visible:outline-slate-900"
                                    >测试
                                    </a-button>
                                    <a-button
                                        @click="create_app()"
                                        class="group inline-flex items-center justify-center rounded-full py-2 px-4 text-sm font-semibold focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 bg-blue-600 text-white hover:text-slate-100 hover:bg-blue-500 active:bg-blue-800 active:text-blue-100 focus-visible:outline-blue-600"
                                        size="large"
                                        type="primary">创建
                                    </a-button>
                                </div>
                                <div class="my-10 w-full space-y-10"></div>
                                <div class="bg-white px-4 py-5 shadow sm:rounded-lg sm:p-6" v-if="last_content"
                                     v-html="renderMarkdown(last_content).replace(/\\n/g, '\n')">

                                </div>
                            </form>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>

<script setup lang="ts">
import {ref, reactive} from "vue";
import {Message} from '@arco-design/web-vue'

const token = useCookie('token')
import hljs from 'highlight.js'
import markdownIt from 'markdown-it'

import {useCounter} from '~/store/counter'
import {get_app_cate} from "~/utils/api";

const counter = useCounter()
const actions = counter.setting.APP_URL + '/api/upload_icon'


import {IconEdit, IconPlus} from '@arco-design/web-vue/es/icon';

const imageUrl = ref('');
const ruleFormRef = ref()

const renderMarkdown = (markdown: any) => {
    return markdownIt({
        highlight: (str: string, lang: string) => {
            if (lang && hljs.getLanguage(lang)) {
                try {
                    return `<pre class="hljs"><code>${hljs.highlight(str, {
                        language: lang,
                        ignoreIllegals: true
                    }).value}</code></pre>`
                } catch (__) {
                }
            }

            return `<pre class="hljs"><code>${markdownIt().utils.escapeHtml(str)}</code></pre>`
        },
        breaks: true // 添加breaks插件
    }).render(markdown)
}


const test_input = ref('')
const ruleForm = reactive({
    title: '',
    description: '',
    code: '',
    cate: '',
})

const rules = reactive({
    title: [
        {required: true, message: '请输入应用名称', trigger: 'blur'},
        {min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur'},
    ],
    description: [
        {min: 2, max: 300, message: '长度在 2 到 300 个字符', trigger: 'blur'},
    ],
    code: [
        {required: true, message: '请输入指令', trigger: 'blur'},
        {min: 2, max: 300, message: '长度在 2 到 300 个字符', trigger: 'blur'},
    ],
    cate: [
        {required: true, message: '请选择分类', trigger: 'blur'},
    ],
})
const last_content = ref('')
const cate_list = ref([])
const get_all_cate = () => {
    get_app_cate().then((res: any) => {
        cate_list.value = res._rawValue.data
    }).catch((err: any) => {
        console.log(err)
    })
}
get_all_cate()

const beforeUpload = (file) => {
    const isJPG = file.type === 'image/jpeg';
    const isPNG = file.type === 'image/png';
    const isGIF = file.type === 'image/gif';
    const isLt2M = file.size / 1024 / 1024 < 5;

    if (!isJPG && !isPNG && !isGIF) {
        Message.error('上传图片只能是 JPG/PNG/GIF 格式!')
        return false
    }
    if (!isLt2M) {
        Message.error('上传图片大小不能超过 5MB!')
        return false
    }
    return true
};
const onSuccess = (currentFile) => {
    // 获取currentFile里的response的data值
    if (currentFile.response.status != 200) {
        Message.error('上传失败!')
        return
    }
    Message.success('上传成功!')
    imageUrl.value = currentFile.response.data;
    console.log(imageUrl.value)
};
const create_app = () => {

    if (!imageUrl.value) {
        Message.error('请上传图标!')
        return
    }
    if (!ruleForm.title) {
        Message.error('请输入应用名称!')
        return
    }
    if (!ruleForm.description) {
        Message.error('请输入应用描述!')
        return
    }
    if (!ruleForm.code) {
        Message.error('请输入指令!')
        return
    }
    if (!ruleForm.cate) {
        Message.error('请选择分类!')
        return
    }
    if (!test_input.value) {
        Message.error('请输入示例输入')
        return false
    }


    create_apps({
        title: ruleForm.title,
        description: ruleForm.description,
        code: ruleForm.code,
        icon: imageUrl.value,
        test_input: test_input.value,
        cate: JSON.stringify(ruleForm.cate),
    }).then((res: any) => {
        Message.success(res._rawValue.message)
        imageUrl.value = ''
        ruleFormRef.value.resetFields()
        test_input.value = ''
    }).catch((err: any) => {
        console.log(err)
    })

}

const change_send = ref(1)
const {public: {baseUrl}} = useRuntimeConfig()
const headers = {
    'Authorization': `Bearer ${token.value}`,
    'Accept': 'text/event-stream',
}
const streams = ref()
const send_loading = ref(false)

const test_app = async () => {
    if (!ruleForm.code) {
        Message.error('请输入指令')
        return false
    }
    if (!test_input.value) {
        Message.error('请输入示例输入')
        return false
    }


    last_content.value = ''
    send_loading.value = true
    const res = await fetch(`/api/test_app`, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({
            code: ruleForm.code,
            test_input: test_input.value,
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
    const stream = res.body?.getReader();
    const onData = ({value}: { value: Uint8Array }) => {
        let result = new TextDecoder().decode(value);
        // console.log(result);
        let arr = result.split('\n\n').map(str => str.replace(/\n/g, ''));
        let new_arr: any[] = [];
        // console.log(arr)
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].slice(-2) == ']}' && arr[i].startsWith('data:')) {
                new_arr.push(JSON.parse(arr[i].replace('data:', '')));
            } else if (arr[i].startsWith('data:') && arr[i].slice(-2) != ']}') {
                streams.value = arr[i].replace('data:', '');
            } else if (arr[i].slice(-2) == ']}' && arr[i].startsWith('data:') == false) {
                // 与streams.value拼接成一个字符串
                let str = streams.value += arr[i]
                new_arr.push(JSON.parse(str.replace('data:', '')))
                streams.value = ''
            } else {
                if (arr[i].includes('"error"')) {
                    last_content.value = JSON.parse(arr[i]).error.message
                }
                streams.value = ''
            }

        }


        // console.log(new_arr)
        for (let i = 0; i < new_arr.length; i++) {
            setTimeout(() => {
                if (new_arr[i].choices[0].delta.content) {
                    last_content.value += new_arr[i].choices[0].delta.content
                }
            }, 100)

        }

    };


    const read = async () => {
        const result = await stream?.read();
        if (result?.done) {
            send_loading.value = false
            console.log('done')
        } else {
            onData(result!);
            await read();
        }
    };
    await read();
}

</script>

<style>
.ai-app-product textarea:focus-visible {
    outline: 2px solid #409eff;
    outline-offset: 2px;
}

.ai-app-product .el-form-item__content {
    display: inline-block;
}

.ai-app-product .avatar-uploader .el-upload {
    display: flex;
    width: 120px;
    height: 120px;
}
</style>
