export const strict = false;
export const state = () => ({
	config:{
		api_url: '',
		auth: {},
		token: {},
		profiles:{},
		event:{},
		event_data: {},
		logout: {},
		logout_data: {},
		carts: []
	},
})

export const mutations = {
	CONFIG_API_URL(state,url){
		state.config.api_url=url
	},

	CONFIG_AUTH_LOGIN(state, data, login=true){
		console.log(login)
		if(login){
			state.config.auth=localStorage.setItem('token', data)
		}else{
			localStorage.removeItem('token')
		}
		// state.config.auth=option ? localStorage.setItem('token', data) : localStorage.removeItem('token')
	},

	CONFIG_ADD_CART(state, data){
		console.log(data)
		state.config.carts.push(data)
		localStorage.setItem('carts', JSON.stringify(state.config.carts))
	},

	CONFIG_CHECK_LOGIN(state, name){
		state.config.token= localStorage.getItem(name) ? JSON.parse(localStorage.getItem('token')) : 'No token'
	},

	CONFIG_SET_EVENT_LOGIN(state, data){
		state.config.event = localStorage.setItem('event', data)
	},

	CONFIG_GET_EVENT_LOGIN(state, name){
		state.config.event_data = localStorage.getItem(name) ? JSON.parse(localStorage.getItem(name)) : ''
	},

	CONFIG_SET_PROFILE_LOGOUT(state, data){
		state.config.logout = localStorage.setItem('logout', data)
	},

	CONFIG_GET_PROFILE_LOGOUT(state, name){
		state.config.logout_data = localStorage.getItem(name) ? JSON.parse(localStorage.getItem(name)) : ''
	}
}

export const actions = {
	storeConfigApiUrl({commit}, url){
		commit('CONFIG_API_URL', url)
	},

	storeConfigAuth({commit}, data){
		commit('CONFIG_AUTH_LOGIN', data)
	},

	storeConfigCartEvent({commit}, data) {
		commit('CONFIG_ADD_CART', data)
	},

	checkAuthLogin({commit}, name){
		commit('CONFIG_CHECK_LOGIN', name)
	},
	

	setEventToLogin({commit}, data){
		commit('CONFIG_SET_EVENT_LOGIN', data)
	},

	getEventDataToLogin({commit}, name){
		commit('CONFIG_GET_EVENT_LOGIN', name)
	},

	setProfileLogout({commit}, name){
		commit('CONFIG_SET_PROFILE_LOGOUT', name)
	},

	getProfileLogout({commit}, name){
		commit('CONFIG_GET_PROFILE_LOGOUT', name)
	}

}	

export const getters = {
	ConfigApiUrl(state){
		return state.config.api_url
	},
	ConfigAuthLogin(state){
		return state.config.auth
	},
	ConfigCheckLogin(state){
		return state.config.token
	},

	ConfigSetEventLogin(state){
		return state.config.event
	},

	ConfigEventDataLogin(state){
		return state.config.event_data
	},

	ConfigProfileLogout(state){
		return state.config.logout
	},

	ConfigProfileDataLogout(state){
		return state.config.logout_data
	}
}
