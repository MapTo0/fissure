import User from './../models/user/UserModel'
import Friend from './../models/friend/FriendModel'
import helper from './../utils/helpers'

const FriendException = (code, message) => {
  return {
    code: code,
    message: message
  }
}

const addFriendToUserFriendList = async (req, res, next) => {
  try {
    let {userId, friend} = req.body
    let item = await Friend.findOne({user: userId}, (err, item) => {
      if (err) {
        return res.status(400).send(helper.response([], 400, true, [err]))
      }
      if (!item) {
        let item = new Friend({user: userId, friends: [friend]})
        item = item.save()
        return res.status(200).send(helper.response(item))
      }

      if (item) {
        let friends = item.friends
        if (friends.indexOf(friend) < 0) {
          item.friends.push(friend)
          item = item.save()
          return res.status(200).send(helper.response(item))
        }

        if (friends.indexOf(friend) >= 0) {
          return res.status(200).send(helper.response([], 200, true, ['Exist']))
        }
      }
    })
  } catch (e) {
    next(e)
  }
}

const removeFriendToUserFriendList = async (req, res, next) => {
  try {
    let {userId, friend} = req.params
    let item = await Friend.findOne({user: userId}, (err, item) => {
      if (err) {
        return res.status(400).send(helper.response([], 400, true, [err]))
      }

      if (item) {
        item.friends.pull({_id: friend})
        item.save()

        return res.status(200).send(helper.response(item))
      }
    })

    return res.status(200).send(helper.response([]))
  } catch (e) {
    next(e)
  }
}

const searchFriendByName = async (req, res, next) => {
  try {
    let {name} = req.query
    let [firstname, lastname] = name.split(' ')
    let items = await User.find({
      $or: [{firstname: firstname}, {lastname: lastname}]
    }).select('-password')

    res.status(200).send(helper.response(items))
  } catch (e) {
    next(e)
  }
}

const getFriendListByUser = async (req, res, next) => {
  try {
    let {userId} = req.params

    let item = await Friend.findOne({user: userId})
      .populate('friends', '-password')
      .populate('user', '-password')

    res.status(200).send(helper.response(item))
  } catch (e) {
    next(e)
  }
}

export default {
  addFriendToUserFriendList,
  removeFriendToUserFriendList,
  searchFriendByName,
  getFriendListByUser
}
