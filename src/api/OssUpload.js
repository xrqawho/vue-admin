/**
 * @infor oss 上传文件
 * @path  @/api/OssUpload.js
 * @user  CC
 * @date  2020-06-15 20:03:57
 */

import { get } from '@/api'

const OSS = require('ali-oss')

let cache = null

export const uploadFile = async (dir, file) => {
	const nowTime = new Date().getTime()
	const fileName = Math.ceil(Math.random() * nowTime) + nowTime + `.${ file.name.split('.').pop() }`
	
	const nowTimestamp = nowTime / 1000
	// 失效时间接近10S，则重新请求凭证数据
	if (!cache || cache.cacheTimestamp - nowTimestamp < 10) {
		let authorResult = await get('server-admin/public/ossAuthor')
		if (authorResult.status === 200) {
			authorResult = authorResult.data
		}
		if (!authorResult.success) {
			return authorResult
		}
		cache = {
			data: authorResult.data,
			cacheTimestamp: nowTimestamp + authorResult.data.durationSeconds,
			client: new OSS(authorResult.data),
		}
	}

	let result
	try {
		result = await cache.client.put(`${ dir }/${ fileName }`, file)
	} catch (e) {
		console.log(`上传文件失败： ${ dir }/${ fileName }，错误日志： ${ e }`)
		return {
			success: false,
			msg: '上传文件失败',
		}
	}

	return {
		success: true,
		data: {
			fileName: fileName,
			objectName: result.name,
			url: `https://huidaimeng-app.oss-cn-beijing.aliyuncs.com/${ result.name }`,
		},
	}
}