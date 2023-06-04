prediction="";

Webcam.set({
    width:350,
    height:300,
    image_format:"png",
    png_quality:90
});

camera = document.getElementById("camera");

Webcam.attach("#camera");

function capture(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML='<img id="image" src="'+data_uri+'">';
    });
}

console.log("ml5 version:",ml5.version);

classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/pVBeBDP42/model.json",model_loaded);

function model_loaded()
{
    console.log("model loaded");

}

function speak(){
    synth = window.speechSynthesis;
    speak12 = "The prediction is " + prediction;
    var utter_this = new SpeechSynthesisUtterance(speak12);
    
    synth.speak(utter_this);
}

function result(){
    img = document.getElementById('image');
    classifier.classify(img, got_result);
}

function got_result(error, result){
    if(error){
        console.error(error);
    }
    else{
        console.log(result);
        document.getElementById("result_emotion_name").innerHTML= result[0].label;
        document.getElementById("result_emotion_name2").innerHTML= result[1].label;
        prediction_1 = result[0].label;
        prediction_2 = result[1].label;
        speak();

        if(result[0].label == "all the best"){
            document.getElementById("update_emoji").innerHTML = "&#128077";
        }

        if(result[0].label == "victory"){
            document.getElementById("update_emoji").innerHTML = "&#9996";
        }

        if(result[0].label == "fist bump"){
            document.getElementById("update_emoji").innerHTML = "&#128074";
        }

        
    }
}