import removeObsoleteFiles from '~/utils/file/removeObsoleteFiles'

export async function DELETE() {
  await removeObsoleteFiles()

  return new Response('ok')
}
