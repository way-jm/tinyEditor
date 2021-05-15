/**
 * @description 绑定图片的事件
 * @author way
 */

import Editor from '../../../editor/index'
import bindPasteImg from './paste-img'
import bindTooltipImg from './tooltip-event'

/**
 * 绑定事件
 * @param editor 编辑器实例
 */
function bindEvent(editor: Editor): void {
    // 粘贴图片
    bindPasteImg(editor)
    //Tooltip
    bindTooltipImg(editor)
}

export default bindEvent
