import dayjs from 'dayjs'

export const formatTime = (
  time: string | number | Date,
  format = 'YYYY-MM-DD HH:mm:ss'
) => {
  return dayjs(time).format(format)
}

// 1¥=1000000
export const formatMoney = (money: number,isNumber = false, char = '￥') => {
  if(isNumber) return money / 1000000
  else return char + (money / 1000000)
}
