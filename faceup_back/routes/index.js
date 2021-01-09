var express = require("express");
var router = express.Router();
var request = require("sync-request");

const fs = require("fs");
var uniqid = require("uniqid");

var cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "djsgv53qh",
  api_key: "695523746364995",
  api_secret: "8_nYfSA9ExicVEAmocPNAFZEJIY",
});

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.post("/upload", async function (req, res, next) {
  let imagePath = "./imgtmp/" + uniqid() + ".jpg";
  let resultCopy = await req.files.photo.mv(imagePath);

  let resultCloudinary = await cloudinary.uploader.upload(imagePath);
  let cloudinaryUrl = resultCloudinary.secure_url;

  let params = {
    detectionModel: "detection_01",
    returnFaceAttributes:
      "age, gender, facialHair, smile, hair, emotion, makeup",
    returnFaceId: true,
  };

  let key = "e6d13a5613d44d329bbc07b860c3f71f";

  var recogRequest = request(
    "POST",
    `https://westcentralus.api.cognitive.microsoft.com/face/v1.0/detect`,
    {
      qs: params,
      body: '{"url": ' + '"' + cloudinaryUrl + '"}',
      headers: {
        "Content-Type": "application/json",
        "Ocp-Apim-Subscription-Key": key,
      },
    }
  );
  let recogFace = JSON.parse(recogRequest.getBody());
  let recogData = recogFace[0].faceAttributes;

  let beard = false;
  if (recogData.facialHair.beard > 0.5) {
    beard = true;
  }

  let smile = false;
  if (recogData.smile > 0.7) {
    smile = true;
  }

  let makeup = false;
  if (recogData.makeup) {
    makeup = true;
  }

  let couleurChev = recogData.hair.hairColor[0].color;
  switch (couleurChev) {
    case "black":
      couleurChev = "cheveux bruns";
      break;
    case "brown":
      couleurChev = "cheveux chatain";
      break;
    case "gray":
      couleurChev = "cheveux gris";
      break;
    case "blond":
      couleurChev = "cheveux blonds";
      break;
    case "red":
      couleurChev = "cheveux roux";
      break;
  }

  let emotion = recogData.emotion;
  if (emotion.anger > 0.8) {
    emotion = "énervé";
  } else if (emotion.disgust > 0.8) {
    emotion = "dégouté";
  } else if (emotion.fear > 0.8) {
    emotion = "effrayé";
  } else if (emotion.happiness > 0.8) {
    emotion = "heureux";
  } else if (emotion.neutral > 0.8) {
    emotion = "neutre";
  } else if (emotion.sadness > 0.8) {
    emotion = "triste";
  } else if (emotion.surprise > 0.8) {
    emotion = "surpris";
  } else {
    emotion = "RAS";
  }

  recogData.facialHair = beard;
  recogData.smile = smile;
  recogData.hair = couleurChev;
  recogData.url = resultCloudinary.secure_url;
  recogData.makeup = makeup;
  recogData.emotion = emotion;
  console.log(recogData);

  if (!resultCopy) {
    res.json({
      result: true,
      recogData,
    });
  } else {
    res.json({ result: false, message: resultCopy });
  }

  fs.unlinkSync(imagePath);
});

module.exports = router;
