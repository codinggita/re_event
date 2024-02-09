import EventModel from '../models/event.js';
import UserModel from '../models/user.js';
import { nanoid } from 'nanoid';
import { ObjectId } from 'mongodb';
import bcrypt from 'bcrypt';
import QRCode from 'qrcode';
import nodemailer from 'nodemailer';
import fs from 'fs';
import path from 'path';

export const heyyo = async (req, res) => {
    res.send('Heyyo wassup!');
}

export const createEvent = async (req, res) => {
    try {
        const eventCode = nanoid(6);
        const newEvent = new EventModel({
            ...req.body,
            eventcode: eventCode,
        });
        const savedEvent = await newEvent.save();
        console.log('Successfully added new event!');
        res.status(201).json(
            {
                "message": "Successfully added new event!",
                "eventcode": eventCode,
            }
        );
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const getAllEvents = async (req, res) => {
    try {
        const events = await EventModel.find();
        res.status(200).json(events);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const getEvents = async (req, res) => {
    try {
        const events = await EventModel.find({}, { eventname: 1, eventdate: 1, eventtime: 1, _id: 0, eventcreatedby: 1, eventstatus: 1, description: 1, eventbanner: 1, eventlocation: 1, eventcode: 1 });
        res.status(200).json(events);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}


export const getEventById = async (req, res) => {
    try {
        const id = req.params.id;

        const event = await EventModel.findOne({ eventcode: id });
        const currentViews = event.views || 0;
        // console.log(currentViews)

        const updatedEvent = await EventModel.findOneAndUpdate(
            { eventcode: id },
            { $set: { views: currentViews + 1 } },
            { new: true } // Return the updated document
        );

        await updatedEvent.save();
        res.status(200).json(updatedEvent);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}


export const addQuestionsToEvent = async (req, res) => {
    try {
        const { id } = req.params;
        const { questions } = req.body;
        const existingEvent = await EventModel.findOne({ eventcode: id });

        if (!existingEvent) {
            return res.status(404).json({ error: 'Event not found' });
        }

        existingEvent.questions = [...existingEvent.questions, ...questions];
        const updatedEvent = await existingEvent.save();
        res.status(200).json(updatedEvent);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const editEvent = async (req, res) => {
    try {
        const { id } = req.params;

        const updatedEvent = await EventModel.findOneAndUpdate(
            { eventcode: id },
            { $set: req.body },
            { new: true }
        );

        if (!updatedEvent) {
            return res.status(404).json({ error: 'Event not found' });
        }

        // console.log('Successfully updated event:', updatedEvent);
        res.status(200).json('Event updated successfully');
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


export const registerUserForEvent = async (req, res) => {
    const { eventcode } = req.params;
    const { userid, email } = req.body;

    try {
        // Find the user by ID
        const user = await UserModel.findOne({ _id: userid });

        // Check if the user is found
        if (!user) {
            return res.status(206).json({ error: 'User not found.' });
        }

        // Check if the event is already registered
        if (user.registeredEvents.includes(eventcode)) {
            return res.status(205).json({ message: 'User is already registered for this event.' });
        }

        // Update the user model to add the registered event
        // await UserModel.updateOne({ _id: userid }, { $push: { registeredEvents: eventcode } });

        res.status(200).json({ message: 'Successfully registered for event!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};



export const deleteEvent = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedEvent = await EventModel.findOneAndDelete({ eventcode: id });

        if (!deletedEvent) {
            return res.status(404).json({ error: 'Event not found' });
        }

        res.status(200).json({ message: 'Event deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
export const checkregisterevent = async (req, res) => {
    const { eventcode } = req.params;
    const { userid, email } = req.body;

    try {
        // Find the user by ID
        const user = await UserModel.findOne({ _id: userid });

        // Check if the user is found
        if (!user) {
            return res.status(206).json({ error: 'User not found.' });
        }

        // Check if the event is already registered
        if (user.registeredEvents.includes(eventcode)) {
            return res.status(205).json({ message: 'User is already registered for this event.' });
        }

        // Update the user model to add the registered event
        await UserModel.updateOne({ _id: userid }, { $push: { registeredEvents: eventcode } });

        res.status(200).json({ message: 'Successfully registered for event!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};



export const neweventAddUser = async (req, res) => {
    const { eventcode } = req.params;
    const { _uid, email } = req.body;

    const qrUniqueCode = nanoid(8);
    // console.log(eventcode, _uid, email)


    try {
        // Find the event by eventcode
        const event = await EventModel.findOne({ eventcode });
        // console.log(event)
        if (!event) {
            return res.status(404).json({ error: 'Event not found' });
        }

        // Check if the user is already registered for the event
        const isUserAlreadyRegistered = event.registeredUsers.find(
            (user) => user.email === email
        );

        const saltRounds = 10;
        const hashedQRCode = await bcrypt.hash(qrUniqueCode, saltRounds);
        if (isUserAlreadyRegistered) {

            const qrCodeDataUrl = await QRCode.toDataURL(hashedQRCode);
                sendRSVPEmail(email, event, qrCodeDataUrl);

            return res
                .status(205)
                .json({ message: 'User is already registered for this event' });
        }
        // Add the user to the registeredUsers array



        const updatedEvent = await EventModel.updateOne(
            { eventcode },
            {
                $addToSet: {
                    registeredUsers: {
                        userid: _uid,
                        qrUniqueCode: hashedQRCode,
                        email,
                    },
                },
            }
        );

        // Check if the user was successfully added to the Event model
        if (updatedEvent.modifiedCount > 0) {
            // Add the hashed QR code to the User model
            const updatedUser = await UserModel.updateOne(
                { _id: _uid },
                {
                    $addToSet: {
                        registeredEvents: {
                            eventcode: eventcode,
                            qrUniqueCode: hashedQRCode,
                        },
                    },
                }
            );

            if (updatedUser.modifiedCount > 0) {
                const qrCodeDataUrl = await QRCode.toDataURL(hashedQRCode);
                sendRSVPEmail(email, event, qrCodeDataUrl);
                res.status(200).json({ message: 'User registered for the event successfully', hashedQRCode });
            } else {
                // Handle the case where the User model update failed
                res.status(206).json({ message: 'User registration failed in the User model' });
            }
        } else {
            res.status(206).json({ message: 'Event not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const sendRSVPEmail = async (userEmail, eventDetails, qrCodeDataUrl) => {
    // const currentModuleURL = new URL(import.meta.url);
    // const currentDirPath = path.dirname(currentModuleURL.pathname);

    // Construct the path to the HTML template
    // const templatePath = path.join(currentDirPath, 'eventTemplate', 'index.html');

    // const htmlContent

    // ... Existing email setup code
    const qrCodeImagePath = path.join(process.cwd(), 'QR_Code.png');

    try {
        await fs.promises.writeFile(qrCodeImagePath, qrCodeDataUrl.split('base64,')[1], 'base64');
        console.log('QR Code image saved successfully.');
    } catch (error) {
        console.error('Error saving QR Code image:', error);
    }
    

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'top10world1210@gmail.com',
          pass: 'izgm dfzw vxri uajf',
        },
      });
    const mailOptions = {
        from: 'your-email@gmail.com',
        to: userEmail,
        subject: 'RSVP Pass and Event Details',
        html: `<!DOCTYPE HTML
        PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
      <html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml"
        xmlns:o="urn:schemas-microsoft-com:office:office">
      
      <head>
        <!--[if gte mso 9]>
      <xml>
        <o:OfficeDocumentSettings>
          <o:AllowPNG/>
          <o:PixelsPerInch>96</o:PixelsPerInch>
        </o:OfficeDocumentSettings>
      </xml>
      <![endif]-->
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta name="x-apple-disable-message-reformatting">
        <!--[if !mso]><!-->
        <meta http-equiv="X-UA-Compatible" content="IE=edge"><!--<![endif]-->
        <title></title>
      
        <style type="text/css">
          @media only screen and (min-width: 520px) {
            .u-row {
              width: 500px !important;
            }
      
            .u-row .u-col {
              vertical-align: top;
            }
      
            .u-row .u-col-33p33 {
              width: 166.65px !important;
            }
      
            .u-row .u-col-50 {
              width: 250px !important;
            }
      
            .u-row .u-col-66p67 {
              width: 333.35px !important;
            }
      
          }
      
          @media (max-width: 520px) {
            .u-row-container {
              max-width: 100% !important;
              padding-left: 0px !important;
              padding-right: 0px !important;
            }
      
            .u-row .u-col {
              min-width: 320px !important;
              max-width: 100% !important;
              display: block !important;
            }
      
            .u-row {
              width: 100% !important;
            }
      
            .u-col {
              width: 100% !important;
            }
      
            .u-col>div {
              margin: 0 auto;
            }
          }
      
          body {
            margin: 0;
            padding: 0;
            border: #000000;
            background-color: #000000;
          }
      
          table,
          tr,
          td {
            vertical-align: top;
            border-collapse: collapse;
          }
      
          p {
            margin: 0;
            border: #000000;
          }
      
          .ie-container table,
          .mso-container table {
            table-layout: fixed;
          }
      
          * {
            line-height: inherit;
          }
      
          a[x-apple-data-detectors='true'] {
            color: inherit !important;
            text-decoration: none !important;
          }
      
          table,
          td {
            color: #000000;
          }
        </style>
      
      
      
      </head>
      
      <body class="clean-body u_body"
        style="margin: 0;padding: 0;-webkit-text-size-adjust: 100%; border: #000000;  border-color: #000000; background-color: #e7e7e7;color: #000000">
        <!--[if IE]><div class="ie-container"><![endif]-->
        <!--[if mso]><div class="mso-container"><![endif]-->
        <table
          style=" border: #000000; border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;min-width: 320px;Margin: 0 auto;background-color: #e7e7e7;width:100%"
          cellpadding="0" cellspacing="0">
          <tbody>
            <tr style="vertical-align: top">
              <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
                <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td align="center" style="background-color: #e7e7e7;"><![endif]-->
      
      
      
                <div class="u-row-container" style="padding: 0px;background-color: #ffffff">
                  <div class="u-row"
                    style="margin: 0 auto;min-width: 320px;max-width: 500px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #ffffff;">
                    <div
                      style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
                      <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: #ffffff;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:500px;"><tr style="background-color: #ffffff;"><![endif]-->
      
                      <!--[if (mso)|(IE)]><td align="center" width="250" style="background-color: #ffffff;width: 250px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
                      <div class="u-col u-col-50"
                        style="max-width: 320px;min-width: 250px;display: table-cell;vertical-align: top;">
                        <div
                          style="background-color: #ffffff;height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;  border: #000000; ">
                          <!--[if (!mso)&(!IE)]><!-->
                          <div
                            style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
                            <!--<![endif]-->
      
                            <table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0"
                              cellspacing="0" width="100%" border="0">
                              <tbody>
                                <tr>
                                  <td
                                    style="overflow-wrap:break-word;word-break:break-word;padding:20px;font-family:arial,helvetica,sans-serif;"
                                    align="left">
      
                                    <!--[if mso]><table width="100%"><tr><td><![endif]-->
                                    <h1
                                      style="margin: 0px; line-height: 140%; text-align: left; word-wrap: break-word; font-size: 22px; font-weight: 400;">
                                      <span><span><span><span><span><span><span><span><span><span><span><span><span><span><span>This
                                                                    is your
                                                                    ticket🎉</span></span></span></span></span></span></span></span></span></span></span></span></span></span></span>
                                    </h1>
                                    <!--[if mso]></td></tr></table><![endif]-->
      
                                  </td>
                                </tr>
                              </tbody>
                            </table>
      
                            <!--[if (!mso)&(!IE)]><!-->
                          </div><!--<![endif]-->
                        </div>
                      </div>
                      <!--[if (mso)|(IE)]></td><![endif]-->
                      <!--[if (mso)|(IE)]><td align="center" width="250" style="width: 250px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
                      <div class="u-col u-col-50"
                        style="max-width: 320px;min-width: 250px;display: table-cell;vertical-align: top;">
                        <div
                          style="height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
                          <!--[if (!mso)&(!IE)]><!-->
                          <div
                            style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
                            <!--<![endif]-->
      
                            <table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0"
                              cellspacing="0" width="100%" border="0">
                              <tbody>
                                <tr>
                                  <td
                                    style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;"
                                    align="left">
      
                                    <table width="100%" cellpadding="0" cellspacing="0" border="0">
                                      <tr>
                                        <td style="padding-right: 0px;padding-left: 0px;" align="center">
      
                                          <img align="center" border="0" src="images/image-1.png" alt="" title=""
                                            style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: inline-block !important;border: none;height: auto;float: none;width: 100%;max-width: 159px;"
                                            width="159" />
      
                                        </td>
                                      </tr>
                                    </table>
      
                                  </td>
                                </tr>
                              </tbody>
                            </table>
      
                            <!--[if (!mso)&(!IE)]><!-->
                          </div><!--<![endif]-->
                        </div>
                      </div>
                      <!--[if (mso)|(IE)]></td><![endif]-->
                      <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                    </div>
                  </div>
                </div>
      
      
      
      
      
                <div class="u-row-container" style="padding: 0px;background-color: #ffffff">
                  <div class="u-row"
                    style="margin: 0 auto;min-width: 320px;max-width: 500px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
                    <div
                      style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
                      <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: #ffffff;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:500px;"><tr style="background-color: transparent;"><![endif]-->
      
                      <!--[if (mso)|(IE)]><td align="center" width="333" style="background-color: #ffffff;width: 333px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
                      <div class="u-col u-col-66p67"
                        style="max-width: 320px;min-width: 333.33px;display: table-cell;vertical-align: top;">
                        <div
                          style="background-color: #ffffff;height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
                          <!--[if (!mso)&(!IE)]><!-->
                          <div
                            style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
                            <!--<![endif]-->
      
                            <table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0"
                              cellspacing="0" width="100%" border="0">
                              <tbody>
                                <tr>
                                  <td
                                    style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;"
                                    align="left">
      
                                    <div style="font-size: 17px; line-height: 140%; text-align: left; word-wrap: break-word;">
                                      <p style="line-height: 140%;"><em>Re: Event - Lovely professional university</em></p>
                                      <p style="line-height: 140%;"> </p>
                                      <p style="line-height: 140%;"><span style="line-height: 23.8px;"><strong>${eventDetails.eventname}</strong></span></p>
                                      <p style="line-height: 140%;"> </p>
                                      <p style="line-height: 140%;"><span style="line-height: 23.8px;">${eventDetails.eventlocation}</span><span style="line-height: 23.8px;"></span></p>
                                      <p style="line-height: 140%;"> </p>
                                      <p style="line-height: 140%;"><strong><span style="line-height: 23.8px;">${eventDetails.eventdate}</span></strong></p>
                                      <p style="line-height: 140%;"> </p>
                                      <p style="line-height: 140%;"><strong><span style="line-height: 23.8px;">ISSUED TO     
                                                            TICKET</span></strong></p>
                                      <p style="line-height: 140%;"><span style="line-height: 23.8px;"><em><span
                                              style="line-height: 23.8px;">${userEmail}             </span></em><span
                                            style="line-height: 23.8px;">RSVP-FREE</span><em><span
                                              style="line-height: 23.8px;"> </span></em></span></p>
                                      <p style="line-height: 140%;">Registered</p>
                                      <p style="line-height: 140%;">${eventDetails.registeredDate}</p>
                                      <p style="line-height: 140%;"> </p>
                                    </div>
      
                                  </td>
                                </tr>
                              </tbody>
                            </table>
      
                            <!--[if (!mso)&(!IE)]><!-->
                          </div><!--<![endif]-->
                        </div>
                      </div>
                      <!--[if (mso)|(IE)]></td><![endif]-->
                      <!--[if (mso)|(IE)]><td align="center" width="166" style="width: 166px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
                      <div class="u-col u-col-33p33"
                        style="max-width: 320px;min-width: 166.67px;display: table-cell;vertical-align: top;">
                        <div
                          style="height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
                          <!--[if (!mso)&(!IE)]><!-->
                          <div
                            style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
                            <!--<![endif]-->
      
                            <table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0"
                              cellspacing="0" width="100%" border="0">
                              <tbody>
                                <tr>
                                  <td
                                    style="overflow-wrap:break-word;word-break:break-word;padding:80px 0px 80px 10px;font-family:arial,helvetica,sans-serif;"
                                    align="left">
      
                                    <table width="100%" cellpadding="0" cellspacing="0" border="0">
                                      <tr>
                                        <td style="padding-right: 0px;padding-left: 0px;" align="center">
      
                                        <img src="../QR_Code.png" alt="Ticket" title="Ticket"
                                        style="outline: none; text-decoration: none; -ms-interpolation-mode: bicubic; clear: both; display: inline-block !important; border: none; height: auto; float: none; width: 100%; max-width: 156.67px;"
                                        width="156.67" />
      
                                        </td>
                                      </tr>
                                    </table>
      
                                  </td>
                                </tr>
                              </tbody>
                            </table>
      
                            <!--[if (!mso)&(!IE)]><!-->
                          </div><!--<![endif]-->
                        </div>
                      </div>
                      <!--[if (mso)|(IE)]></td><![endif]-->
                      <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                    </div>
                  </div>
                </div>
      
      
      
                <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
              </td>
            </tr>
          </tbody>
        </table>
        <!--[if mso]></div><![endif]-->
        <!--[if IE]></div><![endif]-->
      </body>
      
      </html>`,
        attachments: [
           
            {
                filename: 'QR_Code.png',
                content: qrCodeDataUrl.split('base64,')[1],
                encoding: 'base64',
            },
        ],
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent:', info.response);
    } catch (error) {
        console.error('Error sending email:', error);
    }
};















export const checkuserev = async (req, res) => {
    const { eventcode, userId } = req.params;

    try {
        const user = await UserModel.findOne({ _id: userId });

        if (!user) {
            return res.status(206).json({ error: 'User not found.' });
        }

        // Check if the eventcode is present in any element of the registeredEvents array
        const registeredEvent = user.registeredEvents.find(event => event.eventcode === eventcode);

        if (registeredEvent) {
            return res.status(200).json({ message: 'User is already registered for this event.', qrUniqueCode: registeredEvent.qrUniqueCode });
        } else {
            return res.status(205).json({ message: 'User is not registered for this event.' });
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }

}



export const editQuestionsForEvent = async (req, res) => {
    try {
        const { id } = req.params;

        const updatedEvent = await EventModel.findOneAndUpdate(
            { eventcode: id },
            { $set: { questions: req.body.questions } },
            { new: true }
        );

        if (!updatedEvent) {
            return res.status(404).json({ error: 'Event not found' });
        }

        console.log('Successfully updated event:', updatedEvent);
        res.status(200).json('Event updated successfully');
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }

};


export const addEventToCreatorUser = async (req, res) => {
    try {
        const { creatorId, eventcode } = req.body;

        const creatorUser = await UserModel.findOne({ email: creatorId });

        if (!creatorUser) {
            return res.status(404).json({ error: 'User not found' });
        }

        const isEventAlreadyAdded = creatorUser.createdEvents.includes(eventcode);

        if (isEventAlreadyAdded) {
            return res.status(205).json({ message: 'Event is already added to the creator user' });
        }

        await UserModel.updateOne({ email: creatorId }, { $push: { createdEvents: eventcode } });

        res.status(200).json({ message: 'Event added to the creator user successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


export const fetchCreatedEvents = async (req, res) => {
    try {
        const { emailId } = req.params;

        const creatorUser = await UserModel.findOne({ email: emailId });

        if (!creatorUser) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.status(200).json(creatorUser);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


export const qrscancall = async (req, res) => {
    const { id } = req.params;
    const { scannedData } = req.body;
    console.log(id, scannedData)



    try {

        const event = await EventModel.findOne({ eventcode: id });

        if (!event) {
            return res.status(404).json({ error: 'Event not found' });
        }

        const matchedUser = event.registeredUsers.find((user) => user.qrUniqueCode === scannedData);

        if (!matchedUser) {
            return res.status(200).json({ message: 'Unauthorized' });
        }



        if (matchedUser.approveStatus) {
            return res.status(200).json({ message: 'User already checked in', matchedUser });
        }

        matchedUser.approveStatus = true;
        matchedUser.checkinStatus = true;

        await event.save();

        return res.status(200).json({ message: 'User checked in', matchedUser });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const getcheckinusers = async (req, res) => {
    const { id } = req.params;
    console.log(id)

    try {
        const event = await EventModel.findOne({ eventcode: id });
        // console.log(event)

        if (!event) {
            return res.status(404).json({ error: 'Event not found' });
        }

        // Filter registeredUsers with approveStatus as true
        const approvedUsers = event.registeredUsers.filter(
            (user) => user.approveStatus === true
        );


        res.status(200).json(approvedUsers);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};



export const addneweventtohost = async (req, res) => {
    const { userEmail, eventcode } = req.body;

    try {
        const user = await UserModel.findOne({ email: userEmail });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        if (user.createdEvents.includes(eventcode)) {
            return res.status(400).json({ error: 'Event code is already added to the user profile' });
        }

        user.createdEvents.push(eventcode);
        await user.save();

        res.status(200).json({ message: 'Event added to user successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


export const addnewhostotevent = async (req, res) => {
    const { eventcode, hostEmail } = req.body;

    try {
        const event = await EventModel.findOne({ eventcode });
        const email = await UserModel.findOne({ email: hostEmail })

        if (!event) {
            return res.status(404).json({ error: 'Event not found' });
        }

        if (event.eventcreatedby.includes(hostEmail)) {
            return res.status(400).json({ error: 'Host email is already added to the event' });
        }
        if(!email){
            return res.status(404).json({ error: 'Host not found' });
        }
        event.eventcreatedby.push(hostEmail);
        await event.save();

        res.status(200).json({ message: 'Host added to event successfully' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};