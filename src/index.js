const fetch = require('node-fetch');
const helpers = require('./helpers/helpers');

class GofoodHelpers {

    constructor () {

        this.baseUrl = 'https://api.gojekapi.com/';
        this.baseUrlToken = 'https://goid.gojekapi.com/';
        this.baseUrlCustomer = 'https://customer.gopayapi.com/';

        this.Timestamps = helpers.Timestamps();
        this.SessionId = helpers.randomSessionId();
        this.randomUniqueId = helpers.randomStr(16);
        this.D1 = helpers.randomMacAddress(32);
        this.AndroidVersion = helpers.randomAndroidVersion();
        this.AndroidBrand = helpers.randomAndroidBrand();
        this.AndroidModel = helpers.randomStr(5).toUpperCase();
        this.Location = helpers.randomLocation();

        this.headers = {

            'X-Signature': '1001',
            'X-Signature-Time': this.Timestamps,
            'X-Session-Id': this.SessionId,
            'X-Platform': 'Android',
            'X-Uniqueid': this.randomUniqueId,
            'D1': this.D1,
            'X-Appversion': '4.47.1',
            'X-Appid': 'com.gojek.app',
            'Accept': 'application/json',
            'X-Deviceos': 'Android,' + this.AndroidVersion,
            'X-User-Type': 'customer',
            'X-Phonemake': this.AndroidBrand,
            'X-Pushtokentype': 'FCM',
            'X-Phonemodel': this.AndroidBrand + ',' + this.AndroidModel, 
            'Accept-Language': 'en-ID',
            'X-User-Locale': 'en_ID',
            'X-Location': this.Location,
            'X-Location-Accuracy': '10.0',
            'Gojek-Country-Code': 'ID',
            'X-M1': `1:UNKNOWN,2:UNKNOWN,3:16${helpers.randomNum(11)}-${helpers.randomNum(19)},${helpers.randomNum(1)}:1${helpers.randomNum(4)},${helpers.randomNum(1)}:SD|845|4,6:${helpers.randomMacAddress(6)},7:"${helpers.randomStr(10)}",8:720x1280,9:passive\\,gps\\,network,10:0,11:UNKNOWN,12:VALUE_NOT_PRESENT,13:1001,14:${helpers.Timestamps()}`,
            'Content-Type': 'application/json; charset=UTF-8',
            'Accept-Encoding': 'gzip, deflate',
            'User-Agent': 'okhttp/3.12.13',
            'Connection': 'keep-alive'

        }
    }

    async functionRegisterAccount(name, phone) {

        try {

            const response = await fetch(this.baseUrl + 'v5/customers', {
                method: 'POST',
                headers: this.headers,
                body: JSON.stringify({
                    'name': name,
                    'email': helpers.randomStr(15) + '@aol.com',
                    'phone': phone,
                    'signed_up_country': 'ID'
                })
            })
    
            const json = await response.json();
            return json;

            
        } catch (err) {
            throw new Error(err);
        }

    }

    async functionRetryOTP(otptoken) {

        try {

            const response = await fetch(this.baseUrl + 'v2/otp/retry', {
                method: 'POST',
                headers: this.headers,
                body: JSON.stringify({
                    "channel_type": "sms",
                    "otp_token": otptoken
                })
            })
    
            const json = await response.json();
            return json;

            
        } catch (err) {
            throw new Error(err);
        }


    }

    async funtionVerifOtp(otpcode, otptoken) {

        try {

            const response = await fetch(this.baseUrl + 'v5/customers/phone/verify', {
                method: 'POST',
                headers: this.headers,
                body: JSON.stringify({
                    "client_name": "gojek:consumer:app",
                    "client_secret": "pGwQ7oi8bKqqwvid09UrjqpkMEHklb",
                    "data": {
                        "otp": otpcode,
                        "otp_token": otptoken
                    }
                })
            })
    
            const json = await response.json();
            return json;

            
        } catch (err) {
            throw new Error(err);
        }


    }

    async functionUpdateToken(accesstoken, refreshtoken) {
    
        try {

            this.headers['Authorization'] = 'Bearer ' + accesstoken;

            const response = await fetch(this.baseUrlToken + 'goid/token', {
                method: 'POST',
                headers: this.headers,
                body: JSON.stringify({
                    'client_id': 'gojek:consumer:app',
                    'client_secret': 'pGwQ7oi8bKqqwvid09UrjqpkMEHklb',
                    'data': {
                        'refresh_token': refreshtoken
                    },
                    'grant_type': 'refresh_token',
                    'scopes': []
                })
            })

            const json = await response.json();
            return json;

            
        } catch (err) {
            throw new Error(err);
        }
    
    }

    async functionGetProfile(accesstoken) {

        try {

            this.headers['Authorization'] = 'Bearer ' + accesstoken;

            const response = await fetch(this.baseUrl + 'gojek/v2/customer', {
                method: 'GET',
                headers: this.headers
            })

            const json = await response.json();
            return json;

            
        } catch (err) {
            throw new Error(err);
        }


    }

    async functionRedeemVoucher(accesstoken, vouchercode) {

        try {

            this.headers['Authorization'] = 'Bearer ' + accesstoken;

            const response = await fetch(this.baseUrl + 'go-promotions/v1/promotions/enrollments', {
                method: 'POST',
                headers: this.headers,
                body: JSON.stringify({
                    'promo_code': vouchercode
                })
            })

            const json = await response.json();
            return json;

            
        } catch (err) {
            throw new Error(err);
        }
    

    }

    async functionCheckVoucher(accesstoken) {

        try {

            this.headers['Authorization'] = 'Bearer ' + accesstoken;

            const response = await fetch(this.baseUrl + 'gopoints/v3/wallet/vouchers?limit=200&page=1', {
                method: 'GET',
                headers: this.headers
            })

            const json = await response.json();
            return json;

            
        } catch (err) {
            throw new Error(err);
        }
    


    }

    async functionSetPinOtp(accesstoken, pin = '301022') {

        try {

            this.headers['Authorization'] = 'Bearer ' + accesstoken;

            const response = await fetch(this.baseUrlCustomer + 'v1/users/pin', {
                method: 'POST',
                headers: this.headers,
                body: JSON.stringify({
                    'pin': pin
                })
            })

            const json = await response.json();
            return json;
            
        } catch (err) {
            throw new Error(err);
        }

        // if return success: false, and get error message "Your OTP is required to continue." with code "GoPay-1603" .. It means otp already sent and required to verif it .
        // if already set pin , it will return error message "Cannot perform this action as you have already set a PIN." with code "GoPay-111"

    }

    async functionVerifPinOtp(accesstoken, otpcode, pin = '301022') {

        try {

            this.headers['Authorization'] = 'Bearer ' + accesstoken;
            this.headers['Otp'] = otpcode;

            const response = await fetch(this.baseUrlCustomer + 'v1/users/pin', {
                method: 'POST',
                headers: this.headers,
                body: JSON.stringify({
                    'pin': pin
                })
            })

            const json = await response.json();
            return json;
            
        } catch (err) {
            throw new Error(err);
        }

    }

}

module.exports = GofoodHelpers;