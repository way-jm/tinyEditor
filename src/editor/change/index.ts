/**
 * @description 编辑器 change 事件
 * @author fangzhicong
 */

import Editor from '../index'
import Mutation from './mutation'
import { debounce } from '../../utils/util'
import { EMPTY_FN } from '../../utils/const'

/**
 * 剔除编辑区容器的 attribute 变化中的非 contenteditable 变化
 * @param mutations MutationRecord[]
 * @param tar 编辑区容器的 DOM 节点
 */

/**
 * Change 实现
 */
export default class Change extends Mutation {
    /**
     * 异步保存数据
     */
    private asyncSave: Function = EMPTY_FN

    constructor(public editor: Editor) {
        super(() => {
            // 存储数据
            this.asyncSave()
        })
    }
    /**
     * 发布 change event
     */
    public emit() {
        // 执行 onchange 回调
        this.editor.txt.eventHooks.changeEvents.forEach(fn => fn())
    }

    // 重写 observe
    public observe() {
        super.observe(this.editor.$textElem.elems[0])

        let timeout = this.editor.config.onchangeTimeout
        this.asyncSave = debounce(() => {
            this.emit()
        }, timeout)
    }
}
