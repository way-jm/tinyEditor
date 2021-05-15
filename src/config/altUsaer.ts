export type altUserType = {
    name: string
    id: string
    icon?: string
}

export type altUserGroupType = {
    tag: string
    list: Array<altUserType>
}

export default {
    altUsers: [],
}
