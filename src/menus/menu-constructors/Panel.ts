/**
 * @description panel class
 * @author way
 */

import $, { DomElement } from '../../utils/dom-core'
import PanelMenu from './PanelMenu'
import { EMPTY_FN } from '../../utils/const'

// Panel 配置格式
export type TabEventConf = {
    selector: string
    type: string
    fn: Function
}
export type PanelTabConf = {
    title: string
    tpl: string
    events: TabEventConf[]
}
export type PanelConf = {
    width: number | 0
    height: number | 0
    tabs: PanelTabConf[]
}

class Panel {
    // 记录已经创建过的 panelMenu
    static createdMenus: Set<PanelMenu> = new Set()

    private menu: PanelMenu
    private conf: PanelConf
    public $container: DomElement

    constructor(menu: PanelMenu, conf: PanelConf) {
        this.menu = menu
        this.conf = conf
        this.$container = $('<div class="t-e-panel-container show"></div>')

        // 隐藏 panel
        const editor = menu.editor
        editor.txt.eventHooks.clickEvents.push(Panel.hideCurAllPanels)
        editor.txt.eventHooks.toolbarClickEvents.push(Panel.hideCurAllPanels)
        editor.txt.eventHooks.dropListMenuHoverEvents.push(Panel.hideCurAllPanels)
    }

    /**
     * 创建并展示 panel
     */
    public create(): void {
        const menu = this.menu
        if (Panel.createdMenus.has(menu)) {
            // 创建过了
            return
        }

        const conf = this.conf

        // panel 的容器
        const $container = this.$container
        // 添加关闭按钮
        const $closeBtn = $('<i class="t-e-icon-close t-e-panel-close"></i>')
        $container.append($closeBtn)
        $closeBtn.on('click', () => {
            this.remove()
        })

        // 准备 tabs 容器
        const $tabContentContainer = $('<div class="t-e-panel-tab-content"></div>')
        $container.append($tabContentContainer)

        // 设置高度
        const height = conf.height // height: 0 即不用设置
        const width = conf.width // height: 0 即不用设置
        if (height) {
            $tabContentContainer.css('height', height + 'px').css('overflow-y', 'auto')
        }
        if (width) {
            $tabContentContainer.css('width', width + 'px')
        }
        // tabs
        const tabs = conf.tabs || []
        const tabContentArr: DomElement[] = []

        tabs.forEach((tab: PanelTabConf, tabIndex: number) => {
            if (!tab) {
                return
            }
            const tpl = tab.tpl || ''
            const $content = $(tpl)
            $tabContentContainer.append($content)

            // 记录到内存
            tabContentArr.push($content)

            // 设置 active 项
            if (tabIndex !== 0) {
                $content.hide()
            }
        })

        // 绑定关闭事件
        $container.on('click', (e: Event) => {
            // 点击时阻止冒泡
            e.stopPropagation()
        })

        // 添加到 DOM
        menu.$elem.append($container)
        $container.addClass('show')

        // 绑定 conf events 的事件，只有添加到 DOM 之后才能绑定成功
        tabs.forEach((tab: PanelTabConf, index: number) => {
            if (!tab) {
                return
            }
            const events = tab.events || []
            events.forEach((event: TabEventConf) => {
                const selector = event.selector
                const type = event.type
                const fn = event.fn || EMPTY_FN
                const $content = tabContentArr[index]
                $content.find(selector).on(type, async (e: Event) => {
                    e.stopPropagation()
                    const needToHide = await fn(e)
                    // 执行完事件之后，是否要关闭 panel
                    if (needToHide) {
                        this.remove()
                    }
                })
            })
        })

        // focus 第一个 elem
        let $inputs = $container.find('input[type=text],textarea')
        if ($inputs.length) {
            $inputs.get(0).focus()
        }

        // 隐藏其他 panel
        Panel.hideCurAllPanels()

        // 记录该 menu 已经创建了 panel
        menu.setPanel(this)
        Panel.createdMenus.add(menu)
    }

    /**
     * 移除 penal
     */
    public remove(): void {
        const menu = this.menu
        const $container = this.$container
        if ($container) {
            $container.remove()
        }

        // 将该 menu 记录中移除
        Panel.createdMenus.delete(menu)
    }

    /**
     * 隐藏当前所有的 panel
     */
    static hideCurAllPanels(): void {
        if (Panel.createdMenus.size === 0) {
            return
        }
        Panel.createdMenus.forEach(menu => {
            const panel = (menu as PanelMenu).panel
            panel && panel.remove()
        })
    }
}

export default Panel
