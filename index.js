const axios = require('axios');
const qs = require('querystring');
const yeeAppSign = require('yee-app-sign');
const YEE_SMS_URL = 'https://notify.api.linkyee.com/sms/send';
const _ = require('lodash');
exports.send = async function(appkey, appsecret, mobile, content) {
  const params = {
    mobile: mobile,
    content: content 
  };
  const signMsgStr = _.map(params, (value, key) => ( {key, value} ));
  const signedMsgToken = yeeAppSign.sign(appsecret, signMsgStr);
  return axios.post(YEE_SMS_URL, params, {
    headers: {
      Authorization: `appkey:${signedMsgToken}`
    }
  }
  );
}
