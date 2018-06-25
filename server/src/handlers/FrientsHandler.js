import User from './../models/user/UserModel'
import Friend from './../models/friend/FriendModel'
import Activity from './../models/activity/ActivityModel'
import helper from './../utils/helpers'

const addFriendToUserFriendList = async (req, res, next) => {
  try {
    let {friend} = req.body
    await Friend.findOne({user: req.user._id}, (err, item) => {
      if (err) {
        return res.status(400).send(helper.response([], 400, true, [err]))
      }
      if (!item) {
        let item = new Friend({user: req.user._id, friends: [friend]})
        item = item.save()
        return res.status(200).send(helper.response(item))
      }

      if (item) {
        let friends = item.friends
        if (friends.indexOf(friend) < 0) {
          item.friends.push(friend)
          item = item.save()

          // Add log
          let act = new Activity({
            userId: req.user._id,
            target: 'friend',
            action: 'added'
          })
          act.save()

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

const addFriendToUserFriendListByEmail = async (req, res, next) => {
  try {
    let {email} = req.body
    if (!email) {
      return res.status(400).send(helper.response([], 400, true, ['Email is required']))
    }
    let fUser = await User.findOne({email: email})

    if (!fUser) {
      return res.status(400).send(helper.response([], 400, true, ['This user does not exist']))
    }

    await Friend.findOne({user: req.user._id}, async (err, item) => {
      if (err) {
        return res.status(400).send(helper.response([], 400, true, [err]))
      }
      if (!item) {
        let item = new Friend({user: req.user._id, friends: [fUser._id]})
        item = await item.save()
        // Add log
        let act = new Activity({
          userId: req.user._id,
          target: 'friend',
          action: 'added'
        })
        act.save()

        return res.status(200).send(helper.response(item))
      }

      if (item) {
        let friends = item.friends
        if (friends.indexOf(fUser._id) < 0) {
          item.friends.push(fUser._id)
          item = await item.save()

          // Add log
          let act = new Activity({
            userId: req.user._id,
            target: 'friend',
            action: 'added'
          })
          act.save()

          return res.status(200).send(helper.response(item))
        }

        if (friends.indexOf(fUser._id) >= 0) {
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
    let {friend} = req.params
    await Friend.findOne({user: req.user._id}, (err, item) => {
      if (err) {
        return res.status(400).send(helper.response([], 400, true, [err]))
      }

      if (item) {
        item.friends.pull({_id: friend})
        item.save()

        // Add log
        let act = new Activity({
          userId: req.user._id,
          target: 'friend',
          action: 'removed'
        })
        act.save()

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
    let item = await Friend.findOne({user: req.user._id})
      .populate('friends', '-password')
      .populate('user', '-password')

    res.status(200).send(helper.response(item))
  } catch (e) {
    next(e)
  }
}

export default {
  addFriendToUserFriendList,
  addFriendToUserFriendListByEmail,
  removeFriendToUserFriendList,
  searchFriendByName,
  getFriendListByUser
}
