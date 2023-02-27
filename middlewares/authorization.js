
const authUser = (permissions) => {
  return (req, res, next) => {
    const userRole = req.body.role
    if (permissions.includes(userRole)) {
      next();
    } else {
      return res.status(401).json("You do not have permission for this action!");
    }
  }
}

module.exports = {authUser};


// Test json for authUser 
/*

{
  "username": "kingsley",
  "role": admin
},
{
  "username": "esther",
  "role": guest
}

*/