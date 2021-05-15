/**
 * @description  表情菜单 panel配置
 * @author liuwei
 */

import Editor from '../../editor/index'
import { PanelConf } from '../menu-constructors'
import $ from '../../utils/dom-core'

import { getRandom } from '../../utils/util'
import { altUserGroupType, altUserType } from '../../config/altUsaer'

export default function (editor: Editor): PanelConf {
    // 搜索框要用到的id
    const inputTextId = getRandom('input-text')
    // 声明emotions数据结构
    const altUsers: Array<altUserGroupType> = editor.config.altUsers

    // 生成表情结构 TODO jele type类型待优化
    function GenerateAltUserStructure(users: Array<altUserGroupType>) {
        // 返回为一个数组对象
        let res: string[] = []
        res = users.map((group: altUserGroupType) => {
            return `<div class="t-user-group">
                       <h5 class="t-e-alt-h">${group.tag}</h5>
                       <ul>
                         ${GenerateUserItem(group.list)}
                       </ul>
                    </div>`
        })
        return res.join('').replace(/&nbsp;/g, '')
    }
    function GenerateUserItem(users: Array<altUserType>) {
        let res: string[] = []
        res = users.map((user: altUserType) => {
            return `<li class="t-user-group" data-id=${user.id} title=${user.name}>
                      <span class="user-icon"><img src=${user.icon}/></span>
                      <span  class="user-name">${user.name}</span>
                    </li>`
        })
        return res.join('').replace(/&nbsp;/g, '')
    }
    function filterUser(key: string) {
        const filterList: Array<altUserGroupType> = []
        altUsers.forEach(tag => {
            const filterTag = tag.list.filter(user => user.name.indexOf(key) > -1)
            if (filterTag.length > 0) {
                filterList.push({
                    tag: tag.tag,
                    list: filterTag,
                })
            }
        })
        GenerateAltUserStructure(filterList)
    }

    return {
        width: 350, // Panel容器宽度
        height: 230, // Panel容器高度
        tabs: [
            {
                title: `艾特人`,
                tpl: `<div>
                        <section>
                          <i class="icon-aite iconfont"></i>
                        <input
                            id="${inputTextId}"
                            type="text"
                            class="block"
                            placeholder="想提及谁"/>
                        </td>
                        </section>
                        <div class='group'>
                          ${GenerateAltUserStructure(altUsers)}
                        </div>
               </div>`,
                events: [
                    {
                        selector: '.t-user-group',
                        type: 'click',
                        fn: (e: Event) => {
                            // e为事件对象
                            const $target = $(e.target)
                            const id = $target.attr('data-id')
                            const name = $target.attr('title')
                            let insertHtml
                            insertHtml =
                                `<span data-id="${id}" class="link" contenteditable="false">@` +
                                name +
                                '&nbsp;' +
                                `</span>`
                            editor.cmd.do('insertHTML', insertHtml)
                            // 示函数执行结束之后关闭 panel
                            return true
                        },
                    },
                    {
                        selector: `#${inputTextId}`,
                        type: 'input',
                        fn: (e: Event) => {
                            // e为事件对象
                            const val = $(e.target).val()
                            filterUser(val)
                            // 示函数执行结束之后关闭 panel
                            // return true
                        },
                    },
                ],
            },
        ],
    }
}
