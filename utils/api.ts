import Http from '@/utils/request'

export const send = (params: any) => {
    return Http.post('send_bot', params)
}



export const logins = (params: any) => {
    return Http.post('web_login', params)
}
export const register = (params: any) => {
    return Http.post('register', params)
}

export const get_message = (params: any) => {
    return Http.post('get_message',params)
}

export const get_scene_f = (params: any) => {
    return Http.post('get_scene_f',params)
}
export const c_message = (params: any) => {
    return Http.post('check_message', params)
}

export const searchs = (params: any) => {
    return Http.post('searchs', params)
}

export const del_msg = (params: any) => {
    return Http.post('del_msg', params)
}

export const update_user = (params: any) => {
    return Http.post('update_user', params)
}

export const get_user = () => {
    return Http.post('get_user')
}
export const change_password = (params: any) => {
    return Http.post('change_password', params)
}

export const send_email = (params: any) => {
    return Http.post('send_email', params)
}

export const reset_password = (params: any) => {
    return Http.post('reset_password', params)
}
export const reset_password_phone = (params: any) => {
    return Http.post('reset_password_phone', params)
}
export const alipay = (params: any) => {
    return Http.post('alipay', params)
}


export const wechat = (params: any) => {
    return Http.post('wechat', params)
}

export const get_vip_show = () => {
    return Http.post('get_vip_level')
}

export const ai_draw_openai = (params:any) => {
    return Http.post('ai_draw_openai',params)
}

export const ai_draw_dream = (params:any) => {
    return Http.post('ai_draw_dream',params)
}
export const get_me_draw = (params:any) => {
    return Http.post('get_me_draw',params)
}

export const get_public_draw = (params:any) => {
    return Http.post('get_public_draw',params)
}

export const send_public = (params:any) => {
    return Http.post('send_public',params)
}

export const del_me_d = (params:any) => {
    return Http.post('del_me_draw',params)
}




export const invite_code_send = () => {
    return Http.post('invite_code')
}

export const kami_send = (params:any) => {
    return Http.post('kami_check',params)
}


export const get_nav_config = () => {
    return Http.post('get_setting')
}

export const send_phone_code = (params:any) => {
    return Http.post('send_sms',params)
}

export const change_phone = (params:any) => {
    return Http.post('change_phone',params)
}

export const change_email = (params:any) => {
    return Http.post('change_email',params)
}


export const get_all_app = (params:any) => {
    return Http.post('get_all_app',params)
}

export const search_app = (params:any) => {
    return Http.post('search_app',params)
}

export const app_like = (params:any) => {
    return Http.post('app_like',params)
}

export const create_apps = (params:any) => {
    return Http.post('create_app',params)
}

export const get_appid = (params:any) => {
    return Http.post('get_appid',params)
}

export const get_normal = () => {
    return Http.post('get_normal')
}

export const get_app_qs = () => {
    return Http.post('get_app_qs')
}

export const buy_vip = (params:any) => {
    return Http.post('buy_vip',params)
}

export const scene_searchs = (params:any) => {
    return Http.post('scene_searchs',params)
}

export const midj_ai_draw = (params:any) => {
    return Http.post('midjourney_ai',params)
}

export const c_session_name = (params:any) => {
    return Http.post('c_session_name',params)
}

export const del_all = () => {
    return Http.post('del_all')
}

export const get_ai_cate = (params:any) => {
    return Http.post('get_ai_cate',params)
}
export const get_all_aicate = () => {
    return Http.post('get_all_aicate')
}

export const signin_me = () => {
    return Http.post('signin_me')
}

export const get_signin_info = () => {
    return Http.post('get_signin_info')
}

export const up_midj_index = (params:any) => {
    return Http.post('up_midjourney',params)
}

export const v_midj_index = (params:any) => {
    return Http.post('vi_midjourney',params)
}

export const chat_online = (params:any) => {
    return Http.post('online',params)
}

export const signin_check = () => {
    return Http.post('signin_check')
}

export const get_app_cate = () => {
    return Http.post('get_app_cate')
}


export const get_agreement_f = () => {
    return Http.post('get_agreement_f')
}
export const get_user_limit = () => {
    return Http.post('get_user_limit')
}

export const ai_collect = (params:any) => {
    return Http.post('ai_collect',params)
}


export const get_me_all_app = (params:any) => {
    return Http.post('get_me_all_app',params)
}

export const midj_ai_check = (params:any) => {
    return Http.post('midjourney_ai_get',params)
}

export const get_siwei_limit = () => {
    return Http.post('get_now_money')
}

export const send_siwei_html = () => {
    return Http.post('send_siwei_html')
}
export const weixin_login = () => {
    return Http.post('socials/wechat')
}

export const get_avatar_preset = () => {
    return Http.post('get_avatar_preset')
}

export const c_avatar_session = (params:any) => {
    return Http.post('c_avatar_session',params)
}
export const wechat_login_url = (params:any) => {
    return Http.post('socials/wechat',params)
}


export const get_consum_limit = () => {
    return Http.post('get_consum_limit')
}

export const get_consum_limit_for = (params:any) => {
    return Http.post('get_consum_limit_for',params)
}

export const get_draw_buy = (params:any) => {
    return Http.post('get_draw_buy',params)
}

export const wechat_login_status = (params:any) => {
    return Http.post('wechat_login_status',params)
}

export const wechat_bind_status = (params:any) => {
    return Http.post('wechat_bind_status',params)
}

export const generatePdf = (params:any) => {
    return Http.post('generatePdf',params)
}

export const gptpdf_generate = (params:any) => {
    return Http.post('gptpdf_generate',params)
}

export const pdf_message = (params:any) => {
    return Http.post('pdf_message',params)
}

export const pdf_message_all = (params:any) => {
    return Http.post('pdf_message_all',params)
}
export const pdf_message_search = (params:any) => {
    return Http.post('pdf_message_search',params)
}

export const pdf_message_check = (params:any) => {
    return Http.post('pdf_message_check',params)
}


export const pdf_listdel_all = () => {
    return Http.post('pdf_listdel_all')
}
export const pdf_scene = () => {
    return Http.post('pdf_scene')
}

export const get_pdf_limit = () => {
    return Http.post('get_pdf_limit')
}

export const pdf_message_delete = (params:any) => {
    return Http.post('pdf_message_delete',params)
}
export const c_pdf_title = (params:any) => {
    return Http.post('c_pdf_title',params)
}

export const get_nowContent = () => {
    return Http.post('get_nowContent')
}

export const get_allContent = () => {
    return Http.post('get_allContent')
}

export const save_content = (params:any) => {
    return Http.post('save_content',params)
}

export const get_content = (params:any) => {
    return Http.post('get_content',params)
}

export const delete_content = (params:any) => {
    return Http.post('delete_content',params)
}

export const rename_content = (params:any) => {
    return Http.post('rename_content',params)
}

export const delete_message = (params:any) => {
    return Http.post('delete_message',params)
}

export const draw_cate_f = () => {
    return Http.post('draw_cate')
}

export const draw_cate_me = (params:any) => {
    return Http.post('draw_cate_me',params)
}
export const draw_star = (params:any) => {
    return Http.post('draw_star',params)
}

export const get_draw_like = (params:any) => {
    return Http.post('get_draw_like',params)
}

export const check_order_status = (params:any) => {
    return Http.post('check_order_status',params)
}
export const get_message_keda = (params:any) => {
    return Http.post('get_message_keda',params)
}

export const fly_message = (params:any) => {
    return Http.post('fly_message',params)
}
export const del_fly_msg = (params:any) => {
    return Http.post('del_fly_msg',params)
}

export const del_all_fly = () => {
    return Http.post('del_all_fly')
}

export const delete_message_fly = (params:any) => {
    return Http.post('delete_message_fly',params)
}

export const get_carsoul_f = () => {
    return Http.post('get_carsoul_f')
}

export const get_curse = () => {
    return Http.post('get_curse')
}

export const vary_midj_index = (params:any) => {
    return Http.post('vary_midj_index',params)
}

export const region_midj_index = (params:any) => {
    return Http.post('region_midj_index',params)
}

export const zoom_midj_index = (params:any) => {
    return Http.post('zoom_midj_index',params)
}

export const get_index_draw = (params:any) => {
    return Http.post('get_index_draw',params)
}

export const del_draw_nofinish = () => {
    return Http.post('del_draw_nofinish')
}

export const get_me_show_draw = (params:any) => {
    return Http.post('get_me_show_draw',params)
}
export const get_member_id = (params:any) => {
    return Http.post('get_member_id',params)
}

export const follow_user_api = (params:any) => {
    return Http.post('follow_user_api',params)
}

export const generate_cap = (params:any) => {
    return Http.post('generate_cap',params)
}
export const add_chat = () => {
    return Http.post('add_chat')
}

export const now_user_task = () => {
    return Http.post('now_user_task')
}

export const complete_user_task = (params:any) => {
    return Http.post('complete_user_task',params)
}

export const yzf_pay = (params:any) => {
    return Http.post('yzf_pay',params)
}

export const baidu_draw_go = (params:any) => {
    return Http.post('baidu_draw_go',params)
}

export const baidu_draw_info = (params:any) => {
    return Http.post('baidu_draw_info',params)
}

export const cost_draw_f = (params:any) => {
    return Http.post('cost_draw_f',params)
}

export const create_know = () => {
    return Http.post('create_know')
}

export const get_all_knowledge = () => {
    return Http.post('get_all_knowledge')
}

export const know_get = (params:any) => {
    return Http.post('know_get',params)
}

export const get_vector_id = (params:any) => {
    return Http.post('get_vector_id',params)
}

export const change_know = (params:any) => {
    return Http.post('change_know',params)
}

export const know_generate = (params:any) => {
    return Http.post('know_generate',params)
}

export const change_know_dialog = (params:any) => {
    return Http.post('change_know_dialog',params)
}
export const del_know_id = (params:any) => {
    return Http.post('del_know_id',params)
}

export const for_generate = (params:any) => {
    return Http.post('for_generate',params)
}

export const urls_generate = (params:any) => {
    return Http.post('urls_generate',params)
}

export const search_know = (params:any) => {
    return Http.post('search_know',params)
}

export const get_know_sid = (params:any) => {
    return Http.post('get_know_sid',params)
}

export const del_know_sid = (params:any) => {
    return Http.post('del_know_sid',params)
}

export const get_vector_search_id = (params:any) => {
    return Http.post('get_vector_search_id',params)
}

export const knowledge_list_gets = (params:any) => {
    return Http.post('knowledge_list_gets',params)
}

export const get_draw_selector = () => {
    return Http.post('get_draw_selector')
}

export const run_yijian_ai = (params:any) => {
    return Http.post('run_yijian_ai',params)
}

export const yijian_draw_info = (params:any) => {
    return Http.post('show_yijian_task',params)
}

export const add_chat_zero = () => {
    return Http.post('add_chat_zero')
}

export const midjourney_describe = (params:any) => {
    return Http.post('midjourney_describe',params)
}

export const delete_knowledge = (params:any) => {
    return Http.post('delete_knowledge',params)
}

export const rename_knowledge = (params:any) => {
    return Http.post('rename_knowledge',params)
}

export const public_knowledge = (params:any) => {
    return Http.post('public_knowledge',params)
}

export const update_scene = (params:any) => {
    return Http.post('update_scene',params)
}

export const get_iframe = (params:any) => {
    return Http.post('get_iframe',params)
}

export const ali_draw_go = (params:any) => {
    return Http.post('ali_draw_go',params)
}

export const ali_draw_info = (params:any) => {
    return Http.post('ali_draw_info',params)
}
export const user_notice_get = () => {
    return Http.post('user_notice')
}

export const user_notice_list = () => {
    return Http.post('user_notice_list')
}

export const user_notice_read = (params:any) => {
    return Http.post('user_notice_read',params)
}

export const unbind_wechat = () => {
    return Http.post('unbind_wechat')
}

export const teach_invite = (params:any) => {
    return Http.post('teach_invite',params)
}

export const work_model = () => {
    return Http.post('work_model')
}

export const get_chat_id = (params:any) => {
    return Http.post('get_chat_id',params)
}

export const reduce_chat_pro = (params:any) => {
    return Http.post('reduce_chat_pro',params)
}

export const voice_lists = (params:any) => {
    return Http.post('voice_lists',params)
}

export const charge_limit_bag = () => {
    return Http.post('charge_limit_bag')
}

export const buy_limit_bags = (params:any) => {
    return Http.post('buy_limit_bags',params)
}

export const work_create = (params:any) => {
    return Http.post('work_create',params)
}

export const work_list = (params:any) => {
    return Http.post('work_list',params)
}

export const check_work = (params:any) => {
    return Http.post('check_work',params)
}

export const send_work = (params:any) => {
    return Http.post('send_work',params)
}

export const tencent_draw = (params:any) => {
    return Http.post('tencent_draw',params)
}

export const trans_voice = (params:any) => {
    return Http.post('send_translate_voice',params)
}

export const region_dialog_open = (params:any) => {
    return Http.post('region_dialog_open',params)
}


export const music_describe = (params:any) => {
    return Http.post('music_describe',params)
}

export const music_create = (params:any) => {
    return Http.post('music_create',params)
}

export const music_check = (params:any) => {
    return Http.post('music_check',params)
}

export const get_music_list = (params:any) => {
    return Http.post('get_music_list',params)
}

export const music_delete = (params:any) => {
    return Http.post('music_delete',params)
}

export const video_create = (params:any) => {
    return Http.post('video_create',params)
}

//video_create_chatglm
export const video_create_chatglm = (params:any) => {
    return Http.post('video_create_chatglm',params)
}

export const get_video_list = (params:any) => {
    return Http.post('get_video_list',params)
}

// video_check
export const video_check = (params:any) => {
    return Http.post('video_check',params)
}

export const video_delete = (params:any) => {
    return Http.post('video_delete',params)
}

export const video_delete_all = () => {
    return Http.post('video_delete_all')
}

// video_square
export const video_square = (params:any) => {
    return Http.post('video_square',params)
}

export const user_api_list = () => {
    return Http.post('user_api_list')
}

export const user_api_create = (params:any) => {
    return Http.post('user_api_create' , params)
}

export const delete_apikey = (params:any) => {
    return Http.post('delete_apikey' , params)
}

export const updata_model_message = (params:any) => {
    return Http.post('updata_model_message' , params)
}

export const ocr_images = (params:any) => {
    return Http.post('ocr_images' , params)
}



export const ppt_generate_easy = (params:any) => {
    return Http.post('ppt_create' , params)
}


export const ppt_process = (params:any) => {
    return Http.post('ppt_process' , params)
}

export const ppt_check = (params:any) => {
    return Http.post('ppt_check' , params)
}

export const ppt_delete_all = () => {
    return Http.post('ppt_delete_all')
}

export const ppt_list = (params:any) => {
    return Http.post('ppt_list', params)
}

export const ppt_out_line = (params:any) => {
    return Http.post('ppt_out_line', params)
}

export const ppt_themes = () => {
    return Http.post('ppt_themes')
}

export const ppt_create_outline = (params:any) => {
    return Http.post('ppt_create_outline', params)
}

// ai_draw_fluxs
export const ai_draw_fluxs = (params:any) => {
    return Http.post('ai_draw_fluxs', params)
}