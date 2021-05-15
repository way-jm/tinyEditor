/**
 * @description 事件配置
 * @author way
 */

import { EMPTY_FN } from '../utils/const'

function customAlert(alertInfo: string, alertType: string, debugInfo?: string): void {
    if (debugInfo) {
        console.error('tinyEditor: ' + debugInfo)
    }
}

export default {
    onchangeTimeout: 200,
    onchange: null,
    onfocus: EMPTY_FN,
    onblur: EMPTY_FN,
    onCatalogChange: null,
    customAlert,
}
