/**
 * @description 图片相关的配置
 * @author way
 */

import Editor from '../editor/index'
import { ResType } from '../menus/img/upload-img'

export type UploadImageHooksType = {
    before?: (
        xhr: XMLHttpRequest,
        editor: Editor,
        files: File[]
    ) => { prevent: boolean; msg: string } | void
    success?: (xhr: XMLHttpRequest, editor: Editor, result: ResType) => void
    fail?: (xhr: XMLHttpRequest, editor: Editor, err: ResType | string) => void
    error?: (xhr: XMLHttpRequest, editor: Editor) => void
    timeout?: (xhr: XMLHttpRequest, editor: Editor) => void
    customInsert?: (
        inserImg: (this: Editor, src: string) => void,
        result: ResType,
        editor: Editor
    ) => void
}

export default {
    // accept
    uploadImgAccept: ['jpg', 'jpeg', 'png', 'gif', 'bmp'],

    // 服务端地址
    uploadImgServer: '',

    // 使用 base64 存储图片
    uploadImgShowBase64: false,

    // 上传图片的最大体积，默认 5M
    uploadImgMaxSize: 5 * 1024 * 1024,

    // 一次最多上传多少个图片
    uploadImgMaxLength: 100,

    // 自定义上传图片的名称
    uploadFileName: '',

    // 上传图片自定义参数
    uploadImgParams: {},

    // 自定义参数拼接到 url 中
    uploadImgParamsWithUrl: false,

    // 上传图片自定义 header
    uploadImgHeaders: {},

    // 钩子函数
    uploadImgHooks: {},

    // 上传图片超时时间 ms
    uploadImgTimeout: 10 * 1000,

    // 跨域带 cookie
    withCredentials: false,

    // 自定义上传
    customUploadImg: null,

    // 从媒体库上传
    uploadImgFromMedia: null,
}
