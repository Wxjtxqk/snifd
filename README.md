# SNIFD 2FA
## General Info
SNIFD 2FA is a simple API created in Node.JS to obtain clean code from [AuthenticatorAPI.com](https://authenticatorapi.com).
</br>
You can get **QR code URL**, **a code that you can manually enter in the *Google Authenticator***.
</br>
Or if you want, you can get too validation of **pin** number from __*Google Authenticator*__.
</br>
*SNIFD 2FA API is powered by [AuthenticatorAPI.com](https://authenticatorapi.com)*
</br>
*GA means **Google Authenticator***
## How to install?
1. Install [Node.JS](https://nodejs.org) latest or LTS. 
2. Download by GIT or download release.
``git clone https://github.com/Wxjtxqk/snifd``
3. Download all libraries. ``npm install``
4. Run it! ``node .`` or ``node index.js``

## Requests

| GET Requests  | Information |
| ------------- |:-------------:|
| ``url`` (Secret Code)  </br> *»* Here you enter the SecretCode for a given user. </br>For example, user Kaku has secret ``SA8D13JS`` </br>and you enter this secret in ``url``.    | Required     |
| ``type`` (Pin or QR)   </br> *»* **pinvalidation** - if you want validate PIN</br> *»* **qrmanual** - if you want get qr and manualcode| Required     |
| ``username`` (User name in GA)  </br> *»* Here you enter your username, which</br>will automatically appear in GA.  | Only in QR     |
| ``pin`` (Pin from GA)  </br>*»* Here you enter the pin you want to validate.  | Only in PIN     |

## Returns
### QR Manual
**»**  ``"success": true`` - Success!</br>
**»**  ``"qrImgSrc": "https://www.authenticatorapi.com/qr.aspx?... so long"`` - Link to image with QR code.</br>
**»**  ``"manualLink": "NVSW653FNM"`` - Code to connect GA manually, without scanning the QR code.</br>
### Pin
**»**  ``"success": true`` - Success!</br>
**»**  ``"validation": true or false`` - If the PIN is correct, it returns true, if not, it returns false.
### Error
**»**  ``"success": false`` - Error is not success...</br>
**»**  ``"error": "Give me your credit card!"`` - Message of error. (This error is 🧢)

## Example Requet
### Request Number 1
| Value  | Parameter |
| ------------- |:-------------:|
| ``ASDJ1W2GASD``      | ``url`` (Secret Code)     |
| ``pinvalidation``      | ``type`` (Pin or QR)     |
| ``123456``      | ``pin`` (Pin from GA)     |

Request: ``https://localhost:3000/?url=ASDJ1W2GASD&type=pinvalidation&pin=123456``</br>
Returns: ``{"success":true,"validate":false}``
### Request Number 2
| Value  | Parameter |
| ------------- |:-------------:|
| ``ASD192SVANS``     | ``url`` (Secret Code)     |
| ``qrmanual``      | ``type`` (Pin or QR)     |
| ``MrKc``     | ``username`` (Username from GA)     |

Request: ``https://localhost:3000/?url=ASD192SVANS&type=qrmanual&username=MrKc`` </br>
Returns: ``{"success":true,"qrImgSrc":"https://www.authenticatorapi.com/qr.aspx?... so long","manualLink":"NVSW653FNM"}``
## Last...
This API is on CC BY 4.0 LICENSE. </br>
If there is an error, create a pull request.</br>
Created with ❤️ by Kaku and MrChat</br></br></br></br>