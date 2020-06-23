/**
 * @infor oss 文件管理
 * @path  @/api/OssUpload.js
 * @user  CC
 * @date  2020-06-15 20:03:57
 */

import { get } from '@/api'

const OSS = require('ali-oss')

let cache = null

const getAuthor = async () => {
	const nowTime = new Date().getTime()
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
	return {
		success: true,
		msg: '获取凭证成功',
	}
}

// 上传文件
export const uploadFile = async (dir, file) => {
	const nowTime = new Date().getTime()
	const fileName = Math.ceil(Math.random() * nowTime) + nowTime + `.${ file.name.split('.').pop() }`
	const authorResult = await getAuthor()
	if (!authorResult.success) {
		return authorResult
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

// 删除文件
export const deleteFile = async url => {
	if (!url) {
		return {
			success: false,
			msg: '上传文件失败',
		}
	}
	url = url.replace('https://huidaimeng-app.oss-cn-beijing.aliyuncs.com/', '')

	const authorResult = await getAuthor()
	if (!authorResult.success) {
		return authorResult
	}
	
	try {
		await cache.client.delete(url)
	} catch (e) {
		console.log(`删除文件失败： ${ url }，错误日志： ${ e }`)
		return {
			success: false,
			msg: '删除文件失败',
		}
	}

	return {
		success: true,
		msg: '删除文件成功',
	}
}