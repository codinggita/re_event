import nodemailer from 'nodemailer';
import otpGenerator from 'otp-generator';
import OtpModel from '../models/otpModel.js';
const userModulePath = path.resolve(__dirname, '../models/User.js');
import UserModel from userModulePath;




import jwt from 'jsonwebtoken';
// export { jwt };
const sendVerificationEmail = async (email, otp) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'top10world1210@gmail.com',
        pass: 'izgm dfzw vxri uajf',
      },
    });

    const mailOptions = {
      from: 'top10world1210@gmail.com',
      to: email,
      subject: 'Passwordless Login OTP',
      html: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "https://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
     <html xmlns="https://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
     
     <head>
      <meta charset="UTF-8" />
      <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
      <!--[if !mso]><!-->
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <!--<![endif]-->
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="format-detection" content="telephone=no" />
      <meta name="format-detection" content="date=no" />
      <meta name="format-detection" content="address=no" />
      <meta name="format-detection" content="email=no" />
      <meta name="x-apple-disable-message-reformatting" />
      <link href="https://fonts.googleapis.com/css?family=Fira+Sans:ital,wght@0,100;1,100;0,200;1,200;0,300;1,300;0,400;1,400;0,500;1,500;0,600;1,600;0,700;1,700;0,800;1,800;0,900;1,900" rel="stylesheet" />
      <link href="https://fonts.googleapis.com/css?family=Open+Sans:ital,wght@0,300;1,300;0,400;1,400;0,600;1,600;0,700;1,700;0,800;1,800" rel="stylesheet" />
      <title>Untitled</title>
      <!-- Made with Postcards by Designmodo https://designmodo.com/postcards -->
      <!--[if !mso]><!-- -->
      <style>
      @media  all {
                                          /* cyrillic-ext */
                  @font-face {
                      font-family: 'Fira Sans';
                      font-style: normal;
                      font-weight: 300;
                      font-display: swap;
                      src: local('Fira Sans Light'), local('FiraSans-Light'), url(https://fonts.gstatic.com/s/firasans/v10/va9B4kDNxMZdWfMOD5VnPKreSxf6Xl7Gl3LX.woff2) format('woff2');
                      unicode-range: U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F;
                  }
                  /* cyrillic */
                  @font-face {
                      font-family: 'Fira Sans';
                      font-style: normal;
                      font-weight: 300;
                      font-display: swap;
                      src: local('Fira Sans Light'), local('FiraSans-Light'), url(https://fonts.gstatic.com/s/firasans/v10/va9B4kDNxMZdWfMOD5VnPKreQhf6Xl7Gl3LX.woff2) format('woff2');
                      unicode-range: U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;
                  }
                  /* latin-ext */
                  @font-face {
                      font-family: 'Fira Sans';
                      font-style: normal;
                      font-weight: 300;
                      font-display: swap;
                      src: local('Fira Sans Light'), local('FiraSans-Light'), url(https://fonts.gstatic.com/s/firasans/v10/va9B4kDNxMZdWfMOD5VnPKreSBf6Xl7Gl3LX.woff2) format('woff2');
                      unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
                  }
                  /* latin */
                  @font-face {
                      font-family: 'Fira Sans';
                      font-style: normal;
                      font-weight: 300;
                      font-display: swap;
                      src: local('Fira Sans Light'), local('FiraSans-Light'), url(https://fonts.gstatic.com/s/firasans/v10/va9B4kDNxMZdWfMOD5VnPKreRhf6Xl7Glw.woff2) format('woff2');
                      unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
                  }
                                          /* cyrillic-ext */
                  @font-face {
                      font-family: 'Fira Sans';
                      font-style: normal;
                      font-weight: 400;
                      src: local('Fira Sans Regular'), local('FiraSans-Regular'), url(https://fonts.gstatic.com/s/firasans/v10/va9E4kDNxMZdWfMOD5VvmojLazX3dGTP.woff2) format('woff2');
                      unicode-range: U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F;
                  }
                  /* cyrillic */
                  @font-face {
                      font-family: 'Fira Sans';
                      font-style: normal;
                      font-weight: 400;
                      src: local('Fira Sans Regular'), local('FiraSans-Regular'), url(https://fonts.gstatic.com/s/firasans/v10/va9E4kDNxMZdWfMOD5Vvk4jLazX3dGTP.woff2) format('woff2');
                      unicode-range: U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;
                  }
                  /* latin-ext */
                  @font-face {
                      font-family: 'Fira Sans';
                      font-style: normal;
                      font-weight: 400;
                      src: local('Fira Sans Regular'), local('FiraSans-Regular'), url(https://fonts.gstatic.com/s/firasans/v10/va9E4kDNxMZdWfMOD5VvmYjLazX3dGTP.woff2) format('woff2');
                      unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
                  }
                  /* latin */
                  @font-face {
                      font-family: 'Fira Sans';
                      font-style: normal;
                      font-weight: 400;
                      src: local('Fira Sans Regular'), local('FiraSans-Regular'), url(https://fonts.gstatic.com/s/firasans/v10/va9E4kDNxMZdWfMOD5Vvl4jLazX3dA.woff2) format('woff2');
                      unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
                  }
                                          /* cyrillic-ext */
                  @font-face {
                      font-family: 'Fira Sans';
                      font-style: normal;
                      font-weight: 500;
                      src: local('Fira Sans Medium'), local('FiraSans-Medium'), url(https://fonts.gstatic.com/s/firasans/v10/va9B4kDNxMZdWfMOD5VnZKveSxf6Xl7Gl3LX.woff2) format('woff2');
                      unicode-range: U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F;
                  }
                  /* cyrillic */
                  @font-face {
                      font-family: 'Fira Sans';
                      font-style: normal;
                      font-weight: 500;
                      src: local('Fira Sans Medium'), local('FiraSans-Medium'), url(https://fonts.gstatic.com/s/firasans/v10/va9B4kDNxMZdWfMOD5VnZKveQhf6Xl7Gl3LX.woff2) format('woff2');
                      unicode-range: U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;
                  }
                  /* latin-ext */
                  @font-face {
                      font-family: 'Fira Sans';
                      font-style: normal;
                      font-weight: 500;
                      src: local('Fira Sans Medium'), local('FiraSans-Medium'), url(https://fonts.gstatic.com/s/firasans/v10/va9B4kDNxMZdWfMOD5VnZKveSBf6Xl7Gl3LX.woff2) format('woff2');
                      unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
                  }
                  /* latin */
                  @font-face {
                      font-family: 'Fira Sans';
                      font-style: normal;
                      font-weight: 500;
                      src: local('Fira Sans Medium'), local('FiraSans-Medium'), url(https://fonts.gstatic.com/s/firasans/v10/va9B4kDNxMZdWfMOD5VnZKveRhf6Xl7Glw.woff2) format('woff2');
                      unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
                  }
                                                  }
      </style>
      <!--<![endif]-->
      <style>
      html,
              body {
                  margin: 0 !important;
                  padding: 0 !important;
                  min-height: 100% !important;
                  width: 100% !important;
                  -webkit-font-smoothing: antialiased;
              }
      
              * {
                  -ms-text-size-adjust: 100%;
              }
      
              #outlook a {
                  padding: 0;
              }
      
              .ReadMsgBody,
              .ExternalClass {
                  width: 100%;
              }
      
              .ExternalClass,
              .ExternalClass p,
              .ExternalClass td,
              .ExternalClass div,
              .ExternalClass span,
              .ExternalClass font {
                  line-height: 100%;
              }
      
              div[style*="margin: 14px 0"],
              div[style*="margin: 16px 0"] {
                  margin: 0 !important;
              }
      
              table,
              td,
              th {
                  mso-table-lspace: 0 !important;
                  mso-table-rspace: 0 !important;
                  border-collapse: collapse;
              }
      
              body, td, th, p, div, li, a, span {
                  -webkit-text-size-adjust: 100%;
                  -ms-text-size-adjust: 100%;
                  mso-line-height-rule: exactly;
              }
      
              img {
                  border: 0;
                  outline: none;
                  line-height: 100%;
                  text-decoration: none;
                  -ms-interpolation-mode: bicubic;
              }
      
              a[x-apple-data-detectors] {
                  color: inherit !important;
                  text-decoration: none !important;
              }
      
              .pc-gmail-fix {
                  display: none;
                  display: none !important;
              }
      
              @media (min-width: 621px) {
                  .pc-lg-hide {
                      display: none;
                  } 
      
                  .pc-lg-bg-img-hide {
                      background-image: none !important;
                  }
              }
      </style>
      <style>
      @media (max-width: 620px) {
      .pc-project-body {min-width: 0px !important;}
      .pc-project-container {width: 100% !important;}
      .pc-sm-hide {display: none !important;}
      .pc-sm-bg-img-hide {background-image: none !important;}
      table.pc-w620-spacing-0-0-40-0 {margin: 0px 0px 40px 0px !important;}
      td.pc-w620-spacing-0-0-40-0,th.pc-w620-spacing-0-0-40-0{margin: 0 !important;padding: 0px 0px 40px 0px !important;}
      .pc-w620-fontSize-30 {font-size: 30px !important;}
      .pc-w620-lineHeight-40 {line-height: 40px !important;}
      .pc-w620-fontSize-16 {font-size: 16px !important;}
      .pc-w620-lineHeight-26 {line-height: 26px !important;}
      .pc-w620-padding-35-35-35-35 {padding: 35px 35px 35px 35px !important;}
      
      .pc-w620-gridCollapsed-1 > tbody,.pc-w620-gridCollapsed-1 > tbody > tr,.pc-w620-gridCollapsed-1 > tr {display: inline-block !important;}
      .pc-w620-gridCollapsed-1.pc-width-fill > tbody,.pc-w620-gridCollapsed-1.pc-width-fill > tbody > tr,.pc-w620-gridCollapsed-1.pc-width-fill > tr {width: 100% !important;}
      .pc-w620-gridCollapsed-1.pc-w620-width-fill > tbody,.pc-w620-gridCollapsed-1.pc-w620-width-fill > tbody > tr,.pc-w620-gridCollapsed-1.pc-w620-width-fill > tr {width: 100% !important;}
      .pc-w620-gridCollapsed-1 > tbody > tr > td,.pc-w620-gridCollapsed-1 > tr > td {display: block !important;width: auto !important;padding-left: 0 !important;padding-right: 0 !important;}
      .pc-w620-gridCollapsed-1.pc-width-fill > tbody > tr > td,.pc-w620-gridCollapsed-1.pc-width-fill > tr > td {width: 100% !important;}
      .pc-w620-gridCollapsed-1.pc-w620-width-fill > tbody > tr > td,.pc-w620-gridCollapsed-1.pc-w620-width-fill > tr > td {width: 100% !important;}
      .pc-w620-gridCollapsed-1 > tbody > .pc-grid-tr-first > .pc-grid-td-first,pc-w620-gridCollapsed-1 > .pc-grid-tr-first > .pc-grid-td-first {padding-top: 0 !important;}
      .pc-w620-gridCollapsed-1 > tbody > .pc-grid-tr-last > .pc-grid-td-last,pc-w620-gridCollapsed-1 > .pc-grid-tr-last > .pc-grid-td-last {padding-bottom: 0 !important;}
      
      .pc-w620-gridCollapsed-0 > tbody > .pc-grid-tr-first > td,.pc-w620-gridCollapsed-0 > .pc-grid-tr-first > td {padding-top: 0 !important;}
      .pc-w620-gridCollapsed-0 > tbody > .pc-grid-tr-last > td,.pc-w620-gridCollapsed-0 > .pc-grid-tr-last > td {padding-bottom: 0 !important;}
      .pc-w620-gridCollapsed-0 > tbody > tr > .pc-grid-td-first,.pc-w620-gridCollapsed-0 > tr > .pc-grid-td-first {padding-left: 0 !important;}
      .pc-w620-gridCollapsed-0 > tbody > tr > .pc-grid-td-last,.pc-w620-gridCollapsed-0 > tr > .pc-grid-td-last {padding-right: 0 !important;}
      
      .pc-w620-tableCollapsed-1 > tbody,.pc-w620-tableCollapsed-1 > tbody > tr,.pc-w620-tableCollapsed-1 > tr {display: block !important;}
      .pc-w620-tableCollapsed-1.pc-width-fill > tbody,.pc-w620-tableCollapsed-1.pc-width-fill > tbody > tr,.pc-w620-tableCollapsed-1.pc-width-fill > tr {width: 100% !important;}
      .pc-w620-tableCollapsed-1.pc-w620-width-fill > tbody,.pc-w620-tableCollapsed-1.pc-w620-width-fill > tbody > tr,.pc-w620-tableCollapsed-1.pc-w620-width-fill > tr {width: 100% !important;}
      .pc-w620-tableCollapsed-1 > tbody > tr > td,.pc-w620-tableCollapsed-1 > tr > td {display: block !important;width: auto !important;}
      .pc-w620-tableCollapsed-1.pc-width-fill > tbody > tr > td,.pc-w620-tableCollapsed-1.pc-width-fill > tr > td {width: 100% !important;}
      .pc-w620-tableCollapsed-1.pc-w620-width-fill > tbody > tr > td,.pc-w620-tableCollapsed-1.pc-w620-width-fill > tr > td {width: 100% !important;}
      }
      @media (max-width: 520px) {
      .pc-w520-padding-30-30-30-30 {padding: 30px 30px 30px 30px !important;}
      }
      </style>
      <!--[if !mso]><!-->
      <style>
      @media all { @font-face { font-family: 'Fira Sans'; font-style: normal; font-weight: 100; src: url('https://fonts.gstatic.com/s/firasans/v17/va9C4kDNxMZdWfMOD5Vn9LjHYTQ.woff') format('woff'), url('https://fonts.gstatic.com/s/firasans/v17/va9C4kDNxMZdWfMOD5Vn9LjHYTI.woff2') format('woff2'); } @font-face { font-family: 'Fira Sans'; font-style: italic; font-weight: 100; src: url('https://fonts.gstatic.com/s/firasans/v17/va9A4kDNxMZdWfMOD5VvkrCqUT7fdw.woff') format('woff'), url('https://fonts.gstatic.com/s/firasans/v17/va9A4kDNxMZdWfMOD5VvkrCqUT7fcQ.woff2') format('woff2'); } @font-face { font-family: 'Fira Sans'; font-style: normal; font-weight: 200; src: url('https://fonts.gstatic.com/s/firasans/v17/va9B4kDNxMZdWfMOD5VnWKneSBf8.woff') format('woff'), url('https://fonts.gstatic.com/s/firasans/v17/va9B4kDNxMZdWfMOD5VnWKneSBf6.woff2') format('woff2'); } @font-face { font-family: 'Fira Sans'; font-style: italic; font-weight: 200; src: url('https://fonts.gstatic.com/s/firasans/v17/va9f4kDNxMZdWfMOD5VvkrAGQCf2VF8.woff') format('woff'), url('https://fonts.gstatic.com/s/firasans/v17/va9f4kDNxMZdWfMOD5VvkrAGQCf2VFk.woff2') format('woff2'); } @font-face { font-family: 'Fira Sans'; font-style: normal; font-weight: 300; src: url('https://fonts.gstatic.com/s/firasans/v17/va9B4kDNxMZdWfMOD5VnPKreSBf8.woff') format('woff'), url('https://fonts.gstatic.com/s/firasans/v17/va9B4kDNxMZdWfMOD5VnPKreSBf6.woff2') format('woff2'); } @font-face { font-family: 'Fira Sans'; font-style: italic; font-weight: 300; src: url('https://fonts.gstatic.com/s/firasans/v17/va9f4kDNxMZdWfMOD5VvkrBiQyf2VF8.woff') format('woff'), url('https://fonts.gstatic.com/s/firasans/v17/va9f4kDNxMZdWfMOD5VvkrBiQyf2VFk.woff2') format('woff2'); } @font-face { font-family: 'Fira Sans'; font-style: normal; font-weight: 400; src: url('https://fonts.gstatic.com/s/firasans/v17/va9E4kDNxMZdWfMOD5VvmYjN.woff') format('woff'), url('https://fonts.gstatic.com/s/firasans/v17/va9E4kDNxMZdWfMOD5VvmYjL.woff2') format('woff2'); } @font-face { font-family: 'Fira Sans'; font-style: italic; font-weight: 400; src: url('https://fonts.gstatic.com/s/firasans/v17/va9C4kDNxMZdWfMOD5VvkrjHYTQ.woff') format('woff'), url('https://fonts.gstatic.com/s/firasans/v17/va9C4kDNxMZdWfMOD5VvkrjHYTI.woff2') format('woff2'); } @font-face { font-family: 'Fira Sans'; font-style: normal; font-weight: 500; src: url('https://fonts.gstatic.com/s/firasans/v17/va9B4kDNxMZdWfMOD5VnZKveSBf8.woff') format('woff'), url('https://fonts.gstatic.com/s/firasans/v17/va9B4kDNxMZdWfMOD5VnZKveSBf6.woff2') format('woff2'); } @font-face { font-family: 'Fira Sans'; font-style: italic; font-weight: 500; src: url('https://fonts.gstatic.com/s/firasans/v17/va9f4kDNxMZdWfMOD5VvkrA6Qif2VF8.woff') format('woff'), url('https://fonts.gstatic.com/s/firasans/v17/va9f4kDNxMZdWfMOD5VvkrA6Qif2VFk.woff2') format('woff2'); } @font-face { font-family: 'Fira Sans'; font-style: normal; font-weight: 600; src: url('https://fonts.gstatic.com/s/firasans/v17/va9B4kDNxMZdWfMOD5VnSKzeSBf8.woff') format('woff'), url('https://fonts.gstatic.com/s/firasans/v17/va9B4kDNxMZdWfMOD5VnSKzeSBf6.woff2') format('woff2'); } @font-face { font-family: 'Fira Sans'; font-style: italic; font-weight: 600; src: url('https://fonts.gstatic.com/s/firasans/v17/va9f4kDNxMZdWfMOD5VvkrAWRSf2VF8.woff') format('woff'), url('https://fonts.gstatic.com/s/firasans/v17/va9f4kDNxMZdWfMOD5VvkrAWRSf2VFk.woff2') format('woff2'); } @font-face { font-family: 'Fira Sans'; font-style: normal; font-weight: 700; src: url('https://fonts.gstatic.com/s/firasans/v17/va9B4kDNxMZdWfMOD5VnLK3eSBf8.woff') format('woff'), url('https://fonts.gstatic.com/s/firasans/v17/va9B4kDNxMZdWfMOD5VnLK3eSBf6.woff2') format('woff2'); } @font-face { font-family: 'Fira Sans'; font-style: normal; font-weight: 800; src: url('https://fonts.gstatic.com/s/firasans/v17/va9B4kDNxMZdWfMOD5VnMK7eSBf8.woff') format('woff'), url('https://fonts.gstatic.com/s/firasans/v17/va9B4kDNxMZdWfMOD5VnMK7eSBf6.woff2') format('woff2'); } @font-face { font-family: 'Fira Sans'; font-style: italic; font-weight: 800; src: url('https://fonts.gstatic.com/s/firasans/v17/va9f4kDNxMZdWfMOD5VvkrBuRyf2VF8.woff') format('woff'), url('https://fonts.gstatic.com/s/firasans/v17/va9f4kDNxMZdWfMOD5VvkrBuRyf2VFk.woff2') format('woff2'); } @font-face { font-family: 'Fira Sans'; font-style: italic; font-weight: 700; src: url('https://fonts.gstatic.com/s/firasans/v17/va9f4kDNxMZdWfMOD5VvkrByRCf2VF8.woff') format('woff'), url('https://fonts.gstatic.com/s/firasans/v17/va9f4kDNxMZdWfMOD5VvkrByRCf2VFk.woff2') format('woff2'); } @font-face { font-family: 'Fira Sans'; font-style: normal; font-weight: 900; src: url('https://fonts.gstatic.com/s/firasans/v17/va9B4kDNxMZdWfMOD5VnFK_eSBf8.woff') format('woff'), url('https://fonts.gstatic.com/s/firasans/v17/va9B4kDNxMZdWfMOD5VnFK_eSBf6.woff2') format('woff2'); } @font-face { font-family: 'Fira Sans'; font-style: italic; font-weight: 900; src: url('https://fonts.gstatic.com/s/firasans/v17/va9f4kDNxMZdWfMOD5VvkrBKRif2VF8.woff') format('woff'), url('https://fonts.gstatic.com/s/firasans/v17/va9f4kDNxMZdWfMOD5VvkrBKRif2VFk.woff2') format('woff2'); } @font-face { font-family: 'Open Sans'; font-style: normal; font-weight: 400; src: url('https://fonts.gstatic.com/s/opensans/v36/memSYaGs126MiZpBA-UvWbX2vVnXBbObj2OVZyOOSr4dVJWUgsjZ0B4uaVQ.woff') format('woff'), url('https://fonts.gstatic.com/s/opensans/v36/memSYaGs126MiZpBA-UvWbX2vVnXBbObj2OVZyOOSr4dVJWUgsjZ0B4uaVI.woff2') format('woff2'); } @font-face { font-family: 'Open Sans'; font-style: normal; font-weight: 300; src: url('https://fonts.gstatic.com/s/opensans/v36/memSYaGs126MiZpBA-UvWbX2vVnXBbObj2OVZyOOSr4dVJWUgsiH0B4uaVQ.woff') format('woff'), url('https://fonts.gstatic.com/s/opensans/v36/memSYaGs126MiZpBA-UvWbX2vVnXBbObj2OVZyOOSr4dVJWUgsiH0B4uaVI.woff2') format('woff2'); } @font-face { font-family: 'Open Sans'; font-style: normal; font-weight: 700; src: url('https://fonts.gstatic.com/s/opensans/v36/memSYaGs126MiZpBA-UvWbX2vVnXBbObj2OVZyOOSr4dVJWUgsg-1x4uaVQ.woff') format('woff'), url('https://fonts.gstatic.com/s/opensans/v36/memSYaGs126MiZpBA-UvWbX2vVnXBbObj2OVZyOOSr4dVJWUgsg-1x4uaVI.woff2') format('woff2'); } @font-face { font-family: 'Open Sans'; font-style: normal; font-weight: 600; src: url('https://fonts.gstatic.com/s/opensans/v36/memSYaGs126MiZpBA-UvWbX2vVnXBbObj2OVZyOOSr4dVJWUgsgH1x4uaVQ.woff') format('woff'), url('https://fonts.gstatic.com/s/opensans/v36/memSYaGs126MiZpBA-UvWbX2vVnXBbObj2OVZyOOSr4dVJWUgsgH1x4uaVI.woff2') format('woff2'); } @font-face { font-family: 'Open Sans'; font-style: italic; font-weight: 300; src: url('https://fonts.gstatic.com/s/opensans/v36/memQYaGs126MiZpBA-UFUIcVXSCEkx2cmqvXlWq8tWZ0Pw86hd0Rk5hkWV4exg.woff') format('woff'), url('https://fonts.gstatic.com/s/opensans/v36/memQYaGs126MiZpBA-UFUIcVXSCEkx2cmqvXlWq8tWZ0Pw86hd0Rk5hkWV4ewA.woff2') format('woff2'); } @font-face { font-family: 'Open Sans'; font-style: italic; font-weight: 400; src: url('https://fonts.gstatic.com/s/opensans/v36/memQYaGs126MiZpBA-UFUIcVXSCEkx2cmqvXlWq8tWZ0Pw86hd0Rk8ZkWV4exg.woff') format('woff'), url('https://fonts.gstatic.com/s/opensans/v36/memQYaGs126MiZpBA-UFUIcVXSCEkx2cmqvXlWq8tWZ0Pw86hd0Rk8ZkWV4ewA.woff2') format('woff2'); } @font-face { font-family: 'Open Sans'; font-style: italic; font-weight: 600; src: url('https://fonts.gstatic.com/s/opensans/v36/memQYaGs126MiZpBA-UFUIcVXSCEkx2cmqvXlWq8tWZ0Pw86hd0RkxhjWV4exg.woff') format('woff'), url('https://fonts.gstatic.com/s/opensans/v36/memQYaGs126MiZpBA-UFUIcVXSCEkx2cmqvXlWq8tWZ0Pw86hd0RkxhjWV4ewA.woff2') format('woff2'); } @font-face { font-family: 'Open Sans'; font-style: italic; font-weight: 700; src: url('https://fonts.gstatic.com/s/opensans/v36/memQYaGs126MiZpBA-UFUIcVXSCEkx2cmqvXlWq8tWZ0Pw86hd0RkyFjWV4exg.woff') format('woff'), url('https://fonts.gstatic.com/s/opensans/v36/memQYaGs126MiZpBA-UFUIcVXSCEkx2cmqvXlWq8tWZ0Pw86hd0RkyFjWV4ewA.woff2') format('woff2'); } @font-face { font-family: 'Open Sans'; font-style: normal; font-weight: 800; src: url('https://fonts.gstatic.com/s/opensans/v36/memSYaGs126MiZpBA-UvWbX2vVnXBbObj2OVZyOOSr4dVJWUgshZ1x4uaVQ.woff') format('woff'), url('https://fonts.gstatic.com/s/opensans/v36/memSYaGs126MiZpBA-UvWbX2vVnXBbObj2OVZyOOSr4dVJWUgshZ1x4uaVI.woff2') format('woff2'); } @font-face { font-family: 'Open Sans'; font-style: italic; font-weight: 800; src: url('https://fonts.gstatic.com/s/opensans/v36/memQYaGs126MiZpBA-UFUIcVXSCEkx2cmqvXlWq8tWZ0Pw86hd0Rk0ZjWV4exg.woff') format('woff'), url('https://fonts.gstatic.com/s/opensans/v36/memQYaGs126MiZpBA-UFUIcVXSCEkx2cmqvXlWq8tWZ0Pw86hd0Rk0ZjWV4ewA.woff2') format('woff2'); } }
      </style>
      <!--<![endif]-->
      <!--[if mso]>
         <style type="text/css">
             .pc-font-alt {
                 font-family: Arial, Helvetica, sans-serif !important;
             }
         </style>
         <![endif]-->
      <!--[if gte mso 9]>
         <xml>
             <o:OfficeDocumentSettings>
                 <o:AllowPNG/>
                 <o:PixelsPerInch>96</o:PixelsPerInch>
             </o:OfficeDocumentSettings>
         </xml>
         <![endif]-->
     </head>
     
     <body class="pc-font-alt" style="width: 100% !important;min-height: 100% !important;margin: 0 !important;padding: 0 !important;line-height: 1.5;color: #2D3A41;mso-line-height-rule: exactly;-webkit-font-smoothing: antialiased;-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;font-variant-ligatures: none;text-rendering: optimizeLegibility;-moz-osx-font-smoothing: grayscale;background-color: #ffffff;" bgcolor="#ffffff">
      <table class="pc-project-body" style="table-layout: fixed;min-width: 600px;background-color:#ffffff;" bgcolor="#ffffff" width="100%" border="0" cellspacing="0" cellpadding="0" role="presentation">
       <tr>
        <td align="center" valign="top">
         <table class="pc-project-container" style="width: 600px; max-width: 600px;" width="600" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation">
          <tr>
           <td style="padding: 20px 0px 20px 0px;" align="left" valign="top">
            <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%" style="width: 100%;">
             <tr>
              <td valign="top">
               <!-- BEGIN MODULE: Header 2 -->
               <table width="100%" border="0" cellspacing="0" cellpadding="0" role="presentation">
                <tr>
                 <td style="padding: 0px 0px 0px 0px;">
                  <table width="100%" border="0" cellspacing="0" cellpadding="0" role="presentation">
                   <tr>
                    <td valign="top" class="pc-w520-padding-30-30-30-30 pc-w620-padding-35-35-35-35" style="padding: 40px 40px 40px 40px;border-radius: 0px;background-color: #1B1B1B;" bgcolor="#1B1B1B">
                     <table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
                      <tr>
                       <td align="center" valign="top" style="padding: 0px 0px 17px 0px;">
                        <table border="0" cellpadding="0" cellspacing="0" role="presentation" align="center" style="margin-right: auto; margin-left: auto;">
                         <tr>
                          <td valign="top" class="pc-font-alt" align="center" style="mso-line-height: exactly;line-height: 121%;font-family: Fira Sans, Arial, Helvetica, sans-serif;font-size: 68px;font-weight: 500;color: #40be65;text-align: center;text-align-last: center;">
                           <div><span style="color: #f76ac9;">Re: Event</span>
                           </div>
                          </td>
                         </tr>
                        </table>
                       </td>
                      </tr>
                     </table>
                     <table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
                      <tr>
                       <td align="center" valign="top" style="padding: 0px 0px 30px 0px;">
                        <table border="0" cellpadding="0" cellspacing="0" role="presentation" align="center" style="margin-right: auto; margin-left: auto;">
                         <tr>
                          <td valign="top" class="pc-font-alt pc-w620-fontSize-30 pc-w620-lineHeight-40" align="center" style="mso-line-height: exactly;line-height: 128%;letter-spacing: -0.6px;font-family: Fira Sans, Arial, Helvetica, sans-serif;font-size: 38px;font-weight: normal;color: #ffffff;text-align: center;text-align-last: center;">
                           <div><span style="color: rgb(255, 255, 255);">Hi, Welcome ${email} to re:Event</span>
                           </div>
                          </td>
                         </tr>
                        </table>
                       </td>
                      </tr>
                     </table>
                     <table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
                      <tr>
                       <td align="center" valign="top" style="padding: 0px 0px 30px 0px;">
                        <table border="0" cellpadding="0" cellspacing="0" role="presentation" align="center" style="margin-right: auto; margin-left: auto;">
                         <tr>
                          <td valign="top" class="pc-font-alt pc-w620-fontSize-30 pc-w620-lineHeight-40" align="center" style="mso-line-height: exactly;line-height: 128%;letter-spacing: -0.6px;font-family: Fira Sans, Arial, Helvetica, sans-serif;font-size: 20px;font-weight: 300;color: #a4a4a4;text-align: center;text-align-last: center;">
                           <div><span>Thank you for logging in re:Event.</span>
                           </div>
                          </td>
                         </tr>
                        </table>
                       </td>
                      </tr>
                     </table>
                     <table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
                      <tr>
                       <td align="center">
                        <table class="pc-width-hug pc-w620-gridCollapsed-0" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation">
                         <tr class="pc-grid-tr-first pc-grid-tr-last">
                          <td class="pc-grid-td-first pc-grid-td-last" valign="middle" style="padding-top: 0px; padding-right: 0px; padding-bottom: 0px; padding-left: 0px;">
                           <table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width: 100%;">
                            <tr>
                             <td align="center" valign="top" style="background-color:#000000;">
                              <table align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width: 100%;">
                               <tr>
                                <td align="center" valign="top">
                                 <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation">
                                  <tr>
                                   <th valign="top" align="center" style="padding: 0px 0px 0px 0px;font-weight: normal;line-height: 1;">
                                    <!--[if mso]>
             <table  border="0" cellpadding="0" cellspacing="0" role="presentation" align="center" style="border-collapse: separate;margin-right: auto; margin-left: auto;">
                 <tr>
                     <td valign="middle" align="center" style="text-align: center;color: #ffffff;border-radius: 8px;background-color: #ffffff;padding: 15px 17px 15px 17px;" bgcolor="#ffffff">
                                         <a class="pc-font-alt" style="display: inline-block;text-decoration: none;font-family: Open Sans, Arial, Helvetica, sans-serif;font-weight: 600;font-size: 31px;line-height: 150%;letter-spacing: 14.6px;color: #000000;" target="_blank">${otp}</a>
                                     </td>
                 </tr>
             </table>
             <![endif]-->
                                    <!--[if !mso]><!-- --><a style="border-radius: 8px;background-color: #ffffff;padding: 15px 17px 15px 17px;font-family: Open Sans, Arial, Helvetica, sans-serif;font-weight: 600;font-size: 31px;line-height: 150%;letter-spacing: 14.6px;color: #000000;text-align: center;text-align-last: center;text-decoration: none;display: inline-block;vertical-align: top;-webkit-text-size-adjust: none;" target="_blank">${otp}</a>
                                    <!--<![endif]-->
                                   </th>
                                  </tr>
                                 </table>
                                </td>
                               </tr>
                              </table>
                             </td>
                            </tr>
                           </table>
                          </td>
                         </tr>
                        </table>
                       </td>
                      </tr>
                     </table>
                     <table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
                      <tr>
                       <td align="center" valign="top" style="padding: 0px 0px 29px 0px;">
                        <table border="0" cellpadding="0" cellspacing="0" role="presentation" align="center" style="margin-right: auto; margin-left: auto;">
                         <tr>
                          <td valign="top" class="pc-font-alt pc-w620-fontSize-16 pc-w620-lineHeight-26" align="center" style="mso-line-height: exactly;line-height: 250%;letter-spacing: -0.2px;font-family: Fira Sans, Arial, Helvetica, sans-serif;font-size: 20px;font-weight: 300;color: #ffffff;text-align: center;text-align-last: center;">
                           <div><span>Thank you</span>
                           </div>
                          </td>
                         </tr>
                        </table>
                       </td>
                      </tr>
                     </table>
                    </td>
                   </tr>
                  </table>
                 </td>
                </tr>
               </table>
               <!-- END MODULE: Header 2 -->
              </td>
             </tr>
            </table>
           </td>
          </tr>
         </table>
        </td>
       </tr>
      </table>
      <!-- Fix for Gmail on iOS -->
      <div class="pc-gmail-fix" style="white-space: nowrap; font: 15px courier; line-height: 0;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
      </div>
     </body>
     
     </html>
     
     `
    };

    await transporter.sendMail(mailOptions);

    console.log('OTP sent successfully');
  } catch (error) {
    console.error(error.message);
    throw new Error('Failed to send OTP'); // Throw the error for better handling
  }
};

const generateUniqueOtp = async () => {
  let otp = otpGenerator.generate(5, {
    upperCaseAlphabets: false,
    lowerCaseAlphabets: false,
    specialChars: false,
  });

  let result = await OtpModel.findOne({ otp });

  while (result) {
    otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
    });
    result = await OtpModel.findOne({ otp });
  }

  return otp;
};

export const sendOtp = async (req, res) => {
  const { email } = req.body;

  try {
    const existingOtp = await OtpModel.findOne({ email });
    let otp;

    if (existingOtp) {
      otp = await generateUniqueOtp();
      existingOtp.otp = otp;
      await existingOtp.save();
    } else {
      otp = await generateUniqueOtp();
      const newOtp = new OtpModel({ email, otp });
      await newOtp.save();
    }

    await sendVerificationEmail(email, otp);

    res.status(200).send('OTP sent successfully');
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Failed to send OTP');
  }
};

export const verifyOtp = async (req, res) => {
  const { email, otp } = req.body;
  console.log(email, otp)

  try {
    // Find the user by email
    const existingUser = await UserModel.findOne({ email });
    console.log(existingUser)

    const otpDocument = await OtpModel.findOne({ email, otp });
    console.log(otpDocument)

    if (otpDocument && otpDocument.email === email && otpDocument.otp === otp) {
      // OTP verification successful

      if (!existingUser) {
        // If the user does not exist, create a new user
        const newUser = new UserModel({ email });
        await newUser.save();
      }

      // Retrieve the user (whether existing or newly created)
      const user = await UserModel.findOne({ email });
      console.log(user)

      // Or, generate a JWT
      const token = jwt.sign(
        { userId: user._id, email: user.email },
        process.env.JWT_SECRET, // Use the imported secret from config.js
        { expiresIn: '1h' } // Token expiration time, adjust as needed
      );

      // Create a session
      req.session.user = {
        userId: user._id,
        email: user.email,
      };

      res.status(200).json({
        success: true,
        message: 'OTP verification successful',
        token: token, // Include the token in the response
        user: {
          userId: user._id,
          email: user.email,
        },
      });
    } else {
      res.status(401).json({
        success: false,
        message: 'Invalid OTP',
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Internal Server Error',
    });
  }
};
export const getProfile = async (req, res) => {
  try {
    // console.log(req.headers.authorization.split(' ')[1]);
    const token = req.headers.authorization.split(' ')[1];
    // console.log(token)


    const decodedjwt = jwt.decode(token, process.env.JWT_SECRET);
    console.log(decodedjwt);


    const user = await UserModel.findById(req.userId);
    res.status(200).json({
      success: true,
      message: 'User fetched successfully',
      decodedjwt: decodedjwt,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Internal Server Error',
    });
  }
};
export const getProfile2 = async (req, res) => {

  try {
    // console.log(req.headers.authorization.split(' ')[1]);
    const token = req.headers.authorization.split(' ')[1];
    console.log(token)
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded);

    const user = await UserModel.findById(decoded.userId);
    const responseArray = {
      user: user.username,
      decode: decoded
    }
    res.status(200).json({
      success: true,
      message: 'User fetched successfully',
      decodedjwt: responseArray,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Internal Server Error',
    });
  }
};

export const setUsername = async (req, res) => {
  try {
    const { username, uid } = req.body;
    console.log(username, uid)

    // Check if the provided username already exists
    const existingUser = await UserModel.findOne({ username });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'Username already exists. Please choose a different one.',
      });
    }

    // // Get the user ID from the request, assuming you have it available in req.user
    const userId = uid; // Modify this based on your authentication setup

    // // Update the user's username in the database
    await UserModel.findByIdAndUpdate(userId, { username });

    res.status(200).json({
      success: true,
      message: 'Username set successfully.',
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Internal Server Error',
    });
  }
};