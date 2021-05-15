/**
 * @description 编辑器配置
 * @author way
 */

import menusConfig, { EmotionsType } from './menus'
import eventsConfig from './events'
import pasteConfig from './paste'
import imageConfig from './image'
import textConfig from './text'
import altUserConfig, { altUserGroupType } from './altUsaer'

// 定义配置项的类型规范
export type ConfigType = {
    height: number
    menus: string[]
    emotions: EmotionsType[]
    altUsers: altUserGroupType[]
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
    uploadImgTimeout: number
    withCredentials: boolean
    customUploadImg: Function | null
    uploadImgFromMedia: Function | null
    customAlert: Function
    onCatalogChange: Function | null
    linkCheck: Function
    linkImgCheck: Function
    focus: boolean
}

// 合并所有的配置信息
const defaultConfig = Object.assign(
    {},
    menusConfig,
    eventsConfig,
    pasteConfig,
    imageConfig,
    textConfig,
    altUserConfig,
    //链接校验的配置函数
    {
        linkCheck: function (text: string, link: string): string | boolean {
            return true
        },
    }
)

export default defaultConfig
