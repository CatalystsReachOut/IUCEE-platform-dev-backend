import Event from "../models/Event/Event.js";
import bigPromise from "../middlewares/bigPromise.js";

export const newevent = bigPromise(async (req, res, next) => {
  const { data } = req.body;
  const data1 = JSON.parse(data);

  if (!data1.Title || !data1.College_id) {
    return res.status(400).json({
      success: true,
      message: "All fields are required",
    });
  }

  const existingevent = await Event.find({
    name: data1.Title,
  });
  if (existingevent) {
    return res.status(501).json({
      success: true,
      message: "event already exits",
    });
  } else {
    const event = await Event({
      name: data1.Title,
      description: data1.description,
      College_id: data1.College_id,
      published_date: data1.published_date,
      date_from: data1.date_from,
      google_url: data1.google_url,
    });
    event
      .save()
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
    return res.status(200).json({
      success: true,
      message: "Event added successfully",
    });
  }
});

export const getevent = bigPromise(async (req, res, next) => {
  const events = await Event.find({});
  if (!events) {
    return res.status(404).json({
      success: false,
      message: "There are no events",
    });
  } else {
    return res.status(200).json({
      success: true,
      message: "all events list",
      data: events,
    });
  }
});

export const updatevent = bigPromise(async (req, res, next) => {
  const { update1 } = req.body;
  const ans = Event.find({ Title: update1.Title });
  if (!ans) {
    return res.status(404).json({
      success: false,
      message: "Event with this title does not exist",
    });
  } else {
    Event.findByIdAndUpdate(ans._id, { $set:update1 }, function (err) {
      if (err) {
        console.log(err);
        return;
      }
      return res.status(200).json({
        success: true,
        message: "The Event has been updated successfully",
      });
    });
  }
});

export const deleteevent = bigPromise(async (req, res, next) => {
  const delete1 = {
    title:req.body.title
  };
  const ans = Event.find({ Title: delete1.title });
  if (!ans) {
    return res.status(404).json({
      success: false,
      message: "Event with this title does not exist",
    });
  } else {
    Event.deleteOne({title:delete1.title},function (err) {
      if (err) {
        console.log(err);
        return;
      }
      return res.status(200).json({
        success: true,
        message: "The Event has been deleted successfully",
      });
    });
  }
});