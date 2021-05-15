/**
 * @description 图片相关的配置
 * @author way
 */
export default {
    // accept
    uploadImgAccept: ['jpg', 'jpeg', 'png', 'gif', 'bmp'],
    // 上传图片的最大体积，默认 5M
    uploadImgMaxSize: 5 * 1024 * 1024,
    // 一次最多上传多少个图片
    uploadImgMaxLength: 100,
    // 自定义上传
    customUploadImg: null,
}
