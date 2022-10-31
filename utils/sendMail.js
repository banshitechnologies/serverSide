import  nodemailer  from "nodemailer";

// async..await is not allowed in global scope, must use a wrapper
 async function main(req,res,next) {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing


  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    ignoreTLS: false,
    secure: false,
    auth: {
      user: "testbanshi123@gmail.com", // generated ethereal use
      pass: "sysxccircrzkmazm", // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: 'testbanshi123@gmail.com', // sender address
    to: "saurav.banshitechnologies@gmail.com, washim.banshitechnologies@gmail.com", // list of receivers
    subject: "Hello ✔", // Subject line
    text: "order success ..", // plain text body
    html: "<b>Khub BUsy? Mail Gele Ak BAr Hasben please</b>", // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  next();
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

export default main;