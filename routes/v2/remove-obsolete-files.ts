import removeObsoleteFiles from '~/utils/file/removeObsoleteFiles'

export default defineEventHandler(async () => {
  await removeObsoleteFiles()

  return 'ok'
})
