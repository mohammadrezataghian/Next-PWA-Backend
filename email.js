const nodemailer = require("nodemailer");
const path = require("path");
const fs = require("fs");
const sendEmail_NO_Formated = async function (data, config) {
  try {
    const messageId = new Date().getTime();
    let _Config = config
    //  let _Config = JSON.parse(
    //fs.readFileSync(path.join(__dirname, "emailConfig.json"), {
    //  encoding: "utf-8",
    // })
    //);
    let transporter = nodemailer.createTransport(_Config.transporter);

    let info = await transporter.sendMail({
      from: `${_Config.others.title} <${_Config.transporter.auth.user}>`,
      to: data.Reciveremail,
      subject: data.subject,
      html: data.html,
      priority: "high",
      messageId: messageId,
    });

    var obj = {
      response: info.response,
      accepted: info.accepted,
      messageId: info.messageId,
    };
    console.log(obj);

    if (info.messageId === messageId) {
      return { result: "OK", message: "", messageId: messageId };
    } else {
      return { result: "NOK", message: info.response, messageId: messageId };
    }
  } catch (error) {


    return { result: "NOK", message: error.message, messageId: -1 };
  }
};
module.exports = async (req, res, next) => {

  try {
    var input = req.body;

    var result = await sendEmail_NO_Formated(
      input.data,
      input.Config
    );
    if (result && result.result === "OK") { res.status(200).send({ MessageId: result.messageId, Status: "OK", Message: result.message }); } else { res.status(403).send({ MessageId: result.messageId, Status: "NOK", Message: result.message }); }
  } catch (error) {
    res.status(501).send({ MessageId: -1, Status: "NOK", Message: result.message + " \n" + error.message });
  }
};
