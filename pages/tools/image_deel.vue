<template>
  <main class="main overflow-auto ai-image-deel">
    <div class="p-4">
      <div class="code-title mb-3 inline-block">
        <h2>
          OCR识图 | Image Deel
        </h2>
        <span>识别图片中的文字信息</span>
      </div>

    </div>
    <div class="px-4">
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
                  <h4 class="mb-0">上传图片</h4>
                </div>
                <a-upload
                    class="avatar-uploader h-full items-center d-flex justify-center"
                    :action="actions"
                    :show-file-list="false"
                    :headers="{'Authorization': 'Bearer ' + token}"
                    @before-upload="beforeUpload"
                    @success="picSuccess"
                    draggable
                >
                  <template #upload-button>
                    <div
                    class="h-full"
                    >
                      <div
                          class=" h-full arco-upload-list-picture-hight w-100 custom-upload-avatar"
                          v-if="imageUrl"
                      >

                        <div class="upload-file h-full">
                          <div class="flex flex-col upload-file__upload w-full h-full upload-file__upload--white gda-dropdown-trigger"
                          >
                            <img :src="imageUrl" alt="">
                            <div class="flex items-center">
                              <svg t="1711808974626" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="13363" width="24" height="24"><path d="M387.072 611.328L236.6464 460.8 128 569.3952l259.072 259.1232 515.1232-515.072L793.6 204.8z" fill="#07A35A" p-id="13364"></path></svg>

                              上传成功
                            </div>
                          </div>
                        </div>

                        <div class="arco-upload-list-picture-mask" >
                          <IconPlus />
                        </div>

                      </div>
                      <div class="upload-file" v-else>
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
                          <div class="flex">上传图片文件，仅支持PNG/JPG格式</div>
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
              转换文字
            </a-button>
            <a-button type="primary" status="danger" @click="deletePic" class="w-100"  v-if="imageUrl">
              <template #icon>
                <icon-delete  />
              </template>
              删除文件
            </a-button>

          </a-card>

        </a-col>

        <a-col :xs="24" :lg="12">
          <div class="code-right-image shadow-sm relative border bg-white">
            <div class="code-head-model p-2 border-bottom border-gray-500 flex justify-between">
              <h4 class="mb-0">转换结果</h4>
            </div>
            <div class="p-2" v-if="last_content">
              <pre class="code-content" v-html="last_content"></pre>
            </div>
            <div class="flex flex-col items-center justify-content-center py-40" v-else>
              <div class="animate_container ">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
              </div>
              <div class="mt-5 font-18 font-bold">我可以识别图片文件哟~</div>
            </div>
          </div>

        </a-col>
      </a-row>
    </div>
    
    <Login :login_dialog="login_dialog" @handleCancel="handleCancel"/>
  </main>

</template>


<script setup lang="ts">
import {useCounter} from "~/store/counter";
import { Message } from "@arco-design/web-vue";
import {ref} from "vue";

const counter = useCounter()
useHead({
  title: '图片COR解析 - '+counter.setting.title,
  meta: [
    { name: 'description', content: counter.setting.description},
    { name: 'keywords', content: counter.setting.keywords}
  ]
})
const login_dialog = ref(false)
const login_dialog_click = () => {
  login_dialog.value = true
}
const handleCancel = () => {
  login_dialog.value = false
}

const token = useCookie('token')

const actions = counter.setting.APP_URL + '/api/upload_miji'

const imageUrl = ref('')
const deletePic = () => {
  imageUrl.value = ''
}
const beforeUpload = (file:any) => {
  // png jpg jpeg
  const isJPG = file.type === "image/jpeg";
  const isPNG = file.type === "image/png";

  if (!isJPG && !isPNG) {
    Message.error('仅支持png jpg 格式!')
    return false
  }
  const isLt2M = file.size / 1024 / 1024 < 15;


  if (!isLt2M) {
    Message.error('上传图片大小不能超过 15MB!')
    return false
  }
  return true
};
const send_loading = ref(false)
const picSuccess = (currentFile:any) => {
  // 获取currentFile里的response的data值
  if (currentFile.response.status != 200) {
    Message.error('上传失败!')
    return
  }
  Message.success('上传成功!')
  imageUrl.value = currentFile.response.data;
};
const last_content = ref('')
const submitForm = () => {
  if (!imageUrl) {
    Message.error('请上传文件!')
    return
  }
  send_loading.value = true
  ocr_images({
    file: imageUrl
  }).then(res => {
    send_loading.value = false
    Message.success('转换成功!')
    last_content.value = res._rawValue.data
  }).catch(err => {
    send_loading.value = false
    Message.error('转换失败!')
  })
}
</script>


<style scoped>

</style>
