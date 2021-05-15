/**
 * @description Menus 菜单栏 入口文件
 * @author way
 */

import Editor from '../editor/index'
import Menu from './menu-constructors/Menu'
import MenuConstructorList, { MenuListType } from './menu-list'

class Menus {
    public editor: Editor
    public menuList: Menu[]
    public constructorList: MenuListType

    constructor(editor: Editor) {
        this.editor = editor
        this.menuList = []
        this.constructorList = MenuConstructorList // 所有菜单构造函数的列表
    }

    // 初始化菜单
    public init(): void {
        // 从用户配置的 menus 入手，看需要初始化哪些菜单
        const config = this.editor.config

        // 排除exclude包含的菜单
        let excludeMenus: string[] | any = config.excludeMenus
        if (Array.isArray(excludeMenus) === false) excludeMenus = []
        config.menus = config.menus.filter(key => excludeMenus.includes(key) === false)

        // 排除自扩展中exclude包含的菜单
        let CustomMenuKeysList: string[] = Object.keys(Editor.globalCustomMenuConstructorList)
        CustomMenuKeysList = CustomMenuKeysList.filter(key => excludeMenus.includes(key))
        CustomMenuKeysList.forEach((key: string) => {
            delete Editor.globalCustomMenuConstructorList[key]
        })

        config.menus.forEach(menuKey => {
            const MenuConstructor = this.constructorList[menuKey] // 暂用 any ，后面再替换
            this._initMenuList(menuKey, MenuConstructor)
        })

        // 全局注册
        for (let [menuKey, menuFun] of Object.entries(Editor.globalCustomMenuConstructorList)) {
            const MenuConstructor = menuFun // 暂用 any ，后面再替换
            this._initMenuList(menuKey, MenuConstructor)
        }

        // 渲染 DOM
        this._addToToolbar()
    }

    /**
     * 创建 menu 实例，并放到 menuList 中
     * @param menuKey 菜单 key ，和 editor.config.menus 对应
     * @param MenuConstructor 菜单构造函数
     */
    private _initMenuList(menuKey: String, MenuConstructor: any): void {
        if (MenuConstructor == null || typeof MenuConstructor !== 'function') {
            // 必须是 class
            return
        }
        if (this.menuList.some(menu => menu.key === menuKey)) {
            console.warn('菜单名称重复:' + menuKey)
        } else {
            const m = new MenuConstructor(this.editor)
            m.key = menuKey
            this.menuList.push(m)
        }
    }
    // 添加到菜单栏
    private _addToToolbar(): void {
        const editor = this.editor
        const $toolbarElem = editor.$toolbarElem

        // 遍历添加到 DOM
        this.menuList.forEach(menu => {
            const $elem = menu.$elem
            if ($elem) {
                $toolbarElem.append($elem)
            }
        })
    }

    /**
     * 获取菜单对象
     * @param 菜单名称 小写
     * @return Menus 菜单对象
     */
    public menuFind(key: string): Menu {
        const menuList = this.menuList
        for (let i = 0, l = menuList.length; i < l; i++) {
            if (menuList[i].key === key) return menuList[i]
        }

        return menuList[0]
    }

    /**
     * @description 修改菜单激活状态
     */
    public changeActive(): void {
        this.menuList.forEach(menu => {
            setTimeout((menu as any).tryChangeActive.bind(menu), 100) // 暂用 any ，后面再替换
        })
    }
}

export default Menus
