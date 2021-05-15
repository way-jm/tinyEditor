import Bold from './bold/index'
import Link from './link/index'
import Italic from './italic/index'
import Image from './img/index'
import Emoticon from './emoticon/index'

export type MenuListType = {
    [key: string]: any
}

export default {
    bold: Bold,
    italic: Italic,
    link: Link,
    image: Image,
    emoticon: Emoticon,
}
