import MOCK from './MOCK.json'

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))
const fetchData = async (id=[1,10]) => {
  delay(Math.random()*1000)
  return MOCK.slice(id[0], id[id.length-1])
}
export default fetchData