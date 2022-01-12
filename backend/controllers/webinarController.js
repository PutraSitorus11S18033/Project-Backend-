import Webinar from "../models/webinarModel.js";
import asyncHandler from "express-async-handler";

const getWebinar = asyncHandler(async (req, res) => {
  const webinar = await Webinar.find({ user: req.user._id });
  res.json(webinar);
});

const getWebinarById = asyncHandler(async (req, res) => {
  const webinar = await Webinar.findById(req.params.id);

  if (webinar) {
    res.json(webinar);
  } else {
    res.status(404).json({ message: "Webinar not found" });
  }

  res.json(webinar);
});


const CreateWebinar = asyncHandler(async (req, res) => {
  const { title, content, category } = req.body;

  if (!title || !content || !category) {
    res.status(400);
    throw new Error("Please Fill all the feilds");
    return;
  } else {
    const webinar = new Webinar({ user: req.user._id, title, content, category });

    const createdWebinar = await webinar.save();

    res.status(201).json(createdWebinar);
  }
});

const DeleteWebinar = asyncHandler(async (req, res) => {
  const webinar = await Webinar.findById(req.params.id);

  if (webinar.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("You can't perform this action");
  }

  if (webinar) {
    await webinar.remove();
    res.json({ message: "Webinar Removed" });
  } else {
    res.status(404);
    throw new Error("Webinar not Found");
  }
});


const UpdateWebinar = asyncHandler(async (req, res) => {
  const { title, content, category } = req.body;

  const webinar = await Webinar.findById(req.params.id);

  if (webinar.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("You can't perform this action");
  }

  if (webinar) {
    webinar.title = title;
    webinar.content = content;
    webinar.category = category;

    const updatedWebinar = await webinar.save();
    res.json(updatedWebinar);
  } else {
    res.status(404);
    throw new Error("Webinar not found");
  }
});

export { getWebinarById, getWebinar, CreateWebinar, DeleteWebinar, UpdateWebinar };
