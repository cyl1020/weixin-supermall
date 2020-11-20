//每个页面的请求函数
import ajax from './ajax'
//home
export const reqHomeTop = () => ajax('/home/multidata')

//homeData
export const reqHomeData = (type, page) => ajax('/home/data', {type, page})

//category
export const reqCategorty = () => ajax('/category')

//categpry-content
export const reqCategortyContent = maitKey => ajax('/subcategory', {maitKey})

//category-detail
export const reqCategortyDetail = (miniWallkey, type) => ajax('/subcategory/detail', {miniWallkey, type})

//detail
export const reqDetail = iid => ajax('/detail', {iid})

//recommend
export const reqRecommend = () => ajax('/recommend')