/**
 * @description 编辑器配置
 * @author way
 */

import menusConfig, { EmotionsType } from './menus'
import eventsConfig from './events'
import styleConfig from './style'
import pasteConfig from './paste'
import cmdConfig from './cmd'
import imageConfig, { UploadImageHooksType } from './image'
import textConfig from './text'

// 字典类型
export type DicType = {
    [key: string]: string
}

// 定义配置项的类型规范
export type ConfigType = {
    height: number
    languageType: string[]
    languageTab: string
    menus: string[]
    excludeMenus: string[]
    emotions: EmotionsType[]
    zIndex: number
    onchange: Function | null
    onfocus: Function
    onblur: Function
    onchangeTimeout: number
    pasteFilterStyle: boolean
    pasteIgnoreImg: boolean
    pasteTextHandle: Function
    styleWithCSS: boolean
    linkImgCallback: Function

    placeholder: string
    zIndexFullScreen: number
    showFullScreen: boolean
    showLinkImgHref: boolean
    uploadImgAccept: string[]
    uploadImgServer: string
    uploadImgShowBase64: boolean
    uploadImgMaxSize: number
    uploadImgMaxLength: number
    uploadFileName: string
    uploadImgParams: DicType
    uploadImgParamsWithUrl: boolean
    uploadImgHeaders: DicType
    uploadImgHooks: UploadImageHooksType
    uploadImgTimeout: number
    withCredentials: boolean
    customUploadImg: Function | null
    uploadImgFromMedia: Function | null
    customAlert: Function
    onCatalogChange: Function | null
    linkCheck: Function
    linkImgCheck: Function
    historyMaxSize: number
    focus: boolean
}

// 合并所有的配置信息
const defaultConfig = Object.assign(
    {},
    menusConfig,
    eventsConfig,
    styleConfig,
    cmdConfig,
    pasteConfig,
    imageConfig,
    textConfig,
    //链接校验的配置函数
    {
        linkCheck: function (text: string, link: string): string | boolean {
            return true
        },
    }
)

export default defaultConfig
