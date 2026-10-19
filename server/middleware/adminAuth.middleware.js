export const verifyAdmin = (req, res, next) => {
  // Request ke headers ya body se email check karein
  const userEmail = req.headers.email || req.body.email; 

  // Allowed admin emails ki list
  const allowedAdmins = ["xanebfaisal16@gmail.com", "textilehub040@gmail.com"];

  if (allowedAdmins.includes(userEmail)) {
    next(); // Agar in mein se koi ek email hai toh aage jane do
  } else {
    res.status(403).json({ ok: false, message: "Access Denied: Admin only!" });
  }
};