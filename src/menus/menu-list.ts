import Bold from './bold/index'
import Link from './link/index'
import Image from './img/index'
import Emoticon from './emoticon/index'
import AltUser from './alt/index'

export type MenuListType = {
    [key: string]: any
}

export default {
    bold: Bold,
    link: Link,
    image: Image,
    emoticon: Emoticon,
    alt: AltUser,
}
