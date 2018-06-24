import Group from './../models/group/GroupModel'
import helper from './../utils/helpers'
import Friend from '../models/friend/FriendModel'
import Activity from '../models/activity/ActivityModel'

const getGroups = async (req, res, next) => {
  try {
    let groups = await Group.find({userId: req.user._id})

    if (!groups) {
      return res
        .status(200)
        .send(helper.response('', 200, true, ['Missing data']))
    }
    console.log(req.user._id)
    res
      .status(200)
      .send(
        helper.response(
          helper.serialize(
            'groups',
            ['name', 'type', 'friends', 'userId'],
            groups
          )
        )
      )
  } catch (e) {
    next(e)
  }
}

const createGroup = async (req, res, next) => {
  try {
    req.check('name', 'name is required').notEmpty()
    req.check('type', 'type is required').notEmpty()
    req
      .check('type', 'Wrong type | allowed: Apartment, House, Trip, Other')
      .inArray(['Apartment', 'House', 'Trip', 'Other'])

    let errors = req.validationErrors()
    if (errors) {
      errors = errors.map(item => item.msg) || []

      return res.status(422).send(helper.response('', 422, true, errors))
    }

    let {name, type} = req.body
    await Group.find({name: name, userId: req.user._id}, async (err, item) => {
      if (err) {
        return res.status(400).send(helper.response([]))
      }

      if (item.length > 0) {
        return res
          .status(400)
          .send(helper.response([], 400, true, ['Group exists']))
      }

      if (item.length === 0) {
        let group = new Group({name: name, type: type, userId: req.user._id})
        group = await group.save()
        // Add log
        let act = new Activity({
          userId: req.user._id,
          target: 'group',
          action: 'created'
        })
        act.save()

        return res
          .status(200)
          .send(
            helper.response(helper.serialize('groups', ['name', 'type'], group))
          )
      }
    })
  } catch (e) {
    next(e)
  }
}

const updateGroup = (req, res, next) => {
  try {
    let {groupId} = req.params
    Group.findOne({_id: groupId, userId: req.user._id}, async (err, item) => {
      if (err) {
        return next(err)
      }

      if (item) {
        let {name, type} = req.body
        item.name = name || item.name
        item.type = type || item.type
        try {
          item = await item.save()

          // Add log
          let act = new Activity({
            userId: req.user._id,
            target: 'group',
            action: 'updated'
          })
          act.save()
        } catch (e) {
          return next(e)
        }

        res
          .status(200)
          .send(
            helper.response(
              helper.serialize('groups', ['name', 'type', 'friends'], item)
            )
          )
      }

      if (!item) {
        res
          .status(200)
          .send(helper.response([], 200, false, ['Group does not exist']))
      }
    })
  } catch (e) {
    next(e)
  }
}

const findGroup = (req, res, next) => {
  try {
    let {groupId} = req.params
    Group.findOne({_id: groupId, userId: req.user._id}, (err, item) => {
      if (err) {
        next(err)
      }

      if (item) {
        res
          .status(200)
          .send(
            helper.response(
              helper.serialize('groups', ['name', 'type', 'friends'], item)
            )
          )
      }

      if (!item) {
        res
          .status(200)
          .send(helper.response([], 200, false, ['Group does not exist']))
      }
    }).populate('friends')
  } catch (e) {
    next(e)
  }
}

const addMemberToGroup = (req, res, next) => {
  try {
    let {groupId} = req.body
    Group.findOne({id: groupId, userId: req.user._id}, async (err, item) => {
      if (err) {
        return res.status(400).send(helper.response([], 400, true, [err]))
      }
      if (item) {
        let {friend} = req.body
        req.check('friend', 'friend is required').notEmpty()
        let errors = req.validationErrors()
        if (errors) {
          errors = errors.map(item => item.msg) || []

          return res.status(422).send(helper.response('', 422, true, errors))
        }

        let friendlist = await Friend.find({
          userId: req.user._id,
          friends: {$in: [friend]}
        })
        if (!friendlist.length) {
          return res
            .status(200)
            .send(
              helper.response([], 200, true, [
                'Missing friend from your friend list'
              ])
            )
        }

        let friends = item.friends
        if (friends.indexOf(friend) < 0) {
          item.friends.push(friend)
          item.userId = req.user._id
          item = await item.save()
          // Add log
          let act = new Activity({
            userId: req.user._id,
            target: 'group',
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

const removeMembersToGroup = (req, res, next) => {
  try {
    let {groupId} = req.body
    Group.findOne({id: groupId, userId: req.user._id}, async (err, item) => {
      if (err) {
        return res.status(400).send(helper.response([], 400, true, [err]))
      }
      if (item) {
        let {friends} = req.body
        req.check('friends', 'friends is required').notEmpty()
        let errors = req.validationErrors()
        if (errors) {
          errors = errors.map(item => item.msg) || []

          return res.status(422).send(helper.response('', 422, true, errors))
        }

        let friendlist = await Friend.find({
          userId: req.user._id,
          friends: {$in: friends}
        })
        if (!friendlist.length) {
          return res
            .status(200)
            .send(
              helper.response([], 200, true, [
                'Missing friend from your friend list'
              ])
            )
        }

        friends.forEach(friend => {
          if (item.friends.indexOf(friend) >= 0) {
            item.friends.pull({_id: friend})
          }
        })

        item = await item.save()

        // Add log
        let act = new Activity({
          userId: req.user._id,
          target: 'group',
          action: 'removed'
        })
        act.save()

        return res.status(200).send(helper.response(item))
      }
    })
  } catch (e) {
    next(e)
  }
}

export default {
  getGroups,
  findGroup,
  createGroup,
  updateGroup,
  addMemberToGroup,
  removeMembersToGroup
}
