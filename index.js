const express = require('express');    // 2FA SNIFD (C) 2024
const axios = require('axios');       // POWERED BY AUTHENTICATORAPI
const cheerio = require('cheerio');  // BY KAKU AND ONE GUY

//SET PORT, APPNAME, NOT EXPRESS XD
const app = express();
const port = 3000;
const appname = "MDSMP";
var success = false;
var request1 = null;
var request2 = null;
var request3 = null;
var request4 = null;

app.get('/', async (req, res) => {
    request1 = req.query.url;
    request2 = req.query.type;
    request3 = req.query.pin;
    request4 = req.query.username;
    if(request1 && request2) {
        if(request2 == "qrmanual" && request4) {
            try {
                const response = await axios.get("https://www.authenticatorApi.com/pair.aspx?AppName=" + appname + "&AppInfo=" + request4 + "&SecretCode=" + request1.toString());
                const html = response.data;
                const $ = cheerio.load(html);

                const qrImgSrc = $('a img').attr('src');
                const manualLink = $('a[title]').attr('title').replace("Manually pair with", "").replace(" ", "");

                success = true;

                res.json({ success, qrImgSrc, manualLink });
            } catch (error) {
                console.error('Błąd podczas pobierania danych:', error);
                res.status(500).json({ success: success, error: 'Wystąpił błąd podczas pobierania danych' });
            }
        } else if(request2 == "pinvalidation") {
            if(request3) {
                try {
                    const response = await axios.get("https://www.authenticatorapi.com/Validate.aspx?Pin=" + request3 + "&SecretCode=" + request1.toString());
                    const html = response.data;
                    const $ = cheerio.load(html);
        
                    const body = $('body').text();
                    let validate = null; 

                    if(body == "True") {
                        validate = true;
                    } else {
                        validate = false;
                    }

                    success = true;

                    res.json({ success, validate });
                } catch (error) {
                    console.error('Błąd podczas pobierania danych:', error);
                    res.status(500).json({ success: success, error: 'Wystąpił błąd podczas pobierania danych' });
                }
            } else {
                console.error('Nie wykryto URL w GET!');
                res.status(500).json({ success: success, error: 'Nie wykryto URL w GET!' });
            }
        } else {
            console.error('Nie wykryto URL w GET!');
            res.status(500).json({ success: success, error: 'Nie wykryto URL w GET!' });
        }
    } else {
        console.error('Nie wykryto URL w GET!');
        res.status(500).json({ success: success, error: 'Nie wykryto URL w GET!' });
    }
});

app.listen(port, () => {
    console.log(`Serwer działa na http://localhost:${port}`);
});
