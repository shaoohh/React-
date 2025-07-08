import axios from '@/api/index.ts';

//注册的API接口

export const regApi =(data:FormData)=>axios.post('/api/reg',data)