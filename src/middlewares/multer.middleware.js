import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/temp");
  },
  filename: function (req, file, cb) {
    // console.log(file)
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix);
    // originalname (but not good, username ke 5 file aje to oh override kr skta hai)
    // (but yh operation itna tiney amount ke lye rhnega apne server pai, thore der ke liye rhegi file, fir hm usko upload kr dai gai  )
  },
});

export const upload = multer({ storage });
