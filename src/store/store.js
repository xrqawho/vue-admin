import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex)


const state = { //要设置的全局访问的state对象
    count: 1,
    //要设置的初始属性值
    fid: '' ,//要在登录页面的记录 的fid
	authorization:1,
};

const mutations = {
    add(state, sum) { //同上，这里面的参数除了state之外还传了需要增加的值sum
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
    add(context, num) { //同上注释，num为要变化的形参
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