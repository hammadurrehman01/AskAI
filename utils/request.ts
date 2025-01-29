import { Message } from '@arco-design/web-vue'
const fetch = (url: string, options?: any): Promise<any>  => {
    const token = useCookie("token");
    const headers = { // headers信息
        'Authorization' : `Bearer ${token.value}`,
    }
    const { public: { baseUrl } } = useRuntimeConfig()
    const reqUrl = window.APP_CONFIG.baseUrl + url

    return new Promise(async (resolve, reject) => {
        useFetch(reqUrl, { ...options, headers }).then(({ data,error }: any) => {
            const value = data.value
            if (!data._rawValue) {
                // 这里处理错误回调
                if (error.value.data.message=='检测到多端登录，请重新登录'){
                    const token = useCookie("token");
                    token.value = ''
                    let router = useRouter();
                    router.push('/login')
                }
                error.value && Message.error(error.value.data.message)
                reject(value)
            }else if(data._rawValue.type=="application/pdf"){
                resolve(ref(data))
            } else if (data._rawValue.status !== 200 && data._rawValue.status !== 201) {
                Message.error(data._rawValue.message)
            } else {
                resolve(ref(data))
            }
        }).catch((err: any) => {
            reject(err)
        })
    })
}

export default new class Http {

    get(url: string, params?: any): Promise<any> {
        return fetch(url, { method: 'get', params })
    }

    post(url: string, params?: any): Promise<any>  {
        return fetch(url, { method: 'post', params })
    }


    put(url: string, body?: any): Promise<any>  {
        return fetch(url, { method: 'put', body })
    }

    delete(url: string, body?: any): Promise<any>  {
        return fetch(url, { method: 'delete', body })
    }


}
