import multer from "multer";

const storage = multer.diskStorage({
    filename: (req, file, cb)=>{
        cb(null, `${Date.now}-${file.originalname}`)
    },
});

const fileFilter = (req, file, cb)=>{
    if(file.mimetype==='application/pdf'){
        cb(null, true);
    }else{
        cb(new Error("Only PDF files are allowed"), false);
    }
}

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
});

export default upload;