import moment from 'moment'

export const truncate = (str, len) => {
  if (str.length > len && str.length > 0) {
    let newStr = str + ' '
    newStr = str.substr(0, len)
    newStr = str.substr(0, newStr.lastIndexOf(' '))
    newStr = newStr.length > 0 ? newStr : str.substr(0, len)
    return newStr + '...'
  }
  return str
}

export const stripTags = (str) => str.replace(/<(?:.|\n)*?>|&nbsp;/gm, '')

export const formatDate = (date, format) => moment(date).format(format)
