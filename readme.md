<p align="center">
	<img src="https://user-images.githubusercontent.com/114583810/198912121-6e5a7357-7911-45c1-bdf4-7c18861295a6.png"/>
	<br>
	
</p>

---

## Installation

```sh
npm install gojekhelper
```

## Usage

```js
const Gojek = require('gojekhelpers');
const app = new Gojek();

// Create account
(async () => {

    const create = await app.functionRegisterAccount(nama, phone);
    console.log(create);

})();

// Resend OTP for Create
(async () => {

    const retry = await app.functionRetryOTP(otptoken);
    console.log(retry);

})();

// Verify OTP
(async () => {

    const verif = await app.funtionVerifOtp(otpcode, otptoken);
    console.log(verif);

})();

// Update token
(async () => {

    const update = await app.functionUpdateToken(accesstoken, refreshtoken);
    console.log(update);

})();

// Get account detail
(async () => {

    const profile = await app.functionGetProfile(accesstoken);
    console.log(profile);

})();

// Redeem Voucher
(async () => {

    const redeem = await app.functionRedeemVoucher(accesstoken, vouchercode);
    console.log(redeem);

})();

// Check Voucher
(async () => {

    const check = await app.functionCheckVoucher(accesstoken);
    console.log(check);

})();

// Request Otp Set PIN
(async () => {

    const pin = await app.functionSetPinOtp(accesstoken, pin);
    console.log(pin);

})();

// Verif Set PIN
(async () => {

    const setpin = await app.functionVerifPinOtp(accesstoken, otpcode, pin);
    console.log(setpin);

})();

```