<template>
    <a-modal class="msgbox" v-model:visible="dialogFormVisible" title="充值中心">

        <a-tabs
            v-model="activeName"
            :default-active-key="activeName"
            class="demo-tabs"
            type="capsule"
            @tab-click="handleClick"
        >
            <a-tab-pane :title="'充值'+counter.setting.money_name_set" key="first" v-if="counter.setting.pay_wechat_open==1 || counter.setting.pay_alipay_open==1 || counter.setting.yzf_open==1">
                <a-spin :loading="qr_load">
                    <div class="qr_fing relative">
                        <div class="absolute pay_over" v-if="qr_show && pay_now_type!='paying'">
                            <h4 class="text-white" v-if="pay_now_type=='success'">
                                <p class="text-green-400 text-center">
                                    <icon-check />
                                </p>
                                支付成功
                            </h4>
                            <h4 class="text-white" v-else-if="pay_now_type=='time_out'">
                                <p class="text-red-400 text-center">
                                    <icon-close />
                                </p>
                                超时未支付
                            </h4>
                        </div>
                        <qrcode-vue v-if="qr_show" :value="pay_scan" size="240"
                                    class="mt-2 mb-2 m-auto d-sm-block">

                        </qrcode-vue>
                        <h4 class="text-center time_in" v-if="qr_show">
                            「<a-countdown
                            :value="Date.now() + 5 * 60 * 1000"
                            format="HH:mm:ss"
                            :now="Date.now()"
                            :start="start"
                            @finish="handleFinish"
                        />」
                        </h4>
                    </div>
                </a-spin>

                <a-form :model="form">
                    <a-form-item label="充值">
                        <a-input-number :step=0.01  v-model="form.amount" autocomplete="off" :precision="2" :min="parseFloat(counter.setting.min_recharge)" placeholder="请输入充值金额" />
                    </a-form-item>
                    <a-form-item label="支付方式">
                        <a-radio-group v-model="form.pay_type">
                            <a-radio v-if="counter.setting.pay_wechat_open==1"  value="wechat">微信
                            </a-radio>
                            <a-radio v-if="counter.setting.pay_alipay_open==1"  value="alipay">支付宝
                            </a-radio>
                          <a-radio v-if="counter.setting.yzf_open==1 && counter.setting.yzf_wechat_open=='1'" value="yzf_wechat">微信
                          </a-radio>
                          <a-radio v-if="counter.setting.yzf_open==1 && counter.setting.yzf_alipay_open=='1'" value="yzf_alipay">支付宝
                          </a-radio>
                        </a-radio-group>
                    </a-form-item>

                </a-form>

            </a-tab-pane>
          <a-tab-pane title="次数包" key="third">
            <a-form :model="form">
              <a-form-item label="购买">
                <a-radio-group @change="changeLimitRadio" v-model="form.limit_bag_id">
                  <template v-for="(item,index) in limit_list" :key="index">
                    <a-radio  :value="item.id" class="w-40">
                      <template #radio="{ checked }">
                        <a-space
                            align="start"
                            class="custom-radio-card"
                            :class="{ 'custom-radio-card-checked': checked }"
                        >
                          <div className="custom-radio-card-mask">
                            <div className="custom-radio-card-mask-dot" />
                          </div>
                          <div>
                            <div className="custom-radio-card-title mt-2">
                              {{ item.title }}
                            </div>
                            <div>
                              <p>问答:{{item.qs}}</p>
                              绘画:{{item.draw}}
                            </div>

                            <a-typography-text type="secondary">
                              ￥{{ item.cost }}
                            </a-typography-text>
                          </div>
                        </a-space>
                      </template>
                    </a-radio>

                  </template>
                </a-radio-group>              </a-form-item>
              <a-form-item label="支付方式">
                <a-radio-group v-model="form.pay_type">
                  <a-radio value="balance">{{counter.setting.money_name_set}}</a-radio>
                </a-radio-group>
              </a-form-item>

            </a-form>

          </a-tab-pane>
            <a-tab-pane title="开通VIP" key="second">
                <a-spin :loading="qr_load">
                    <div class="qr_fing relative">
                        <div class="absolute pay_over" v-if="qr_show && pay_now_type!='paying'">
                            <h4 class="text-white" v-if="pay_now_type=='success'">
                                <p class="text-green-400 text-center">
                                    <icon-check />
                                </p>
                                支付成功
                            </h4>
                            <h4 class="text-white" v-else-if="pay_now_type=='time_out'">
                                <p class="text-red-400 text-center">
                                    <icon-close />
                                </p>
                                超时未支付
                            </h4>
                        </div>
                        <qrcode-vue v-if="qr_show" :value="pay_scan" size="240"
                                    class="mt-2 mb-2 m-auto d-sm-block">

                        </qrcode-vue>
                        <h4 class="text-center time_in" v-if="qr_show">
                            「<a-countdown
                            :value="Date.now() + 5 * 60 * 1000"
                            format="HH:mm:ss"
                            :now="Date.now()"
                            :start="start"
                            @finish="handleFinish"
                        />」
                        </h4>
                    </div>
                </a-spin>

                <a-form :model="form">
                    <a-form-item label="购买会员">
                        <a-radio-group @change="changeRadio" v-model="form.vip_type">
                            <template v-for="(item,index) in vip_list" :key="index">
                                <a-radio  :value="item.id" class="w-40">
                                    <template #radio="{ checked }">
                                        <a-space
                                            align="start"
                                            class="custom-radio-card"
                                            :class="{ 'custom-radio-card-checked': checked }"
                                        >
                                            <div className="custom-radio-card-mask">
                                                <div className="custom-radio-card-mask-dot" />
                                            </div>
                                            <div>
                                                <div>
                                                    {{ item.end_time }} 天
                                                </div>
                                                <div className="custom-radio-card-title mt-2">
                                                    {{ item.title }}
                                                </div>
                                                <div>
                                                    <p>{{check_vip_type(item.type)}}问答:{{item.limit_send}}</p>
                                                  {{check_vip_type(item.type)}}绘画:{{item.limit_draw}}
                                                </div>

                                                <a-typography-text type="secondary">
                                                  <div v-if="item.discount_price">
                                                    <del>￥{{ item.pay_amount }}</del> ￥ {{item.discount_price}}
                                                  </div>
                                                  <div v-else>
                                                    ￥{{ item.pay_amount }}
                                                  </div>
                                                </a-typography-text>
                                            </div>
                                        </a-space>
                                    </template>
                                </a-radio>

                            </template>
                        </a-radio-group>
                    </a-form-item>
                    <a-form-item label="支付方式">
                        <a-radio-group v-model="form.pay_type">
                            <a-radio   v-if="counter.setting.pay_wechat_open==1" value="wechat">微信</a-radio>
                            <a-radio   v-if="counter.setting.pay_alipay_open==1" value="alipay">支付宝</a-radio>
                          <a-radio v-if="counter.setting.yzf_open==1 && counter.setting.yzf_wechat_open=='1'" value="yzf_wechat">微信
                          </a-radio>
                          <a-radio v-if="counter.setting.yzf_open==1 && counter.setting.yzf_alipay_open=='1'" value="yzf_alipay">支付宝
                          </a-radio>
                            <a-radio   value="balance">{{counter.setting.money_name_set}}</a-radio>
                        </a-radio-group>
                    </a-form-item>
                    <a-form-item label="优惠卷">
                        <a-input v-model="form.kami" placeholder="请输入优惠卷码"></a-input>
                    </a-form-item>
                </a-form>
            </a-tab-pane>
        </a-tabs>
        <template #footer>
            <a-space class="dialog-footer">
                <a-button type="primary" @click="is_vipor_charge()" :loading="charge_loading">
                    立即充值
                </a-button>
                <a-button type="primary" plain @click="dialogm()">
                    完成支付
                </a-button>
            </a-space>
        </template>
    </a-modal>
</template>

<script setup lang="ts">
import {reactive, ref} from "vue";
import QrcodeVue from "qrcode.vue";

import {useCounter} from '~/store/counter'
import {Message} from "@arco-design/web-vue";
import {IconCheck, IconClose} from "@arco-design/web-vue/es/icon";
import {buy_limit_bags, charge_limit_bag, yzf_pay} from "~/utils/api";

const counter = useCounter()
const props = defineProps({
    dialogFormVisible: {
        type: Boolean,
        default: false
    },
})
const handleClick = (tab:any) => {
    activeName.value = tab
}
const activeName = ref(counter.setting.pay_wechat_open==1 || counter.setting.pay_alipay_open==1?'first':'second')

const pay_now_type = ref('paying')
const start = ref(false)
const handleFinish = () => {
    pay_now_type.value = 'time_out'
};
const emit = defineEmits(['handleCancels']) // 定义emit
const dialogFormVisible = computed({
    get() {
        if (props.dialogFormVisible!=false){
            get_vip()
        }
        return props.dialogFormVisible
    },
    set(val) {

        emit('handleCancels', val)
    }
})
const handleCancels = () => {
    dialogFormVisible.value = false
}
const qr_load = ref(false)
const pay_scan = ref('')
const charge_loading = ref(false)
const qr_show = ref(false)
const form = reactive({
    amount:counter.setting.min_recharge?parseInt(counter.setting.min_recharge):1,
    pay_type:counter.setting.pay_wechat_open == 1 ? 'wechat' : (counter.setting.pay_alipay_open == 1 ? 'alipay' : 'balance'),
    vip_type:1,
    kami:'',
    limit_bag_id:'',
})
watch(() => form.amount, (val) => {
    if (val < counter.setting.min_recharge) {
        form.amount = counter.setting.min_recharge
    }
})

const vip_list = ref([])
const get_vip = () => {
    get_vip_show().then((res:any) => {
        vip_list.value = res._rawValue.data
        vip_ids.value = res._rawValue.data[0].id
        vip_now_money.value = res._rawValue.data[0].pay_amount
    }).catch((err:any) => {
        Message.error('获取失败')
    })
}


const vip_ids = ref('')
const vip_now_money = ref(0)
const changeRadio = (e:any) => {
    vip_list.value.forEach((item:any) => {
        if (item.id == e) {
            vip_ids.value = item.id
            vip_now_money.value = item.pay_amount
        }
    })
}
const check_vip_type = (type: string) => {
  if (type == 'free') {
    return '免费版'
  } else if (type == 'day') {
    return '每日'
  } else if (type == 'month') {
    return '每月'
  } else if (type == 'total') {
    return '有效期内'
  } else {
    return '免费版'
  }
}
const send_charge = () => {
    if (form.amount == 0) {
        Message.error('请输入充值金额')
        return
    }
    charge_loading.value = true
    qr_load.value = true
    qr_show.value = true
    const isMobile = /Mobile|Android|iOS/.test(navigator.userAgent);

    if (form.pay_type == 'alipay') {
        alipay({
            amount:form.amount,
            type:'charge',
            is_mobile:isMobile&& counter.setting.alipay_wap_open == '1'?1:0
        }).then((res:any) => {
            if (isMobile && counter.setting.alipay_wap_open == '1') {
                window.location.href = res._rawValue.pay_url
            }else{
                start.value = true
                pay_now_type.value = 'paying'
                pay_scan.value = res._rawValue.qr_code
                time_check_status.value = setInterval(() => {
                    check_order_status({
                        order_id:res._rawValue.order_id
                    }).then((res:any)=>{
                        if(res._rawValue.status == 200){
                            clearInterval(time_check_status.value)
                            pay_now_type.value = 'success'
                            Message.success('充值成功')
                            start.value = false
                        }
                    }).catch((err:any)=>{
                        clearInterval(time_check_status.value)
                        console.log(err)
                    })
                }, 5000)
            }

            charge_loading.value = false
            qr_load.value = false
        }).catch((err:any) => {
            charge_loading.value = false
            qr_load.value = false
            qr_show.value = false
            console.log(err.message)
        })
    }else if (form.pay_type == 'wechat'){
        wechat({
            amount:form.amount,
            type:'charge',
            is_mobile:isMobile&& counter.setting.wechat_wap_open == '1'?1:0
        }).then((res:any) => {
            if (isMobile && counter.setting.wechat_wap_open == '1') {
                window.location.href = res._rawValue.pay_url
            }else{
                start.value = true
                pay_now_type.value = 'paying'
                pay_scan.value = res._rawValue.qr_code
                time_check_status.value = setInterval(() => {
                    check_order_status({
                        order_id:res._rawValue.order_id
                    }).then((res:any)=>{
                        if(res._rawValue.status == 200){
                            clearInterval(time_check_status.value)
                            pay_now_type.value = 'success'
                            Message.success('充值成功')
                            start.value = false
                        }
                    }).catch((err:any)=>{
                        clearInterval(time_check_status.value)
                        console.log(err)
                    })
                }, 5000)
            }
            charge_loading.value = false
            qr_load.value = false
        }).catch((err:any) => {
            charge_loading.value = false
            qr_load.value = false
            qr_show.value = false

            console.log(err.message)
        })
    }else if (form.pay_type == 'yzf_alipay'){
        qr_load.value = false
        qr_show.value = false
        yzf_pay({
            amount: form.amount,
            type: 'charge',
            pay_type:'alipay',
        }).then((res: any) => {
            const form = document.createElement('div');
            form.innerHTML = res._rawValue.data;
            document.body.appendChild(form);
            document.getElementById("dopay")?.submit();
            charge_loading.value = false
            qr_load.value = false
        }).catch((err: any) => {
            charge_loading.value = false
            qr_load.value = false
            qr_show.value = false

            console.log(err.message)
        })
    }else if (form.pay_type == 'yzf_wechat'){
        qr_load.value = false
        qr_show.value = false
        yzf_pay({
            amount: form.amount,
            type: 'charge',
            pay_type:'wxpay',
        }).then((res: any) => {
            const form = document.createElement('div');
            form.innerHTML = res._rawValue.data;
            document.body.appendChild(form);
            document.getElementById("dopay")?.submit();
            charge_loading.value = false
            qr_load.value = false
        }).catch((err: any) => {
            charge_loading.value = false
            qr_load.value = false
            qr_show.value = false

            console.log(err.message)
        })
    }

}
const time_check_status = ref('') as any
const up_to_vip = () => {
    if (vip_ids.value == '') {
        Message.error('请选择VIP套餐')
        return
    }
    charge_loading.value = true
    qr_load.value = true
    qr_show.value = true
    const isMobile = /Mobile|Android|iOS/.test(navigator.userAgent);

    if (form.pay_type == 'alipay') {
        alipay({
            v_id:vip_ids.value,
            amount:vip_now_money.value,
            type:'vip',
            coupon:form.kami,
            is_mobile:isMobile&& counter.setting.alipay_wap_open == '1'?1:0
        }).then((res:any) => {
            if (isMobile && counter.setting.alipay_wap_open == '1') {
                window.location.href = res._rawValue.pay_url
            }else{
                start.value = true
                pay_now_type.value = 'paying'
                pay_scan.value = res._rawValue.qr_code
                time_check_status.value = setInterval(() => {
                    check_order_status({
                        order_id:res._rawValue.order_id
                    }).then((res:any)=>{
                        if(res._rawValue.status == 200){
                            clearInterval(time_check_status.value)
                            pay_now_type.value = 'success'
                            Message.success('升级VIP成功')
                            start.value = false
                        }
                    }).catch((err:any)=>{
                        clearInterval(time_check_status.value)
                        console.log(err)
                    })
                }, 5000)
            }
            charge_loading.value = false
            qr_load.value = false
        }).catch((err:any) => {
            charge_loading.value = false
            qr_load.value = false
            qr_show.value = false
            console.log(err.message)
        })
    }else if (form.pay_type == 'wechat'){
        wechat({
            v_id:vip_ids.value,
            amount:vip_now_money.value,
            type:'vip',
            coupon:form.kami,
            is_mobile:isMobile&& counter.setting.wechat_wap_open == '1'?1:0
        }).then((res:any) => {
            if (isMobile && counter.setting.wechat_wap_open == '1') {
                window.location.href = res._rawValue.pay_url
            }else{
                start.value = true
                pay_now_type.value = 'paying'
                pay_scan.value = res._rawValue.qr_code
                time_check_status.value = setInterval(() => {
                    check_order_status({
                        order_id:res._rawValue.order_id
                    }).then((res:any)=>{
                        if(res._rawValue.status == 200){
                            clearInterval(time_check_status.value)
                            pay_now_type.value = 'success'
                            Message.success('升级VIP成功')
                            start.value = false
                        }
                    }).catch((err:any)=>{
                        clearInterval(time_check_status.value)
                        console.log(err)
                    })
                }, 5000)
            }
            charge_loading.value = false
            qr_load.value = false
        }).catch((err:any) => {
            charge_loading.value = false
            qr_load.value = false
            qr_show.value = false
            console.log(err.message)
        })
    }else if (form.pay_type == 'balance'){
        qr_load.value = false
        qr_show.value = false
        buy_vip({
            v_id:vip_ids.value,
            coupon:form.kami,
        }).then((res:any) => {
            charge_loading.value = false
            Message.success(res._rawValue.message)
        }).catch((err:any) => {
            charge_loading.value = false
            qr_load.value = false
            qr_show.value = false
            console.log(err.message)
        })
    } else if (form.pay_type =='yzf_wechat'){
        qr_load.value = false
        qr_show.value = false
        yzf_pay({
            v_id: vip_ids.value,
            amount: vip_now_money.value,
            type: 'vip',
            coupon: form.kami,
            pay_type:'wxpay',
        }).then((res: any) => {
            const form = document.createElement('div');
            form.innerHTML = res._rawValue.data;
            document.body.appendChild(form);
            document.getElementById("dopay")?.submit();
            charge_loading.value = false
            qr_load.value = false
        }).catch((err: any) => {
            charge_loading.value = false
            qr_load.value = false
            qr_show.value = false
            console.log(err.message)
        })
    }else if (form.pay_type =='yzf_alipay'){
        qr_load.value = false
        qr_show.value = false
        yzf_pay({
            v_id: vip_ids.value,
            amount: vip_now_money.value,
            type: 'vip',
            coupon: form.kami,
            pay_type:'alipay',
        }).then((res: any) => {
            const form = document.createElement('div');
            form.innerHTML = res._rawValue.data;
            document.body.appendChild(form);
            document.getElementById("dopay")?.submit();
            charge_loading.value = false
            qr_load.value = false
        }).catch((err: any) => {
            charge_loading.value = false
            qr_load.value = false
            qr_show.value = false
            console.log(err.message)
        })
    }
}

const is_vipor_charge = () => {
    if (activeName.value == 'first') {
        send_charge()
    }else if (activeName.value =='second'){
        up_to_vip()
    }else{
        buy_limit_bag()
    }
}

const dialogm = ()=>{
    dialogFormVisible.value = false
}


const limit_list = ref([])
const buy_limit_bag = () => {
  charge_loading.value= true
  buy_limit_bags({
    id: form.limit_bag_id,
  }).then((res:any) => {
    Message.success(res._rawValue.message)
    charge_loading.value= false
    dialogFormVisible.value = false
  }).catch((err:any) => {
    charge_loading.value= false
    console.log(err)
  })
}
const get_limit_bag = () => {
  charge_limit_bag().then((res:any)=>{
    limit_list.value = res._rawValue.data
    form.limit_bag_id = res._rawValue.data[0]?.id
  }).catch((err:any)=>{
    console.log(err)
  })
}
get_limit_bag()
const changeLimitRadio = (e:any) => {
  form.limit_bag_id = e
}
</script>

<style scoped>

</style>
