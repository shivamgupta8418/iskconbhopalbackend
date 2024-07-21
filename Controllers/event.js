const Events = require('../Models/events')
const { sendResponse } = require('../utils/sendResponse');
const mongoose = require('mongoose');

const createEvent = async (req, res) => {

   try {
      const requiredFields = [
         "image",
         "heading",
         "date",
         "description"
      ];

      const missingOrEmptyFields = requiredFields.filter(field => {
         const fieldValue = req.body[field];
         return !(fieldValue && fieldValue.trim());
      });

      if (missingOrEmptyFields.length > 0) {
         return sendResponse(res, 400, `Missing or empty fields: ${missingOrEmptyFields.join(", ")}`, false);
      }

      const newModule = await Events.create({
         ...req.body
      });
      // const { id, ...responseData } = newModule.toJSON();
      sendResponse(res, 201, "Event created successfully", true, newModule);
   } catch (error) {
      console.error("Error creating module:", error);
      sendResponse(res, 500, "Internal Server Error", false);
   }
}

// get single booking
const getEvent = async (req, res) => {
   const id = req.params.id

   try {
      const book = await Booking.findById(id)

      res.status(200).json({ success: true, message: "Successful!", data: book })
   } catch (error) {
      res.status(404).json({ success: true, message: "Not Found!" })
   }
}


// get all booking
const getAllEvent = async (req, res) => {

   try {
      const events = await Events.find()

      // res.status(200).json({success:true, message:"Successful!", data:events})
      sendResponse(res, 200, "Fetch Success", true, events);

   } catch (error) {
      sendResponse(res, 500, "Internal Server Error", false);
   }
}

const deleteEvent = async (req, res) => {
   const id = req.params.id;

   try {
      if (!id) {
         return sendResponse(res, 400, "ID is required", false);
      }
      if (!mongoose.Types.ObjectId.isValid(id)) {
         return sendResponse(res, 400, "Invalid ID format", false);
      }

      const event = await Events.findById(id);

      if (!event) {
         return sendResponse(res, 404, "Event not found", false);
      }

      await Events.findByIdAndDelete(id);
      sendResponse(res, 200, "Event deleted successfully", true);
   } catch (error) {
      console.error("Error deleting event:", error);
      sendResponse(res, 500, "Internal Server Error", false);
   }
};






module.exports = { createEvent, getAllEvent, deleteEvent }