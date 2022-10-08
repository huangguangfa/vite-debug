import { useHttp } from '../hooks'

const { $get } = useHttp()

export const getUserName = () => $get('xxxx')
