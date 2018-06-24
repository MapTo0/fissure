import {isEmpty} from 'lodash'
import JSONAPISerializer from 'json-api-serializer'

let response = (data, code, error, messages) => {
  return {
    status: 'OK',
    code: isEmpty(code) ? 200 : 400,
    messages: !isEmpty(messages) ? messages : [],
    result: !isEmpty(data) ? data : {}
  }
}

let serialize = (namespace, fields, data, oposite) => {
  const Serializer = new JSONAPISerializer()
  let whitelist = []
  if (isEmpty(oposite)) {
    whitelist = !isEmpty(fields) ? fields : []
  }

  let blacklist = []
  if (oposite === true) {
    blacklist = !isEmpty(fields) ? fields : []
  }

  const options = {
    id: '_id',
    links: {
      self: data => {
        return '/api/v1/' + namespace + '/' + data._id
      }
    }
  }

  if (blacklist.length > 0) {
    options.blacklist = blacklist
  }

  if (whitelist.length > 0) {
    options.whitelist = whitelist
  }

  Serializer.register(namespace, options)

  return Serializer.serialize(namespace, data)
}

export default {
  response,
  serialize
}
