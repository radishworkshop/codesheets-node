import axios from 'axios'
const CODESHEETS_HOST = process.env.CODESHEETS_HOST || 'https://codesheets.com'

interface Metadata {
  title?: string
  emoji?: string
}

interface Opts {
  apiKey: string
  apiVersion?: string
}

async function makeRequest(method: 'get' | 'post', action: string, opts: Opts, data?: any) {
  const apiVersion = opts.apiVersion || 'v1'
  const apiKey = opts.apiKey
  const url = `${CODESHEETS_HOST}/api/${apiVersion}/s/${action}`
  const headers = { 
    'Authorization': `Bearer ${apiKey}`
  }
  if (!apiKey) { throw new Error('No API key provided') }

  if (method === 'get') {
    return await axios.get(url, { headers })
  }
  else {
    return await axios.post(url, data, { headers })
  }
}

async function createCodesheet(opts: Opts, metadata: Metadata) {
  const { data } = await makeRequest('post', 'new', opts, { metadata })
  return data.id
}

async function getCodesheetPage(id: string, page: number, opts: Opts) {
  const action = `${id}/${page}`
  const { data } = await makeRequest('get', action, opts)
  return data
}

async function setCodesheetPage(id: string, page: number, rows: string[][], opts: Opts) {
  const action = `${id}/${page}`
  await makeRequest('post', action, opts, { rows })
}

export { createCodesheet, getCodesheetPage, setCodesheetPage }