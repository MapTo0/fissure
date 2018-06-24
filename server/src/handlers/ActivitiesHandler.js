import helper from './../utils/helpers'
import Activity from './../models/activity/ActivityModel'

const fields = ['userId', 'target', 'action']

const getActivities = async (req, res, next) => {
  try {
    let rows = await Activity.find({userId: req.user._id}).populate(
      'userId',
      '-password'
    )

    res
      .status(200)
      .send(helper.response(helper.serialize('activities', fields, rows)))
  } catch (e) {
    next(e)
  }
}

export default {
  getActivities
}
