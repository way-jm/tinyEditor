/**
 * @description æéŪčå Class
 * @author way
 */

import { DomElement } from '../../utils/dom-core'
import Editor from '../../editor/index'
import Menu from './Menu'

class BtnMenu extends Menu {
    constructor($elem: DomElement, editor: Editor) {
        super($elem, editor)
    }
}

export default BtnMenu
