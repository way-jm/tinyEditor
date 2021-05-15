import $ from '../../utils/dom-core'
import Editor from '../../editor/index'
import PanelMenu from '../menu-constructors/PanelMenu'
import Panel from '../menu-constructors/Panel'
import { MenuActive } from '../menu-constructors/Menu'
import createPanelConf from './create-panel-conf'

class AltUser extends PanelMenu implements MenuActive {
    constructor(editor: Editor) {
        const $elem = $(
            `<div class="t-e-menu" data-title="@成员">
                <i class="iconfont icon-aite"></i>
            </div>`
        )
        super($elem, editor)
    }
    /**
     * 创建 panel
     */
    private createPanel(): void {
        // console.log(this.editor.selection.getSelectionEndElem().elems[0].getClientRects())
        this.editor.cmd.do('insertHTML', new Text('a') as unknown as string)
        // const conf = createPanelConf(this.editor)
        // const panel = new Panel(this, conf)
        // panel.create()
    }

    /**
     * 菜单表情点击事件
     */
    public clickHandler(): void {
        this.createPanel()
    }
    public tryChangeActive() {}
}

export default AltUser
