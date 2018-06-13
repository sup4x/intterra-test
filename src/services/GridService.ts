import { GridColumn, GridColumnType, SortingDirection } from '@/models/Grid'

export const getSortFunction = (column: GridColumn<any>, direction: SortingDirection) : (a: any, b: any) => number => {
  const key = column.key
  const isDesc = direction === SortingDirection.DESC
  switch (column.type) {
    case GridColumnType.DATE:
      return (a, b) => {
        const getDate = parseDateByColumn(column)
        const aDate = getDate(a)
        const bDate = getDate(b)
        return isDesc ? bDate - aDate : aDate - bDate
      }
    case GridColumnType.STRING:
      return (a, b) => {
        if (a[key] === null || b[key] === null) {
          return sortNulls(a[key], b[key], isDesc)
        }
        return isDesc ? b[key].length - a[key].length : a[key].length - b[key].length
      }
    case GridColumnType.NUMBER:
      return (a, b) => {
        if (a[key] === null || b[key] === null) {
          return sortNulls(a[key], b[key], isDesc)
        }
        return isDesc ? +a[key] - +b[key] : +b[key] - +a[key]
      }
    default:
      return getDefaultSortFunction(key, direction)
  }
}

const sortNulls = (a: any, b: any, isDesc : boolean): number => {
  if (a === null) {
    return isDesc ? 1 : -1
  }
  if (b === null) {
    return isDesc ? -1 : 1
  }
  return 0
}

export const parseDateByColumn =
    (column: GridColumn<any>) =>
      (item: any) =>
        column.parseToTypeFunc ? column.parseToTypeFunc(item[column.key]) : item[column.key]

const getDefaultSortFunction = (key: string, direction: SortingDirection) => {
  return (a: any, b: any) => direction === SortingDirection.DESC ? a[key] - b[key] : a[key] - b[key]
}
