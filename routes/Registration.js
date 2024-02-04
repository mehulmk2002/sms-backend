const express=require("express")
const router=express.Router()
const path = require('path');
const multer = require('multer');
const connection = require("../dbconnection");
// Set up multer for handling file uploads
const storage = multer.diskStorage({
    destination: './uploads',
    filename: function (req, file, cb) {
      cb(
        null,
        file.fieldname +
          '-' +
          Date.now() +
          path.extname(file.originalname)
      );
    },
  });
  
  const upload = multer({ storage });
  
  // Route to handle file uploads
  router.post('/', upload.fields([
    { name: 'upload_identity_document' },
    { name: 'upload_photo' },
    { name: 'upload_last_qualification_marksheet' },
  ]), (req, res) => {
    const {
        first_name,
        middle_name,
        last_name,
        date_of_birth,
        gender,
        address,
        email,
        phone_number,
        guardian_name,
        guardian_phone_number,
        last_qualification,
        board_university,
        percentage,
      } = req.body;
    // Access uploaded file information using req.files
    let current_Date = new Date().toJSON().slice(0, 10);
    const upload_identity_document = req.files['upload_identity_document'][0].filename;
    const upload_photo = req.files['upload_photo'][0].filename;
    const upload_last_qualification_marksheet = req.files['upload_last_qualification_marksheet'][0].filename;
  
    // Handle the files and form data as needed
  
    const sql =
    'INSERT INTO student (first_name, middle_name, last_name, Date_Of_Birth, gender, address, email, phone_number, guardian_name, guardian_phone_number, last_qualification, board_university, percentage,register_date, upload_identity_document, upload_photo, upload_last_qualification_marksheet) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    
    connection.query(
    sql,
    [
      first_name,
      middle_name,
      last_name,
      date_of_birth,
      gender,
      address,
      email,
      phone_number,
      guardian_name,
      guardian_phone_number,
      last_qualification,
      board_university,
      percentage,
      current_Date,
      upload_identity_document,
      upload_photo,
      upload_last_qualification_marksheet,
    ],
    (error, results) => {
      if (error) {
        console.log(error);
        res.status(500).json({ message: 'Error uploading files' });
      } else {
        res.status(200).json({ message: 'Files uploaded successfully' });
      }
    }
  );
  });
  
  module.exports=router