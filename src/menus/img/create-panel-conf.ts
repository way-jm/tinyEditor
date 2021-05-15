/**
 * @description image 菜单 panel tab 配置
 * @author way
 */

import Editor from '../../editor/index'
import $, { DomElement } from '../../utils/dom-core'
import { getRandom } from '../../utils/util'
import { PanelConf, PanelTabConf, TabEventConf } from '../menu-constructors/Panel'
import UploadImg from './upload-img'

export type ImgPanelConf = {
    onlyUploadConf?: {
        $elem: DomElement
        events: TabEventConf[]
    }
} & PanelConf

export default function (editor: Editor): ImgPanelConf {
    const config = editor.config
    const uploadImg = new UploadImg(editor)

    // panel 中需要用到的id
    const upTriggerId = getRandom('up-trigger-id')
    const upFileId = getRandom('up-file-id')

    const t = (text: string, prefix: string = ''): string => {
        return ''
    }
    // tabs 配置 -----------------------------------------
    const fileMultipleAttr = config.uploadImgMaxLength === 1 ? '' : 'multiple="multiple"'
    const accepts: string = config.uploadImgAccept.map((item: string) => `image/${item}`).join(',')

    /**
     * 设置模板的类名和icon图标
     * w-e-menu是作为button菜单的模板
     * w-e-up-img-container是做为panel菜单的窗口内容的模板
     * @param containerClass 模板最外层的类名
     * @param iconClass 模板中icon的类名
     * @param titleName 模板中标题的名称 需要则设置不需要则设为空字符
     */
    const getUploadImgTpl = (containerClass: string, iconClass: string, titleName: string) =>
        `<div class="${containerClass}" data-title="${titleName}">
            <div id="${upTriggerId}" class="w-e-up-btn">
                <i class="${iconClass}"></i>
            </div>
            <div style="display:none;">
                <input id="${upFileId}" type="file" ${fileMultipleAttr} accept="${accepts}"/>
            </div>
        </div>`
    const uploadEvents: TabEventConf[] = [
        // 触发选择图片
        {
            selector: '#' + upTriggerId,
            type: 'click',
            fn: () => {
                const uploadImgFromMedia = config.uploadImgFromMedia
                if (uploadImgFromMedia && typeof uploadImgFromMedia === 'function') {
                    uploadImgFromMedia()
                    return true
                }
                const $file = $('#' + upFileId)
                const fileElem = $file.elems[0]
                if (fileElem) {
                    fileElem.click()
                } else {
                    // 返回 true 可关闭 panel
                    return true
                }
            },
        },
        // 选择图片完毕
        {
            selector: '#' + upFileId,
            type: 'change',
            fn: () => {
                const $file = $('#' + upFileId)
                const fileElem = $file.elems[0] as HTMLInputElement
                if (!fileElem) {
                    // 返回 true 可关闭 panel
                    return true
                }

                // 获取选中的 file 对象列表
                const fileList = fileElem.files
                if (fileList?.length) {
                    uploadImg.uploadImg(fileList)
                }

                // 判断用于打开文件的input，有没有值，如果有就清空，以防上传同一张图片时，不会触发change事件
                // input的功能只是单单为了打开文件而已，获取到需要的文件参数，当文件数据获取到后，可以清空。
                if (fileElem) {
                    fileElem.value = ''
                }

                // 返回 true 可关闭 panel
                return true
            },
        },
    ]

    const tabsConf: PanelTabConf[] = [
        // first tab
        {
            // 标题
            title: t('上传图片'),
            // 模板
            tpl: getUploadImgTpl('w-e-up-img-container', 'w-e-icon-upload2', ''),
            // 事件绑定
            events: uploadEvents,
        }, // first tab end
        // second tab
    ]
    // tabs end

    // 最终的配置 -----------------------------------------
    const conf: ImgPanelConf = {
        width: 300,
        height: 0,
        tabs: [],
        onlyUploadConf: {
            $elem: $(getUploadImgTpl('w-e-menu', 'w-e-icon-image', '图片')),
            events: uploadEvents,
        },
    }
    // 显示“上传图片”
    if (
        window.FileReader &&
        (config.uploadImgShowBase64 ||
            config.uploadImgServer ||
            config.customUploadImg ||
            config.uploadImgFromMedia)
    ) {
        conf.tabs.push(tabsConf[0])
    }

    return conf
}
