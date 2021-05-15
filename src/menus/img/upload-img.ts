/**
 * @description 上传图片
 * @author way
 */

import Editor from '../../editor/index'
import { arrForEach } from '../../utils/util'

type ResImgItemType = string | { url: string; alt?: string; href?: string }

export type ResType = {
    errno: number | string
    data: ResImgItemType[]
}

class UploadImg {
    private editor: Editor

    constructor(editor: Editor) {
        this.editor = editor
    }

    /**
     * 往编辑区域插入图片
     * @param src 图片地址
     */
    public insertImg(src: string, alt?: string, href?: string): void {
        const editor = this.editor
        const config = editor.config

        // 设置图片alt
        const altText = alt ? `alt="${alt}" ` : ''
        const hrefText = href ? `data-href="${encodeURIComponent(href)}" ` : ''
        // 先插入图片，无论是否能成功
        editor.cmd.do(
            'insertHTML',
            `<img src="${src}" ${altText} ${hrefText} style="max-width:100%;" contenteditable="false" alt="img"/>`
        )

        // 加载图片
        let img: any = document.createElement('img')
        img.onload = () => {
            img = null
        }
        img.onerror = () => {
            config.customAlert(
                '插入图片错误',
                'error',
                `tinyEditor:插入图片错误，图片链接 "${src}"，下载链接失败`
            )
            img = null
        }
        img.onabort = () => (img = null)
        img.src = src
    }

    /**
     * 上传图片
     * @param files 文件列表
     */
    public uploadImg(files: FileList | File[]): void {
        if (!files.length) {
            return
        }

        const editor = this.editor
        const config = editor.config

        // ------------------------------ 获取配置信息 ------------------------------
        // 图片最大体积
        const maxSize = config.uploadImgMaxSize
        const maxSizeM = maxSize / 1024 / 1024
        // 一次最多上传图片数量
        const maxLength = config.uploadImgMaxLength
        // 自定义上传图片
        const customUploadImg = config.customUploadImg

        if (!customUploadImg) {
            return
        }

        // ------------------------------ 验证文件信息 ------------------------------
        const resultFiles: File[] = []
        const errInfos: string[] = []
        arrForEach(files, file => {
            const name = file.name || file.type.replace('/', '.') // 兼容低版本chrome 没有name
            const size = file.size

            // chrome 低版本 name === undefined
            if (!name || !size) {
                return
            }

            // 将uploadImgAccept数组转换为正则对象
            const imgType = editor.config.uploadImgAccept.join('|')
            const imgTypeRuleStr = `.(${imgType})$`
            const uploadImgAcceptRule = new RegExp(imgTypeRuleStr, 'i')
            if (!uploadImgAcceptRule.test(name)) {
                // 后缀名不合法，不是图片
                errInfos.push(`【${name}】不是图片`)
                return
            }

            if (maxSize < size) {
                // 上传图片过大
                errInfos.push(`【${name}】大于 ${maxSizeM}M`)
                return
            }

            // 验证通过的加入结果列表
            resultFiles.push(file)
        })
        // 抛出验证信息
        if (errInfos.length) {
            config.customAlert(`图片验证未通过: \n` + errInfos.join('\n'), 'warning')
            return
        }

        // 如果过滤后文件列表为空直接返回
        if (resultFiles.length === 0) {
            config.customAlert('传入的文件不合法', 'warning')
            return
        }

        if (resultFiles.length > maxLength) {
            config.customAlert('一次最多上传' + maxLength + '张图片', 'warning')
            return
        }

        // ------------------------------ 自定义上传 ------------------------------
        if (customUploadImg && typeof customUploadImg === 'function') {
            customUploadImg(resultFiles, this.insertImg.bind(this))
            // 阻止以下代码执行，重要！！！
            return
        }
    }
}

export default UploadImg
