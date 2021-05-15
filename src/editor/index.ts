/**
 * @description 编辑器 class
 * @author way
 */

import $, { DomElement, DomElementSelector } from '../utils/dom-core'
import { deepClone } from '../utils/util'
import defaultConfig, { ConfigType } from '../config'
import SelectionAndRangeAPI from './selection'
import CommandAPI from './command'
import Text from '../text/index'
import Menus from '../menus/index'
import initDom, { selectorValidator } from './init-fns/init-dom'
import initSelection from './init-fns/init-selection'
import bindEvent from './init-fns/bind-event'
import Change from './change/index'

// 创建菜单的 class
import { MenuListType } from '../menus/menu-list'
import BtnMenu from '../menus/menu-constructors/BtnMenu'
import Panel from '../menus/menu-constructors/Panel'
import PanelMenu from '../menus/menu-constructors/PanelMenu'
import Tooltip from '../menus/menu-constructors/Tooltip'

let EDITOR_ID = 1

class Editor {
    // 暴露 $
    static $ = $
    static BtnMenu = BtnMenu
    static Panel = Panel
    static PanelMenu = PanelMenu
    static Tooltip = Tooltip
    static globalCustomMenuConstructorList: MenuListType = {}
    public id: string
    public toolbarSelector: DomElementSelector
    public textSelector?: DomElementSelector
    public config: ConfigType
    public $toolbarElem: DomElement
    public $textContainerElem: DomElement
    public $textElem: DomElement
    public toolbarElemId: string
    public textElemId: string
    public isFocus: boolean
    public isComposing: boolean
    public selection: SelectionAndRangeAPI
    public cmd: CommandAPI
    public txt: Text
    public menus: Menus
    public change: Change

    // 实例销毁前需要执行的钩子集合
    private beforeDestroyHooks: Function[] = []
    /**
     * 构造函数
     * @param toolbarSelector 工具栏 DOM selector
     * @param textSelector 文本区域 DOM selector
     */
    constructor(toolbarSelector: DomElementSelector, textSelector?: DomElementSelector) {
        // id，用以区分单个页面不同的编辑器对象
        this.id = `tinyEditor-${EDITOR_ID++}`

        this.toolbarSelector = toolbarSelector
        this.textSelector = textSelector

        selectorValidator(this)

        // 属性的默认值，后面可能会再修改
        // 默认配置 - 当一个页面有多个编辑器的时候，因为 JS 的特性(引用类型)会导致多个编辑器的 config 引用是同一个，所以需要 深度克隆 断掉引用
        this.config = deepClone(defaultConfig)
        this.$toolbarElem = $('<div></div>')
        this.$textContainerElem = $('<div></div>')
        this.$textElem = $('<div></div>')
        this.toolbarElemId = ''
        this.textElemId = ''
        this.isFocus = false
        this.isComposing = false

        this.selection = new SelectionAndRangeAPI(this)
        this.cmd = new CommandAPI(this)
        this.txt = new Text(this)
        this.menus = new Menus(this)
        this.change = new Change(this)
    }

    /**
     * 初始化选区
     * @param newLine 新建一行
     */
    public initSelection(newLine?: boolean): void {
        initSelection(this, newLine)
    }

    /**
     * 创建编辑器实例
     */
    public create(): void {
        this.config.onchangeTimeout = 30

        // 初始化 DOM
        initDom(this)

        // 初始化 text
        this.txt.init()

        // 初始化菜单
        this.menus.init()

        // 初始化选区，将光标定位到内容尾部
        this.initSelection(true)

        // 绑定事件
        bindEvent(this)

        // 绑定监听的目标节点
        this.change.observe()
    }

    /**
     * 提供给用户添加销毁前的钩子函数
     * @param fn 钩子函数
     */
    public beforeDestroy(fn: Function): Editor {
        this.beforeDestroyHooks.push(fn)
        return this
    }

    /**
     * 销毁当前编辑器实例
     */
    public destroy(): void {
        // 调用钩子函数
        this.beforeDestroyHooks.forEach(fn => fn.call(this))
        // 销毁 DOM 节点
        this.$toolbarElem.remove()
        this.$textContainerElem.remove()
    }
}

export default Editor
