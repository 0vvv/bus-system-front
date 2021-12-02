import request from '@/utils/request'
export default{
    getList(){
        const req=request({
            method: 'get',
            url: '/db.json'
        })
        return req
    }
}