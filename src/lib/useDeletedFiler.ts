export function useDeletedFilter(arr: any[]) {
  return arr.filter((item) => item.deleted === false)
}
