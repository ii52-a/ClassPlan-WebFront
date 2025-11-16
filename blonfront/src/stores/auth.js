import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import router from '@/router'

const USER_KEY = "PLAN_USER_KEY"
const TOKEN_KEY = "PLAN_TOKEN_KEY"
export const useAuthStore = defineStore('counter', () => {
  let _user = ref({})
  let _token = ref("")
  function setUserToken(user, token) {
    _user.value = user;
    _token.value = token;
    localStorage.setItem(USER_KEY, JSON.stringify(user));
    localStorage.setItem(TOKEN_KEY, token);
  }
  let get_user = computed(() => {
    if (Object.keys(_user.value) == 0) {
      let user_str = localStorage.getItem(USER_KEY);
      if (user_str) _user.value = JSON.parse(user_str)
    }
    return _user.value
  })
  let get_token = computed(() => {
    if (!_token.value) {
      let token_str = localStorage.getItem(TOKEN_KEY);
      if (token_str) _token.value = token_str;
    }
    return _token.value;
  })
  const is_logined = computed(() => {
    if (Object.keys(get_user.value).length === 0 && !get_token.value) return false;
    return true;
  })
  const clearUserToken = () => {
    setTimeout(() => {
      _user.value = {}
      _token.value = ""
      localStorage.removeItem(USER_KEY);
      localStorage.removeItem(TOKEN_KEY);
    }, 0)
  }
  return { setUserToken, get_user, get_token,is_logined,clearUserToken }
})
