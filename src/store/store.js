import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex)


const state = { //Ҫ���õ�ȫ�ַ��ʵ�state����
    count: 1,
    //Ҫ���õĳ�ʼ����ֵ
    fid: '' ,//Ҫ�ڵ�¼ҳ��ļ�¼ ��fid
	authorization:1,
};

const mutations = {
    add(state, sum) { //ͬ�ϣ�������Ĳ�������state֮�⻹������Ҫ���ӵ�ֵsum
        state.count += sum;
    },
    upfid(state, fid) {
        state.fid = fid
		console.log("state")
    },
	upauthorization(state, authorization) {
	    state.authorization = authorization
		console.log("state")
	}

};
const actions = {
    add(context, num) { //ͬ��ע�ͣ�numΪҪ�仯���β�
        context.commit('add', num)
    },
    upfid(context, fid) {
		context.fid = fid
		context.commit('upfid', fid)
    },
	upauthorization(context, authorization) {
	  context.authorization = authorization
	  console.log(context)
	  console.log("context")
	}
};

const store = new Vuex.Store({
    state,
    actions,
    mutations
});

// var store = new Vuex.Store({
//     state:{
//         products:[
//             {name:"token"}
//         ],
// 		authorization:1,
//     },
// 	mutations: {
// 	    increment (state) {
// 	      state.authorization++
// 	    }
// 	}
// })

export default store